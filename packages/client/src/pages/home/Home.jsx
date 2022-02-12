import React, {useState} from "react";
import DatePicker from "@/components/date-picker";

function Home() {

  let hintText= "Select Date";
  let [date,setDate] =useState(null)

  const test = (timestamp) => {
    setDate(new Date(timestamp))
  }
  
  return (
    <section className="container mx-auto">
      <h1>Home Page</h1>
      <DatePicker onChange={test} date={date} hintText={hintText} />
    </section>
  );
}

export default Home;
