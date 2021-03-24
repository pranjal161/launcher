import React from "react";
import routes from '../../routes';
import { DxcButton } from "@dxc-technology/halstack-react";
import { useHistory } from 'react-router-dom';

const Training = () => {
    const trainingRoutes = routes.find((route: any) => route['name'] === 'training');
    const childRoutes = trainingRoutes && trainingRoutes.routes ? trainingRoutes.routes : [];
    const history = useHistory();

    const jumpToTraining = (path: string) => {
        history.push(path);
    }

    return (
        <>
            {
                childRoutes.map((route: any, index: number) => 
                    <DxcButton
                        key={index}
                        label={route.name}
                        onClick={() => jumpToTraining(route.path)}
                        margin="xxsmall"
                    />
                )
            }
        </>
    );
};

export default Training;
