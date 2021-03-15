import { DxcAlert } from "@dxc-technology/halstack-react";
import React, { useState, useEffect } from 'react';
import { StyledMessageContainer } from '../../styles/global-style';

const Alert = (props: { toastList: any }) => {
    const { toastList } = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList(toastList);
    }, [toastList]);

    useEffect(() => {}, [toastList, list]);

    return (
        <>
          {list && !list.consistent && list['messages'] && list['messages'].length > 0 && 
            <StyledMessageContainer onClick={() => setList({})}>
              <div>
                {
                    list['messages'].map((toast: any, i: number) =>     
                      <DxcAlert
                        key={i}
                        type={ toast.severity === 'warn' ? 'warning' : toast.severity }
                        mode="inline"
                        inlineText={toast.message}
                        margin="xxsmall"
                      />
                    )
                }
              </div>
            </StyledMessageContainer>
          }
        </>
    );
}

export default Alert;