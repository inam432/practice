const course_Info_Model=require("../Models/courseInfo.js");
const getAllCourses=async(req, res)=>{
        const courses = await course_Info_Model.find({enroll_Email:null});
        res.status(200).json({courses,message:"All courses fetched successfully"});
};
const getUserAllCourses=async(req, res)=>{
    const enroll_Courses=await course_Info_Model.find({enroll_Email:req.user.email});
const teach_Courses=await course_Info_Model.find({enroll_Email:null,"instructor.instructor_Email":
req.user.email});
    res.status(200).json({enroll_Courses,teach_Courses,message:"All courses fetched successfully"});
};
const getCourse=async(req, res)=>{
    const course=await course_Info_Model.findOne({_id:req.params.id});
    if(course===null){
        return res.status(404).json({message:"Course not found"})
    }
    res.status(200).json({course,message:"Course fetched successfully"});
};
const enrollCourse=async(req, res)=>{
    try {
        const {courseName,instructor}=req.body;
        const courseExist=await course_Info_Model.findOne({courseName,"instructor.instructor_Name":req.body.instructor.instructor_Name,
        "instructor.instructor_Email": req.body.instructor.instructor_Email});
        if(courseExist!==null){
            courseExist.enroll_Email=req.user.email;
const course=new course_Info_Model({enroll_Email:courseExist.enroll_Email,courseName,instructor:{instructor_Name:req.user.name,instructor_Email:req.user.email},
            lectures:courseExist.lectures,
        });
        await course.save();
        res.status(201).json({
            message: "Enrollment done",
            course
        });}else{res.status(404).json({
            message: "Course not found"
        });}
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
const createCourse=async (req, res) => {
        try {
            const {courseName,lectures} = req.body;
            const course=new course_Info_Model({
                courseName,instructor:{instructor_Name:req.user.name,instructor_Email:req.user.email},lectures
            });
            await course.save();
            res.status(201).json({
                message: "Course created",
                course,imageUrl: result.secure_url
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };
    const deleteCourse = async (req, res) => {
        try {
            const course = await course_Info_Model.findOne({_id:req.params.id});
    
            if (!course) {
                return res.status(404).json({
                    message: "Course not found"
                });
            }
    
            if (course.instructor.instructor_Email!== req.user.email) {
                return res.status(403).json({
                    message: "You can only delete your own course"
                });
            }
    
            await course_Info_Model.deleteOne({_id:req.params.id});
    
            res.status(200).json({
                message: "Course deleted successfully"
            });
    
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };

const updateCourse=async (req, res) => {
    try {
        const {courseName,lectures}=req.body;

        const course = await course_Info_Model.findOne({_id:req.params.id});
        if(course===null){
            return res.status(404).json({
                message: "Course not found"
            });
        }if (course.instructor.instructor_Email !== req.user.email) {
            return res.status(403).json({
                message: "You can only update your own course"
            });
        }
        await course_Info_Model.updateOne(
            {
                _id: course._id
            },
            {
                $set: {
                    courseName,
                    lectures
                }},{
                    runValidators: true
                }
            
        );

        res.status(200).json({
            message: "Course updated successfully",
            course
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports={getAllCourses,createCourse,deleteCourse,updateCourse,enrollCourse,getUserAllCourses,getCourse};