import React from "react";

function PurpleBackground({ children }) {
  return (
    <div className="container-fluid 100vh bg-gradient-purple ">
        {children}
    </div>
  );
}

export default PurpleBackground;
