import React from "react";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="py-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <h1>LOGO</h1>
        <div className="flex gap-8">
          <Link>Profile</Link>
          <Link>Wishlist</Link>
          <Link>Bag</Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
