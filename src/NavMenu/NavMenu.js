import { Trans, useTranslation} from 'react-i18next';
import './NavMenu.css'

export const NavMenu = () => {
    const {t, i18n} = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return(
        
        <div className="languageButtons">
            <button className="languageButton" onClick={() => changeLanguage("en")}>EN</button>
            <button className="languageButton" onClick={() => changeLanguage("ru")}>RU</button>
            <button className="languageButton" onClick={() => changeLanguage("et")}>ET</button>
            <hr/>
        </div>
    );
}