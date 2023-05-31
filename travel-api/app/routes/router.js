const verifySignController = require("../api").verifySign;
const verifySignUpController = require("../api").verifySignUp;
const bookingController = require("../api").booking;
const verifyJwtTokenController = require("../api").verifyJwtToken;

module.exports = function (app) {
  // Auth
  app.post(
    "/api/auth/signUp",
    [
      verifySignUpController.checkDuplicateUserNameOrEmail,
      verifySignUpController.checkRolesExisted,
    ],
    verifySignController.signup
  );
  app.post("/api/auth/signin", verifySignController.signin);

  // Booking

  app.get("/api/booking", bookingController.list);
  app.get(
    "/api/bookingpengguna",
    [verifyJwtTokenController.verifyToken],
    bookingController.listBookingUser
  );
  app.get("/api/booking/:id", bookingController.getById);
  app.post(
    "/api/booking",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    bookingController.add
  );
  app.put(
    "/api/booking/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    bookingController.update
  );
  app.delete(
    "/api/booking/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    bookingController.delete
  );
};
