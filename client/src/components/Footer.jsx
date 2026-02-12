import React from "react";

const Footer = () => {
  return (
    <div>
      <p className="text-center text-sm text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} SkillNest. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
