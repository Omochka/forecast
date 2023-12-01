import { Trans, useTranslation} from 'react-i18next';
import { useState } from 'react';

export const Day = ({ minTemp, maxTemp, precipitation, time, humidity, pressure }) => {

    const {t, i18next} = useTranslation();

    const [ttemp, setTtemp] = useState();

    return(
        <div>
            <div>
                <img src={`http://openweathermap.org/img/wn/${precipitation}@2x.png`} alt="weatherIcon.jpg" onClick={() => setTtemp([humidity, pressure])}/>
            </div>
            <div>
                <div className="dayData">
                    <div>{t("params.temperature")}: {Math.round((minTemp + maxTemp) / 2)}</div>
                    <div>{t("params.day")}: {time.slice(5, 10)}</div>
                    <div>{t("params.time")}: {time.slice(-9)}</div>
                </div>
            </div>
            <div>
                {!!ttemp && "Humidity:" + ttemp[0]}
                {!!ttemp && "Pressure:" + ttemp[1]}
            </div>
        </div>
    );
}

