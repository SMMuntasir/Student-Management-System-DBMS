import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

const FindStudents = () => {
    const [students, setStudents] = useState([]);

    // Fetch student data from the backend
    useEffect(() => {
        fetch("http://localhost:5000/students")
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((err) => console.error("Error fetching students:", err));
    }, []);

    return (
        <div className="relative bg-[#111827]">

            <div className="relative flex justify-center">
                <form className="input input-bordered flex items-center gap-2 md:w-[35rem]">
                    <input name="search" type="text" className="grow" placeholder="Search Students" />
                    <button type="submit" className="btn bg-[#404040]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-20 justify-items-center mt-20">
                {students.map((student) => (
                    <div key={student.SID} className="relative lg:w-72 h-[30rem] lg:h-[25rem] bg-base-100 shadow-xl rounded-xl overflow-hidden cursor-pointer mb-5">
                        {/* Image Section */}
                        <img
                            src={student.photo} // Placeholder image or use student photo
                            alt={student.name}
                            className="lg:w-full w-72  object-cover"
                        />

                        {/* Details Section */}
                        <div className=" flex flex-col justify-end p-4  bg-opacity-80 text-white">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{student.name}</h2>
                                <p className="text-lg mb-1">ID: {student.SID}</p>
                                <p className="text-lg mb-1">Course: {student.course_enrolled}</p>
                                <p className="text-lg mb-3">Attendance: {student.attendance}%</p>

                                {/* Details Button */}
                                <NavLink to={`/performance/${student.SID}`}>
                                    <button className="btn btn-primary w-full">
                                        View Performance Details
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindStudents;
