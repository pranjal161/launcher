import "./EditableField.scss";

import {CloseIconMinimize, DoneIconMinimize} from "./../../assets/svg";
import React from "react";

const EditableField = ({value = "empty", onChange, fieldName, mode = "readOnly", focusComponent, type}) => {

    const [isEditable, setIsEditable] = React.useState(false);

    // const handleChange = (newValue) => {
    //     onChange(newValue, fieldName)
    // }

    const validateChange = () => {
        setIsEditable(false);
    }

    // WIP work on previous version of the component 
    const cancelChange = () => {
        setIsEditable(false);
        // onChange(test, fieldName)
    }

    const modifyValue = () => {
        setIsEditable(true);
    }

    React.useEffect(() => {
        if (isEditable) {
            // ref to force focus on the input doesn't work with CDK so i have to do this 
            const element = document.querySelector(`#EditableField${fieldName}`);
            element.querySelector(".MuiInput-input").focus();
        }
    }, [isEditable])

    if (mode === "readOnly") {
        return (
            <div className="editable-field" data-test="editable-input-ro">
                <div className="value-uneditable-container">
                    <span className="value-uneditable"> {value}</span>
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
                        focusComponent && (focusComponent)
                    }
                </div>
            </div>
        )
    }

    if (mode === "updateOnHover") {
        return (

            <div className="editable-field" id={`EditableField${fieldName}`}>
                {
                    isEditable || value.length === 0 ?
                        (
                            <div className={
                                (type === "input" ? "editable-input-container" : "") ||
                                (type === "date" ? "editable-date-container" : "") ||
                                (type === "select" ? "editable-select-container" : "")}>
                                {
                                    focusComponent && (focusComponent)
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
                                      onClick={() => modifyValue()}> {value}</span>
                            </div>
                        )
                }
            </div>
        )
    }
};

export default EditableField;
