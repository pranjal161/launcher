import React from "react";
import routes, {applyRoutes} from '../../routes';
import {DxcButton} from "@dxc-technology/halstack-react";
import {useHistory} from 'react-router-dom';

const Training = (props: any): any => {
    console.log('props', props)
    const trainingRoutes = routes.find((route: any) => route['name'] === 'training');
    const childRoutes = trainingRoutes && trainingRoutes.routes ? trainingRoutes.routes : [];
    const history = useHistory();

    const jumpToTraining = (path: string) => {
        history.push(path);
    }
    const displayButton = props.location.pathname === '/training'

    return (
        <>
            {
                displayButton && childRoutes.map((route: any, index: number) =>
                    <DxcButton
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
