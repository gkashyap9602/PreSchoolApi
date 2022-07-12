const UTILS = require("./messages");

function object_id_check(user_id) {
  if (user_id.length < 24 || user_id.length > 24) {
    return UTILS.MESSAGES.INVALID_ID_PLEASE_CHECK;
  }
}

class error_Object {
  constructor(message, Status_Code, error) {
    (this.message = message), (this.Status_Code = Status_Code);
    this.error = error;
  }
}

class response_Object {
  constructor(message, Status_Code, result) {
    (this.message = message), (this.Status_Code = Status_Code);
    this.result = result;
  }
}

exports.object_id_check = object_id_check;
exports.error_Object = error_Object;
exports.response_Object = response_Object;
