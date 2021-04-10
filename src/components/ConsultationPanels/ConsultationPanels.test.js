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
        const component = findByTestAttr(wrapper, 'consultation-content')
        expect(component.length).toBe(0)
    })
})
