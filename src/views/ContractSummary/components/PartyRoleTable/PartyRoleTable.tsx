import React, { useContext, useEffect } from 'react';
import { StyledButton, StyledHoverRow } from 'styles/global-style';

import { ApplicationContext } from "context/applicationContext";
import { DxcTable } from "@dxc-technology/halstack-react";
import { EyeIcon } from 'assets/svg';
import { getLink } from 'util/functions';
import useAia from 'data/hooks/useAia';
import useDeskTickets from 'data/hooks/useDeskTickets';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PartyRoleTable = (props: { roles: Array<any> }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const { openInNewTab } = useDeskTickets();
    const applicationContext = useContext(ApplicationContext);
    const { fetch } = useAia();
    useEffect(() => {
        // Nothing to do
    },[props.roles, applicationContext]
    );

    const goToClientView = (item: any) => {
        fetch(item.href).then((partyRoleResponse:any) => {
            if (getLink(partyRoleResponse.data, 'party_role:person')) {
                const clientUrl = getLink(partyRoleResponse.data, 'party_role:person')
                openInNewTab(clientUrl, partyRoleResponse.data._links['self'].title, 'client')
                history.push('/viewTab')
            } else if (getLink(partyRoleResponse.data, 'party_role:organization')) {
                const clientUrl = getLink(partyRoleResponse.data, 'party_role:organization')
                openInNewTab(clientUrl, partyRoleResponse.data._links['self'].title, 'client')
                history.push('/viewTab')
            }
        });
    };

    return (
        <>
            {props.roles && props.roles.length > 0 && (
                <DxcTable>
                    <tr>
                        <th>{t('_NAME')}</th>
                        <th>{t('_ACTIONS')}</th>
                    </tr>
                    {props.roles.map((row) => (
                        <StyledHoverRow key={row['href']}>
                            <td>{row.title}</td>
                            <td>
                                {/* <Tooltip title="view"> */}
                                <StyledButton aria-label="add an alarm" onClick={() => goToClientView(row)}>
                                    <EyeIcon />
                                </StyledButton>
                                {/* </Tooltip> */}
                            </td>
                        </StyledHoverRow>
                    ))}
                </DxcTable>
            )}
        </>
    );
};

export default PartyRoleTable;
