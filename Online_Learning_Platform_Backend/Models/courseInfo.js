const mongoose = require("mongoose");

const course_Info_Schema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true
        },

        instructor:{type:{instructor_Name:{
            type:String,
            required: true
        },instructor_Email:{
            type:String,
            required: true
        }},required:true},

        lectures: [
            {
                title: {
                    type: String,
                    required: true
                },

                description: {
                    type: String
                },

                notes: {
                    type: String
                },

                videoUrl: {
                    type: String
                }
            }
        ],enroll_Email:{
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const  course_Info_Model= mongoose.model("course_Info", course_Info_Schema);
module.exports=course_Info_Model;