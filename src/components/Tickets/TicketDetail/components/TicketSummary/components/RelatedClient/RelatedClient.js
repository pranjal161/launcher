import { DotsIcon } from '../../../../../../../assets/svg';
import LinkedClient from '../LinkedClient/LinkedClient';
import PropTypes from 'prop-types'
import React from 'react'
import { StyledButton } from '../../../../../../../styles/global-style';
import useDeskTickets from "../../../../../../../data/hooks/useDeskTickets";

const RelatedClient = (props) => {
    const { removeRelatedClients } = useDeskTickets();
    const { relatedClient, onClick } = props;
    const handleClick = (relatedClient) => { onClick && onClick(relatedClient) };

    const handleRemoveRelatedClient = () => {
        removeRelatedClients('y270CCciTszudNrTtK6g', 'Pet')
    }
    const Display = () => (
        <>
            {relatedClient && Object.values(relatedClient).map((client, index) => <tr key={index}>
                <td>{client}</td>
                <td> <StyledButton onClick={handleRemoveRelatedClient}><DotsIcon /></StyledButton></td>
            </tr>
            )}
        </>
    )

    return (
        <>
            <ul className={"list-group"} >
                <LinkedClient display={<Display/>} urj={"jkjk"} onClick={handleClick} />
            </ul>
        </>
    )
}

RelatedClient.propTypes = {
    onClick: PropTypes.func,
    relatedClient: PropTypes.string
}

export default RelatedClient