import * as resource from 'TestData/resource';

import { render, screen } from '@testing-library/react'

import React from 'react'
import TextField from './TextField';

test('renders the text component', () => {
    render(<TextField label="ContractNumber" data={resource.resource} propertyName="contract:number" />)
    const linkElement = screen.getByTestId('text_field');
    expect(linkElement).toBeInTheDocument();
})

test ('Test value', () => {
    render(<TextField label="ContractNumber" data={resource.resource} propertyName="contract:number" />)
    const linkElement = screen.getByTestId('text_field');
    expect(linkElement).toContainHTML('PCMR000381');
})