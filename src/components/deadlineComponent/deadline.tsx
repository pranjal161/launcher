import './deadline.scss';

import { NotificationIcon, TimeIcon } from 'assets/svg';

import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 
 * @param {any} deadline 
 * Deadline date format should be dd-mm-yyyy 
 * Performing split to convert the coming string dd-mm-yyyy to mm-dd-yyyy as newDate() does not accept dd-mm-yyyy
 */

const Deadline = (props: { deadline: any; }) => {
    const { t } = useTranslation();
    const { deadline } = props;
    const date = deadline ? deadline.split('-') : '';
    const newDate = date ? date[2] + '-' + date[1] + '-' + date[0] : '';
    const currentDate = new Date();
    const deadlineDate = new Date(newDate);
    let diffInDays;
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const utc2 = Date.UTC(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate());
    diffInDays = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    if (diffInDays.valueOf() === 0) {
        diffInDays = 0;
    }
    return (
        <>
            {deadline && diffInDays !== undefined && (
                <div title={deadline} className="deadline-container">
                    {diffInDays >= 3 && (
                        <div className="normal">
                            <TimeIcon /> {Math.abs(diffInDays)} {t('_DAYS_LEFT')}
                        </div>
                    )}
                    {diffInDays > 0 && diffInDays < 3 && (
                        <div className="gentle">
                            <NotificationIcon /> {t('_DUE_IN')} {Math.abs(diffInDays)} {t('_DAYS')}
                        </div>
                    )}
                    {diffInDays < 0 && (
                        <div className="high">
                            <NotificationIcon /> {t('_OVERDUE')} {Math.abs(diffInDays)} {t('_DAYS')}
                        </div>
                    )}
                    {diffInDays.valueOf() === 0 && (
                        <div className="high">
                            <NotificationIcon /> Today
                        </div>
                    )}
                </div>
            )}
        </>
    )
}



export default Deadline;