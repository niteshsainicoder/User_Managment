import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET_ACCESS_TOKEN,
        { expiresIn: "1h" }  
    );
};

export const generateRefreshToken = (userId) => {
    
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET_REFRESH_TOKEN,
        { expiresIn: "7d" } 
    );
};
