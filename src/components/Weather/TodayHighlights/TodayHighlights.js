import React from "react";
import Styles from "./index.module.scss";

function TodayHighlights({ data }) {
  // for getting real sunrise and senset time
  let formattedSunriseTime;
  let formattedSunsetTime;

  const sunriseTiming = () => {
    const sunrise = data?.current?.sunrise;
    const timezone = "IST";
    const date = new Date(sunrise * 1000);
    formattedSunriseTime = date.toLocaleTimeString("IST", { timeZone: timezone, timeStyle: "short" });
  };
  sunriseTiming();

  const sunsetTiming = () => {
    const sunrise = data?.current?.sunset;
    const timezone = "IST";
    const date = new Date(sunrise * 1000);
    formattedSunsetTime = date.toLocaleTimeString("IST", { timeZone: timezone, timeStyle: "short" });
  };
  sunsetTiming();

  return (
    <>
      <div className="container">
        <div className={Styles.main}>
          <div className={Styles.main__content}>
            <h5 className={Styles.main__content__h}>
              feels like <i className="fa-solid fa-temperature-high"></i>
            </h5>
            <div className={Styles.main__content__mid}>
              <h3 className={Styles.main__content__mid__h3}>{data?.current?.feels_like}</h3>
            </div>
            <h6 className={Styles.main__content__para}>°C</h6>
          </div>

          <div className={Styles.main__content}>
            <h5 className={Styles.main__content__h}>
              Clouds <i className="fa-solid fa-cloud"></i>
            </h5>
            <div className={Styles.main__content__mid}>
              <h3 className={Styles.main__content__mid__h3}>{data?.current?.clouds}</h3>
            </div>
            <h6 className={Styles.main__content__para}>%</h6>
          </div>

          <div className={Styles.main__content}>
            <h5 className={Styles.main__content__h}>
              Humidity <i className="fa-solid fa-droplet"></i>
            </h5>
            <div className={Styles.main__content__mid}>
              <h3 className={Styles.main__content__mid__h3}>{data?.current?.humidity}</h3>
            </div>
            <p className={Styles.main__content__para}>%</p>
          </div>

          <div className={Styles.main__content}>
            <h5 className={Styles.main__content__h}>
              Pressure <i className="fa-solid fa-meteor"></i>
            </h5>
            <div className={Styles.main__content__mid}>
              <h3 className={Styles.main__content__mid__h3}>{data?.current?.pressure}</h3>
            </div>
            <h6 className={Styles.main__content__para}>hPa</h6>
          </div>

          <div className={Styles.main__content}>
            <h5 className={Styles.main__content__h}>
              Visibility <i className="fa-solid fa-eye"></i>
            </h5>
            <div className={Styles.main__content__mid}>
              <h3 className={Styles.main__content__mid__h3}>{data?.current?.visibility / 1000}</h3>
            </div>
            <h6 className={Styles.main__content__para}>km</h6>
          </div>

          <div className={Styles.main__content}>
            <h5 className={Styles.main__content__h}>
              Sunrise & Sunset <i className="fa-solid fa-cloud-sun"></i>
            </h5>
            <div className={Styles.main__content__mid}>
              <h3 className={Styles.main__content__mid__h3}>{formattedSunriseTime}</h3>
            </div>
            <h6 className={Styles.main__content__para}>{formattedSunsetTime}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodayHighlights;
