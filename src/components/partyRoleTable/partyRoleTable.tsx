import React, { useContext, useEffect } from 'react';
import { StyledButton, StyledHoverRow } from '../../styles/global-style';

import { ApplicationContext } from '../../context/applicationContext';
import { DxcTable } from '@dxc-technology/halstack-react';
import { EyeIcon } from '../../assets/svg';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PartyRoleTable = (props: { roles: Array<any> }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const applicationContext = useContext(ApplicationContext);

    useEffect(() => {
        // Nothing to do
    }, 
    [props.roles, applicationContext]
    );
    
    const goToClientView = (item: any) => {
        axios.get(item.href, { headers: applicationContext.headers }).then((partyRoleResponse) => {
            if (
                partyRoleResponse &&
                partyRoleResponse.data._links &&
                partyRoleResponse.data._links['party_role:person'] &&
                partyRoleResponse.data._links['party_role:person'].href
            ) {
                axios
                    .get(partyRoleResponse.data._links['party_role:person'].href, {
                        headers: applicationContext.headers,
                    })
                    .then((personResponse) => {
                        if (personResponse && personResponse.data['person:client_number'])
                            history.push('/clientView/person/' + personResponse.data['person:client_number'], {
                                clientData: personResponse.data,
                            });
                    });
            } else if (
                partyRoleResponse &&
                partyRoleResponse.data._links &&
                partyRoleResponse.data._links['party_role:organization'] &&
                partyRoleResponse.data._links['party_role:organization'].href
            ) {
                axios
                    .get(partyRoleResponse.data._links['party_role:organization'].href, {
                        headers: applicationContext.headers,
                    })
                    .then((orgResponse) => {
                        if (orgResponse && orgResponse.data['organization:client_number'])
                            history.push('/clientView/organization/' + orgResponse.data['organization:client_number'], {
                                clientData: orgResponse.data,
                            });
                    });
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
