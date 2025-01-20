import React, { useState, useEffect } from "react";

const AllMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all messages
  useEffect(() => {
    fetch("http://localhost:5000/messages")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-[#111827]  h-[628px]">
      <h1 className="text-2xl font-bold mb-4 text-white">
        All Messages
      </h1>
      <div className="bg-[#1f2937] p-6 rounded-md shadow-md">
        {messages.length > 0 ? (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li
                key={message.message_id}
                className="p-4 bg-[#374151] rounded-md shadow"
              >
                <p className="text-white font-bold">
                  {message.student_name} ({message.student_id})
                </p>
                <p className="text-white mb-2">{message.message_content}</p>
                <p className="text-gray-400 text-sm">
                  Sent at: {new Date(message.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default AllMessagesPage;
