import React from "react";

function NotFound() {
  return (
    <div>
      <div class="bg-indigo-900 relative overflow-hidden h-screen">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/12/998/379/blue-neon-pastel-blur-wallpaper-thumb.jpg"
          alt=""
          class="absolute h-full w-full object-cover"
        />
        <div class="inset-0 bg-black opacity-25 absolute"></div>
        <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
          <div class="w-full font-mono flex flex-col items-center relative z-10">
            <h1 class="font-extrabold text-3xl text-center text-white leading-tight mt-4">
              sorry, the page you are looking for is doesn't exist or missing
            </h1>
            <button class="font-extrabold text-3xl text-center text-white leading-tight mt-4">
              please go to home page
            </button>
            <p class="font-extrabold text-8xl my-44 text-white animate-bounce">
              404
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
