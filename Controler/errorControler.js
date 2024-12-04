// Global Error Handler
const customError = require("./../Utils/customError");
const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};
const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong Please try again later",
    });
  }
};
const castErrorHandler = (error) => {
  const msg = `Invalid Value for ${error.path}: ${error.value}`;
  return new customError(msg, 400);
};
const duplicatekeyErrorHandler = (err) => {
  const msg = `We already have a movie with the name ${err.keyValue.name} Please try with another name`;
  return new customError(msg, 400);
};
const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);

  // console.log(errors);

  const errormessages = errors.join(". ");
  // console.log(errormessages);

  const msg = `Invalid Input Data ${errormessages}`;
  return new customError(msg, 400);
};
module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";
  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") error = castErrorHandler(error);
    // For Duplicate key Error Handling
    if (error.code === 11000) {
      error = duplicatekeyErrorHandler(error);
    }
    if (error.name === "ValidationError") {
      error = validationErrorHandler(error);
    }
    prodErrors(res, error);
  }
};
