import React from "react";
import Avatar from "@/components/avatar";

function Home() {
  return (
    <section className="container mx-auto">
      <h1>Home Page</h1>
      <Avatar
        size="xx-large"
        type="circle"
        imageUrl="https://pbs.twimg.com/profile_images/1479808111841996800/IdTR55g9_400x400.jpg"
        href="/login"
        target="_blank"
      />
    </section>
  );
}

export default Home;
