import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height={60}
      width={60}
      color="#5e96fc"
      visible={true}
      secondaryColor="#5e96fc"
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  );
};

export default Loader;
