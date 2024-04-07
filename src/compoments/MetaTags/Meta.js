import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTags = ({ title, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaTags;
