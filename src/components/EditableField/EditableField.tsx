import "./EditableField.scss";

import { CloseIconMinimize, DoneIconMinimize } from "assets/svg";
import React, { useCallback, useState } from "react";

import PropTypes from 'prop-types';

const EditableField:any = (props: { value: any, displayValue: any, field: any, mode: string, type: any, onChange: any, children: any }) => {
    const { value, displayValue, field, mode = "updateOnHover", type, onChange, children } = props;
    const [newValue, setNewValue] = useState(value)
    const handleEditChange = (value: any) => { console.log('Change handleEditChange', value); setNewValue(value) }
    const mapChangeEvent: any = {
        input: { onBlur: useCallback((value) => handleEditChange(value), []), placeholder: newValue },
        textarea: { onBlur: useCallback((value) => handleEditChange(value), []), placeholder: newValue },
        date: { onBlur: useCallback((event) => handleEditChange(event.target.value), []) },
        select: { onChange: useCallback((value) => handleEditChange(value), []), value: newValue }
    }

    const updateComponent = children && <children.type {...children.props} {...mapChangeEvent[type]} />
    const elementId = field
    const [isEditable, setIsEditable] = React.useState(false);


    const validateChange = useCallback(() => {
        onChange && onChange(field, newValue)
        setIsEditable(false);

    }, [onChange, field, newValue])

    // WIP work on previous version of the component 
    const cancelChange = useCallback(() => {
        setNewValue(value)
        setIsEditable(false);
    }, [])

    const modifyValue = useCallback(() => {
        setIsEditable(true);
    }, [])

    React.useEffect(() => {
        if (isEditable) {
            // ref to force focus on the input doesn't work with CDK so i have to do this 
            const element: Element | any = document.querySelector(`#EditableField${elementId}`);
            const domElt = element.querySelector(".MuiInput-input")
            if (domElt)
                domElt.focus();
        }
    }, [elementId, isEditable])

    if (mode === "readOnly") {
        return (
            <div className="editable-field" data-test="editable-input-ro">
                <div className="value-uneditable-container">
                    <span className="value-uneditable">  {displayValue}</span>
                </div>
            </div>
        )
    }

    if (mode === "update") {
        return (
            <div className="editable-field" data-test="editable-input-up">
                <div className={
                    (type === "input" ? "editable-input-container" : "") ||
                    (type === "textarea" ? "editable-textarea-container" : "") ||
                    (type === "date" ? "editable-date-container" : "") ||
                    (type === "select" ? "editable-select-container" : "")}>
                    {
                        updateComponent && (updateComponent)
                    }
                </div>
            </div>
        )
    }

    if (mode === "updateOnHover") {
        return (

            <div className="editable-field" id={`EditableField${elementId}`}>
                {
                    isEditable ?
                        (
                            <div className={
                                (type === "input" ? "editable-input-container" : "") ||
                                (type === "textarea" ? "editable-textarea-container" : "") ||
                                (type === "date" ? "editable-date-container" : "") ||
                                (type === "select" ? "editable-select-container" : "")}>
                                {
                                    updateComponent && (updateComponent)
                                }
                                <div className={
                                    (type === "input" ? "icon-container icon-container-input" : "") ||
                                    (type === "textarea" ? "icon-container icon-container-textarea" : "") ||
                                    (type === "date" ? "icon-container icon-container-date" : "") ||
                                    (type === "select" ? "icon-container icon-container-select" : "")}>
                                    <span onClick={validateChange}>
                                        <DoneIconMinimize />
                                    </span>
                                    <span onClick={cancelChange}>
                                        <CloseIconMinimize />
                                    </span>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="value-uneditable-container">
                                <span className="value-uneditable edit-onHover" data-test="editable-input-uh2"
                                    onClick={() => modifyValue()}> {displayValue}</span>
                            </div>
                        )
                }
            </div>
        )
    }
};

EditableField.propTypes = {
    value: PropTypes.any,
    displayValue: PropTypes.any,
    field: PropTypes.any,
    mode: PropTypes.any,
    type: PropTypes.any,
    onChange: PropTypes.any,
    children: PropTypes.any
}

export default EditableField
