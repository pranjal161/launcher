import React, { useEffect, useState } from 'react';

import { DxcAlert } from "@dxc-technology/halstack-react";
import { StyledMessageContainer } from '../../styles/global-style';
import { useTranslation } from "react-i18next";

const Alert = (props: { toastList: any }) => {
    const { toastList } = props;
    const [list, setList] = useState(toastList);
    const { t } = useTranslation();

    useEffect(() => {
        setList(toastList);
    }, [toastList]);

    return (
        <>
            {list && list['messages'] && list['messages'].length > 0 && 
            <StyledMessageContainer onClick={() => setList({})}>
                <div>
                    {
                        list['messages'].map((toast: any, i: number) => <DxcAlert
                            key={i}
                            type={ toast.severity === 'warn' ? 'warning' : toast.severity }
                            mode="inline"
                            inlineText={t(toast.message)}
                            margin="xxsmall"
                        />
                        )
                    }
                </div>
            </StyledMessageContainer>
            }
        </>
    );
};

export default Alert;
