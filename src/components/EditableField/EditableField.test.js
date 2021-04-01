import EditableField from "./EditableField";
import React from 'react';
import {shallow} from "enzyme";

const mockOnChange = jest.fn();

const defaultProps = {
    value: "Maxime",
    onChange: mockOnChange,
    fieldName: "FirstName"
};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<EditableField {...setupProps} />);
};

describe('Renders the good input for each mode', () => {
    test('Renders for mode=readOnly', () => {
        const wrapper = setup({mode: "readOnly"});
        const component = wrapper.find(`[data-test="editable-input-ro"]`);

        expect(component.exists()).toBe(true);
    });
})
//   test('Renders for mode=update', () => {
//     const wrapper = setup({ mode: "update" });
//     const component = wrapper.find(`[data-test="editable-input-up"]`);

//     expect(component.exists()).toBe(true);
//   });
//   test('Renders input directly for mode=updateOnHover && value.length === 0', () => {
//     const wrapper = setup({ mode: "updateOnHover", value: "" });
//     const component = wrapper.find(`[data-test="editable-input-uh1"]`);

//     expect(component.exists()).toBe(true);
//   });
//   test('Renders span for mode=updateOnHover && value.length > 0', () => {
//     const wrapper = setup({ mode: "updateOnHover", value: "hello" });
//     const component = wrapper.find(`[data-test="editable-input-uh2"]`);

//     expect(component.exists()).toBe(true);
//   });
// });

// test('Can modify content when click on span', () => {
//   const mockSetIsEditable = jest.fn();
//   React.useState = jest.fn(() => [false, mockSetIsEditable]);

//   const wrapper = setup({ mode: "updateOnHover", value: "hello" });
//   const component = wrapper.find(`[data-test="editable-input-uh2"]`);

//   component.simulate('click');

//   expect(mockSetIsEditable).toHaveBeenCalledWith(true);
// })
