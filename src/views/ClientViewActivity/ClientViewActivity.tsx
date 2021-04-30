import React from 'react';
import {useLocation} from "react-router-dom";
import ClientView2 from "views/ClientView2/ClientView2";
import withActivity from "hoc/withActivity";

const ClientViewActivity = () => {
    const location: any = useLocation();
    const url = location.state.clientData._links.self.href;
    const ClientViewActivity = withActivity(ClientView2, url)
    return (<>{ClientViewActivity}</>)
}

export default ClientViewActivity;
