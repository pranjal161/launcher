import React from 'react';
import ViewDetails from '../ViewDetails/ViewDetails';
import MiddleBar from '../MiddleBar/MiddleBar';
import './DetailWrapper.scss';

const DetailWrapper = (props: { ticket: any }) => {

    const { ticket } = props;
    return (
        <>
            <div className="row">
                <div className="col-9 min-vh-100 divider">
                    <div className="ml-2">
                        <ViewDetails ticket={ticket} />
                    </div>
                </div>
                <div className="col-3 min-vh-100">
                    <MiddleBar />
                </div>

            </div>
        </>
    )
}
export default DetailWrapper;