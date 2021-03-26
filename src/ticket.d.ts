interface Ticket {
    uid?: string;
    number?: string;
    requestedBy: string;
    activities: object[];
    assignedTo: User;
    basketId: string;
    creatorId: string;
    creatorDisplay: string;
    title: string;
    description: string;
    receivedDate: string;
    deadlineDate: string;
    lastUpdate: string;
    relatedClients: object[];
    relatedContrats: object[];
    suggestedActivities:object;
    stages: object[];
    status: string;
    notes: object[];
    documents: object[];
    history: object[];
}

