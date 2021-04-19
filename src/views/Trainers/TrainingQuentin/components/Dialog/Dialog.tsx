import "./Dialog.scss";

import { DxcButton, DxcDialog } from '@dxc-technology/halstack-react';
import React from 'react';

interface IDialog {
    children: any,
    title: string,
    onApply: Function,
    onCancel: Function,
    isOpen: boolean,
    closeIconIsVisible: boolean
}

const Dialog:React.FC<IDialog> = ({children, title, isOpen, closeIconIsVisible = false, onApply, onCancel}: IDialog) => {

    const [value, setValue] = React.useState<any>(null);

    const handleCloseClick = () => {
        onCancel();
        setValue(null);
    }

    const handleApply = () => {
        onApply(value);
        setValue(null);
    }

    const Content = () => React.cloneElement(children, {onChange: setValue});

    return (
        <>
            {
                isOpen && 
                    <>
                        <DxcDialog isCloseVisible={closeIconIsVisible} onCloseClick={() => onCancel()}>
                            <div className="dialog">
                                <div className="header">
                                    <h5>{title}</h5>
                                </div>
                                
                                <div className="divider"></div>
                                
                                <div className="content">
                                    <Content />
                                </div>
                                
                                <div className="divider"></div>

                                <div className="footer">
                                    <div className="buttons">
                                        
                                        <DxcButton
                                            disabled={value === null}
                                            mode="primary"
                                            label="Apply"
                                            onClick={handleApply}
                                            margin="xsmall" />

                                        <DxcButton
                                            mode="secondary"
                                            label="Close"
                                            onClick={handleCloseClick}
                                            margin="xsmall" />
                                    </div>
                                </div>
                            </div>
                            
                        </DxcDialog>
                    </>
            }
        </>
    )
}

export default Dialog;