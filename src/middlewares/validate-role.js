export const verifyRole= (...roles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(500).json({
                msg:"There is no token to validate role"
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`Unauthorized user, has a role ${req.user.role}, authorized roles are ${roles}`
            });
        }
        next();
    }
}