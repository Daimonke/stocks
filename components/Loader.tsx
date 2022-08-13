import React from "react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={`loader m-auto mt-12 ${className}`}>
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
