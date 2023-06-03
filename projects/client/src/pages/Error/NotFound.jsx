import React from "react";

function NotFound() {
  return (
    <div className="bg-indigo-900 relative overflow-hidden min-h-screen">
      <img
        src="https://c4.wallpaperflare.com/wallpaper/12/998/379/blue-neon-pastel-blur-wallpaper-thumb.jpg"
        alt=""
        className="absolute h-full w-full object-cover"
      />
      <div className="inset-0 bg-black opacity-25 absolute"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="w-full font-mono flex flex-col items-center relative z-10">
          <h5 className="text-xs md:text-xl lg:text-2xl text-center text-white leading-tight mt-4">
            sorry, the page you are looking for doesn't exist
          </h5>
          <button className="text-xs md:text-xl lg:text-2xl text-center text-white leading-tight mt-4">
            please go to the home page
          </button>
          <p className="font-extrabold text-4xl md:text-6xl lg:text-8xl my-44 text-white animate-bounce">
            404
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
