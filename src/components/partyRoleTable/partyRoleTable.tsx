import { useTranslation } from "react-i18next";
import { DxcTable } from "@dxc-technology/halstack-react";
import { useHistory } from "react-router-dom";
import { get } from "../../util/api-caller";
import { EyeIcon } from '../../assets/svg';
import React from 'react';
import { StyledHoverRow, StyledButton } from '../../styles/global-style';


const PartyRoleTable = (props: { roles: Array<any> }) => {
  const { t } = useTranslation();
  const history = useHistory();
  
  const goToClientView = (item: any) => {
    get(item.href).then((partyRoleResponse) => {
      if (
        partyRoleResponse &&
        partyRoleResponse._links &&
        partyRoleResponse._links["party_role:person"] &&
        partyRoleResponse._links["party_role:person"].href
      ) {
        get(partyRoleResponse._links["party_role:person"].href).then(
          (personResponse) => {
            if (personResponse && personResponse["person:client_number"])
              history.push(
                "/clientView/person/" + personResponse["person:client_number"],
                { clientData: personResponse }
              );
          }
        );
      } else if (
        partyRoleResponse &&
        partyRoleResponse._links &&
        partyRoleResponse._links["party_role:organization"] &&
        partyRoleResponse._links["party_role:organization"].href
      ) {
        get(partyRoleResponse._links["party_role:organization"].href).then(
          (orgResponse) => {
            if (orgResponse && orgResponse["organization:client_number"])
              history.push(
                "/clientView/organization/" +
                  orgResponse["organization:client_number"],
                { clientData: orgResponse }
              );
          }
        );
      }
    });
  };

  return (
    <>
      {props.roles && props.roles.length > 0 && (
        <DxcTable>
          <tr>
            <th>{t("_NAME")}</th>
            <th>{t("_ACTIONS")}</th>
          </tr>
          {props.roles.map((row) => (
            <StyledHoverRow key={row["href"]}>
              <td>{row.title}</td>
              <td>
                {/* <Tooltip title="view"> */}
                  <StyledButton
                    aria-label="add an alarm"
                    onClick={() => goToClientView(row)}
                  >
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
