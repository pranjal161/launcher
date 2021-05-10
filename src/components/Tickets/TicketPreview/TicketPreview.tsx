import {CloseIcon, NewWindowIcon} from "assets/svg";
import {
    DxcChip,
    DxcInput,
    DxcTextarea,
} from "@dxc-technology/halstack-react";
import React, {useCallback} from "react";

import AddRelatedClient from "./components/AddRelatedClient/AddRelatedClient";
import AddRelatedContract from "components/Tickets/TicketPreview/components/AddRelatedContract/AddRelatedContract";
import DataLine from "components/Tickets/TicketPreview/components/DataLine/DataLine";
import Documents from 'components/Tickets/TicketPreview/components/Documents/Documents';
import EditableField from "components/EditableField/EditableField";
import PropTypes from "prop-types";
import RelatedList from "./components/RelatedList/RelatedList";
import RelatedSection from "./components/RelatedSection/RelatedSection";
import Section from "components/Section/Section";
import Sections from "components/Tickets/TicketPreview/components/Sections/Sections";
import {TextField} from "@material-ui/core";
import Upload from "components/Tickets/TicketPreview/components/Upload/Upload";
import UserSelection from "components/Tickets/TicketPreview/components/UserSelection/UserSelection";
import {formatValue} from "util/functions";
import moment from "moment";
import styled from "styled-components";
import useDeskTickets from "data/hooks/useDeskTickets";
import useDeskUsers from "data/hooks/useDeskUsers";
import {useHistory} from "react-router-dom";

export const Root = styled.div`
  height: 100%;
  width: 100%;
`;

export const Data = styled.h6`
  min-height: 50px;
  max-height: 200px;
  transform: translate(0 14);
  font-size: 14px;
  color: #243b53;
  width: 95%;
  justify-self: left;
`;

const TicketPreview = (props: any) => {
    const {ticket, onClose, onPopupWindow, showPopupIcon = false, actions} = props;
    const {update, assignTo, createdBy, openInNewTab} = useDeskTickets()
    const history = useHistory();
    const TitleValue: any = () => (<>{ticket.title}</>)
    const DateValue = (data: any) => {
        const {date} = data;
        return (<>{formatValue(date, 'date')}</>)
    }

    const PersonValue = (props: { personId: any }) => {
        const {getOne} = useDeskUsers()
        const person = getOne(props.personId)
        return (<> {person && person.displayName}  </>)
    }

    const SuggestedActivity = (act: any) => {
        const {activity} = act;
        const {executeActivity} = useDeskTickets()
        const handleClick = (e: any) => {
            e.preventDefault()
            executeActivity(ticket.id, activity)
        }

        return (
            <div onClick={handleClick}>
                <DxcChip
                    label={activity}
                    margin="xxsmall"
                />
            </div>
        )
    }

    const SuggestedActivities = (activity: any) => {
        const {activities} = activity;
        return (
            < > {activities && Object.keys(activities).map((activity, index) => (
                <SuggestedActivity key={index} activity={activity}/>))
            }</>
        )
    }

    const Description = (des: any) => {
        const {description} = des;
        return (<Data>{description}</Data>)
    }
    const DxcDate2 = (data: any) => {
        const {date, id, ...rest} = data;
        return (
            <TextField
                id={id}
                type="date"
                defaultValue={moment(date).format("YYYY-MM-D")}
                InputLabelProps={{
                    shrink: true,
                }}
                {...rest}
            />
        );
    };

    DxcDate2.propTypes = {
        date: PropTypes.string,
        id: PropTypes.string,
        rest: PropTypes.any
    }


    const closePopupAction = (
        <div style={{display: 'flex'}}>
            {showPopupIcon &&
            <div onClick={onPopupWindow}>
                <NewWindowIcon/>
            </div>
            }
            <div onClick={onClose}>
                <CloseIcon/>
            </div>
        </div>
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleEditChange = useCallback((field, newValue) => {
        //console.log('handleEditChange',field, newValue)
        update({...ticket, [field]: newValue})
    }, [ticket, update])

    const handleAssignTo = useCallback((field, newValue) => {
        assignTo(ticket.id, newValue)
    }, [assignTo, ticket.id])

    const handleCreatedBy = useCallback((field, newValue) => {
        createdBy(ticket.id, newValue)
    }, [createdBy, ticket.id])

    const handleOnContractClick = (contract: any) => {
        openInNewTab(contract.hRef, contract.title, 'contract')
        history.push('/viewTab')
    }

    const handleOnClientClick = (client: any) => {
        openInNewTab(client.hRef, client.title, 'client')
        history.push('/viewTab')
    }

    return (
        <Root>
            <Sections>
                {false && closePopupAction}
                {actions && <Section id="actions" title="Actions">
                    {actions}
                </Section>}
                <div>
                    <DataLine label={"Title"}>
                        <EditableField
                            field="title"
                            type="input"
                            displayValue={<TitleValue/>}
                            value={ticket.title}
                            onChange={handleEditChange}>
                            <DxcInput
                                placeholder={ticket.title}
                                margin="xsmall"
                                size="fillParent"/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={"Received on"}>
                        <EditableField
                            field="receivedDate"
                            type="date"
                            value={ticket.receivedDate}
                            displayValue={<DateValue date={ticket.receivedDate}/>}
                            onChange={handleEditChange}>
                            <DxcDate2 date={ticket.receivedDate} id="receivedDate"/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={"Deadline"}>
                        <EditableField
                            field="deadlineDate"
                            type="date"
                            value={ticket.deadlineDate}
                            displayValue={<DateValue date={ticket.deadlineDate}/>}
                            onChange={handleEditChange}>
                            <DxcDate2 date={ticket.deadlineDate} id="deadlineDate"/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={"Created by"}>
                        <EditableField
                            field="createdBy"
                            type="select"
                            value={ticket.createdBy}
                            displayValue={<PersonValue personId={ticket.createdBy}/>}
                            onChange={handleCreatedBy}>
                            <UserSelection/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={"Person in charge"}>
                        <EditableField
                            field="assignedTo"
                            type="select"
                            value={ticket.assignedTo}
                            displayValue={<PersonValue personId={ticket.assignedTo}/>}
                            onChange={handleAssignTo}>
                            <UserSelection/>
                        </EditableField>
                    </DataLine>
                    {/* <StyledDivider /> */}
                </div>
                <Section id="description" title="Description">
                    <EditableField
                        field="description"
                        type="textarea"
                        value={ticket.description}
                        displayValue={<Description description={ticket.description}/>}
                        onChange={handleEditChange}>
                        <DxcTextarea/>
                    </EditableField>
                </Section>
                {/* <StyledDivider /> */}
                <Section id="relatedClients" title="Related Client">
                    <RelatedList value={ticket.relatedClients} component={RelatedSection} onClick={handleOnClientClick} />
                    <AddRelatedClient ticketId={ticket.id} />
                </Section>

                {/* <StyledDivider /> */}
                <Section id="relatedContracts" title="Related Contracts">
                    <RelatedList value={ticket.relatedContract} component={RelatedSection} onClick={handleOnContractClick} />
                    <AddRelatedContract ticketId={ticket.id} />
                </Section>
                {/* <StyledDivider /> */}
                <Section id="suggestedActivities" title="Suggested activities">
                    <SuggestedActivities activities={ticket.suggestedActivities}/>
                </Section>
                {/* <StyledDivider /> */}
                <Section id="notes" title="Notes">
                    <ul className={"list-group"}>
                        <li className="list-group-item"> Note 1</li>
                        <li className="list-group-item"> Note 2</li>
                    </ul>
                </Section>
                {/* <StyledDivider /> */}
                <Section id="documents" title="Documents">
                    <Documents documents={ticket.documents}/>
                    <Upload ticketId={ticket.id}/>
                </Section>
            </Sections>
        </Root>
    );
};

TicketPreview.propTypes = {
    ticket: PropTypes.any,
    personId: PropTypes.string,
    showPopupIcon: PropTypes.bool,
    onPopupWindow: PropTypes.func,
    onClose: PropTypes.func,
    actions: PropTypes.any,
    date: PropTypes.instanceOf(Date),
    activity: PropTypes.string,
    activities: PropTypes.array,
    document: PropTypes.string,
    documents: PropTypes.array,
    description: PropTypes.string,
    receivedDate: PropTypes.instanceOf(Date),
};

export default TicketPreview;
