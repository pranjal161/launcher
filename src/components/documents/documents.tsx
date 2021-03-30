import React, { useEffect, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from "context/applicationContext";
import { DxcCard } from '@dxc-technology/halstack-react';
import Document from 'assets/description.png';
import { getDescriptionValue } from "util/functions";
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import { getDescriptionValue } from '../../util/functions';
import { useTranslation } from 'react-i18next';

const Documents = (props: { outputDoc: string; receivedDoc: string }) => {
    const applicationContext = useContext(ApplicationContext);
    const [outputDocData, setOutputDocData] = useState<undefined | any>();
    const { t } = useTranslation();
    const [receivedDocData, setReceivedDocData] = useState<undefined | any>();

    useEffect(() => {
        getDocuments();
    }, [applicationContext, props.outputDoc, props.receivedDoc]);

    const getDocuments = () => {
        if (props.outputDoc) {
            axios.get(props.outputDoc, { headers: applicationContext.headers }).then((response) => {
                if (response && response.data._links && response.data._links.item) {
                    if (!Array.isArray(response.data['_links']['item'])) {
                        response.data['_links']['item'] = [response.data['_links']['item']];
                    }
                    setOutputDocData(response.data);
                }
            });
        }
        if (props.receivedDoc) {
            axios.get(props.receivedDoc, { headers: applicationContext.headers }).then((response) => {
                if (response && response.data._links && response.data._links.item) {
                    if (!Array.isArray(response.data['_links']['item'])) {
                        response.data['_links']['item'] = [response.data['_links']['item']];
                    }
                    setReceivedDocData(response.data);
                }
            });
        }
    };
    return (
        <>
            <h4>{t('_SENT_DOCUMENTS')}</h4>
            <div className="row">
                {outputDocData &&
                    outputDocData['_links'] &&
                    outputDocData['_links']['item'] &&
                    outputDocData['_links']['item'].map((item: any, index: number) => (
                        <div key={index} className="col-4 document-tile">
                            <DxcCard
                                // onClick={openDocument(item)}
                                imageSrc={Document}
                                imageCover={false}
                                imageBgColor="White"
                                margin="xxsmall"
                                padding="xxsmall"
                            >
                                <Tooltip title={item.title}>
                                    <div
                                        style={{
                                            fontSize: 'smaller',
                                            //can't add tooltip w/o external package
                                            maxWidth: '250px',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            width: '250px',
                                            overflow: 'hidden',
                                            wordBreak: 'break-all',
                                        }}
                                    >
                                        {item.title}
                                        <p>
                                            {t('_STATUS')} :{' '}
                                            {getDescriptionValue(
                                                item.summary['output_document:status'],
                                                'output_document:status',
                                                outputDocData,
                                            )}
                                            <br />
                                            {t('_CHANNEL')} :{' '}
                                            {getDescriptionValue(
                                                item.summary['distribution_channel'],
                                                'distribution_channel',
                                                outputDocData,
                                            )}
                                        </p>
                                    </div>
                                </Tooltip>
                            </DxcCard>
                        </div>
                    ))}
            </div>

            <h4>{t('_RECEIVED_DOCUMENTS')}</h4>
            <div className="row">
                {receivedDocData &&
                    receivedDocData['_links'] &&
                    receivedDocData['_links']['item'] &&
                    receivedDocData['_links']['item'].map((item: any, index: number) => (
                        <div key={index} className="col-4 document-tile">
                            <DxcCard
                                // onClick={openDocument(item)}
                                imageSrc={Document}
                                imageCover={false}
                                imageBgColor="White"
                                margin="xxsmall"
                                padding="xxsmall"
                            >
                                <Tooltip title={item.title}>
                                    <div
                                        style={{
                                            fontSize: 'smaller',
                                            //can't add tooltip w/o external package
                                            maxWidth: '250px',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            width: '250px',
                                            overflow: 'hidden',
                                            wordBreak: 'break-all',
                                        }}
                                    >
                                        {item.title}
                                        <p>
                                            {t('_RECIEVED_DOCUMENTS')} :{' '}
                                            {getDescriptionValue(
                                                item.summary['information_receipt:type_label'],
                                                'information_receipt:type_label',
                                                receivedDocData,
                                            )}
                                            <br />
                                            {t('_PERSON')} :{' '}
                                            {getDescriptionValue(
                                                item.summary['information_receipt_subject_label'],
                                                'information_receipt_subject_label',
                                                receivedDocData,
                                            )}
                                            <br />
                                            {t('_DESCRIPTION')} :{' '}
                                            {getDescriptionValue(
                                                item.summary['information_receipt:free_text'],
                                                'information_receipt:free_text',
                                                receivedDocData,
                                            )}
                                            <br />
                                            {t('_MEDIA_TYPE')} :{' '}
                                            {getDescriptionValue(
                                                item.summary['information_receipt:type'],
                                                'information_receipt:type',
                                                receivedDocData,
                                            )}
                                            <br />
                                            {t('_RECEIVED_DATE')} :{' '}
                                            {getDescriptionValue(
                                                item.summary['information_receipt:received_date'],
                                                'information_receipt:received_date',
                                                receivedDocData,
                                            )}
                                        </p>
                                    </div>
                                </Tooltip>
                            </DxcCard>
                        </div>
                    ))}
            </div>

            {/*   TODO
            {isDialogVisible && (
                <DxcDialog padding="medium">
                    <label className="col-md-12 labelPDF" id="label-doc"> selectedDoclabel</label>
                    {printmode === 'xml' && (<pre className="preXML" id="xml-doc">content</pre>)}
                    {/* {printmode === 'pdf' && (<iframe [src]="content" type="application/pdf" id="pdf-doc" class="framePDF"></iframe>)} 

        </DxcDialog>
    )
} */}
        </>
    );
};

export default Documents;
