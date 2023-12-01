import React, { Suspense, useEffect, useState } from 'react';
import { Trans, useTranslation} from 'react-i18next';
import ReactDOM from 'react-dom';
import { Day } from './Day/Day'
import './i18next'
import { NavMenu } from './NavMenu/NavMenu'
import ThemeColor from './ThemeColor/ThemeColor'
import GeneralStyle from "./GeneralStyle.css"


const App = () => {

  //https://api.openweathermap.org/data/2.5/forecast?q=Narva&appid=a9807ccf3dab4637f373e66d620d97f2&cnt=5
  
  const APIKEY = 'a9807ccf3dab4637f373e66d620d97f2';

  //basically contains all the info about weather, e.g temp, time etc
  const [generalInfo, setGeneralInfo] = useState();
  //contains info from input field(city name)
  const [cityName = "Narva", setCityName] = useState();

  const [firstDay = 0, setFirstDay] = useState();
  const [lastDay = 5, setLastDay] = useState();

  const {t, i18next} = useTranslation();

  


  useEffect(() => {
    if(cityName == ''){
      console.log('asd');
      setCityName("Narva");
    }
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}&count=5&units=metric&lang=ru`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setGeneralInfo(res.list.map(hour => {
        return{
          minTemp: hour.main.temp_min,
          maxTemp: hour.main.temp_max,
          precipitation: hour.weather.map(iee => {return iee.icon}),
          time: hour.dt_txt,
          humidity: hour.main.humidity,
          pressure: hour.main.pressure,
        }
      }))
    })
    .catch((error) => {
       setGeneralInfo(null);
       setCityName(t("params.notFound"));
      })
  }, [cityName]);

  //methods for day carousel
  const ChangeDayForward = () => {
    if(lastDay < 40){
      setFirstDay(firstDay + 5);
      setLastDay(lastDay + 5);
    }
  }

  const ChangeDayBackward = () => {
    if(firstDay > 0) {
      setFirstDay(firstDay - 5);
      setLastDay(lastDay - 5);
    }
  }

  const CheckCityLength = (e) => {
    if((e.target.value).trim().length > 1){
      return true;
    }
  }

  const CheckEnterKey = (e) => {
    if(e.key === "Enter"){
      setCityName(e.target.value);
    }
  }




  return(
    <div>

      <div className="cityName">
        <h1>{cityName}</h1>
      </div>

      <div className="main">
        <div className="arrow l" onClick={() => ChangeDayBackward()}/>

        {!!generalInfo && generalInfo.slice(firstDay, lastDay).map((i, index) => (
          <div key={index} className="day">
            <Day minTemp={i.minTemp} 
              maxTemp={i.maxTemp} 
              precipitation={i.precipitation} 
              time={i.time} 
              humidity={i.humidity} 
              pressure={i.pressure}
            />
          </div>
        ))}

        <div className="arrow r" onClick={() => ChangeDayForward()}/>
      </div>
      
      <div>
        <input  className="cityName userInput" onBlur={e => CheckCityLength(e) ? setCityName(e.target.value) : ''} onKeyDown={e => CheckCityLength(e) ? CheckEnterKey(e) : ''}></input>
      </div>

    </div>
  );
};

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <div className="navMenu">
      <NavMenu/>
      <ThemeColor/>
    </div>
    <App />
  </Suspense>,

  document.getElementById('root')
);
