import { useState } from "react";
import axios from "axios";
import Navbar from '../Components/navbar.jsx';
function CreateCourse() {
    const [courseName, setCourseName] = useState("");

    const [lectures, setLectures] = useState([
        {
            title: "",
            description: "",
            notes: "",
            videoUrl: ""
        }
    ]);

    const addLecture = () => {
        setLectures([
            ...lectures,
            {
                title: "",
                description: "",
                notes: "",
                videoUrl: ""
            }
        ]);
    };

    const handleLectureChange = (index, e) => {
        const updated = [...lectures];

        updated[index][e.target.name] = e.target.value;

        setLectures(updated);
    };

    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("token"));
            const res=await axios.post("https://online-learning-platform-19fq.onrender.com/api/createCourse", {
                courseName,
                lectures
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(res.data.message==="Course created"){
            alert("Course created successfully");
    }}catch(error){
        alert("Failed to create course. Please login again and then try again to create the course");
    }};

    return (
        <div className="container"><Navbar/><h1>Online Learning Platform</h1>
        <div className="card" style={{margin:'2% 25%',background:'pink'}}>

            <div className="card-body">
                <h5 className="card-title" style={{fontSize:'35px'}}>
                Create Course         
                </h5>
           

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    placeholder="Course name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)} required/><br/>

                {lectures.map((lecture, index) => (
                    <div className="card" key={index}>
                        <h5>Lecture {index + 1}</h5>
                        <br/>
                        <input type="text"
                            className="form-control"
                            name="title"
                            placeholder="Lecture title"
                            value={lecture.title}
                            onChange={(e) =>
                                handleLectureChange(index, e)
                            }
                            required/>
<br/>
                        <textarea
                            className="form-control"
                            name="description"
                            placeholder="Description"
                            value={lecture.description}
                            onChange={(e) =>
                                handleLectureChange(index, e)
                            }
                        />
<br/>
                        <textarea
                            className="form-control"
                            name="notes"
                            placeholder="Notes"
                            value={lecture.notes}
                            onChange={(e) =>
                                handleLectureChange(index, e)
                            }
                        />
<br/>
                        <input type="url"
                            className="form-control"
                            name="videoUrl"
                            placeholder="Video URL"
                            value={lecture.videoUrl}
                            onChange={(e) =>
                                handleLectureChange(index, e)
                            }
                        /><br/>
                    </div>
                ))}
<br/><div style={{ display: "flex", gap: "20px",justifyContent: "center"}}>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={addLecture}
                >
                    Add Lecture
                </button>

                <button className="btn btn-light">
                    Create Course
                </button></div>
            </form>
        </div></div></div>
    );
}

export default CreateCourse;