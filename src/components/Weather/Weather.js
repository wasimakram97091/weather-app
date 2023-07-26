import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import NextDayForecast from "./NextDayForecast/NextDayForecast";
import HoursDetails from "./hoursDetails/HoursDetails";
import TodayHighlights from "./TodayHighlights/TodayHighlights";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [cityName, setCityName] = useState("");

  let today = new Date();
  let tod = today.toLocaleString("default", { weekday: "short" });

  const [disabled, setDisabled] = useState(false);

  // fetching this API for getting longitude and latitude for our forecast
  const weatherHandler = () => {
    const API_key = "5fa58ce8115be1673526715d1c9ca3f9";
    const myApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
    fetch(myApi)
      .then((response) => {
        return response.json();
      })
      .then((myData) => {
        if (myData.cod === "404") {
          alert("city not found");
        } else {
          getData(myData.coord.lat, myData.coord.lon);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Putting lan and lon in this API as a arguments to get forecast
  async function getData(lat, lon) {
    const API_KEY = "3050828d775a7c1de9a5bc06bf111c01";
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=minutely&units=metric`);
    const data = await res.json();
    setData(data);
    setCityName(city);
  }

  // this API use for getting real address to show as default using lat and lon
  const getCityName = (latitude, longitude) => {
    const geocodingAPI = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    fetch(geocodingAPI)
      .then((response) => response.json())
      .then((data) => {
        const city = data.address.suburb;
        // console.log(data);

        setCity(city);
        setCityName(city);
      })
      .catch((error) => {
        console.error("Error fetching city name:", error);
      });
  };

  // to find our current location / position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getData(position.coords.latitude, position.coords.longitude);
      getCityName(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  // convert data in real time
  let realTime;
  const dat = () => {
    const sunrisee = data?.current?.dt;
    const timezone = "IST";
    const date = new Date(sunrisee * 1000);
    realTime = date.toLocaleTimeString("IST", { timeZone: timezone, timeStyle: "short" });
  };
  dat();

  return (
    <>
      <div className="containerr">
        <div className={Styles.searchContainerWrapper}>
          <div className={Styles.searchContainerWrapper__searchContainer}>
            <div className={Styles.searchContainerWrapper__searchContainer__child1}>
              <div className={Styles.searchContainerWrapper__searchContainer__child1__searchBox}>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="search city"
                  onChange={(event) => {
                    setCity(event.target.value);
                    setDisabled(event.target.value !== "");
                  }}
                />
                <button
                  disabled={!disabled ? "disabled" : ""}
                  type="button"
                  onClick={weatherHandler}
                  className={Styles.searchContainerWrapper__searchContainer__child1__searchBox__btn}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div className={Styles.searchContainerWrapper__searchContainer__child1__icon}>
                {data && <img src={`https://api.openweathermap.org/img/w/${data.current.weather[0].icon}.png`} alt="weather img" />}
              </div>
              <div className={Styles.searchContainerWrapper__searchContainer__child1__cityName}>
                {data && (
                  <h4>
                    <span>
                      <i className="fa-solid fa-location-dot"></i> {cityName}
                    </span>
                  </h4>
                )}
              </div>
              <div className={Styles.searchContainerWrapper__searchContainer__child1__temp}>
                {data && (
                  <h2>
                    {data?.current?.temp}°C <i className="fa-solid fa-temperature-three-quarters"></i>
                  </h2>
                )}
                {data && (
                  <h4>
                    {data?.current?.dew_point}°C <i className="fa-solid fa-temperature-arrow-down"></i>
                  </h4>
                )}
              </div>
              {data && (
                <div className={Styles.searchContainerWrapper__searchContainer__child1__DayTime}>
                  <p>
                    {tod} , {realTime}
                  </p>
                </div>
              )}
              {data && (
                <div className={Styles.searchContainerWrapper__searchContainer__child1__h}>
                  <h2> The Next Day Forecast</h2>
                </div>
              )}
              {data && (
                <div className={Styles.searchContainerWrapper__searchContainer__child1__nxtday}>
                  <div className={Styles.searchContainerWrapper__searchContainer__child1__nxtday__child}>
                    {/* using map for getting next day forecast  */}
                    {data?.daily?.map((item, index) => (
                      <NextDayForecast item={item} key={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {data && (
              <div className={Styles.searchContainerWrapper__searchContainer__child2}>
                <h1 className={Styles.searchContainerWrapper__searchContainer__child2__h}>Today forecast - {data?.current?.weather[0]?.main.toUpperCase()}</h1>
                <div className={Styles.searchContainerWrapper__searchContainer__child2__parentHr}>
                  <div className={Styles.searchContainerWrapper__searchContainer__child2__parentHr__hrDetails}>
                    {/* using map for getting hours details  */}
                    {data?.hourly?.map((item, index) => (
                      <HoursDetails item={item} key={index} />
                    ))}
                  </div>
                </div>

                <h1 className={Styles.searchContainerWrapper__searchContainer__child2__h2}>Today highlights</h1>

                <TodayHighlights data={data} />
              </div>
            )}
          </div>
          <div className={Styles.searchContainerWrapper__caption}>
            <p>"There is always one more bug to fix!"</p>
            <p>
              <i className="fa-solid fa-heart"></i> from Wasim
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
