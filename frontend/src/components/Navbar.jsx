import { Link } from "react-router";

function Navbar() {
  return (
    <div className="w-full h-16 rounded-t-none! flex glass text-white px-14 py-4 justify-between items-center sticky top-0 z-50">
      <div className="flex">
        <h1 className="font-semibold">CozyWeather</h1>
      </div>
      <div className="flex gap-120">
        <div className="flex gap-14">
          <Link to={"/"}>
            <p className="font-semibold hover:underline">Popular cities</p>
          </Link>
          <p className="font-semibold hover:underline">favourite cities</p>
        </div>
        <div>
          <p className="ml-20"></p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
