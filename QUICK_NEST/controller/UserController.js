import cloudinary from "../config/cloudinary.js";
import HttpError from "../middleware/HttpError.js";
import User from "../model/User.js";

const add = async (req, res, next) => {
    try {
        const { name, email, password, role, phone } = req.body;

        const newUser = {
            name,
            email,
            password,
            role,
            phone,
            profilePic: req.file ? req.file.path : "undefined",
            cloudinaryId: req.file ? req.file.filename : "undefined",
        };

        console.log("cloudinaryId", newUser.cloudinaryId)

        const user = new User(newUser);

        await user.save();

        res.status(201).json({ success: true, user });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};



const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password);

        const token = await user.generateAuthToken();

        if (!user) {
            return next(new HttpError("unable to login"));
        }

        res.status(200).json({ success: true, user, token });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};



const authLogin = async (req, res, next) => {

    try {
        const user = req.user;
        if (!user) {

            return next(new HttpError("user not found", 404));

        }
        res.status(200).json({ success: true, user });

    } catch (error) {

        next(new HttpError(error.message, 500));
    }
}



const logOut = async (req, res, next) => {
    try {
        const user = req.user;

        user.tokens = user.tokens.filter((t) => {

            return t.token != req.token;
        });
        await user.save();

        res.status(200).json({ success: true, message: "user logout successfully!!" });

    } catch (error) {

        next(new HttpError(error.message, 500));
    }
}



const logOutAll = async (req, res, next) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.status(200).json({ success: true, message: "user logout all device successfully!" });

    } catch (error) {

        next(new HttpError(error.message, 500));

    }
}



const allUser = async (req, res, next) => {
    try {
        const users = await User.find({});

        if (users.length === 0) {
            res.status(200).json({ success: true, message: "no user data found" });
        }

        res
            .status(200)
            .json({ success: true, message: "all user data fetched", users });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};



const updateUser = async (req, res, next) => {
    try {

        const targetedUser = req.user._id || req.params.id;

        const user = await User.findById(targetedUser)

        if (!user) {
            return next(new HttpError("user not found", 404));
        }

        const updates = Object.keys(req.body);

        const allowed = ["name", "password", "phone", "profilePic"];

        if (req.user.role === "admin" || req.user.role === "super_admin") {
            allowed = [...allowed, "role",]
        }

        const isValid = updates.every((field) => {

            return allowed.includes(field);

        })
        if (!isValid) {

            return next(new HttpError("only allowed field can be updated", 400));
        }


        if (
            !req.user.role === "admin" &&
            !req.user.role === "super_admin" &&
            !req.user._id.toString() !== user._id.toString()
        ) {
            return next(new HttpError("unauthorized access", 401));
        }


        updates.forEach((update) => {

            user[update] = req.body[update];

        });

        if (!req, file) {
            await cloudinary.uploader.destroy(user.cloudinaryId)

            user.profilePic = req.file.path;

            user.cloudinaryId = req.file.fileName
        }

        await user.save();

        res.status(200).json({ success: true, message: "user data updated successfully!", user })

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}



const deleteUser = async (req, res, next) => {
    try {
        const user = req.user;

        await User.deleteOne(user);

        await cloudinary.uploader.destroy(user.cloudinaryId);

        res
            .status(200)
            .json({ success: true, message: "user deleted successfully" });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};




export default { add, login, authLogin, logOut, logOutAll, allUser, updateUser, deleteUser };