import {DxcButton} from "@dxc-technology/halstack-react";
import React from "react";
import {applyRoutes} from '../../routes';
import {useHistory} from 'react-router-dom';

const Training = (props: any): any => {
    const history = useHistory();
    const displayButton = props.location.pathname === '/Training';

    const jumpToTraining = (path: string) => {
        history.push(path);
    }

    return (
        <>
            {
                displayButton && props.route.routes.map((route: any, index: number) => <DxcButton
                    key={index}
                    label={route.name}
                    onClick={() => jumpToTraining(route.path)}
                    margin="xxsmall"
                />
                )
            }
            {applyRoutes(props.route.routes)}
        </>
    );
};

export default Training;
