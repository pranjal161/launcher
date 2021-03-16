interface Ticket {
    uid?: string;
    number?: string;
    requestedBy:string;
    activityId:string;
    assignedToList:User[];
    creatorId:string;
    title: string;
    description:string;
    receivedDate:string;
    deadlineDate:string;
    lastUpdate:string;
    relatedClients:object[];
    relatedContrats:object[];
    stages:object[];
    status:string;
    notes:object[];
    documents:object[];
    history:object;
}

