import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from '../Components/navbar.jsx';
import CourseCard from '../Components/course_Card.jsx';
import axios from "axios";
function Dashboard() {
    const [enrollCourses,setEnrollCourses] = useState([]);
    const [teachCourses,setTeachCourses] = useState([]);

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get("https://online-learning-platform-19fq.onrender.com/api/getUserAllCourses",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.data.message==="All courses fetched successfully"){
            setEnrollCourses(response.data.enroll_Courses);
            setTeachCourses(response.data.teach_Courses);}else{
                alert("Please login again");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to fetch courses. Please login again.");
        }
    };
    const user=JSON.parse(localStorage.getItem("user"));
    return (
        <div className="container mt-5">
            <Navbar/>
<h1>Online Learning Platform</h1>
            <h2>Dashboard</h2>
            <h4>
Welcome, {user.name}</h4>
{user.role==="instructor"?<div className="row"><h5>Courses You Are Teaching</h5>
                {teachCourses.map((course) =>{return <CourseCard key={course._id} course_Props={course} 
teachCoursesProps={teachCourses} tCoursesFunctionProps={setTeachCourses} course_Type={"teach"}/>})}
            </div>:null}
<div className="row"><h5>Your Enrolled Courses</h5> {enrollCourses.map((course) =>{
    return <CourseCard key={course._id} course_Props={course} course_Type={"enroll"}/>})}
            </div>
            </div>       
    );
}
export default Dashboard;