import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/notfound");
  }, []);

  return (
    <div className="bg-sky-950 relative overflow-hidden min-h-screen">
      <div className="inset-0 bg-black opacity-25 absolute"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="w-full font-mono flex flex-col items-center relative z-10">
          <h5 className="text-xs md:text-xl lg:text-2xl text-center text-white leading-tight mt-4">
            sorry, the page you were looking for does not exist
          </h5>
          <p className="font-extrabold text-4xl md:text-6xl lg:text-8xl my-44 text-yellow-700 animate-bounce">
            404
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
