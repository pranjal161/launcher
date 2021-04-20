import React from 'react';

import Timeline from "./Timeline";

const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Timeline {...setupProps} />)
  }


  test('renders without error', () => {
    const wrapper = setup();
    // const component = findByTestAttr(wrapper, 'component-congrats');
    const component =  wrapper.find(`[data-test="timeline-component"]`)
    expect(component.length).toBe(1);
  });