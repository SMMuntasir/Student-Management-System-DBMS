import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddAssignmentPage = () => {
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [studentID, setStudentID] = useState(''); // Optional, if student ID is required

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newAssignment = {
      assignment_name: assignmentName,
      due_date: dueDate,
      student_id: studentID, // Optional, only if we need to associate with a specific student
    };

    // Make a POST request to the server to add the assignment
    fetch('http://localhost:5000/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAssignment),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Done!",
          icon: "success",
          draggable: true
        })
        .catch(err=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
           
          });
        });
        console.log('Assignment added:', data);
        // Clear form fields after submission
        setAssignmentName('');
        setDueDate('');
        setStudentID('');
      })
      .catch((error) => console.error('Error adding assignment:', error));
  };

  return (
    <div className="container h-[628px] mx-auto p-4 bg-[#34455d] ">
      <h1 className="text-2xl font-bold mb-4">Add New Assignment</h1>
      <form onSubmit={handleSubmit} className="bg-[#1f2937] p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="assignment_name" className="text-white">Assignment Name</label>
          <input
            type="text"
            id="assignment_name"
            className="input input-bordered w-full"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="due_date" className="text-white">Due Date</label>
          <input
            type="date"
            id="due_date"
            className="input input-bordered w-full"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="student_id" className="text-white">Student ID (optional)</label>
          <input
            type="text"
            id="student_id"
            className="input input-bordered w-full"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">Add Assignment</button>
      </form>
    </div>
  );
};

export default AddAssignmentPage;
