"use client";

import { Helmet } from "react-helmet-async";

const Seo = ({ title, description }) => {
  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? (
        <meta name="description" content={description} />
      ) : null}
    </Helmet>
  );
};

export default Seo;
