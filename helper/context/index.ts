import jwt from "jsonwebtoken";

export const verifyUser = async (req: any) => {
  try {
    req.email = null;
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      const payload: any = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "mysecretkey"
      );

      req.email = payload.email;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
