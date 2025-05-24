import React from "react";

function PurpleBackground({ children }) {
  return (
    <div className="container-fluid bg-gradient-purple" style={{ minHeight: '100vh' }}>
        {children}
    </div>
  );
}

export default PurpleBackground;
