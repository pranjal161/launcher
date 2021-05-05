import React, { useContext, useEffect, useState } from 'react'

import baContext from 'context/baContext';
import { getLink } from 'util/functions';
import useAia from "data/hooks/useAia";
import { useSelector } from 'react-redux';

const Coverages = (props: { risks: string }) => {
    const { risks } = props;
    const { fetch, deleteRequest } = useAia();
    // const applicationContext = useContext(ApplicationContext);
    // const [optionRes, setOptionRes] = useState<any>();
    const [optionUrl, setOptionUrl] = useState<string>('');
    const [riskdata, setRiskData] = useState<any>();
    const context = useContext(baContext);
    const baId: string = context.baId ? context.baId : '';
    const optionRes = useSelector((state: any) => (optionUrl !== '' ? state.aia[baId][optionUrl] : {}));

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch(risks).then((riskRes: any) => {
            setRiskData(riskRes.data);
            if (riskRes && getLink(riskRes.data, 'quote_risk:quote_product_component_list-direct')) {
                const url = getLink(riskRes.data, 'quote_risk:quote_product_component_list-direct');
                fetch(url).then((res: any) => {
                    if (res.data && res.data._links.item) {

                        fetch(res.data._links.item.href).then((resp: any) => {
                            setOptionUrl(res.data._links.item.href)
                        })
                    }
                })
            }
        })
    };

    const deleteRisk = () => {
        deleteRequest(riskdata._links.self.href).then();
    }

    return (
        <>
            {riskdata &&
                <div style={{color: 'aquamarine'}} onClick={deleteRisk}>
                    {riskdata && riskdata._links.self.title}
                </div>
            }
            {optionRes && optionRes.data &&

                <div>

                    {optionUrl} = {optionRes.data['quote_option:cost']}
                </div>
            }
        </>
    )
}

export default Coverages;
