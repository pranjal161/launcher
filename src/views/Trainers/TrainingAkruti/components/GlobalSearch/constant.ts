
export const searchInputsArray: Array<{entity: string, schema: string, rel?: string, searchBy?: Array<{value: string, label: string}>}> = [
    {
        entity: 'Person',
        schema: 'persons',
        rel: 'search',
        searchBy: [
            { value: 'person:birth_date', label: 'DOB' },
            { value: 'person:first_name_normalized', label: 'First Name' },
            { value: 'person:last_name', label: 'Last Name' },
            { value: 'person:client_number', label: 'Client Number' },
            { value: 'person:123', label: '123' }
        ]
    },
    {
        entity: 'Contract',
        schema: 'contracts',
        rel: 'search',
        searchBy: [
            { value: 'contract:number', label: 'Contract Number' },
            { value: 'contract:status', label: 'Contract Status' }
        ]
    },
    {
        entity: 'Ticket',
        schema: 'tickets'
    }
];