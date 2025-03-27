import React from "react";

function PurpleBackground({ children }) {
  return (
    <div className="container-fluid 100vh bg-gradient-purple" style={{ minHeight: '100vh' }}>
        {children}
    </div>
  );
}

export default PurpleBackground;
