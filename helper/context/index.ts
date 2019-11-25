import jwt from "jsonwebtoken";

export const verifyUser = async (req: any) => {
  try {
    req.email = null;
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      console.log("Bearer");
      console.log(bearerHeader);
      const token = bearerHeader.split(" ")[1];
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "mysecretkey"
      );
      console.log("aca payload");
      console.log(payload);
      req.email = payload.email;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
