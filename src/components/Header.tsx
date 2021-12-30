import React from "react";

export const Header: React.FC<{ isHome: boolean }> = ({ isHome }) => {
  if (isHome) return <React.Fragment />;
  return (
    <div className="w-full flex flex-row">
      <ul>
        <li>Reading</li>
        <li>Thoughts</li>
      </ul>
    </div>
  );
};
