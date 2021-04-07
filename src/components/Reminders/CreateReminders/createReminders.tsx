import * as yup from "yup";

import { DxcButton, DxcDate, DxcDialog, DxcHeading, DxcInput, DxcSelect } from '@dxc-technology/halstack-react'
import React, { useContext, useState } from 'react';

import { AlertContext } from "context/alertContext";
import useDeskTickets from 'data/hooks/useDeskTickets';
import useDeskUsers from "data/hooks/useDeskUsers";

const CreateReminders = (props: any) => {
    const { onClickDialog, reminder } = props;
    const { getMyAllTickets } = useDeskTickets();
    const tickets = getMyAllTickets();
    const { createReminder } = useDeskUsers();
    const [updatedReminder, updateReminder] = useState(reminder);
    const [ticketValue, setTicketValue] = useState('')
    const alertContext = useContext(AlertContext);

    const ticketOptions = tickets && tickets.map((ticket: { title: any, id: string }) => (
        ticket.id
    ));
    const statusValues = [
        { value: "done", label: "Done" },
        { value: "todo", label: "To Do" },
        { value: "cancel", label: "Cancel" }
    ];
    const categoryValues = [
        { value: "requestInfo", label: "Request for Information" },
        { value: "sendBrochure", label: "Send a commercial brochure"}
    ]
    const schema = yup.object().shape({
        ticket: yup.string(),
        description: yup.string().required(),
        status: yup.string().required(),
        deadline: yup.string().required(),
        category: yup.string()
    });

    const updateValue = (newValue: any, id: string) => {
        const obj = {
            [id]: newValue
        }
        const newUpdate = updatedReminder ? { ...updatedReminder, ...obj } : obj;
        
        updateReminder(newUpdate)
    };

    const onSubmit = () => {
        const newReminder = reminder ? { ...reminder, ...updatedReminder } : updatedReminder;
        schema.validate(newReminder).then(() => {
            createReminder(newReminder);
            onClickDialog();
        }).catch(() => {
            const statusReport = {
                consistent: true,
                messages: [
                    {
                        severity: 'error',
                        context: [{
                            propertyNames: ['_MISSING_REQUIRED_ATTRIBUTES']
                        }],
                        message: '_MISSING_REQUIRED_ATTRIBUTES'
                    }
                ]
            }
            alertContext.setToastList(statusReport);
        });
    }

    return (
        <DxcDialog  padding="medium" onCloseClick={onClickDialog}>
            <DxcHeading level={3} weight="light" text="Create Reminder" />
            <div>
                <DxcInput
                    label="Description"
                    onChange={(newValue: string) => updateValue(newValue, 'description')}
                    margin="xxsmall" 
                    required={true}
                    value={updatedReminder ? updatedReminder.description : ''}
                />
            </div>
            <div>
                <DxcDate
                    label="Deadline"
                    placeholder
                    margin="xxsmall"
                    format="MM-dd-yyyy"
                    required={true}
                    onChange={(newValue: any) => updateValue(newValue.stringValue, 'deadline')}
                    value={updatedReminder ? updatedReminder.deadline : ''}
                />
            </div>
            <div>
                <DxcSelect
                    options={statusValues}
                    onChange={(newValue: string) => updateValue(newValue, 'status')}
                    label="Status"
                    required={true}
                    margin="xxsmall"
                    value={updatedReminder ? updatedReminder.status : ''}
                ></DxcSelect>
            </div>
            <div>
                <DxcSelect
                    options={categoryValues}
                    onChange={(newValue: string) => updateValue(newValue, 'category')}
                    label="Category"
                    required={true}
                    margin="xxsmall"
                    value={updatedReminder ? updatedReminder.category : ''}
                ></DxcSelect>
            </div>
            <div>
                <DxcInput
                    label="Ticket ID"
                    onBlur={(newValue: string) => updateValue(newValue, 'ticket')}
                    autocompleteOptions={ticketOptions}
                    margin="xxsmall"
                    onChange={(newValue:string) => setTicketValue(newValue)}
                    value={ticketValue}
                />
            </div>
            <div>
                <DxcButton
                    mode="primary"
                    label="Validate"
                    onClick={onSubmit}
                    margin="large"
                />
                <DxcButton
                    mode="primary"
                    label="Cancel"
                    onClick={onClickDialog}
                    margin="large"
                />
            </div>
        </DxcDialog>
    )

}

export default CreateReminders;
