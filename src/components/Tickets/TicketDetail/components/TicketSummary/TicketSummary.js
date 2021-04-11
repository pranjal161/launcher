import {AddIcon, CloseIcon, NewWindowIcon} from "../../../../../assets/svg";
import {
    DxcChip,
    DxcInput,
    DxcTextarea,
} from "@dxc-technology/halstack-react";
import React, {useCallback} from "react";
import {StyledButton, StyledDivider} from 'src/styles/global-style';
import DataLine from "./components/DataLine/DataLine";
import Documents from './components/documents/documents';
import EditableField from "../../../../EditableField/EditableField";
import Label from "./components/Label/Label";
import LinkedContract from "./components/LinkedContract/LinkedContract";
import PropTypes from "prop-types";
import RelatedClient from './components/RelatedClient/RelatedClient';
import Section from "./components/Section/Section";
import Sections from "./components/Sections/Sections";
import {TextField} from "@material-ui/core";
import Upload from "../Upload/Upload";
import UserSelection from "./components/UserSelection/UserSelection";
import {formatValue} from "util/functions";
import moment from "moment";
import styled from "styled-components";
import useDeskTickets from "data/hooks/useDeskTickets";
import useDeskUsers from "data/hooks/useDeskUsers";


export const Root = styled.div`
  height: 100%;
  width: 100%;
`;

const TicketSummary = ({ticket, onClose, onPopupWindow, showPopupIcon = false, actions}) => {
    const {update, assignTo, createdBy} = useDeskTickets()
    const TitleValue = () => (<>{ticket.title}</>)
    const DateValue = ({date}) => (<>{formatValue(date, 'date')}</>)
    const PersonValue = ({personId}) => {
        const {getOne} = useDeskUsers()
        const person = useCallback(getOne(personId), [personId])
        return (<> {person && person.displayName}  </>)
    }

    const SuggestedActivity = ({activity}) => {
        const {executeActivity} = useDeskTickets()
        const handleClick = (e) => {
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

    const SuggestedActivities = ({activities}) => (
        < > {activities && Object.keys(activities).map((activity, index) => (
            <SuggestedActivity key={index} activity={activity}/>))
        }</>
    )

    const {addRelatedClients} = useDeskTickets();
    const handleAddRelatedClient = () => {
        addRelatedClients('OqMyhl637zmSrJPPCjQz', 'Pet')
    }

    const Description = ({description}) => (<p style={{maxHeight: '200px'}}>{description}</p>)
    const DxcDate2 = ({date, id, ...rest}) => (<TextField
        id={id}
        type="date"
        defaultValue={moment(date).format("YYYY-MM-D")}
        InputLabelProps={{
            shrink: true,
        }}
        {...rest}
    />)

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
            {onClose && <div onClick={onClose}>
                <CloseIcon/>
            </div>}
        </div>
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleEditChange = useCallback((field, newValue) => {
        //console.log('handleEditChange',field, newValue)
        update({...ticket, [field]: newValue})
    }, [ticket])

    const handleAssignTo = useCallback((field, newValue) => {
        assignTo(ticket.id, newValue)
    }, [ticket])

    const handleCreatedBy = useCallback((field, newValue) => {
        createdBy(ticket.id, newValue)
    }, [ticket])

    return (
        <Root>
            <Sections actions={closePopupAction}>
                {actions && <Section id="actions" title="Actions">
                    {actions}
                    <StyledDivider/>
                </Section>}

                <Section id="information" title="Information">
                    <DataLine label={<Label>Title</Label>}>
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
                    <DataLine label={<Label>Received on</Label>}>
                        <EditableField
                            field="receivedDate"
                            type="date"
                            value={ticket.receivedDate}
                            displayValue={<DateValue date={ticket.receivedDate}/>}
                            onChange={handleEditChange}>
                            <DxcDate2 date={ticket.receivedDate} id="receivedDate"/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={<Label>Deadline</Label>}>
                        <EditableField
                            field="deadlineDate"
                            type="date"
                            value={ticket.deadlineDate}
                            displayValue={<DateValue date={ticket.deadlineDate}/>}
                            onChange={handleEditChange}>
                            <DxcDate2 date={ticket.deadlineDate} id="deadlineDate"/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={<Label>Created by</Label>}>
                        <EditableField
                            field="createdBy"
                            type="select"
                            value={ticket.createdBy}
                            displayValue={<PersonValue personId={ticket.createdBy}/>}
                            onChange={handleCreatedBy}>
                            <UserSelection/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={<Label>Person in charge</Label>}>
                        <EditableField
                            field="assignedTo"
                            type="select"
                            value={ticket.assignedTo}
                            displayValue={<PersonValue personId={ticket.assignedTo}/>}
                            onChange={handleAssignTo}>
                            <UserSelection/>
                        </EditableField>
                    </DataLine>
                    <StyledDivider/>
                </Section>
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
                <StyledDivider/>
                <Section id="relatedClients" title="Related Client"
                    actions={<StyledButton onClick={handleAddRelatedClient}><AddIcon/></StyledButton>}>
                    <DataLine label={<Label>Client</Label>}>
                        {/* <LinkedClient client={{displayName: ticket.relatedClients}} urj={"jkjk"} /> */}
                        <RelatedClient relatedClient={ticket.relatedClients} onClick={onclick}/>
                    </DataLine>
                </Section>

                <StyledDivider/>
                <Section id="relatedContracts" title="Related Contracts">
                    <DataLine label={<Label> Contract </Label>}>
                        <LinkedContract
                            client={{
                                displayName: "UI01929821",
                            }}
                            urj={"jkjk"}
                        />
                    </DataLine>
                    <DataLine label={<Label> Contract </Label>}>
                        <LinkedContract
                            client={{
                                displayName: "UI07292093",
                            }}
                            urj={"jkjk"}
                        />
                    </DataLine>
                    <DataLine label={<Label> Contract </Label>}>
                        <LinkedContract
                            client={{
                                displayName: "MP27293032",
                            }}
                            urj={"jkjk"}
                        />
                    </DataLine>
                </Section>
                <StyledDivider/>
                <Section id="suggestedActivities" title="Suggested activities">
                    <SuggestedActivities activities={ticket.suggestedActivities}/>
                </Section>
                <StyledDivider/>
                <Section id="notes" title="Notes">
                    <lu className={"list-group"}>
                        <li className="list-group-item"> Note 1</li>
                        <li className="list-group-item"> Note 2</li>
                    </lu>
                </Section>
                <StyledDivider/>
                <Section id="documents" title="Documents">
                    <Documents documents={ticket.documents}/>
                    <Upload ticketId={ticket.id}/>
                </Section>
            </Sections>
        </Root>
    );
};

TicketSummary.propTypes = {
    ticket: PropTypes.string,
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

export default TicketSummary;
