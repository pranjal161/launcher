import * as resource from 'TestData/resource';

import { render, screen } from '@testing-library/react'

import React from 'react'
import TextField from './TextField';

test('renders the text component', () => {
    render(<TextField data={resource.resource} propertyName="contract:number" />)
    const linkElement = screen.getByTestId('W4Fb6FAqu_contract:number');
    expect(linkElement).toBeInTheDocument();
})

test ('Test value', () => {
    render(<TextField data={resource.resource} propertyName="contract:number" />)
    const linkElement = screen.getByTestId('W4Fb6FAqu_contract:number');
    expect(linkElement).toContainHTML('PCMR000381');
})