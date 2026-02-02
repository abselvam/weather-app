import React from "react";

function Navbar() {
  return (
    <div className="w-full h-16 rounded-t-none! flex glass text-white px-14 py-4 justify-between items-center sticky top-0 z-50">
      <div className="flex">
        <h1>CozyWeather</h1>
      </div>
      <div className="flex gap-120">
        <div className="flex gap-14">
          <p>popular cities</p>
          <p>favourite cities</p>
        </div>
        <div>
          <p>celcius farenheit</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
