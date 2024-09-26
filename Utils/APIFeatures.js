class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryString = queryStr;
  }
  //   PrepareQueryStr() {
  //     const excludequery = ["sort", "page", "limit", "fields"];
  //     const queryObj = { ...req.query };
  //     excludequery.forEach((el) => {
  //       delete queryObj[el];
  //     });

  //     // Now, update the query with the modified this.queryString
  //     this.query = queryObj;
  //     return this;
  //   }

  Filter() {
    const excludequery = ["sort", "page", "limit", "fields"];
    const queryObj = { ...this.queryString };
    excludequery.forEach((el) => {
      delete queryObj[el];
    });
    let querystr = JSON.stringify(queryObj);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const filteredqueryObj = JSON.parse(querystr);

    this.query = this.query.find(filteredqueryObj);

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      console.log(this.queryString.sort);

      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    // if (this.queryString.page) {
    //   const moviesCount = await Movie.countDocuments();
    //   if (skip >= moviesCount) {
    //     throw new Error("Requested page cannot be found!");
    //   }
    // }
    return this;
  }
}

module.exports = APIFeatures;
