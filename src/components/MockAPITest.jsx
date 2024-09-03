import { useState, useEffect } from "react";

export default function MockAPITest() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/posts').then(res => res.json()).then(res => setData(res.data));
  }, []);
  return (
    <div>
      <h1 className="text-center">Mock Response Data: { data }</h1>
    </div>
  )
}