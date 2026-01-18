import React from "react";

const DescriptoinContent = ({ course }) => {
  const description =
    course?.description || course?.summary || "No description available.";
  return (
    <div>
      <h4
        className="text-size-26 font-bold text-blackColor dark:text-blackColor-dark mb-15px !leading-14"
        data-aos="fade-up"
      >
        Course Overview
      </h4>
      <p
        className="text-lg text-darkdeep4 mb-5 !leading-30px"
        data-aos="fade-up"
      >
        {description}
      </p>
    </div>
  );
};

export default DescriptoinContent;
