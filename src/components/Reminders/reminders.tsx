import { DxcBox } from '@dxc-technology/halstack-react';
import React from 'react';

const Reminders = (props: { reminders: any; }) => {

    const { reminders } = props;

    return (
        <>
            {/* Still under Construction */}
            {reminders && Object.values(reminders).map((reminder: any, index) => (
                <div className="row" key={index}>
                    <DxcBox margin="xxsmall" padding="xxsmall" size="fitContent">
                        <div className="col-12">Description: {reminder.description}</div> 
                    </DxcBox>
                </div>
            ))}
        </>
    )

}

export default Reminders;
