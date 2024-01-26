// standardize error response to be sent to user/client we inherit and override Erro class

class ApiError extends Error {
    constructor({
        statusCode,
        message = "Something went wrong",
        userMessage = "Something went wrong",
        errors = [],
        stack = ""
    }) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.stack = stack;
        this.data = null;
        this.success = false;
        this.userMessage = userMessage;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
