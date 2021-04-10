import React from "react";
import SelectEntity from "./SelectEntity";
import {findByTestAttr} from "../../../../test/testUtils";
import {shallow} from "enzyme";


const defaultProps = {}

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<SelectEntity {...setupProps}/>)
}

const entities = [{display: "contract A", id: 'contractA'}, {
    display: "contract B",
    id: 'contractB'
}, {display: "contract C", id: 'contractC'}]

describe('Consultation panels', () => {
    test("renders without errors", () => {
        const wrapper = setup({})
        const component = findByTestAttr(wrapper, 'consult-select')
        expect(component.length).toBe(1)
    })

    test("all entities are in the combobox", () => {
        const wrapper = setup({entities})
        const component = findByTestAttr(wrapper, 'consult-select')
        console.log('component.text()', component.text())
        entities.forEach((entity) => expect(component.text()).toMatch(entity.display))
    })


    test("default value is the first item", () => {
    })

})
