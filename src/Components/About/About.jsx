import React from "react";
const missionPoints = [
  "A platform to create and share posts easily",
  "A space for constructive discussions through comments and feedback",
  "A transparent voting system to highlight the most valuable content",
  "Real-time notifications to keep members updated",
  "A rewarding membership system that recognizes active contributors with badges",
];

const whyPeopleUsePoints = [
  "Simple and user-friendly interface for everyone",
  "New users can quickly register and start engaging in conversations",
  "Members can share posts, comment, and vote to highlight meaningful content",
  "Membership system unlocks more features like unlimited posting and badges",
  "Notification system ensures users never miss announcements or updates",
  "Advanced search and tagging helps users find discussions that interest them",
];
const About = () => {
  return (
    <div className="py-14 md:py-20">
      <h3 className="text-[27px] font-semibold font-main md:text-3xl lg:text-4xl xl:text-5xl text-center ">
        Welcome to Devdit
      </h3>
      <p className="text-center text-gray-700 mt-5 md:mt-3 font-main">
        A modern, engaging platform for sharing ideas, discussions, and
        knowledge.
      </p>
      <div className="mt-6 md:mt-8">
        <h4 className="font-semibold text-2xl font-second md:text-3xl ">
          The Story Behind Devdit
        </h4>
        <p className="mt-3 font-main text-lg">
          The idea for Devdit App was born from the need for a space where
          people can exchange ideas freely and constructively. Many existing
          platforms are either too complicated or filled with noise, making it
          difficult to have genuine discussions. During the rise of online
          learning and remote work, we saw how important it is to have a place
          where people can connect, learn from one another, and share knowledge.
          Forum App was created to fill that gap — a simple yet powerful
          platform where everyone’s voice matters.
        </p>
      </div>
      <div className="mt-6 md:mt-8">
        <h4 className="font-semibold text-2xl font-second md:text-3xl ">
          Our Vision
        </h4>
        <p className="mt-3 font-main text-lg">
          At Devdit, our vision is to create a trusted space where discussions
          can spark learning, collaboration, and innovation. We believe
          conversations have the power to shape ideas, solve problems, and bring
          people together. Our goal is to build a welcoming, knowledge-driven
          community where users feel empowered to express themselves, help
          others, and grow together.
        </p>
      </div>
      <div className="mt-6 md:mt-8">
        <h4 className="font-semibold text-2xl font-second md:text-3xl ">
          Our Mission
        </h4>
        <div className="mt-3 font-main text-lg">
          Our mission at Devdit is to make online discussions more
          accessible, organized, and impactful. We aim to provide:
          <ul>
            {missionPoints.map((mission,index) => (
              <li key={index} className="list-disc ml-5 mt-1">{mission}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <h4 className="font-semibold text-2xl font-second md:text-3xl ">
          Why Do People Use It?{" "}
        </h4>
        <div className="mt-3 font-main text-lg">
          People use Devdit because it is simple, engaging, and
          user-friendly. Unlike many platforms that are overwhelming, Forum App
          makes discussions clear and accessible:
          <ul>
            {whyPeopleUsePoints.map((use,index) => (
              <li key={index} className="list-disc ml-5 mt-1">{use}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
