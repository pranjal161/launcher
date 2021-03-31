import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { StyledButton } from '../../../../../../../styles/global-style';
import useDeskTickets from "../../../../../../../data/hooks/useDeskTickets";
import LinkedClient from '../LinkedClient/LinkedClient';
import { DotsIcon } from '../../../../../../../assets/svg';

const RelatedClient = props => {
    const { removeRelatedClients } = useDeskTickets();
    //const classes = useStyles();
    const { relatedClient, onClick } = props;
    console.log(relatedClient);
    const handleClick = (relatedClient) => { onClick && onClick(relatedClient) };

    const handleRemoveRelatedClient = () => {
        removeRelatedClients('y270CCciTszudNrTtK6g', 'Pet')
    }

    return (
        <>
            <ul className={"list-group"} >
                {relatedClient && Object.values(relatedClient).map((client, index, icon) =>
                    <LinkedClient key={index} client={{ displayName: client }}
                        display={<StyledButton onClick={handleRemoveRelatedClient}><DotsIcon /></StyledButton>}
                        urj={"jkjk"} onClick={handleClick} />
                )}
            </ul>
        </>
    )
}
export default RelatedClient