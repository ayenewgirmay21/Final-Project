export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Pick token name based on role
  const cookieName =
    user.role && user.role.toLowerCase() === "admin"
      ? "adminToken"
      : "patientToken";

  // Convert cookie expiry to number
  const cookieExpireDays = Number(process.env.COOKIE_EXPIRES) || 5;

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,        // REQUIRED for Render + Vercel (HTTPS only)
      sameSite: "none",    // REQUIRED for cross-domain cookies
      path: "/",           // send cookie on all routes
    })
    .json({
      success: true,
      message,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
};
