
module.exports = function (val, req, res, next) {
  if (val instanceof Error) {
    // error response

    let statusCode = (val.output || {}).statusCode || 500;
    res.status(statusCode).json({
      error: {
        // output is `boom js` error object property
        code: statusCode,
        message: val.message,
        data: val.data ? val.data : undefined,
        logs: statusCode >= 500 ? val.stack : undefined
      }
    });
    return;
  }
  // normal response
  res.json({
    data: val
  })
};
