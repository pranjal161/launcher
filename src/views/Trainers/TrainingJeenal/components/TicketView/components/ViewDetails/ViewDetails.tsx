import { Created, Critical, Done, Error, Pending } from "assets/svg";
import React, { useCallback } from "react";

import DataLine from "components/Tickets/TicketPreview/components/DataLine/DataLine";
import Deadline from "components/Deadline/Deadline";
import EditableField from "components/EditableField/EditableField";
import Label from "components/Tickets/TicketPreview/components/Label/Label";
import Section from "components/Section/Section";
import StatusSelection from "components/StatusSelection/StatusSelection";
import TextField from "@material-ui/core/TextField/TextField";
import TicketDescription from "../TicketDescription/TicketDescription";
import UserSelection from "components/Tickets/TicketPreview/components/UserSelection/UserSelection";
import { formatValue } from "util/functions";
import moment from "moment";
import styled from "styled-components";
import useDeskBaskets from "data/hooks/useDeskBaskets";
import useDeskTickets from "data/hooks/useDeskTickets";
import useDeskUsers from "data/hooks/useDeskUsers";

const ViewDetails = (props: { ticket: any }) => {
    const { ticket } = props;
    const { assignTo, update } = useDeskTickets();
    const basketDesk = useDeskBaskets();
    const allBaskets = basketDesk.getAll();


    const getBasketTitle = (basketId: any) => {
        const basket = allBaskets.filter((basket: { id: any; }) => basket.id === basketId);
        return basket.length > 0 ? basket[0].title : '';
    }

    const PersonValue = (personid: any) => {
        const { personId } = personid;
        const { getOne } = useDeskUsers();
        const person: any = useCallback(() => getOne(personId), [personid]);
        return <> {person && person.displayName} </>;
    };

    const DateValue = (data: any) => {
        const { date } = data;
        return <>{formatValue(date, "date")}</>;
    };

    const DxcDate2 = (data: any) => {
        const { date, id, ...rest } = data;
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

    const TicketStatus = (data: any) => {
        const { status } = data;
        let icon;
        if (status === 'pending') {
            icon = <Pending />;
        } else if (status === 'created') {
            icon = <Created />
        } else if (status === 'done') {
            icon = <Done />;
        } else if (status === 'error') {
            icon = <Error />
        } else {
            icon = <></>
        }
        return (<>
            {icon}
            {status}
        </>)
    };

    const Priority = (data: any) => {
        const { children } = data;
        let icon;
        if (children === 'Critical') {
            icon = <Critical />;
        } else {
            icon = <></>;
        }
        return (
            <div className="pl-1">
                {icon}
                {children}
            </div>
        )

    }


    const handleAssignTo = useCallback(
        (field, newValue) => {
            assignTo(ticket.id, newValue);
        },
        [assignTo, ticket.id]
    );

    const handleEditChange = useCallback(
        (field, newValue) => {
            //console.log('handleEditChange',field, newValue)
            update({ ...ticket, [field]: newValue });
        },
        [ticket, update]
    );

    const StyledMainDivider = styled.div`
  flex: 1 1 auto;
  margin-block: 1px;
`;
    return (
        <>
            <Deadline deadline={ticket.deadline} />
            <Section id="description" title="Description">
                <StyledMainDivider />
                <TicketDescription desc={ticket.description} />
                {/* {ticket.description ? ticket.description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"} */}
            </Section>
            <Section id="details" title="Details">
                <StyledMainDivider />
                <div className="row align-items-start">
                    <div id="ticket_details" className="col-6">
                        <DataLine label={<Label>Ticket Origin</Label>}>Email</DataLine>
                        {/* not from API */}
                        <DataLine label={<Label>Type</Label>}>Claims</DataLine>
                        {/* not from API */}
                        <DataLine label={<Label>Product</Label>}>Savings</DataLine>

                        <DataLine label={<Label>Basket</Label>}>{getBasketTitle(ticket.basketId)}</DataLine>
                    </div>
                    <div id="ticket_details" className="col-6">
                        <DataLine label={<Label>Status</Label>}>

                            <EditableField
                                field="status"
                                type="select"
                                value={ticket.status}
                                displayValue={<TicketStatus status={ticket.status} />}
                                onChange={handleEditChange}>
                                <StatusSelection />
                            </EditableField>
                        </DataLine>

                        <DataLine label={<Label>Priority</Label>}>{<Priority>Critical</Priority>}</DataLine>
                        <DataLine label={<Label>Person in charge</Label>}>
                            <EditableField
                                field="assignedTo"
                                type="select"
                                value={ticket.assignedTo}
                                displayValue={<PersonValue personId={ticket.assignedTo} />}
                                onChange={handleAssignTo}>
                                <UserSelection />
                            </EditableField>
                        </DataLine>
                    </div>
                </div>

            </Section>
            <Section id="dates" title="Dates">
                <StyledMainDivider />
                <div className="row align-items-start">
                    <div id="ticket_dates" className="col-6">

                        <DataLine label={<Label>Received on</Label>}>
                            <EditableField
                                field="receivedDate"
                                type="date"
                                value={ticket.receivedDate}
                                displayValue={<DateValue date={ticket.receivedDate} />}
                                onChange={handleEditChange}>
                                <DxcDate2 date={ticket.receivedDate} id="receivedDate" />
                            </EditableField>
                        </DataLine>
                        <DataLine label={<Label>Deadline</Label>}>
                            <EditableField
                                field="deadlineDate"
                                type="date"
                                value={ticket.deadlineDate}
                                displayValue={<DateValue date={ticket.deadlineDate} />}
                                onChange={handleEditChange}>
                                <DxcDate2 date={ticket.deadlineDate} id="deadlineDate" />
                            </EditableField>
                        </DataLine>

                    </div>
                    <div id="ticket_dates" className="col-6">

                        {/* not from API */}
                        <DataLine label={<Label>Engagement Service</Label>}>7 jours</DataLine>
                        {/* not from API */}
                        <DataLine label={<Label>Reminder Date</Label>}><DateValue date={Date.now()} /></DataLine>
                    </div>
                </div> </Section>
            <Section id="businessActivities" title="Business Activity(ies)">
                <StyledMainDivider />
            </Section>

        </>
    );
};

export default ViewDetails;
