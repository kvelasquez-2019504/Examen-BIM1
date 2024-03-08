import { request, response } from "express";
import bcryptjs from 'bcryptjs';
import User from "./user.model.js";

export const userPut = async (req = request, res = response) => {
    const userLog = req.user;
    const { _id, state, ...resto } = req.body;
    resto.password = bcryptjs.hashSync(resto.password, bcryptjs.genSaltSync());
    if (userLog.role === 'ADMIN') {
        await User.findByIdAndUpdate(userLog.id, resto);
    }
    if (userLog.role === 'CLIENT') {
        await User.findByIdAndUpdate(userLog.id, {
            username: resto.username, name: resto.name,
            age: resto.age, password: resto.password
        });
    }
    const userUpdate = await User.findById(userLog.id);
    res.status(200).json({
        msg: "Account updated",
        userUpdate
    });
}

export const userPost = async (req = request, res = response) => {
    const { username, name, age, password } = req.body;
    const userNew = new User({ username, name, age, password });
    const salt = bcryptjs.genSaltSync();
    userNew.password = bcryptjs.hashSync(userNew.password, salt);
    await userNew.save();
    res.status(200).json({
        msg: "you have successfully registered",
        userNew
    });
}