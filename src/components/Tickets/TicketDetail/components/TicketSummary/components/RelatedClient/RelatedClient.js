import React from 'react'
import { StyledButton } from '../../../../../../../styles/global-style';
import Section from "../../components/Section/Section";
import useDeskTickets from "../../../../../../../data/hooks/useDeskTickets";
import LinkedClient from '../LinkedClient/LinkedClient';
import { DotsIcon } from '../../../../../../../assets/svg';

const RelatedClient = props => {
    const { removeRelatedClients } = useDeskTickets();
    const { relatedClient, onClick } = props;
    console.log(relatedClient);
    const handleClick = (relatedClient) => { onClick && onClick(relatedClient) };

    const handleRemoveRelatedClient = () => {
        removeRelatedClients('y270CCciTszudNrTtK6g', 'Pet')
    }
    const Display = () => {
        return (
            <>
                {relatedClient && Object.values(relatedClient).map((client, index, icon) =>
                    <tr key={index}>
                        <td>{client}</td>
                        <td> <StyledButton onClick={handleRemoveRelatedClient}><DotsIcon /></StyledButton></td>
                    </tr>
                )}
            </>
        )
    }

    return (
        <>
            <ul className={"list-group"} >
                <LinkedClient display={<Display/>} urj={"jkjk"} onClick={handleClick} />
            </ul>
        </>
    )
}
export default RelatedClient