import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //? We generate a token here
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  //? We send this to user Cookie
  res.cookie("jwt", token, {
    maxAge: 50 * 24 * 60 * 60 * 1000,
    httpOnly: true, //Prevents XSS attacks cross-site scripting attacks
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
