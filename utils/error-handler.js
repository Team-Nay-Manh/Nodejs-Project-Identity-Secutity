const HTTP_STATUS = require("../config/http-status");
const ReturnData = require("../models/returnData.model.js");

const handleError = (res, error, status = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
  console.error(error);
  const returnData = new ReturnData();
  returnData.message = error.message;
  return res.status(status).json(returnData.toObject());
};

module.exports = handleError;