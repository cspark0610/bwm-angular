const express = require("express");
const router = express.Router();
const {
  getRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  getUserRentals,
} = require("../controllers/rentals");
const { onlyAuthUser } = require("../middlewares/auth");

router.get("/", getRentals);

router.get("/me", onlyAuthUser, getUserRentals);

router.get("/:id", getRentalById);

router.post("/", createRental);

router.delete("/:id", onlyAuthUser, deleteRental);

router.put("/:id", updateRental);

module.exports = router;
