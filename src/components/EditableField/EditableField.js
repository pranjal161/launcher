import "./EditableField.scss";

import {CloseIconMinimize, DoneIconMinimize} from "assets/svg";
import React, {useCallback, useState} from "react";




const EditableField = ({value, displayValue, field, mode = "updateOnHover", type, onChange, children}) => {
    const [newValue, setNewValue ] = useState(value)
    const handleEditChange =(value) => {console.log('Change handleEditChange', value) ; setNewValue(value)}
    const mapChangeEvent = {
        input: {onBlur:useCallback ((value) => handleEditChange(value),[])},
        date: {onBlur:useCallback ((value) => handleEditChange(value),[])},
        select: {onChange:useCallback ((value) => handleEditChange(value),[]), value:newValue}
    }

    const updateComponent = children && <children.type {...children.props} {...mapChangeEvent[type]}></children.type>
    const elementId = field
    const [isEditable, setIsEditable] = React.useState(false);


    const validateChange = useCallback (() => {
        onChange && onChange(field, newValue)
        setIsEditable(false);

    },[newValue])

    // WIP work on previous version of the component 
    const cancelChange = useCallback (() =>{
        setIsEditable(false);
    },[])

    const modifyValue = useCallback (() =>{
        setIsEditable(true);
    },[])

    React.useEffect(() => {
        if (isEditable) {
            // ref to force focus on the input doesn't work with CDK so i have to do this 
            const element = document.querySelector(`#EditableField${elementId}`);
            element.querySelector(".MuiInput-input").focus();
        }
    }, [isEditable])

    if (mode === "readOnly") {
        return (
            <div className="editable-field" data-test="editable-input-ro">
                <div className="value-uneditable-container">
                    <span className="value-uneditable">  { displayValue }</span>
                </div>
            </div>
        )
    }

    if (mode === "update") {
        return (
            <div className="editable-field" data-test="editable-input-up">
                <div className={
                    (type === "input" ? "editable-input-container" : "") ||
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
                                (type === "date" ? "editable-date-container" : "") ||
                                (type === "select" ? "editable-select-container" : "")}>
                                {
                                    updateComponent && (updateComponent)
                                }
                                <div className={
                                    (type === "input" ? "icon-container-input" : "") ||
                                    (type === "date" ? "icon-container-date" : "") ||
                                    (type === "select" ? "icon-container-select" : "")}>
                                    <span onClick={validateChange}>
                                        <DoneIconMinimize/>
                                    </span>
                                    <span onClick={cancelChange}>
                                        <CloseIconMinimize/>
                                    </span>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="value-uneditable-container">
                                <span className="value-uneditable edit-onHover" data-test="editable-input-uh2"
                                    onClick={() => modifyValue()}> { displayValue }</span>
                            </div>
                        )
                }
            </div>
        )
    }
};

export default EditableField
