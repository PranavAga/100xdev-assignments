"use client"

import { Heading } from "@/components/Heading";
import { useState } from "react";

export default function Interactive() {
  const welcomeMessage = "Welcome to Interactive Page";

  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-1/2 items-start    space-y-4 ">
        <Heading content={welcomeMessage}/>
        <p>
          This route features a count button that demonstrates the power of client-side interactivity in Next.js. Click the button and see the count go up! This interactive feature is powered by the "use client" directive in Next.js, which allows this component to be rendered on the client-side.
        </p>
        <button onClick={()=>{
          setCount(c=>{
            return c + 1;
          })
        }} className=" border-2 rounded-md border-black p-1">
          count is {count}
        </button>
      </div>
    </div>
  );
}
