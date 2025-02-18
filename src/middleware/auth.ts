import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

interface AuthRequest extends Request {
  user?: any;
}

const protect: RequestHandler = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token is not available!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token!" });
  }
};

export default protect;
