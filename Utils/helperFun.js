
const UTILS = require('./messages')

exports.object_id_check = object_id_check;


function object_id_check(user_id){

    if (user_id.length < 24 || user_id.length > 24 ){

     return UTILS.MESSAGES.INVALID_ID_PLEASE_CHECK;
    }
    
}

class error_Object{
    constructor(message,Status_Code,result){
     this.message = message,
     this.Status_Code = Status_Code
     this.result = result

    }
}

exports.error_Object = error_Object;