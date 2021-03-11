import React, { useEffect, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from "../../context/applicationContext";
import { DxcCard } from '@dxc-technology/halstack-react';
import Document from '../../assets/description.png';
import { getDescriptionValue } from "../../util/functions";
import Tooltip from '@material-ui/core/Tooltip';
import axios from "axios";

const Documents = (props: { outputDoc: string }) => {
    const applicationContext = useContext(ApplicationContext);
    const [outputDocData, setOutputDocData] = useState<undefined | any>();
    const { t } = useTranslation();


    useEffect(() => {
        getDocuments();
    }, [applicationContext, props.outputDoc])

    const getDocuments = () => {
        axios.get(props.outputDoc, { headers: applicationContext.headers}).then(response => {
            if (response && response.data._links && response.data._links.item) {
                if (!Array.isArray(response.data['_links']['item'])) {
                    response.data['_links']['item'] = [response.data['_links']['item']];
                }
                setOutputDocData(response.data);
            }
        })
    }
    return (
        <>
            <h4>{t("_DOCUMENTS")}</h4>
            <div className="row">
                {outputDocData && outputDocData['_links'] && outputDocData['_links']['item'] && outputDocData['_links']['item'].map((item: any) => (
                    <div className="col-4 document-tile">
                        <DxcCard
                            // onClick={openDocument(item)}
                            imageSrc={Document}
                            imageCover={false}
                            imageBgColor="White"
                            margin="xxsmall"
                            padding="xxsmall"
                        >
                            <Tooltip title= {item.title}>
                            <div style={{
                                fontSize: "smaller",
                                //can't add tooltip w/o external package
                                maxWidth: "250px",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: "250px",
                                overflow: "hidden",
                                wordBreak: "break-all"
                            }}>
                                {item.title}
                                <p>
                                    {t('_STATUS')} : {getDescriptionValue(item.summary['output_document:status'], 'output_document:status', outputDocData)}
                                    <br />
                                    {t('_CHANNEL')} : {getDescriptionValue(item.summary['distribution_channel'], 'distribution_channel', outputDocData)}
                                </p>

                            </div>
                            </Tooltip>
                            
                        </DxcCard>
                    </div>
                ))
                }
            </div>
            { /*   TODO
            {isDialogVisible && (
                <DxcDialog padding="medium">
                    <label className="col-md-12 labelPDF" id="label-doc"> selectedDoclabel</label>
                    {printmode === 'xml' && (<pre className="preXML" id="xml-doc">content</pre>)}
                    {/* {printmode === 'pdf' && (<iframe [src]="content" type="application/pdf" id="pdf-doc" class="framePDF"></iframe>)} 

        </DxcDialog>
    )
} */ }



        </>
    )
}

export default Documents;