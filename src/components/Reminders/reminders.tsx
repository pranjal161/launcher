import './reminders.scss';

import React, { useState } from 'react';

import CreateReminders from './CreateReminders/createReminders';
import Deadline from 'components/deadlineComponent/deadline';
import { DxcCheckbox } from '@dxc-technology/halstack-react';
import { InfoIcon } from 'assets/svg';
import WithScroll from 'components/WithScroll/WithScroll';
import useDeskUsers from 'data/hooks/useDeskUsers';

const Reminders = (props: { reminders: any; }) => {

    const { reminders } = props;
    const [openReminder, setOpenReminder] = useState(false);
    const [reminderData, setReminderData] = useState();
    const { updateReminder } = useDeskUsers();
    const onClickDialog = () => {
        setOpenReminder(false);
    };

    const openSetReminder = (reminder: any) => {
        setReminderData(reminder);
        setOpenReminder(true);
    }

    const setStatus = (newValue: string, reminder:any) => {
        // to investigate: uncheck radio button
        if (newValue) {
            reminder.status = "Done";
            updateReminder(reminder);
        } else {
            reminder.status = "To Do";
            updateReminder(reminder);
        }
        
    }
    return (
        <>
            <WithScroll visibleHeight={'250px'}>
                {reminders && Object.values(reminders).map((reminder: any, index) => (
                    <div className="col-12 p-0 reminder-container" key={index}>
                        <div className="col-2">
                            <DxcCheckbox
                                size="fillParent"
                                onChange={(newValue: string) => setStatus(newValue, reminder)}
                                checked={reminder.status === 'Done' ? true : false} />
                        </div>
                        <div className="col-8 pt-2" aria-disabled={reminder.status === 'Done' ? true : false}>
                            {reminder.category}
                            <small className="col-12 p-0"><Deadline deadline={reminder.deadline} /></small>
                            <div className="col-12 p-0 sub-text">
                                <small className="p-0">{reminder.description}</small>
                                <small className="p-0">{reminder.deadline} {reminder.time} </small>
                                <small className="p-0">{reminder.ticket}</small>
                            </div>
                        </div>
                        <div onClick={() => openSetReminder(reminder)} className="col-2 pt-2"><InfoIcon /></div>
                        {openReminder &&
                            <CreateReminders reminder={reminderData} onClickDialog={onClickDialog} />
                        }
                    </div>
                ))}
            </WithScroll>
        </>
    )

}

export default Reminders;
