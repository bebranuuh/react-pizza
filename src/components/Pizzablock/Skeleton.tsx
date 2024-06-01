import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="270" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="85" />
    <rect x="130" y="410" rx="20" ry="20" width="150" height="48" />
    <rect x="0" y="415" rx="10" ry="10" width="80" height="38" />
    <circle cx="140" cy="125" r="125" />
  </ContentLoader>
);
