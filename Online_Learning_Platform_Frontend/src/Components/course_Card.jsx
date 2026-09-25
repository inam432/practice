import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function CourseCard(props) {
    let [viewLectures,setViewLectures]=useState(false)
    let user=JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    async function delete_Course(){try{
        const response=await axios.delete(`https://online-learning-platform-19fq.onrender.com/api/deleteCourse/${props.course_Props._id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(response.data.message==="Course deleted successfully"){
            alert("Course deleted successfully");
            props.tCoursesFunctionProps(
                props.teachCoursesProps.filter((course) =>{return course._id !== props.course_Props._id})
            );
        }}catch(error){alert("Course deletion failed. Please login again and then try to delete the course again");}
    }
    return (
        <div className="col-md-4">
            <div className="card">

                <div className="card-body">
                    <h5 className="card-title">
                        {props.course_Props.courseName}
                    </h5>

                    <p className="card-text">
                        Instructor Name: {props.course_Props.instructor.instructor_Name}<br/>
                        Instructor Email: {props.course_Props.instructor.instructor_Email}
</p>{user.role==="instructor"&&props.course_Type==="teach"?<div style={{ display: "flex", gap: "20px",justifyContent: "center"}}>
                    <button className="btn btn-primary" onClick={delete_Course}>
                        Delete Course
                    </button>
                    <Link className="btn btn-primary" to={`/editCourse/${props.course_Props._id}`}>
                    Update Course
                    </Link></div>:null}<br/>
                    {!viewLectures?<button className="btn btn-primary" onClick={()=>{setViewLectures(true)}}>
                        View Lectures
                    </button>:null}
                    {viewLectures?<div>
Lectures: <br/>{props.course_Props.lectures.map((lecture,index)=>{return <p className="card-text" key={index}>
Lecture Title: {lecture.title}<br/>Lecture Description: {lecture.description}<br/>
Lecture Notes: {lecture.notes}<br/>
Lecture Video: {lecture.videoUrl}
                        </p>})}
                <button className="btn btn-primary" onClick={()=>{setViewLectures(false)}}>
                        Do Not Show Lectures
                    </button></div>:null}
                </div>

            </div>
        </div>
    );
}
