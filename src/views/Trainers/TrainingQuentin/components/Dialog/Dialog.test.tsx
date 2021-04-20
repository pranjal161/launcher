import { checkProps, findByTestAttr } from '../../../../../test/testUtils';

import Dialog from "./Dialog";
import React from "react";
import {shallow} from 'enzyme';

const Content = (props: {onChange?: Function}) => {
    props.onChange = jest.fn();

    return (
        <>
            <span>Test</span>
        </>
    );
}

const Title = (props: {value: string}) => (
    <div data-test="component-title">
        <h2>{props.value}</h2>
    </div>
);

const setup = (props: {isOpen: boolean, title?: any, onApply?: Function, onCancel?: Function, closeIconIsVisible?: boolean}) => {

    props.isOpen = props.isOpen || false;
    props.title = props.title || "Test";
    props.onApply = props.onApply || jest.fn();
    props.onCancel = props.onCancel || jest.fn();
    props.closeIconIsVisible = props.closeIconIsVisible || false;

    return shallow(
        <Dialog
            closeIconIsVisible={props.closeIconIsVisible}
            onCancel={props.onCancel}
            onApply={props.onApply}
            title={props.title}
            isOpen={props.isOpen}>
            <Content />
        </Dialog>
    )
}

test("Dialog renders without crashing", () => {
    const wrapper = setup({isOpen: true});
    const dialogComponent = findByTestAttr(wrapper, "component-dialog");

    expect(dialogComponent.length).toBe(1);
});

test("Does not throw warning with expected props", () => {
    const mockFunc = jest.fn();
    checkProps(Dialog, {isOpen: true, title: "Test", onApply: mockFunc, onCancel: mockFunc, closeIconIsVisible: false});
});

describe("Dialog component is displayed", () => {
    let wrapper: any;
    let mockSetSelectedValue = jest.fn();

    beforeEach(() => {
        mockSetSelectedValue.mockClear();
        React.useState = jest.fn(() => ["", mockSetSelectedValue]);
        wrapper = setup({isOpen: true, title: Title});
    });

    test("Children component renders without crashing", () => {
        const contentComponent = findByTestAttr(wrapper, "component-content");
        expect(contentComponent.length).toBe(1);
    });

    test("Title props is rendered as component", () => {
        const titleComponent = findByTestAttr(wrapper, "component-title");
        expect(titleComponent.length).toBe(1);
    });

    test("onApply event send selected value", () => {
        const buttonApply = findByTestAttr(wrapper, "component-button-apply");
        buttonApply.simulate('click', {target: {value:"test"}});
        expect(mockSetSelectedValue).toHaveBeenCalledTimes(1);
    });

    test("state is cleared after onCancel event called", () => {
        const buttonCancel = findByTestAttr(wrapper, "component-button-cancel");
        buttonCancel.simulate('click', {preventDefault() {}});
        expect(mockSetSelectedValue).toHaveBeenCalledTimes(1);
    });
});

test("Dialog component is not displayed", () => {
    const wrapper = setup({isOpen: false});
    const dialogComponent = findByTestAttr(wrapper, "component-dialog");

    expect(dialogComponent.length).toBe(0);
});

