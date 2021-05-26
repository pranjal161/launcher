import * as yup from 'yup';

import {
    DxcButton,
    DxcDate,
    DxcHeading,
    DxcInput,
    DxcSelect,
    DxcSlider,
    DxcTextarea
} from '@dxc-technology/halstack-react';
import React, {useContext, useEffect, useState} from 'react';

import {AlertContext} from 'context/alertContext';
import {ApplicationContext} from 'context/applicationContext';
import { Axios } from 'data/hooks/useLoader';
import {searchPerson} from 'util/functions';
import useDeskAuth from 'data/hooks/useDeskAuth';
import useDeskBaskets from 'data/hooks/useDeskBaskets';
import useDeskUsers from 'data/hooks/useDeskUsers';

//import { useForm } from "react-hook-form";
//import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    title: yup.string().required(),
    requestBy: yup.string().required(),
    assignedTo: yup.string().required(),
    basketId: yup.string(),
    description: yup.string(),
    status: yup.string().required(),
    notes: yup.string(),
    deadline: yup.string(),
    stage: yup.number(),
    client: yup.string()
});

const TicketFormDialog = (props: { submit?: any; close?: any; ticket?: any; }) => {
    const currentUserId = useDeskAuth()
    const {getAll} = useDeskUsers()
    const {getAll: getAllBaskets} = useDeskBaskets()
    const allUsers = getAll()
    const allBaskets = getAllBaskets()
    const {ticket} = props
    const applicationContext = useContext(ApplicationContext);
    const [autocompleteOptions, setOptions] = useState([]);
    const [clientValue, setClientValue] = useState('')

    const defaultValues = ticket ? ticket : {
        requestBy: currentUserId,
        assignTo: currentUserId,
    }
    console.log(defaultValues);

    const [updatedTicket, updateTicket] = useState(ticket);
    const alertContext = useContext(AlertContext);
    const usersOptions = allUsers && allUsers.map((user: { id: any; displayName: any; }) => (
        {value: user.id, label: user.displayName}
    ))

    const basketsOptions = allBaskets && allBaskets.map((basket: { id: any; title: any; }) => (
        {value: basket.id, label: basket.title}
    ))

    const onSubmit = () => {
        const completeTicket = ticket ? {...ticket, ...updatedTicket} : updatedTicket;
        schema.validate(completeTicket).then(() => {
            props.submit(completeTicket)
        }).catch((err) => {
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

            if (err) {
                console.log(err);
            }

            alertContext.setToastList(statusReport);
        });
    }

    const handleClose = () => {
        props.close()
    }

    const statusValues = [
        {value: 'created', label: 'Created'},
        {value: 'pending', label: 'Pending'},
        {value: 'closed', label: 'Closed'}
    ]

    useEffect(() => {
        getPersons(clientValue);
    }, [clientValue]);

    const getPersons = async (newValue: string) => {
        if (newValue !== '' && newValue.length > 3) {
            const searchUrl = searchPerson(newValue);
            const promise = Promise.resolve(Axios.get(searchUrl, {headers: applicationContext.headers}))

            await promise.then((result) => {
                if (result && result.data && result.data._links && result.data._links.item) {
                    const results = result.data._links.item.map((item: any) => (
                        item.title
                    ))
                    setOptions(results);
                }
            })
        } else
            return []
    }

    const updateValue = (newValue: any, id: string) => {
        const obj = {
            [id]: newValue
        }
        const newUpdate = updatedTicket ? {...updatedTicket, ...obj} : obj;

        updateTicket(newUpdate)
    };

    return (
        <>
            <DxcHeading level={3} weight="light" text={ticket ? 'Update a ticket' : 'Create a ticket'}/>
            <div data-testid={'title'}>
                <DxcInput
                    label="Title"
                    onChange={(newValue: string) => updateValue(newValue, 'title')}
                    margin="xxsmall"
                    size="large"
                    required={true}

                    value={updatedTicket ? updatedTicket.title : ''}
                />
            </div>
            <div data-testid={'requestBy'}>
                <DxcSelect
                    options={usersOptions}
                    label="Request by"
                    margin="xxsmall"
                    required={true}
                    onChange={(newValue: string) => updateValue(newValue, 'requestBy')}
                    value={updatedTicket ? updatedTicket.requestBy : ''}
                ></DxcSelect>
            </div>
            <div data-testid={'assignedTo'}>
                <DxcSelect
                    options={usersOptions}
                    label="Assigned To"
                    margin="xxsmall"
                    required={true}
                    value={updatedTicket ? updatedTicket.assignedTo : ''}
                    onChange={(newValue: string) => updateValue(newValue, 'assignedTo')}
                ></DxcSelect>
            </div>
            <div data-testid={'basketId'}>
                <DxcSelect
                    options={basketsOptions}
                    label="Basket"
                    margin="xxsmall"
                    required={true}
                    value={updatedTicket ? updatedTicket.basketId : ''}
                    onChange={(newValue: string) => updateValue(newValue, 'basketId')}
                ></DxcSelect>
            </div>
            <div data-testid={'deadline'}>
                <DxcDate
                    label="Deadline"
                    placeholder
                    value={updatedTicket ? updatedTicket.deadline : ''}
                    format="dd-MM-yyyy"
                    invalid={true}
                    onChange={(newValue: any) => updateValue(newValue.stringValue, 'deadline')}
                />
            </div>
            <div data-testid={'description'}>
                <DxcTextarea
                    label="Description"
                    onChange={(newValue: string) => updateValue(newValue, 'description')}
                    margin="xxsmall"
                    size="large"
                    value={updatedTicket ? updatedTicket.description : ''}
                />
            </div>
            <div data-testid={'stage'}>
                <label className=" control-label" htmlFor="stage">Stage (%)</label>
                <DxcSlider
                    minValue={0}
                    maxValue={100}
                    showLimitsValues={true}
                    showInput={true}
                    name="Stage (%)"
                    step={5}
                    value={updatedTicket ? updatedTicket.stage : ''}
                    marks={true}
                    onChange={(newValue: string) => updateValue(newValue, 'stage')}
                    margin="xxsmall"
                />
            </div>
            <div data-testid={'client'}>
                <DxcInput
                    label="Client"
                    onBlur={(newValue: string) => updateValue(newValue, 'client')}
                    onChange={(newValue: string) => setClientValue(newValue)}
                    value={clientValue}
                    autocompleteOptions={autocompleteOptions}
                    margin="xxsmall"
                />
            </div>
            <div data-testid={'status'}>
                <DxcSelect
                    options={statusValues}
                    onChange={(newValue: string) => updateValue(newValue, 'status')}
                    label="Status"
                    required={true}
                    value={updatedTicket ? updatedTicket.status : ''}
                    margin="xxsmall"
                ></DxcSelect>
            </div>
            <div data-testid={'notes'}>
                <DxcTextarea
                    label="Notes"
                    onChange={(newValue: string) => updateValue(newValue, 'notes')}
                    margin="xxsmall"
                    size="large"
                    value={updatedTicket ? updatedTicket.notes : ''}
                />
            </div>
            <div>
                <DxcButton
                    mode="primary"
                    label="Validate"
                    onClick={onSubmit}
                    margin="medium"
                />
                <DxcButton
                    mode="primary"
                    label="Cancel"
                    onClick={handleClose}
                    margin="medium"
                />
            </div>
        </>
    );
}

export default TicketFormDialog;
