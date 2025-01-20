import React, { useState } from "react";

const SendMessagePage = () => {
  const [studentId, setStudentId] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !messageContent) {
      setStatusMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_id: studentId, message_content: messageContent }),
      });

      if (response.ok) {
        setStatusMessage("Message sent successfully!");
        setStudentId("");
        setMessageContent("");
      } else {
        setStatusMessage("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatusMessage("An error occurred while sending the message.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-[#111827]  h-[628px]">
      <h1 className="text-2xl font-bold mb-4 text-white">Send a Message</h1>
      <form onSubmit={handleSubmit} className="bg-[#1f2937] p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="studentId" className="block text-white font-semibold mb-2">
            Student ID
          </label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 rounded-md bg-[#374151] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="messageContent" className="block text-white font-semibold mb-2">
            Message
          </label>
          <textarea
            id="messageContent"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            className="w-full p-2 rounded-md bg-[#374151] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Send Message
        </button>
        {statusMessage && (
          <p className="mt-4 text-white font-semibold">{statusMessage}</p>
        )}
      </form>
    </div>
  );
};

export default SendMessagePage;
