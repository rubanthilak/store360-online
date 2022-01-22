import React from "react";
import { Link, withRouter  } from "react-router-dom";
import Logo from "@/components/common/Logo";

function TopBar(props) {
  const { location } = props;
  var urlToHideTopBar = ["/login", "/signup", "/forgot-password", "/reset-password"];
  if(urlToHideTopBar.indexOf(location.pathname) > -1)
  {
    return (    
      <div className="py-4 shadow-md sticky top-0 w-full bg-white z-10">
        <div className="container mx-auto flex justify-between">
          <Logo/>
          <div className="flex gap-8">
            <Link to="/">About</Link>
            <Link to="/">Contact Us</Link>
          </div>
        </div>
      </div>
      );
  }
  return (    
    <div className="py-4 shadow-md sticky top-0 w-full bg-white z-10">
      <div className="container mx-auto flex justify-between">
        <Logo/>
        <div className="flex gap-8">
          <Link to="/">Profile</Link>
          <Link to="/">Wishlist</Link>
          <Link to="/">Bag</Link>
        </div>
      </div>
    </div>
    )
}


export default withRouter(TopBar);
