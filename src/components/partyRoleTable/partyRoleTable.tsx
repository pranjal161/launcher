import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { DxcTable } from "@dxc-technology/halstack-react";
import { useHistory } from "react-router-dom";
import { get } from "../../util/api-caller";
import IconButton from "@material-ui/core/IconButton";
import EyeIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";

const PartyRoleTable = (props: { roles: Array<any> }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const useStyles = makeStyles(() => ({
    hover: {
      "&:hover": {
        backgroundColor: "#F7F7F7",
        cursor: "pointer",
      },
    },
  }));
  const classes = useStyles();

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
          (personResponse) => {
            if (personResponse && personResponse["organization:client_number"])
              history.push(
                "/clientView/organization/" +
                  personResponse["organization:client_number"],
                { clientData: personResponse }
              );
          }
        );
      }
    });
  };

  return (
    <>
      {props.roles.length > 0 && (
        <DxcTable>
          <tr>
            <th>{t("_NAME")}</th>
            <th>{t("_ACTIONS")}</th>
          </tr>
          {props.roles.map((row) => (
            <tr key={row["href"]} className={classes.hover}>
              <td>{row.title}</td>
              <td>
                <Tooltip title="view">
                  <IconButton
                    aria-label="add an alarm"
                    onClick={() => goToClientView(row)}
                  >
                    <EyeIcon />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </DxcTable>
      )}
    </>
  );
};

export default PartyRoleTable;
