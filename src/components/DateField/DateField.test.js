import * as resource from 'TestData/resource';

import { render, screen } from '@testing-library/react'

import DateField from './DateField'
import React from 'react'

test('renders the Date component', () => {
    render(<DateField label="ContractRenewalDate" data={resource.resource} propertyName="contract:renewal_date" />)
    const linkElement = screen.getByTestId('date_field');
    expect(linkElement).toBeInTheDocument()
})

test ('Test value', () => {
    render(<DateField label="ContractRenewalDate" data={resource.resource} propertyName="contract:renewal_date" />)
    const linkElement = screen.getByTestId('date_field');
    expect(linkElement).toContainHTML('5/1/2022');
})