import ConsultationPanels from "./ConsultationPanels";
import React from "react";
import {findByTestAttr} from "../../test/testUtils";
import  {shallow} from "enzyme";

const defaultProps = {}

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<ConsultationPanels {...setupProps}/>)
}

describe('Consultation panels', () => {
    test("renders without errors", () => {
        const wrapper = setup({})
        const component = findByTestAttr(wrapper, 'content')
        expect(component.length).toBe(1)
    })

    test("has to collapse icon", () => {
        const wrapper = setup({})
        const component = findByTestAttr(wrapper, 'toggle')
        expect(component.length).toBe(1)
    })

    test("has to header", () => {
        const wrapper = setup({})
        const component = findByTestAttr(wrapper, 'header')
        expect(component.length).toBe(1)
    })

    test("has to toolbar", () => {
        const wrapper = setup({})
        const component = findByTestAttr(wrapper, 'toolbar')
        expect(component.length).toBe(1)
    })

    test("has to content", () => {
        const wrapper = setup({})
        const component = findByTestAttr(wrapper, 'content')
        expect(component.length).toBe(1)
    })
})
