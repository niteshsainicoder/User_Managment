import jwt from "jsonwebtoken";

export const authMiddleware = () => {
  return (req, res, next) => {
    try {
      const accessToken = req.cookies.authToken;
      const refreshToken = req.cookies.refreshToken;

      if (!accessToken && !refreshToken) {
        return res.status(401).json({ error: "Token not found", message: "Unauthorized Access" });
      }

      jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (!err) {          
          req.id = decoded;
          return next();
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN, (err, decodedRefresh) => {
          if (err) {
            return res.status(403).json({ error: "Session expired", message: "Login again" });
          }

          const newAccessToken = jwt.sign(
            { id: decodedRefresh.id },
            process.env.JWT_SECRET_ACCESS_TOKEN,
            { expiresIn: "1h" }
          );

          // Set new access token in cookie
          res.cookie("authToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3600000, // 1 hour
          });

          req.user = decodedRefresh; 
          next(); 
        });
      });
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized", message: error.message });
    }
  };
};
