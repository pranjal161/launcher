import "./index.scss";
import {DxcDate, DxcInput, DxcSelect} from "@dxc-technology/halstack-react";
import EditableField from "components/EditableField/EditableField";
import React from 'react';

const TrainingMaxime = () => {
    const [data, setData] = React.useState({
        name: "Mary",
        firstname: "Maxime",
        age: "25",
        date: "01-01-1995",
        gender: 1
    });

    const [isInvalid, changeIsInvalid] = React.useState(false);
    const onChangeSelect = (newValue) => {
        setData({
            ...data, "gender": newValue
        });
    };

    const {name, firstname, age, date, gender} = data;

    const genderChoice = [
        {
            value: 1,
            label: "Woman"
        },
        {
            value: 2,
            label: "Man"
        },
        {
            value: 3,
            label: "Other"
        }
    ];


    const suggestionsName = [
        "Dupont", "Dumoulin", "Nicolas"
    ]


    const onChangeTestforReset = (newValue, fieldName) => {
        setData({
            ...data, [fieldName]: newValue
        });
    }

    const onChangeDate = ({stringValue, dateValue}) => {
        setData({
            ...data, "date": stringValue
        });
        changeIsInvalid(!dateValue);
    };

    const onChange = (fieldName) => (newValue) => {
        setData({
            ...data, [fieldName]: newValue
        });
    }

    return (
        <div className="training-maxime-container">
            <div className="dataline-container">
                <div className="label">
                    <span>Name</span>
                </div>
                <div className="data">
                    <EditableField
                        type="input"
                        value={name}
                        mode="update"
                        fieldName="name"
                        onChange={onChangeTestforReset}
                        focusComponent={
                            <DxcInput
                                value={name}
                                onChange={onChange("name")}
                                margin="xsmall"
                                size="fillParent"
                                autocompleteOptions={suggestionsName}/>}
                    />
                </div>
            </div>
            <div className="dataline-container">
                <div className="label">
                    <span>Firstname</span>
                </div>
                <div className="data">
                    <EditableField
                        type="input"
                        value={firstname}
                        mode="updateOnHover"
                        fieldName="firstname"
                        onChange={onChangeTestforReset}
                        focusComponent={
                            <DxcInput
                                value={firstname}
                                onChange={onChange("firstname")}
                                margin="xsmall"
                                size="fillParent"/>}
                    />
                </div>

            </div>
            <div className="dataline-container">
                <div className="label">
                    <span>Age</span>
                </div>
                <div className="data">
                    <EditableField
                        value={age}
                        mode="readOnly"
                        fieldName="age"
                    />
                </div>

            </div>
            <div className="dataline-container">
                <div className="label">
                    <span>Date</span>
                </div>
                <div className="data">
                    <EditableField
                        type="date"
                        value={date}
                        mode="updateOnHover"
                        fieldName="date"
                        focusComponent={
                            <DxcDate
                                value={date}
                                invalid={isInvalid}
                                format="MM-dd-yyyy"
                                onChange={onChangeDate}
                            />}
                    />
                </div>
            </div>
            <div className="dataline-container">
                <div className="label">
                    <span>Gender</span>
                </div>
                <div className="data">
                    <EditableField
                        type="select"
                        value={gender}
                        mode="updateOnHover"
                        fieldName="gender"
                        focusComponent={
                            <DxcSelect
                                options={genderChoice}
                                onChange={onChangeSelect}
                                value={gender}
                                margin="medium"
                            />}
                    />
                </div>
            </div>
            <div className="dataline-container">
                <div className="label">
                    <span>Gender</span>
                </div>
                <div className="data">
                    <EditableField
                        type="select"
                        value={gender}
                        mode="update"
                        fieldName="gender2"
                        focusComponent={
                            <DxcSelect
                                options={genderChoice}
                                onChange={onChangeSelect}
                                value={gender}
                                margin="medium"
                            />}
                    />
                </div>
            </div>
        </div>
    );
};
export default TrainingMaxime;

