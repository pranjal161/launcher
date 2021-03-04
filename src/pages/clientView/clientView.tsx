import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DxcTabs } from "@dxc-technology/halstack-react";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from "../../context/applicationContext";
import ContractRoles from "../../components/contractRoles/contractRoles";
import ClaimList from "../../components/claimList/claimList";
const ClientView = () => {
  const location: any = useLocation();
  const { t } = useTranslation();
  const [clientData, setClientData] = useState<undefined | any>();
  const [activeTab, setActiveTab] = useState(0);
  const applicationContext = useContext(ApplicationContext);
  const clientUrl = location.state.clientData._links.self.href;
  const onTabClick = (i: number) => {
    setActiveTab(i);
  };

  useEffect(() => {
    setClientData(location.state.clientData);
  }, [applicationContext]);

  function ClientBanner() {
    return (
      <div>
        {clientData["person:client_number"]}
        {clientData["organization:client_number"]}
      </div>
    );
  }

  return (
    <>
      {clientData && <ClientBanner />}
      <div>
        <DxcTabs
          activeTabIndex={activeTab}
          onTabClick={onTabClick}
          tabs={[
            { label: t("_CONTRACT_ROLES") },
            { label: t("_FINANCIAL") },
            { label: t("_ADDRESS") },
            { label: t("_CLAIM") },
            { label: t("_DOCUMENTS") },
          ]}
        ></DxcTabs>
        {activeTab === 0 && clientUrl && (
          <div>
            <ContractRoles clientUrl={clientUrl} />
          </div>)}
        {activeTab === 1 && <div>{t("_FINANCIAL")}</div>}
        {activeTab === 2 && <div>{t("_ADDRESS")}</div>}
        {activeTab === 3 && clientUrl && <ClaimList clientUrl={clientUrl} />}
        {activeTab === 4 && <div>{t("_DOCUMENTS")}</div>}
      </div>
    </>
  );
};
export default ClientView;
