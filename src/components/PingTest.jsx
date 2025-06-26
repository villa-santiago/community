import { useEffect, useState } from "react";

function PingTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5005/api/ping")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Connection error:", err));
  }, []);

  return <div>{message}</div>;
}

export default PingTest;
