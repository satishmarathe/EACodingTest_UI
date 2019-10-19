class LimitingError extends Error{
    constructor(message,code){
        super(message);
        this.code = code;
    }
}
export default LimitingError;