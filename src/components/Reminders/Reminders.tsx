import './Reminders.scss';

import React, { useState } from 'react';

import CreateReminders from './components/CreateReminders/CreateReminders';
import Deadline from 'components/Deadline/Deadline';
import { DxcCheckbox } from '@dxc-technology/halstack-react';
import { InfoIcon } from 'assets/svg';
import { PanelBaskets } from 'views/MyTickets/StyledBaskets';
import { StyledButton } from 'styles/global-style';
import useDeskUsers from 'data/hooks/useDeskUsers';
import { useTranslation } from 'react-i18next';

const Reminders = (props: { reminders: any; }) => {
    const { t } = useTranslation();
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

    const setStatus = (newValue: string, reminder: any) => {
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
            <div className="reminder">
                <PanelBaskets.title> {t('_REMINDERS')}</PanelBaskets.title>
                <StyledButton className="buttonBorder border w-100" onClick={() => setOpenReminder(true)}>+</StyledButton>
                {openReminder &&
                    <CreateReminders onClickDialog={onClickDialog} />
                }

                {/* <WithScroll visibleHeight={'250px'}> */}
                <PanelBaskets.ParentList className="mt-2 pr-1 pl-2">
                    {reminders && Object.values(reminders).map((reminder: any, index) => (
                        <div className="col-12 p-0 reminder-container" key={index}>
                            <div className="col-2 p-0 pr-1">
                                <DxcCheckbox
                                    size="fillParent"
                                    onChange={(newValue: string) => setStatus(newValue, reminder)}
                                    checked={reminder.status === 'Done'} />
                            </div>
                            <div className="col-8 pt-2 reminder-category" aria-disabled={reminder.status === 'Done'}>
                                {reminder.category}
                                <small className="col-12 p-0 reminder-deadline"><Deadline deadline={reminder.deadline} /></small>
                                <div className="col-12 p-0 sub-text">
                                    <small className="p-0">{reminder.description}</small>
                                    <small className="p-0">{reminder.deadline} {reminder.time} </small>
                                    <small className="p-0">{reminder.ticket}</small>
                                </div>
                            </div>
                            <div onClick={() => openSetReminder(reminder)} className="col-2 p-0 pt-2"><InfoIcon /></div>
                            {openReminder &&
                                <CreateReminders reminder={reminderData} onClickDialog={onClickDialog} />
                            }
                        </div>
                    ))}
                </PanelBaskets.ParentList>
                {/* </WithScroll> */}
            </div>
        </>
    )

}

export default Reminders;
