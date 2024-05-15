export default class ApiErorr extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    
    static UnauthorizedError () {
        return new ApiErorr(401, "Пользователь не авторизован")
    }

    static BedReauest () {
        return new ApiErorr(400, message, errors)
    }

}