import * as yup from "yup";

import { DxcButton, DxcDate, DxcDialog, DxcHeading, DxcInput, DxcSelect } from '@dxc-technology/halstack-react'
import React, { useContext, useState } from 'react';

import { AlertContext } from "context/alertContext";
import TextField from "@material-ui/core/TextField";
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
        { value: "Done", label: "Done" },
        { value: "To Do", label: "To Do" },
        { value: "Cancel", label: "Cancel" }
    ];
    const categoryValues = [
        { value: "Request for Information", label: "Request for Information" },
        { value: "Send a commercial brochure", label: "Send a commercial brochure" }
    ]
    const schema = yup.object().shape({
        ticket: yup.string(),
        description: yup.string().required(),
        status: yup.string().required(),
        deadline: yup.string().required(),
        category: yup.string(),
        time: yup.string()
    });

    const updateValue = (newValue: any, id: string) => {
        const obj = {
            [id]: newValue.target ? newValue.target.value : newValue
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
        <DxcDialog padding="medium" onCloseClick={onClickDialog}>
            <DxcHeading level={3} weight="light" text={reminder ? 'Update reminder' : 'Create reminder'} />
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
            <div className="w-25">
                <TextField
                    id="time"
                    label="Select time"
                    type="time"
                    value={updatedReminder ? updatedReminder.time : ''}
                    onChange={(newValue: any) => updateValue(newValue, 'time')}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    InputLabelProps={{
                        shrink: true,
                      }}
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
                    onChange={(newValue: string) => setTicketValue(newValue)}
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
