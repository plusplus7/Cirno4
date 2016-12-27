/**
 * Created by plusplus7 on 2016/11/21.
 */

var response_codes = {
    success         : "Success",
    no_such_entity  : "NoSuchEntity",
    forbidden       : "Forbidden",
    operation_fail  : "OperationFail",
    internal_error  : "InternalError"
};

var error_response = function(code, msg) {
    return {
        Success : false,
        Message : code + "." + msg,
        Data    : ""
    }
};

var success_response = function(data) {
    return {
        Success : true,
        Message : response_codes["success"],
        Data    : data
    }
};

module.exports.codes    = response_codes;
module.exports.error    = error_response;
module.exports.success  = success_response;
