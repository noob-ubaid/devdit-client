import React from "react";
import { FaCode } from "react-icons/fa6";
const Logo = ({footer}) => {
  return (
    <h1 className={`text-2xl  font-main md:text-3xl ${!footer ? 'text-main' : `text-white`} ml-2 md:ml-0 font-semibold flex items-center gap-2`}>
      <FaCode /> Devdit
    </h1>
  );
};

export default Logo;
