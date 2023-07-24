import React from "react";
import Styles from "./index.module.scss";

function HoursDetails({ item }) {
  //  for getting real time
  let realTime;
  const dat = () => {
    const sunrisee = item.dt;
    const timezone = "IST";
    const date = new Date(sunrisee * 1000);
    realTime = date.toLocaleTimeString("IST", { timeZone: timezone, timeStyle: "short" });
  };
  dat();
  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.main__content}>
          <div className={Styles.main__content__time}>
            <p className={Styles.main__content__time__p}>{realTime}</p>
          </div>
          <div className={Styles.main__content__icon}>{<img src={`https://api.openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather img" />}</div>
          <div className={Styles.main__content__temp}>
            <h6>{item.weather[0].description}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default HoursDetails;
