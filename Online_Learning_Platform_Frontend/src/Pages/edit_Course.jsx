import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../Components/navbar.jsx';
import axios from "axios";
function EditCourse(){
    const {id}=useParams();
    const [courseName, setCourseName]=useState("");
    const [lectures, setLectures] = useState([]);
    useEffect(() => {
        getCourse();
    }, []);

    const getCourse = async () => {
        try {
            const token=JSON.parse(localStorage.getItem("token"));

            const response = await axios.get(
                `https://online-learning-platform-19fq.onrender.com/api/getCourse/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
if(response.data.message==="Course fetched successfully"){
            setCourseName(response.data.course.courseName);
            setLectures(response.data.course.lectures);
}}catch (error) {
            console.log(error);
            alert("Failed to fetch course details. Please login again and then try to edit the course.");
        }
    };

    const handleLectureChange = (index, e) => {
        const updatedLectures = [...lectures];

        updatedLectures[index][e.target.name] = e.target.value;

        setLectures(updatedLectures);
    };

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

    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
            const token=JSON.parse(localStorage.getItem("token"));

       const response=await axios.put(
                `https://online-learning-platform-19fq.onrender.com/api/updateCourse/${id}`,
                {
                    courseName,
                    lectures
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
if(response.data.message==="Course updated successfully"){  
            alert("Course updated successfully");
}}catch(error){alert("Failed to update the course. Please login again and then try to update the course again.");}
    };
    return (
        <div className="container"><Navbar/>
<h1>Online Learning Platform</h1>
<div className="card" style={{margin:'2% 25%',background:'pink'}}>

<div className="card-body">
    <h5 className="card-title" style={{fontSize:'35px'}}>
    Edit Course         
    </h5>

            <form onSubmit={handleSubmit}>

               

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Course name"
                        value={courseName}
                        onChange={(e) =>
                            setCourseName(e.target.value)
                        }
                    />
                {lectures.map((lecture, index) => (
                    <div className="card" key={index}>

                        <div className="card-body">

                            <h5>
                                Lecture {index + 1}
                            </h5>

                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Lecture title"
                                value={lecture.title}
                                onChange={(e) =>
                                    handleLectureChange(index, e)
                                }
                            required />

                            <textarea
                                name="description"
                                className="form-control"
                                placeholder="Description"
                                value={lecture.description}
                                onChange={(e) =>
                                    handleLectureChange(index, e)
                                }
                            />

                            <textarea
                                name="notes"
                                className="form-control"
                                placeholder="Notes"
                                value={lecture.notes}
                                onChange={(e) =>
                                    handleLectureChange(index, e)
                                }
                            />

                            <input
                                type="text"
                                name="videoUrl"
                                className="form-control"
                                placeholder="Video URL"
                                value={lecture.videoUrl}
                                onChange={(e) =>
                                    handleLectureChange(index, e)
                                }
                            />

                        </div>

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

                <button
                    type="submit"
                    className="btn btn-light"
                >
                    Update Course
                </button>
</div>
            </form>
</div></div>
        </div>
    );
}

export default EditCourse;