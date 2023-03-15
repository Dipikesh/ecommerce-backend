const router = require("express").Router();
const authController = require("./controller/auth.controller");
const authMiddleware = require("./middleware/auth.middleware");
const validate = require("./controller/validation.controller");

router.post("/register", validate.signupUser, authController.signupUser);
router.post("/login", validate.loginUser, authController.loginUser);

router.get("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

router.post("/contact", authMiddleware.authenticateToken,validate.contact, authController.createContact);

module.exports = router;
