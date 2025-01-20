import React from "react";

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "SM Muntasir Sarwar",
      id: "C231037",
      image: "/src/assets/Image/mun.JPG", // Update the path to the image of Muntasir
    },
    {
      name: "Md. Nazim Uddin",
      id: "C231020",
      image: "/src/assets/Image/6086763756118982294.jpg", // Update the path to the image of Nazim
    },
    {
      name: "Minhaz Ahmmed",
      id: "C231011",
      image: "/src/assets/Image/6235673016755405029.jpg", // Update the path to the image of Minhaz
    },
  ];

  return (
    <div className="container mx-auto p-4 bg-[#111827] h-[628px]">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">About Us</h1>
      <p className="text-center text-gray-300 mb-12">
        We are a dedicated team of three passionate individuals working together on this project.
        Our goal is to deliver quality, innovation, and functionality in everything we create.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#1f2937] p-6 rounded-md shadow-md text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="size-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-white mb-2">{member.name}</h2>
            <p className="text-gray-400">ID: {member.id}</p>
            <p className="text-gray-300 mt-4">
              Passionate about coding, problem-solving, and building innovative solutions. Dedicated to learning and growing every day.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
