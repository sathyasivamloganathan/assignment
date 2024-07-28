// Login middleware

export const LoginStatus = (req, res, next) => {
  if (!req.user) {
    return res.status(400).send("Not Logged In, No cookies available");
  }
  next();
};
