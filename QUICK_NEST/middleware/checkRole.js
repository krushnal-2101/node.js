import HttpError from "./HttpError";

const checkRole = (...Roles) => {
    try{
        if(!req.user){
            return next (new HttpError("unauthorazation", 401))
        }
        if(!Roles.includes(req.user.role)){
            return next (new HttpError("forbidden", 403))
        }
        next()
    }catch(error){
            next(new HttpError(error.message, 500))
    }
}

export default checkRole;