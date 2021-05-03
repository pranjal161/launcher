import './DetailWrapper.scss';

import MiddleBar from '../MiddleBar/MiddleBar';
import React from 'react';
import ViewDetails from '../ViewDetails/ViewDetails';

const DetailWrapper = (props: { ticket: any }) => {

    const { ticket } = props;
    return (
        <>
            <div className="col-12 p-0" style={{display: 'inline-flex'}}>
                <div className="col-8 p-0 divider">
                    <div className="ml-4">
                        <ViewDetails ticket={ticket} />
                    </div>
                </div>
                <div className="col-4 p-0 align-self-start">
                    <MiddleBar ticket={ticket} />
                </div>
            </div>
        </>
    )
}
export default DetailWrapper;