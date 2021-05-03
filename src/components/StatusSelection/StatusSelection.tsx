// import { Created, Done, Error, Pending } from "assets/svg";

import { DxcSelect } from "@dxc-technology/halstack-react";
import React from 'react';

const StatusSelection = (props: any) => {

    // // eslint-disable-next-line arrow-body-style
    // const Done = () => {
    //     return (<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ff0000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
    //     );
    // };

    // // eslint-disable-next-line arrow-body-style
    // const Created = () => {
    //     return (<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ff0000"><g><rect fill="none" height="24" width="24" /></g><g><path d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z" /></g></svg>
    //     );
    // }
    // // eslint-disable-next-line arrow-body-style
    // const Pending = () => {
    //     return (<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ff0000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
    //     );
    // };
    // // eslint-disable-next-line arrow-body-style
    // const Error = () => {
    //     return (<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ff0000"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
    //     );
    // };

    const usersOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'done', label: 'Done' },
        { value: 'error', label: 'Error' },
        { value: 'created', label: 'Created' }
    ]

    return (
        <DxcSelect
            options={usersOptions}
            {...props}
        />
    );
}

export default StatusSelection;
