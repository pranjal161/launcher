import React from 'react';
import moment from "moment";
import { DescriptionIcon } from '../../../assets/svg';

import "./Item.scss";

interface IItem {
    item: any,
    users: any,
    basketName: string
}

const Item:React.FC<IItem> = ({ item, users, basketName }: IItem) => {


    if (item != undefined) {
        switch (item.action) {
            case "assignedTo":
                return (
                    item && item.newValue ?
                        (<div className="timeline-item-container">
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

                                    <div className="text-icon-container">
                                        <DescriptionIcon />
                                        <p className="action-item">Change the person in charge <br /><span>'{item.metadata.updatedByDisplay}'</span> to <span>'{users[item.newValue].displayName}'</span></p>
                                    </div>

                                </div>
                            </div>
                        </div>)
                        :
                        (null)
                )


            case "ticketUpdated":
                return (
                    item &&
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


                                <div className="text-icon-container">
                                    <DescriptionIcon />
                                    <p className="action-item">{item.action.replace(/([A-Z])/g, " $1")} by {item.metadata.updatedByDisplay}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )


            case "createdBy":
                return (
                    item &&
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
                                        moment(new Date(item.metadata.updatedISODate)).fromNow() : moment(item.metadata.timestamp).format('DD/MM/YYYY - HH:MM')}
                                </p>

                                <div className="text-icon-container">
                                    <DescriptionIcon />
                                    <p className="action-item">{item.action.replace(/([A-Z])/g, " $1")} <span>'{users[item.newValue].displayName}'</span></p>
                                </div>


                            </div>
                        </div>
                    </div>
                )


            case "addedDocument":
                return (
                    item &&
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

                                <div className="text-icon-container">
                                    <DescriptionIcon />
                                    <p className="action-item">Added new document in {basketName}</p>
                                </div>
                                <div className="img-container">
                                    <img className="picture-item" src={item.newValue.url} alt={item.newValue.name} />
                                    <p className="picture-name">{item.newValue.name}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            case "removeRelatedClient" || "addedRelatedClient":
                return (
                    item &&
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


                                <div className="text-icon-container">
                                    <DescriptionIcon />
                                    <p className="action-item">{item.action.replace(/([A-Z])/g, " $1")} : {item.newValue}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            case "executedActivity":
                return (
                    item &&
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

                                <div className="text-icon-container">
                                    <DescriptionIcon />
                                    <p className="action-item">Activity {item.newValue.replace(/([A-Z])/g, " $1")} executed</p>
                                </div>


                            </div>
                        </div>
                    </div>
                )
            default:
                return (
                    <div>
                        <p>Please insert the required props</p>
                    </div>
                )
        }
    }
    else {
        return (null)
    }



};

export default Item;