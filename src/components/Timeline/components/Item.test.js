import React from 'react';
import { mount } from 'enzyme';
import Item from './Item';

const defaultProps = {
    item: {
        action: "ticketUpdated",
        metadata: {
            updatedByDisplay: "Norbert Pointu",
            timestamp: 1618735634734,
            updatedISODate: "2021-04-18T10:47:14+02:00",
            updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
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
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return mount(<Item {...setupProps} />)
}

test('renders without error for ticketUpdated case', () => {
    const wrapper = setup();
    const component = wrapper.find(`[data-test="ticketUpdated-item"]`);
    expect(component.length).toBe(1);
});

test('renders without error for assignedTo case', () => {
    const item = {
        action: "assignedTo",
        metadata: {
            updatedByDisplay: "Norbert Pointu",
            timestamp: 1618735634734,
            updatedISODate: "2021-04-18T10:47:14+02:00",
            updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
        },
        newValue: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
    }
    const wrapper = setup({ item: item });
    const component = wrapper.find(`[data-test="assignedTo-item"]`);
    expect(component.length).toBe(1);
});

test('renders without error for addedDocument case', () => {
    const item = {
        action: "addedDocument",
        metadata: {
            updatedByDisplay: "Norbert Pointu",
            timestamp: 1618735634734,
            updatedISODate: "2021-04-18T10:47:14+02:00",
            updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
        },
        newValue: {
            url: "https://picture.com",
            type: "image/png",
            name: "picture.png"
        }
    }
    const wrapper = setup({ item: item });
    const component = wrapper.find(`[data-test="addedDocument-item"]`);
    expect(component.length).toBe(1);
});

test('renders without error for createdBy case', () => {
    const item = {
        action: "createdBy",
        metadata: {
            updatedByDisplay: "Norbert Pointu",
            timestamp: 1618735634734,
            updatedISODate: "2021-04-18T10:47:14+02:00",
            updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
        },
        newValue: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
    }
    const wrapper = setup({ item: item });
    const component = wrapper.find(`[data-test="createdBy-item"]`);
    expect(component.length).toBe(1);
});

test("don't crash if no item props", () => {
    const item = {

    }
    const wrapper = setup({ item: item });
    const component = wrapper.find(`[data-test="error-item"]`);
    expect(component.length).toBe(1);
});

test("return null if no item props", () => {
    const item = undefined;
    const wrapper = setup({ item: item });
    
    expect(wrapper.isEmptyRender()).toBe(true);
});






