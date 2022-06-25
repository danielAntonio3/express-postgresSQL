// ! Todos estos middleware son de tipo error
function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

// ! Este middleware funciona para la librería de @hapi/boom
function boomErrorHandler(err, req, res, next) {
  console.log('boomErrorHandler');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
};
