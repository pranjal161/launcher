interface Ticket {
    uid?: string;
    number?: string;
    requestedBy: string;
    activities: Record<string, unknown>[];
    assignedTo: User;
    basketId: string;
    creatorId: string;
    creatorDisplay: string;
    title: string;
    description: string;
    receivedDate: string;
    deadlineDate: string;
    lastUpdate: string;
    relatedClients: Record<string, unknown>[];
    relatedContrats: Record<string, unknown>[];
    suggestedActivities:Record<string, unknown>;
    stages: Record<string, unknown>[];
    status: string;
    notes: Record<string, unknown>[];
    documents: Record<string, unknown>;
    history: Record<string, unknown>[];
}
