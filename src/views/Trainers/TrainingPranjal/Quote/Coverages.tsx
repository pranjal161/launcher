import React, { useContext, useEffect, useState } from 'react'

import Label from 'components/Label/Label';
import baContext from 'context/baContext';
import { getLink } from 'util/functions';
import useAia from "data/hooks/useAia";
import { useSelector } from 'react-redux';

const Coverages = (props: { risks: string }) => {
    const { risks } = props;
    const { fetch, deleteRequest } = useAia();
    const [coverageUrl, setCoverageUrl] = useState<string>('');
    const [riskdata, setRiskData] = useState<any>();
    const context = useContext(baContext);
    const baId: string = context.baId ? context.baId : '';
    const coverageRes = useSelector((state: any) => (coverageUrl !== '' ? state.aia[baId][coverageUrl] : {}));

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        //GET on risk of quote
        fetch(risks).then((riskRes: any) => {
            setRiskData(riskRes.data);
            if (riskRes && getLink(riskRes.data, 'quote_risk:quote_product_component_list-direct')) {
                const url = getLink(riskRes.data, 'quote_risk:quote_product_component_list-direct');
                // GET on covergaes collection
                fetch(url).then((res: any) => {
                    if (res.data && res.data._links.item) {
                        // GET on coverage item  
                        fetch(res.data._links.item.href).then((resp: any) => {
                            setCoverageUrl(res.data._links.item.href)
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
                <div style={{ color: 'red' }} onClick={deleteRisk}>
                    Risk inside Quote :  {riskdata && riskdata._links.self.title}
                </div>
            }
            {coverageRes && coverageRes.data &&
                (
                    <>
                        <div style={{ color: 'green' }}>Coverage inside this risk:</div>
                        {/* <div>
                            <Label label="OPTIONS COST" propertyName="quote_option:cost" data={coverageRes.data} />
                        </div> */}
                        <div>
                            <Label label="COVERAGE START DATE" propertyName="quote_product_component:start_date" data={coverageRes.data} />
                        </div>
                        <span> COVERAGE URL: {coverageUrl} </span>
                    </>
                )}
        </>
    )
}

export default Coverages;
