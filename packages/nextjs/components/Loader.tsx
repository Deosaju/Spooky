// components/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;