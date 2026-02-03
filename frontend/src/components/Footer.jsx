import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <div className="w-full flex pl-20 items-center h-14 glass rounded-none! mt-20">
      <h1 className="mr-4">Created by Abhijith Selvam</h1>
      <Link to={"https://github.com/abselvam"} className="hover:underline">
        Github
      </Link>
    </div>
  );
}

export default Footer;
