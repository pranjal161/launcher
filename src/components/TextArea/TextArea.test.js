import * as resource from 'TestData/resource';

import { render, screen } from '@testing-library/react'

import React from 'react'
import TextArea from './TextArea';

test('renders the text area component', () => {
    render(<TextArea data={resource.resource} propertyName="contract:product_label" />)
    const linkElement = screen.getByTestId('W4Fb6FAqu_contract:product_label');
    expect(linkElement).toBeInTheDocument();
})

test ('Test value', () => {
    render(<TextArea data={resource.resource} propertyName="contract:product_label" />)
    const linkElement = screen.getByTestId('W4Fb6FAqu_contract:product_label');
    expect(linkElement).toContainHTML('Multi risk multi type risk for individuals');
})