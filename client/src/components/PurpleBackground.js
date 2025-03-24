import React from "react";


function PurpleBackground({ children }) {
  return (
    <div className="bg-gradient-purple ">
        {children}
    </div>
  );
}

export default PurpleBackground;
