export const TabbedLinksArray = [
    {label: "My Tickets", path: "/Tickets"},
    {label: "Baskets", path: "/Baskets"},
    {label: "Search", path: "/ContractSearch"}
];

export const TabbedLinksLabels = TabbedLinksArray.map((TabbedLink) => ({label: TabbedLink.label}));