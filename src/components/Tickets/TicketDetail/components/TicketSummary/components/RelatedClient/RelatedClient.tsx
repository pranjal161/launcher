import { DotsIcon } from '../../../../../../../assets/svg';
import LinkedClient from '../LinkedClient/LinkedClient';
import PropTypes from 'prop-types'
import React from 'react'
import { StyledButton } from '../../../../../../../styles/global-style';
import useDeskTickets from "../../../../../../../data/hooks/useDeskTickets";

const RelatedClient = (props:any) => {
    const { removeRelatedClients } = useDeskTickets();
    const { relatedClient, onClick } = props;
    const handleClick = (relatedClient:any) => { onClick && onClick(relatedClient) };

    const handleRemoveRelatedClient = () => {
        removeRelatedClients('y270CCciTszudNrTtK6g', 'Pet')
    }
    const Display = () => (
        <>
            {relatedClient && Object.values(relatedClient).map((client:any, index) => <tr key={index}>
                <td>{client}</td>
                <td> <StyledButton onClick={handleRemoveRelatedClient}><DotsIcon /></StyledButton></td>
            </tr>
            )}
        </>
    )

    return (
        <>
            <ul className={"list-group"} >
                <LinkedClient display={<Display/>} url={"jkjk"} client={handleClick} />
            </ul>
        </>
    )
}

RelatedClient.propTypes = {
    onClick: PropTypes.any,
    relatedClient: PropTypes.any
}

export default RelatedClient