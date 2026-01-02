class Helper {
  //chamada generica para usar nos métodos
  sendResponse = function (res, statusCode, data) {
    res.status(statusCode).json({ result: data });
  };
}

export default new Helper();
