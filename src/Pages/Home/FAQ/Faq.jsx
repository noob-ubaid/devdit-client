import React from "react";
const faqData = [
  {
    question: "How can I grow my knowledge on Devdit?",
    answer:
      "By reading posts from other users, commenting on discussions, and participating in conversations, you can learn from experts and peers.",
  },
  {
    question: "How do I share my ideas effectively?",
    answer:
      "Use clear titles, descriptive content, and relevant tags when posting. This helps your post reach the right audience and gain more engagement.",
  },
  {
    question: "What benefits do I get as a Gold member?",
    answer:
      "Gold members can post more than 5 times, access premium content, gain higher visibility for their posts, and receive exclusive badges.",
  },
  {
    question: "How can I get more recognition for my posts?",
    answer:
      "Engage with the community, respond to comments, and post high-quality content. Popular posts with more upvotes will appear at the top.",
  },
  {
    question: "How does commenting help me on Devdit?",
    answer:
      "Commenting allows you to connect with other users, get feedback, and demonstrate your knowledge, which can increase your credibility in the community.",
  },
  {
    question: "How can I find trending topics or posts?",
    answer:
      "Use the search bar to look for tags or keywords, and check the 'Sort by Popularity' feature to see the most engaging posts.",
  },
  {
    question: "Can I showcase my expertise on Devdit?",
    answer:
      "Yes! Consistently posting valuable content, giving helpful feedback, and engaging in discussions will build your reputation and expertise.",
  },
  {
    question: "How can I keep track of important updates?",
    answer:
      "Check the announcements section for new updates. Notifications will alert you about new posts, comments, or important community messages.",
  },
  {
    question: "How can Devdit help me in networking?",
    answer:
      "By interacting with other developers, commenting on posts, and participating in discussions, you can connect with like-minded people and industry experts.",
  },
];

const Faq = () => {
  return (
    <div className="mt-8 md:mt-12">
      <h4 className="text-center text-2xl dark:text-gray-300 mb-6 md:mb-10 sm:text-3xl lg:text-4xl font-semibold font-main">
        Frequently Asked Questions
      </h4>
      <div className="mb-10">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-plus mb-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 bg-gray-100 border border-base-300"
          >
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-main font-semibold">
              {faq.question}
            </div>
            <div className="collapse-content font-main text-sm">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
