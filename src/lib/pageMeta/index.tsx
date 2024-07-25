import React from "react";
import { Helmet } from "react-helmet";
interface PageMetaProps {
  ogTitle: string;
  description?: string;
  imageUrl: string;
  [key: string]: any;
  title?: string;
}
const PageMeta = ({
  ogTitle,
  description,
  imageUrl,
  mainTitle,
  title,
  ...rest
}: PageMetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {Object.keys(rest).map((key) => (
        <meta key={key} {...rest[key]} />
      ))}
    </Helmet>
  );
};

export default PageMeta;
