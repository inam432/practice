/*<Route path="/courses" element={<Courses />} />
                <Route path="/create-course" element={<Create_Course />} />
                <Route path="/dashboard" element={<Dashboard />} />*/
import { useEffect, useState } from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './Pages/signIn.jsx'
import CreateCourse from './Pages/create_Course.jsx'
import Courses from './Pages/courses.jsx'
import SignUp from './Pages/signUp.jsx'
import EditCourse from './Pages/edit_Course.jsx'
import Dashboard from './Pages/dashboard.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editCourse/:id" element={<EditCourse />} />
            </Routes>
        </BrowserRouter>
  </StrictMode>,
)
