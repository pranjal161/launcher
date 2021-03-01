import React from 'react';
import ContractTable from '../../components/contractTable/contractTable';
import { AppConfig } from '../../config/appConfig';

const HomePage = () => {
    const url = AppConfig.hostUrl.defaultHostUrl + 'contracts?_num=5';
    return (
        <>
           <ContractTable contractUrl={url}/>
        </>
    );

}

export default HomePage;