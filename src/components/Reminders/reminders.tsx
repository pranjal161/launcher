import './reminders.scss';

import React, { useState } from 'react';

import CreateReminders from './CreateReminders/createReminders';
import Deadline from 'components/deadlineComponent/deadline';
import { DxcRadio } from '@dxc-technology/halstack-react';
import { InfoIcon } from 'assets/svg';
import WithScroll from 'components/WithScroll/WithScroll';
import { formatValue } from 'util/functions';

const Reminders = (props: { reminders: any; }) => {

    const { reminders } = props;
    const [openReminder, setOpenReminder] = useState(false);
    const onClickDialog = () => {
        setOpenReminder(false);
    };

    return (
        <>
            <WithScroll visibleHeight={'250px'}>
                {reminders && Object.values(reminders).map((reminder: any, index) => (
                    <div className="col-12 p-0 reminder-container" key={index}>
                        <div className="col-2">
                            <DxcRadio size="fillParent" />
                        </div>
                        <div className="col-8 pt-2">
                            {reminder.category}
                            <small className="col-12 p-0"><Deadline deadline={reminder.deadline} /></small>
                            <div className="col-12 p-0 sub-text">
                                <small className="col-12 p-0 text-info">{reminder.ticket}</small>
                                <small className="col-12 p-0">{reminder.description}</small>
                                <small className="col-12 p-0">{formatValue(reminder.deadline, 'date')} {reminder.time} </small>
                            </div>
                        </div>
                        <div onClick={() => setOpenReminder(true)} className="col-2 pt-2"><InfoIcon /></div>
                        {openReminder && 
                            <CreateReminders reminder={reminder} onClickDialog={onClickDialog} />
                        }
                    </div>
                ))}
            </WithScroll>
        </>
    )

}

export default Reminders;
