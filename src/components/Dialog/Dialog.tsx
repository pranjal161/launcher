import "./Dialog.scss";

import { DxcButton, DxcDialog } from '@dxc-technology/halstack-react';

import React from 'react';

interface IDialog {
    children: any,
    title?: any,
    onApply: Function,
    onCancel: Function,
    isOpen: boolean,
    closeIconIsVisible: boolean,
    actionsAreVisible?: boolean
}

{/**
 * @definition Create a dialog component.
 * @param children : Child element passed in Dialog Component.
 * @param title : Title component to display
 * @param isOpen : Define if the Dialog is visible or not.
 * @param closeIconIsVisible : Define if the close icon, at top right corner, is visible or not (working as cancel button).
 * @param onApply : Execute specific code when clicking on apply button.
 * @param onCancel : Execute specific code when clicking on cancel button.
 * @param actionsAreVisible : Define if bottom buttons are rendered. Otherwise, data should be controlled from outside.
*/}
const Dialog:React.FC<IDialog> = ({children, title, isOpen, closeIconIsVisible = false, onApply, onCancel, actionsAreVisible = true}: IDialog) => {

    const [value, setValue] = React.useState<any>(null);

    const handleCloseClick = () => {
        onCancel();
        setValue(null);
    }

    const handleApply = () => {
        onApply(value);
        setValue(null);
    }

    const Content = () => {
        if (actionsAreVisible) {
            return React.cloneElement(children, {onChange: setValue});
        } else {
            return children;
        }
    }

    const Title = () => title;

    return (
        <>
            {
                isOpen && 
                    <div data-test="component-dialog">
                        <DxcDialog isCloseVisible={closeIconIsVisible} onCloseClick={() => onCancel()}>
                            <div className="dialog">
                                {
                                    title &&
                                        <>
                                            <div className="header">
                                                <Title data-test="component-title"/>
                                            </div>
                                            
                                            <div className="divider"></div>
                                        </>
                                }
                                
                                <div className="content">
                                    <Content data-test="component-content" />
                                </div>

                                {
                                    actionsAreVisible &&
                                        <>
                                            <div className="divider"></div>

                                            <div className="footer">
                                                <div className="buttons" data-test="component-actions">
                                                    
                                                    <DxcButton
                                                        data-test="component-button-apply"
                                                        disabled={value === null}
                                                        mode="primary"
                                                        label="Apply"
                                                        onClick={handleApply}
                                                        margin="xsmall" />

                                                    <DxcButton
                                                        data-test="component-button-cancel"
                                                        mode="secondary"
                                                        label="Close"
                                                        onClick={handleCloseClick}
                                                        margin="xsmall" />
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>
                        </DxcDialog>
                    </div>
            }
        </>
    )
}

export default Dialog;