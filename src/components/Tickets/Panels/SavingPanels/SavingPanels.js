import React, {useState} from 'react';
import ConsultationPanels from "components/ConsultationPanels/ConsultationPanels";
import Preview from "../../PreviewContainer/components/Preview/Preview";
import PropTypes from "prop-types";
import SavingToolbar from "./components/SavingToolbar/SavingToolbar";
import SelectEntity from "components/ConsultationPanels/components/SelectEntity/SelectEntity";
import Timeline from "components/Timeline/Timeline";
import WithScroll from "../../../WithScroll/WithScroll";
import styled from "styled-components";
import useDeskBaskets from "../../../../data/hooks/useDeskBaskets";
import useDeskTickets from "data/hooks/useDeskTickets";
import useDeskUsers from "../../../../data/hooks/useDeskUsers";

const Root = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
`;


const SavingPanels = ({ticketId,onClose}) => {
    const entities = {
        ticket: [{display: "Ticket", id: ticketId}],
        history:[{display:"History", id: ticketId}],
        contract:
            [{display: "contract A", id: 'contractA'}, {
                display: "contract B",
                id: 'contractB'
            }, {display: "contract C", id: 'contractC'}],
        person: [{display: "Person 1", id: 'person1'},
            {display: "Person 2", id: 'person2'}],
    }
    const {getOne} = useDeskTickets()
    const {getOne: getOneBasket } = useDeskBaskets()
    const {getAll: getAllUsers} = useDeskUsers()

    const [entityType, setEntityType] = useState('ticket')
    const [currentEntity, setCurrentEntity] = useState({})

    const handleEntitySelection = (selection) => setCurrentEntity((prev) => ({...prev, [entityType]: selection}))
    const handleTypeSelection = (value) => setEntityType(value)

    const SelectEntities = () => <SelectEntity entities={entities[entityType]} onChange={handleEntitySelection}
        value={currentEntity[entityType]}/>
    const Toolbar = () => <SavingToolbar value={entityType} onChange={handleTypeSelection}/>
    const Content = () => {
        if (entityType === 'ticket') {
            const ticket = getOne(ticketId)
            return (<Preview ticket={ticket}/>)
        }
        else if(entityType === 'history'){
            const ticket = getOne(ticketId)
            const basket = getOneBasket(ticket.basketId)
            const basketTitle = basket && basket.title
            const users = getAllUsers('data')
            return (<WithScroll visibleHeight={800}><Timeline ticket={ticket} users={users} basketName={basketTitle} /></WithScroll>)
        }
        else
            return (<div> Content of id : {currentEntity[entityType]} </div>)
    }
    return (
        <Root>
            <ConsultationPanels header={<SelectEntities/>} content={<Content/>} toolbar={<Toolbar/>} onToggle={onClose}/>
        </Root>
    )
}

SavingPanels.propTypes = {
    ticketId: PropTypes.string,
    onRemove: PropTypes.func,
    onClose: PropTypes.func,
}

export default SavingPanels;
