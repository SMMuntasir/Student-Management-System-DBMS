import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Chart from "chart.js/auto";

const Home = () => {
    useEffect(() => {
        let barChartInstance, donutChartInstance, lineChartInstance;

        const initializeCharts = () => {
            // Bar Chart
            const barCtx = document.getElementById("barChart").getContext("2d");
            if (barChartInstance) barChartInstance.destroy(); // Destroy previous instance if it exists
            barChartInstance = new Chart(barCtx, {
                type: "bar",
                data: {
                    labels: ["S", "M", "T", "W", "T", "F", "S"],
                    datasets: [
                        {
                            label: "Students",
                            data: [50, 75, 60, 90, 30, 70, 55],
                            backgroundColor: "blue",
                        },
                    ],
                },
            });

            // Donut Chart
            const donutCtx = document.getElementById("donutChart").getContext("2d");
            if (donutChartInstance) donutChartInstance.destroy();
            donutChartInstance = new Chart(donutCtx, {
                type: "doughnut",
                data: {
                    labels: ["In-Store Sales", "Online Sales"],
                    datasets: [
                        {
                            data: [30, 70],
                            backgroundColor: ["blue", "gray"],
                        },
                    ],
                },
            });

            // Line Chart
            const lineCtx = document.getElementById("lineChart").getContext("2d");
            if (lineChartInstance) lineChartInstance.destroy();
            lineChartInstance = new Chart(lineCtx, {
                type: "line",
                data: {
                    labels: ["S", "M", "T", "W", "T", "F", "S"],
                    datasets: [
                        {
                            label: "Performance",
                            data: [30, 70, 40, 120, 50, 150, 90],
                            borderColor: "blue",
                            backgroundColor: "rgba(0, 0, 255, 0.1)",
                            fill: true,
                        },
                    ],
                },
            });
        };

        initializeCharts();

        // Cleanup on component unmount or re-render
        return () => {
            if (barChartInstance) barChartInstance.destroy();
            if (donutChartInstance) donutChartInstance.destroy();
            if (lineChartInstance) lineChartInstance.destroy();
        };
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="flex">
                {/* Sidebar */}
                

                {/* Main Content */}
                <main className="flex-1 p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-4 bg-blue-600 rounded-md">
                            <h3 className="text-lg">Total Students</h3>
                            <p className="text-3xl font-bold">3280</p>
                            <div className="w-full bg-gray-800 rounded-full h-3 mt-2 relative">
                                <div
                                    id="progress-bar"
                                    className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-800"
                                    style={{ width: "0%" }}
                                ></div>
                            </div>
                            <p className="mt-2">80% Increase in 20 Days</p>
                        </div>
                        <div className="p-4 bg-yellow-500 rounded-md">
                            <h3 className="text-lg">New Students</h3>
                            <p className="text-3xl font-bold">245</p>
                            <p className="mt-2">50% Increase in 25 Days</p>
                        </div>
                        <div className="p-4 bg-purple-600 rounded-md">
                            <h3 className="text-lg">Total Courses</h3>
                            <p className="text-3xl font-bold">28</p>
                            <p className="mt-2">76% Increase in 20 Days</p>
                        </div>
                        <div className="p-4 bg-red-600 rounded-md">
                            <h3 className="text-lg">Fees Collection</h3>
                            <p className="text-3xl font-bold">$25160</p>
                            <p className="mt-2">30% Increase in 30 Days</p>
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-5 rounded-md">
                            <h3 className="mb-4 text-lg font-semibold">University Survey</h3>
                            <canvas id="barChart"></canvas>
                        </div>
                        <div className="bg-gray-800 p-5 rounded-md">
                            <h3 className="mb-4 text-lg font-semibold">Donut Chart</h3>
                            <canvas id="donutChart"></canvas>
                        </div>
                        <div className="bg-gray-800 p-5 rounded-md">
                            <h3 className="mb-4 text-lg font-semibold">Performance Graph</h3>
                            <canvas id="lineChart"></canvas>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
