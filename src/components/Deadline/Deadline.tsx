import './Deadline.scss';

import { NotificationIcon } from 'assets/svg';

import React from 'react';
import { useTranslation } from 'react-i18next';

const OverDue = (props:{value:any}) => (
    <svg id="Reminder" xmlns="http://www.w3.org/2000/svg" width="143" height="32" viewBox="0 0 143 32">
        <rect id="Rectangle_49" width="143" height="32" rx="4" fill="#fee"/>
        <text id="Overdue_3_days" transform="translate(32 21)" fill="#cf1124" fontSize="14" ><tspan x="0" y="0">{props.value}</tspan></text>
        <g id="notifications_active-24px" transform="translate(10 8)">
            <path id="Tracé_108" d="M0,0H16V16H0Z" fill="none"/>
            <path id="Tracé_109" d="M8,14a1.192,1.192,0,0,0,1.2-1.179H6.8A1.192,1.192,0,0,0,8,14Zm3.593-3.538V7.513A3.593,3.593,0,0,0,8.9,3.786v-.4a.9.9,0,0,0-1.8,0v.4A3.6,3.6,0,0,0,4.407,7.513v2.949l-1.2,1.179v.59H12.79v-.59Zm-1.2.59H5.6V7.513a2.408,2.408,0,1,1,4.79,0ZM5.353,3.432,4.5,2.588A6.121,6.121,0,0,0,2.03,7.218h1.2A4.963,4.963,0,0,1,5.353,3.432Zm7.419,3.786h1.2A6.159,6.159,0,0,0,11.5,2.588l-.85.843A4.992,4.992,0,0,1,12.772,7.218Z" fill="#cf1124"/>
        </g>
    </svg>
)

const DueTo = (props:{value:any}) => (
    <svg id="Reminder" xmlns="http://www.w3.org/2000/svg" width="130" height="32" viewBox="0 0 130 32">
        <rect id="Rectangle_49" data-name="Rectangle 49" width="130" height="32" rx="4" fill="#fffbea"/>
        <text id="Due_in_2_days" data-name="Due in 2 days" transform="translate(32 21)" fill="#cb6e17" fontSize="14"><tspan x="0" y="0">{props.value}</tspan></text>
        <g id="notifications_active-24px" transform="translate(10 8)">
            <path id="Tracé_108" data-name="Tracé 108" d="M0,0H16V16H0Z" fill="none"/>
            <path id="Tracé_109" data-name="Tracé 109" d="M8,14a1.192,1.192,0,0,0,1.2-1.179H6.8A1.192,1.192,0,0,0,8,14Zm3.593-3.538V7.513A3.593,3.593,0,0,0,8.9,3.786v-.4a.9.9,0,0,0-1.8,0v.4A3.6,3.6,0,0,0,4.407,7.513v2.949l-1.2,1.179v.59H12.79v-.59Zm-1.2.59H5.6V7.513a2.408,2.408,0,1,1,4.79,0ZM5.353,3.432,4.5,2.588A6.121,6.121,0,0,0,2.03,7.218h1.2A4.963,4.963,0,0,1,5.353,3.432Zm7.419,3.786h1.2A6.159,6.159,0,0,0,11.5,2.588l-.85.843A4.992,4.992,0,0,1,12.772,7.218Z" fill="#cb6e17"/>
        </g>
    </svg>

)

const DayLeft = (props:{value:any}) => (
    <svg id="Reminder" xmlns="http://www.w3.org/2000/svg" width="115" height="35" viewBox="0 0 115 35">
        <rect id="Rectangle_49" data-name="Rectangle 49" width="115" height="35" rx="4" fill="#f5f7fa"/>
        <g id="Composant_21" data-name="Composant 21" transform="translate(10 11)">
            <path id="Tracé_66" data-name="Tracé 66" d="M8.993,2A7,7,0,1,0,16,9,7,7,0,0,0,8.993,2ZM9,14.6A5.6,5.6,0,1,1,14.6,9,5.6,5.6,0,0,1,9,14.6Zm.35-9.1H8.3V9.7L11.975,11.9l.525-.861L9.35,9.175Z" transform="translate(-2 -2)" fill="#243b53"/>
        </g>
        <text id="_10_days_left" data-name="10 days left" transform="translate(32 23)" fill="#243b53" fontSize="14"><tspan x="0" y="0">{props.value}</tspan></text>
    </svg>

)


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
                <div title={deadline} >
                    {diffInDays >= 3 && (
                        <DayLeft value={t('_DAYS_LEFT', {count :Math.abs(diffInDays)}) }/>
                    )}
                    {diffInDays > 0 && diffInDays < 3 && (
                        <div className="gentle">
                            <DueTo value={t('_DAYS_DUE', {count :Math.abs(diffInDays)}) }/>
                        </div>
                    )}
                    {diffInDays < 0 && (
                        <OverDue value={ t('_DAYS', {count :Math.abs(diffInDays)})}/>
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
