import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
const PartyRoleTable = (props: { roles: Array<any>; }) => {

    const { t } = useTranslation();
   

    const useStyles = makeStyles(() => ({
        hover: {
            "&:hover": {
                backgroundColor: "#F7F7F7",
                cursor: "pointer"
            },
        },
    }));
    const classes = useStyles();


    return (
        <>
            { props.roles.length > 0 && (
                <DxcTable>
                    <tr>
                        <th>{t('_NAME')}</th>
                    </tr>
                    {props.roles.map((row) => (
                        <tr key={row['href']}
                            className={classes.hover}>
                            <td>{row.title}</td>
                        </tr>
                    ))}
                </DxcTable>
            )
            }
        </>
    );

}

export default PartyRoleTable;