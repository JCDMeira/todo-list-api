import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

interface AuthReq extends Request {
  userId: string | JwtPayload;
}

function Auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ message: "Missing token" });

    const fragmentedToken = authorization.split(" ");

    if (fragmentedToken.length !== 2)
      return res.status(403).json({ message: "Poorly structured token" });

    const [bearer, token] = fragmentedToken;

    if (fragmentedToken.length !== 2 || !/Bearer/i.test(bearer))
      return res.status(403).json({ message: "Poorly structured token" });

    const encryptKey = process.env.TOKEN_ENCRYPT as string;
    jwt.verify(token, encryptKey, (error, decod: any) => {
      if (error) return res.status(401).json({ message: "Invalid token" });
      console.log(decod);
      // req.userId = decod.id;

      return next();
    });
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
}

export default Auth;
