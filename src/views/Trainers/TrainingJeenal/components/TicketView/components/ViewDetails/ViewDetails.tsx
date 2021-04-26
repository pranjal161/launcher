import React, { useCallback } from "react";

import DataLine from "components/Tickets/TicketPreview/components/DataLine/DataLine";
import Deadline from "components/Deadline/Deadline";
import EditableField from "components/EditableField/EditableField";
import Label from "components/Tickets/TicketPreview/components/Label/Label";
import Section from "components/Section/Section";
import StatusSelection from "components/StatusSelection/StatusSelection";
import { StyledDivider } from "styles/global-style";
import TextField from "@material-ui/core/TextField/TextField";
import UserSelection from "components/Tickets/TicketPreview/components/UserSelection/UserSelection";
import { formatValue } from "util/functions";
import moment from "moment";
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

    return (
        <>
            <Deadline deadline={ticket.deadline} />
            <Section id="description" title="Description">
                <StyledDivider />
                {ticket.description ? ticket.description : ""}
            </Section>
            <Section id="details" title="Details">
                <StyledDivider />
                <div className="row">
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
                                displayValue={ticket.status}
                                onChange={handleAssignTo}>
                                <StatusSelection />
                            </EditableField>
                        </DataLine>

                        <DataLine label={<Label>Priority</Label>}>Critical</DataLine>
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
                <StyledDivider />
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
            </Section>
            <Section id="businessActivities" title="Business Activity(ies)">
                <StyledDivider />
                {/* {ticket.description ? ticket.description : ""} */}
            </Section>

        </>
    );
};

export default ViewDetails;
