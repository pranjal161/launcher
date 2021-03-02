import DXCLogo from "../../assets/dxc_logo_wht.png";
// import lang from '../../assets/language-24px.svg';
import i18n from "../../i18n";
import { DxcHeader, DxcDropdown } from "@dxc-technology/halstack-react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const { t } = useTranslation();

  const langs = [
    {
      value: "fr",
      label: "FR",
    },
    {
      value: "en",
      label: "EN",
    },
    {
      value: "nl",
      label: "NL",
    },
  ];

  const changeLang = (value: string | undefined) => {
    console.log(value);
    i18n.changeLanguage(value);
  };

  const goToHome = () => {
    history.push("/home");
  };

  return (
    <>
      <DxcHeader
        logoSrc={DXCLogo}
        onClick={goToHome}
        padding={{ right: "xsmall" }}
        content={
          <>
            <DxcDropdown
              options={langs}
              onSelectOption={changeLang}
              label={t("_LANGUAGE")}
              margin="xxsmall"
              padding="xxsmall"
            ></DxcDropdown>
          </>
        }
      />
    </>
  );
};

export default Header;
