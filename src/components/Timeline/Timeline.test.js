import React from 'react';
import Timeline from './Timeline';
import { mount } from 'enzyme';

const defaultProps = {
    ticket: {
        id: "Edi1dN60i2O2eFm9zJ0f",
        deadlineDate: 1618378463911,
        requestBy: "y0skmr2bb4O9keSoLfwqOM1VMNp1",
        assignedToDisplay: "",
        description: "Test pour jeenal",
        receivedDate: 1618378463911,
        assignedTo: null,
        createdByDisplay: "Pranjal Shinde",
        title: "Test 2",
        basketId: "GMYM4alLq2VgrAs8EwtJ",
        createdBy: "y0skmr2bb4O9keSoLfwqOM1VMNp1",
        status: "pending",
        history: {
            1618585484695: {
                action: "assignedTo",
                newValue: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1",
                metadata: {
                    updatedByDisplay: "Norbert Pointu",
                    timestamp: 1618585484695,
                    updatedISODate: "2021-04-16T17:04:44+02:00",
                    updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
                }
            },
            1618735634734: {
                action: "ticketUpdated",
                metadata: {
                    updatedByDisplay: "Norbert Pointu",
                    timestamp: 1618735634734,
                    updatedISODate: "2021-04-18T10:47:14+02:00",
                    updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
                }
            },
            1618500344098: {
                action: "assignedTo",
                newValue: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1",
                metadata: {
                    updatedByDisplay: "Norbert Pointu",
                    timestamp: 1618500344098,
                    updatedISODate: "2021-04-15T17:25:44+02:00",
                    updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
                }
            }
        }
    },
    users: {
        TtmUj7hHOQbpqxkS9Xj7Nk1azpx1: {
            email: "npointu@dxc.com",
            initials: "NP",
            lastName: "POINTU",
            displayName: "Norbert Pointu"
        }
    },
    basketName: "Life",
    title: "Ticket history"

};

const sortedTicket =
{
    "18/04/2021": [
        {
            "action": "ticketUpdated",
            "metadata": {
                "updatedByDisplay": "Norbert Pointu",
                "timestamp": 1618735634734,
                "updatedISODate": "2021-04-18T10:47:14+02:00",
                "updatedBy": "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
            }
        }
    ],
    "16/04/2021": [
        {
            "action": "assignedTo",
            "newValue": "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1",
            "metadata": {
                "updatedByDisplay": "Norbert Pointu",
                "timestamp": 1618585484695,
                "updatedISODate": "2021-04-16T17:04:44+02:00",
                "updatedBy": "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
            }
        }
    ],
    "15/04/2021": [
        {
            "action": "assignedTo",
            "newValue": "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1",
            "metadata": {
                "updatedByDisplay": "Norbert Pointu",
                "timestamp": 1618500344098,
                "updatedISODate": "2021-04-15T17:25:44+02:00",
                "updatedBy": "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
            }
        }
    ]
}


const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return mount(<Timeline {...setupProps} />)
}

test('renders without error', () => {
    const wrapper = setup();
    const component = wrapper.find(`[data-test="timeline-component"]`);
    expect(component.length).toBe(1);
});

test('useEffect call setSortTicket without error', () => {
    const mockSetSortTicket = jest.fn();
    React.useState = jest.fn(() => [null, mockSetSortTicket]);

    setup();
    expect(mockSetSortTicket).toHaveBeenCalledTimes(1);
});

test("sort ticket props without error", () => {
    const mockSetSortTicket = jest.fn();
    React.useState = jest.fn(() => [null, mockSetSortTicket]);
    setup();

    expect(mockSetSortTicket).toHaveBeenCalledWith(sortedTicket);
});

test("renders without error after sorting the data", () => {
    const mockSetSortTicket = jest.fn();
    React.useState = jest.fn(() => [sortedTicket, mockSetSortTicket]);
    const wrapper = setup();

    const itemContainer = wrapper.find(`[data-test="timeline-item-container"]`);

    expect(itemContainer.length).toBe(3);
});




