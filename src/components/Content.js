// Content.js
import React from "react";
import "../css/content.css";

const Content = ({ sidebarWidth }) => {
  return (
    <div className="content" style={{ marginLeft: sidebarWidth }}>
      {/* Votre contenu de page ici */}
    </div>
  );
};

export default Content;
