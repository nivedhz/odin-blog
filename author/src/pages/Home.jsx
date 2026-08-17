import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
      })
      .catch((err) => console.error(err));
  }, []);
  return <h1>{data}</h1>;
};

export default Home;
