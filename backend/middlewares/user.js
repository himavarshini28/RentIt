import jwt from "jsonwebtoken";
 const userMiddleware = async(req, res, next) =>
{
    const token = req.headers.token;
    if(!token)
    {
        res.status(401).json({
            message: "No token provided",
        })
    }
    try{ 
        const verified = jwt.verify(token, process.env.JWT_USER_SECRET);
        if(!verified)
        {
            res.status(401).json({
                message: "Invalid token",
            })
        }
        req.userId= verified.id;
        next();
    }
    catch(err)
    {
        res.status(500).json({
            message: "Error in verifying token",
            error: err.message,
        })
    }
}

 export default userMiddleware; 