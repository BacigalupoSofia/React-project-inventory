import { useState, useEffect } from "react";

export default function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    //once page load interval every 1sec to execute setNow
    const id = setInterval(() => setNow(new Date()), 1000);
    //clear the interval when component unmount
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString();
  //convert date object to our local time
  return <span aria-label="live-clock"> {time} </span>;
}
