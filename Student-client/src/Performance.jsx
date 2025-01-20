import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// Register necessary components for chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PerformanceDetails = () => {
    const { SID } = useParams(); // Get SID from URL parameters
    const [performance, setPerformance] = useState(null);
    const [assignments, setAssignments] = useState([]);
    // Fetch performance data for the student
    useEffect(() => {
        fetch(`http://localhost:5000/performance/${SID}`)
            .then((response) => response.json())
            .then((data) => {
                setPerformance(data);
            })
            .catch((err) => console.error("Error fetching performance data:", err));
    }, [SID]);

    useEffect(() => {
        fetch(`http://localhost:5000/assignments/${SID}`)
            .then((response) => response.json())
            .then((data) => setAssignments(data))
            .catch((err) => console.error("Error fetching assignments:", err));
    }, [SID]);

    if (!performance) {
        return <div>Loading...</div>;
    }


    const midtermData = {
        labels: ["Midterm Score", "Remaining"],
        datasets: [
            {
                data: [performance.midterm_number, 30 - performance.midterm_number],
                backgroundColor: ["#0000b3", "#6b7280"],
                borderWidth: 0,
            },
        ],
    };

    const finalData = {
        labels: ["Final Score", "Remaining"],
        datasets: [
            {
                data: [performance.final_number, 50 - performance.final_number],
                backgroundColor: ["#374151", "#6b7280"], // Dark Gray for Final, Light Gray for remaining
                borderWidth: 0,
            },
        ],
    };

    const assignmentData = {
        labels: ["Assignment Score", "Remaining"],
        datasets: [
            {
                data: [performance.assignment, 10 - performance.assignment],
                backgroundColor: ["#6b7280", "#d1d5db"], // Medium Gray for Assignment, Lighter Gray for remaining
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="container mx-auto p-4 bg-[#111827]">
            <h1 className="text-2xl font-bold mb-4 text-white">
                Performance Details for Student {performance.SID}
            </h1>
            <div className="bg-[#1f2937] p-6 rounded-md shadow-md mb-8 relative">
                <h2 className="inline-block text-xl font-semibold mb-4 text-white">Performance Summary</h2>
                <div
                    className="text-[#111827] flex items-center justify-center absolute top-0 text-xl right-0 rounded-full size-20 border-8 border-[#374151] bg-white  font-bold shadow-md"
                >
                    {performance.assignment + performance.final_number + performance.midterm_number}/90
                </div>

                <table className="table-auto w-full border-collapse border border-gray-300 mb-8 mt-9">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-white">Exam</th>
                            <th className="border border-gray-300 px-4 py-2 text-white">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-white">Midterm Exam</td>
                            <td className="border border-gray-300 px-4 py-2 text-white">
                                {performance.midterm_number}
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-white">Final Exam</td>
                            <td className="border border-gray-300 px-4 py-2 text-white">
                                {performance.final_number}
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-white">Assignment</td>
                            <td className="border border-gray-300 px-4 py-2 text-white">
                                {performance.assignment}
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-white">Due Work</td>
                            <td className="border border-gray-300 px-4 py-2 text-white">
                                {assignments.length > 0 ? (
                                    <ul>
                                        {assignments.map((assignment) => (
                                            <li key={assignment.due_date}>
                                                {assignment.assignment_name} (Due: {assignment.due_date})
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    "No due work"
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="grid grid-cols-3">
                    {/* Midterm Donut Chart */}
                    <div className="w-full mb-8">
                        <h3 className="text-lg font-semibold text-white mb-4">Midterm Score</h3>
                        <Doughnut data={midtermData} options={{ responsive: true }} />
                    </div>

                    {/* Final Donut Chart */}
                    <div className="w-full mb-8">
                        <h3 className="text-lg font-semibold text-white mb-4">Final Score</h3>
                        <Doughnut data={finalData} options={{ responsive: true }} />
                    </div>

                    {/* Assignment Donut Chart */}
                    <div className="w-full mb-8">
                        <h3 className="text-lg font-semibold text-white mb-4">Assignment Score</h3>
                        <Doughnut data={assignmentData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceDetails;
