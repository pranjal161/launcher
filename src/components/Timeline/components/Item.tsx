import "./Item.scss";

import { DescriptionIcon } from '../../../assets/svg';
import React from 'react';
import moment from "moment";
import { useTranslation } from "react-i18next";

interface IItem {
    item: any,
    users: any,
    basketName: string
}

const Item: React.FC<IItem> = ({ item = null, users, basketName }: IItem) => {

    const { t } = useTranslation();

    if (item) {
        return (
            <div className="timeline-item-container">
                <div className="item-container">
                    <div className="draft-container">
                        <div className="circle-timeline"></div>
                        <div className="line-timeline"></div>
                    </div>
                    <div className="info-container">
                        <p className="username-item">{item.metadata.updatedByDisplay}</p>
                        <p className="time-item">
                            {moment(new Date(item.metadata.updatedISODate)).fromNow().includes("hours") ||
                                moment(new Date(item.metadata.updatedISODate)).fromNow().includes("minutes") ?
                                moment(new Date(item.metadata.updatedISODate)).fromNow() : moment(item.metadata.updatedISODate).format('DD/MM/YYYY - HH:MM')}
                        </p>
                        {
                            item.action === "addedDocument" ?
                                (<>
                                    <div className="text-icon-container" data-test="addedDocument-item">
                                        <DescriptionIcon />
                                        <p className="action-item">{t('timeline_document_added')} {basketName}</p>
                                    </div>
                                    <div className="img-container">
                                        <img className="picture-item" src={item.newValue.url} alt={item.newValue.name} />
                                        <p className="picture-name">{item.newValue.name}</p>
                                    </div>
                                </>)
                                :
                                (<div className="text-icon-container">
                                    <DescriptionIcon />
                                    {
                                        item.action === "assignedTo" && item.newValue &&
                                        <p data-test="assignedTo-item" className="action-item">{t('timeline_assigned')}<br /><span>{`'${item.metadata.updatedByDisplay}'`}</span> to <span>{`'${users[item.newValue].displayName}'`}</span></p>
                                    }
                                    {
                                        item.action === "createdBy" &&
                                        <p data-test="createdBy-item" className="action-item">{t('timeline_created')}<span>'{users[item.newValue].displayName}'</span></p>
                                    }
                                    {
                                        item.action === "ticketUpdated" &&
                                        <p data-test="ticketUpdated-item" className="action-item">{t('timeline_updated')}<span>{`'${item.metadata.updatedByDisplay}'`}</span></p>
                                    }
                                    {
                                        item.action === "removedRelatedClient" &&
                                        <p data-test="rm-related-client-item" className="action-item">{t('timeline_removed_client')} {item.newValue}</p>
                                    }
                                    {
                                        item.action === "addedRelatedClient" &&
                                        <p data-test="add-related-client-item" className="action-item">{t('timeline_added_client')} {item.newValue}</p>
                                    }
                                    {
                                        item.action === "executedActivity" &&
                                        <p data-test="executed-activity-item" className="action-item">{t('timeline_executed_1')} {item.newValue.replace(/([A-Z])/g, " $1")} {t('timeline_executed_2')}</p>
                                    }
                                </div>)
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return (null)
    }
};

export default Item;