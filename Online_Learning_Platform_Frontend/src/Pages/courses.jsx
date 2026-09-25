import { useEffect, useState } from "react";
import Navbar from '../Components/navbar.jsx';
import axios from "axios";
function Courses() {
    const [courses, setCourses] = useState([]);
    let user=JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get("https://online-learning-platform-19fq.onrender.com/api/getAllCourses",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });if(response.data.message==="All courses fetched successfully"){
                setCourses(response.data.courses);}
        } catch (error) {
            alert("Failed to fetch courses. Please login again.");
            console.log(error);
        }
    };

   
    const courseEnrollment=async(courseName,instructor)=>{try{
        const token = JSON.parse(localStorage.getItem("token"));
            const res=await axios.post("https://online-learning-platform-19fq.onrender.com/api/enrollCourse", {
                courseName,instructor
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(res.data.message==="Enrollment done"){
            alert("Enrollment done successfully");
    }}catch(error){
        alert("Enrollment failed. Please login again and then try again to enroll in the course");
    }};

    return (
        <div className="container"><Navbar/><h1>Online Learning Platform</h1>
            <h2>All Courses</h2>

            <div className="row">
                {courses.map((course) =>{return (
                    <div className="col-md-4" key={course._id}>
                        <div className="card">
<div className="card-body">
    <h5 className="card-title">
        {course.courseName}
    </h5>

                                <p className="card-text">
                                    Instructor Name: {course.instructor.instructor_Name}<br/>
                                    Instructor Email: {course.instructor.instructor_Email}
                                </p>
{user.email===course.instructor.instructor_Email?null:
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
courseEnrollment(course.courseName,{instructor_Name:course.instructor.instructor_Name,
    instructor_Email:course.instructor.instructor_Email})
                                    }
                                >
                                    Enroll Now
                                </button>}
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
}

export default Courses;