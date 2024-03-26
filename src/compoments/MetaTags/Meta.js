import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTags = ({ title, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default MetaTags;
