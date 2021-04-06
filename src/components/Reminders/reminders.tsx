import { DxcBox } from '@dxc-technology/halstack-react';
import React from 'react';
import { formatValue } from 'util/functions';

const Reminders = (props: { reminders: any; }) => {

    const { reminders } = props;

    return (
        <>
            {/* Still under Construction */}
            {reminders && Object.values(reminders).map((reminder: any, index) => (
                <div key={index}>
                    <DxcBox margin="xxsmall" padding="xxsmall" size="fitContent">
                        <div>Description: {reminder.description}</div>  
                        <div>Deadline: {formatValue(reminder.deadline, 'date')}</div>
                        <div>Status: {reminder.status}</div>
                        <div>Time: {reminder.time}</div>
                    </DxcBox>
                </div>
            ))}
        </>
    )

}

export default Reminders;
