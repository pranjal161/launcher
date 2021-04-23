import "./Timeline.scss";

import Item from './components/Item';
import React from 'react';
import moment from 'moment';
import { useTranslation } from "react-i18next";

interface ITimeline {
    ticket: any,
    users: any,
    basketName: string
}

const Timeline: React.FC<ITimeline> = ({ ticket, users, basketName = "Add basketName" }: ITimeline) => {

    const [sortTicket, setSortTicket] = React.useState<any>(null);
    const { t } = useTranslation();

    // Here we sort the ticket in DESC
    React.useEffect(() => {
        if (ticket) {
            const history = { ...ticket.history };
            let sortedArr: any[] = [];

            Object.keys(history).map((data) => {
                sortedArr = [...sortedArr, history[data]];
                return sortedArr;
            });

            sortedArr.sort((a: any, b: any) => (b.metadata?.timestamp) - (a.metadata?.timestamp));

            let arrByDate: any = [];

            sortedArr.map((data) => {
                const date = moment(new Date(data.metadata?.timestamp)).format("DD/MM/YYYY");
                if (!arrByDate[date]) {
                    arrByDate = { ...arrByDate, [date]: [] };
                }
                arrByDate[date] = [...arrByDate[date], data];
                return arrByDate;
            });
            setSortTicket(arrByDate);
        }
    }, [ticket]);

    return (
        <div className="timeline-container" data-test="timeline-component">
            {
                sortTicket ?
                    (
                        Object.keys(sortTicket).map((data: any, i: number) => (
                            <div className="timeline-item-container" key={i} data-test="timeline-item-container">

                                {
                                    data === moment(new Date()).format("DD/MM/YYYY") ?
                                        <p className="title-date">{t('timeline_today')}</p>
                                        :
                                        <p className="title-date">{moment(sortTicket[data][0].metadata.timestamp).fromNow(true)}</p>
                                }
                                {
                                    sortTicket[data].length > 1 ?
                                        (
                                            sortTicket[data].map((dataElement: any, i: number) => (
                                                <Item key={i} item={dataElement} users={users} basketName={basketName} />
                                            ))
                                        )
                                        :
                                        (
                                            <Item item={sortTicket[data][0]} users={users} basketName={basketName} />
                                        )
                                }
                            </div>
                        )
                        )
                    )
                    :
                    (
                        <>
                            <p>{t('timeline_empty')}</p>
                        </>
                    )
            }
        </div>
    )
};

export default Timeline;
