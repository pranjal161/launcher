export const AppConfig = {
    headers: {
        'content-type': 'application/json',
        'accept': 'application/vnd.hal+json',
        'accept-language': localStorage.getItem('i18nextLng'),
        'x-auth-username': 'vatsekov',
        'x-api-key': '48SmqcLpec3t1TO8EMzaDaamMz25pDZ469NFux41'
    },
    hostUrl: {
        defaultHostUrl: 'http://20.33.40.147:13111/csc/insurance/'
    },
    Intl: {
        locale: 'nl-NL',
        currency: 'EUR',
        DateFormat: 'en-GB'
    },
    printModeSubmissionDoc: 'xml'
}