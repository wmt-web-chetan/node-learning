class ApiError extends Error {
  constructor(statusCode, message="something went wrong", errors=[], statck="") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success=false;
    this.errors = errors;
    this.data =null;
    if(statck) {
        this.statck = statck;
    }else{
        Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };