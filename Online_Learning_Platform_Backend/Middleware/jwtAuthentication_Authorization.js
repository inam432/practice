const jwt = require("jsonwebtoken");

const token_Verification= (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
const user_Authorization=(req, res, next) => {
    if (req.user.role !== "instructor") {
        return res.status(403).json({
            message: "Only instructors can perform this action"
        });
    }

    next();
};
module.exports={token_Verification,user_Authorization};