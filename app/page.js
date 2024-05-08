"use client";

import Image from "next/image";
import styles from "./page.module.css";
import search from "./assets/search.svg";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86635fd29966e41830e4cc8e9670aa79&units=metric`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  console.log(data);

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.search}>
          <input
            className={styles.search_bar}
            placeholder="Search your city name"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>
            <Image src={search} alt="search" width={24} height={24} />
          </button>
        </div>
        <div className={styles.weather}>
          {data.name && <p>City: {data.name}</p>}
          {data.main && <p>Temperature: {data.main.temp}</p>}
          {data.main && <p>Pressure: {data.main.pressure}</p>}
          {data.main && <p>Humidity: {data.main.humidity}</p>}
          {data.main && <p>Sea Level: {data.main.sea_level}</p>}
          {data.wind && <p>Wind Speed: {data.wind.speed}</p>}
        </div>
      </div>
    </main>
  );
}
