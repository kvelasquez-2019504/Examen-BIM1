import User from "../users/user.model.js";
export const verifyUsername = async (req, res, next) => {
    const userLog = req.user;
    const { username } = req.body;
    try {
        //Busco el usuario por username
        const userSearch = await User.findOne({ username: username });
        //Si el usuario no existe, el username no esta en uso
        if (!userSearch) {
            next();
        } else {
            //evaluo si el id es el mismo que el del usuario logueado, sino el usurname esta en uso
            if (userLog.id != userSearch._id) {
                return res.status(400).json({
                    msg:"The username is used for another user."
                });
            }else{
                next();
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contact administrator"
        });
    }
}