import React from "react";
import Styles from "./index.module.scss";

function NextDayForecast({ item }) {
  // console.log(item);

  let realDate;
  const dat = () => {
    const sunrisee = item?.dt;
    const timezone = "IST";
    const date = new Date(sunrisee * 1000);
    realDate = date.toLocaleDateString("IST", { dateStylee: timezone, dateStyle: "short" });
  };
  dat();
  return (
    <>
      {item && (
        <div className={Styles.main}>
          <div className={Styles.main__content}>
            <div className={Styles.main__content__icon}>
              {" "}
              <img src={`https://api.openweathermap.org/img/w/${item?.weather[0]?.icon}.png`} alt="weather img" />
            </div>
            <div className={Styles.main__content__dayName}>
              <h5>{realDate}</h5>
              <h6 className={Styles.main__content__dayName_p}>{item?.weather[0].main}</h6>
            </div>
            <div className={Styles.main__content__temp}>
              <h2>{item?.temp?.max} °C</h2>
              <h5>{item?.temp?.min} °C</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NextDayForecast;
