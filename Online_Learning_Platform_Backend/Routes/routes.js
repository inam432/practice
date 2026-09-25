const express = require("express");

const { signUp, signIn,signUpWithGoogle,signInWithGoogle,verifyOTP} = require("../Controllers/Sign_Up_Sign_In.js");
const {getAllCourses,createCourse,deleteCourse,updateCourse,enrollCourse,getUserAllCourses,getCourse}=
require("../Controllers/course.js");

const {token_Verification,user_Authorization}= require("../Middleware/jwtAuthentication_Authorization.js");

const router = express.Router();
router.post("/signUp", signUp);
router.post("/verifyOTP",verifyOTP);
router.post("/signIn", signIn);
router.post("/signUpGoogle", signUpWithGoogle);
router.post("/signInGoogle",signInWithGoogle);
router.get("/getAllCourses",token_Verification,getAllCourses);
router.get("/getUserAllCourses",token_Verification,getUserAllCourses);
router.get("/getCourse/:id",token_Verification,user_Authorization,getCourse);
router.post("/createCourse",token_Verification,user_Authorization,createCourse);
router.post("/enrollCourse",token_Verification,enrollCourse);
router.put("/updateCourse/:id",token_Verification,user_Authorization,updateCourse);
router.delete("/deleteCourse/:id",token_Verification,user_Authorization,deleteCourse);


module.exports = router;