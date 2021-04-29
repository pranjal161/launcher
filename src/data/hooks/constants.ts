const person = {
    schema: 'persons',
    rel: 'search',
    searchBy: [
        { value: 'person:birth_date', label: 'DOB' },
        { value: 'person:first_name_normalized', label: 'First Name' },
        { value: 'person:last_name', label: 'Last Name' },
        { value: 'person:client_number', label: 'Client Number' },
        { value: 'person:123', label: '123' }
    ]
};

const contract = {
    schema: 'contracts',
    rel: 'search',
    searchBy: [
        { value: 'contract:number', label: 'Contract Number' },
        { value: 'contract:status', label: 'Contract Status' }
    ]
};

const ticket = {
    schema: 'tickets'
};

export const config: any = {
    person: person,
    contract: contract,
    ticket: ticket
};