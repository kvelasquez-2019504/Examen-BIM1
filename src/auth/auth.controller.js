import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                msg: "Incorrect credentials."
            });
        }
        if (!user.state) {
            return res.status(400).json({
                msg: "The user does not exist in the database",
            });
        }
        if(!bcryptjs.compareSync(password,user.password)){
            return res.status(400).json({
                msg:"The password is incorrect"
            })
        }
        const token = await generateJWT(user.id);
        res.status(200).json({
            msg:"Logged successfully",
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "contact the administrator"
        });
    }
}
