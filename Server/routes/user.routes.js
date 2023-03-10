const express = require('express');
const router = express.Router()

const userContoller = require('../controllers/user.controller');

//for adminpanel getALL
router.get('/getAllUsers', userContoller.getAllUsers);
//for login
router.get("/getOneUser/:id", userContoller.getOneUser);
//for signup
router.post("/addUsers", userContoller.addUsers);
//for update
router.put("/updateUser/:id", userContoller.updateUser);
//for delete account
router.delete("/deleteUser/:id", userContoller.deleteUser);

module.exports = router;