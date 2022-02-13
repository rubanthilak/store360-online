import React from "react";
import Dropdown from "@/components/dropdown";

function Home() {

  const test = () => console.log('hello');

  return (
    <section className="container mx-auto">
      <h1>Home Page</h1>
      <Dropdown trigger={'Menu'} closeonclick={true} >
        <h1 onClick={test} >hello worlds</h1>
      </Dropdown>
    </section>
  );
}

export default Home;
