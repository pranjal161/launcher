import './FieldDialog.scss';

import { DxcButton, DxcDialog } from '@dxc-technology/halstack-react';

import React from 'react';

/* interface FieldDialogProps {
    onCancel: Function,
    onSelect: Function,
    children: any,
    render: any
} */

/**
 * @param children: React element rendered as element to click on to display the dialog.
 * @param render: React element rendered as element to display into the dialog.
 */

const FieldDialog:React.FC<any> = ({children, render, dialogTitle, onApply}) => {

    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [selectedValue, setSelectedValue] = React.useState<any>("test");

    const handleCloseClick = ():void => {
        setIsVisible(false);
    }

    const handleChildClick = ():void => {
        setIsVisible(true);
    }

    const handleApply = () => {
        onApply(selectedValue);
        handleCloseClick();
    }

    return (
        <>
            <div onClick={handleChildClick}>
                { children }
            </div>

            {
                isVisible && 
                    <>
                        <DxcDialog overlay={true} onCloseClick={handleCloseClick}>
                            <div className="dialog">
                                <div className="header">
                                    <span>{dialogTitle}</span>
                                </div>
                                
                                <div className='divider'></div>
                                
                                <div className='content'>
                                    { render }
                                </div>
                                
                                <div className='divider'></div>

                                <div className="footer">
                                    <div className="buttons">
                                        <DxcButton
                                            label='Apply'
                                            onClick={handleApply}
                                            margin='xsmall' />
                                        <DxcButton
                                            label='Cancel'
                                            onClick={handleCloseClick}
                                            margin='xsmall' />
                                    </div>
                                </div>
                            </div>
                            
                        </DxcDialog>
                    </>
            }
        </>
    )
}

export default FieldDialog;