import React, { useState } from "react";

import {DxcDialog} from '@dxc-technology/halstack-react';
import axios from "axios";
import { formatValue } from "util/functions";

const Documents = (props: { documents: any; }) => {
    const {documents } = props;
    const [docOpen, setOpenDoc] = useState(false);
    const [content, setContent] = useState<string>();
    const header = {
        'Content-Type': 'application/pdf',
        'Accept': 'application/pdf'
    }
    const handleClick = (document: any) => {
        axios.get(document.url, { headers: header, responseType: 'blob' }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], {type: document.type}));
            setContent(url);
            setOpenDoc(true)
        });
    }

    const onClickDialog = () => {
        setOpenDoc(false);
    };

    return (
        <div>
            <li className={"list-group"}>
                {documents && Object.values(documents).map((document: any, index) => (
                    <div key={index} onClick={() => handleClick(document)}
                        className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="mx-auto text-info">
                            <small>{formatValue(document.receivedDate, 'date')}</small>
                        </div>
                        <div>{document.name}</div>
                    </div>
                ))}
            </li>
            {docOpen && content && (
                <DxcDialog padding="medium" onCloseClick={onClickDialog}>
                    <iframe src={content} id="doc-preview" />
                </DxcDialog>
            )}
        </div> 
    );
}

export default Documents;
