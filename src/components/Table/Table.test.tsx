/* eslint-disable no-duplicate-imports */

import '@testing-library/jest-dom/extend-expect';

import { cleanup, renderWithRedux, screen, waitFor, waitForElementToBeRemoved } from 'test/testUtils';

import { AppConfig } from 'config/appConfig';
import React from 'react';
import Table from './Table';
import axios from 'axios';
import { dataWithItems as postalAddressResponse } from './static/data';
import { dataWithoutItems as response } from './static/data';

afterEach(cleanup);
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Table when rendered with data', () => {

    beforeEach(async () => {

        mockedAxios.get.mockResolvedValueOnce({ data: postalAddressResponse });
        const url = AppConfig.hostUrl.defaultHostUrl + 'persons/ID-wJsQC7R2D/postal_addresses';
        const columns = [{ label: 'ID', property: 'postal_address:display_id' }];
        renderWithRedux(<Table url={url} columnId={columns} showPaginator={true} />, { initialState: {} });
        await waitForElementToBeRemoved(() => screen.getByText('No record'))
    });

    test('Table Header rendered', () => {
        const columnHeader = screen.getByRole('columnheader', {
            name: /id/i
        })
        expect(columnHeader).toBeDefined();
        const headers = screen.getAllByRole('columnheader');
        expect(headers).toHaveLength(1);

    });

    test('Table Rows rendered', () => {
        // await waitForElementToBeRemoved(() => screen.getByText('No record'))
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(3);
    })

    test('Item to have value as said', () => {
        const row1 = screen.getByRole('cell', {
            name: /preferred, private, 15 rue fleures, 75001 paris, france/i
        });
        expect(row1).toHaveTextContent('Preferred, Private, 15 RUE Fleures, 75001 PARIS, FRANCE');
        const row2 = screen.getByRole('cell', {
            name: /private, 52 rue nouvelle, 94220 charenton le pont, france/i
        });
        expect(row2).toHaveTextContent('Private, 52 RUE Nouvelle, 94220 CHARENTON LE PONT, FRANCE');
    });

    test('Paginator is not seen, but number of items and number of pages are', () => {
        const pageNumber = screen.getByText(/1 to 2 of 2/i);
        expect(pageNumber).toHaveTextContent('1 to 2 of 2');

    })

});

describe('Table when rendered without items', () => {

    beforeEach(async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: response });
        const url = AppConfig.hostUrl.defaultHostUrl + 'persons/ID-wJsQC7R2D/postal_addresses';
        const columns = [{ label: 'ID', property: 'postal_address:display_id' }];
        renderWithRedux(<Table url={url} columnId={columns} showPaginator={true} />, { initialState: {} });
        await waitFor(() => screen.getByText('No record'))

    });

    test('Table Header rendered', () => {
        const columnHeader = screen.getByRole('columnheader', {
            name: /id/i
        })
        expect(columnHeader).toBeDefined();
        const headers = screen.getAllByRole('columnheader');
        expect(headers).toHaveLength(1);

    });

    test('Table Rows rendered', () => {
        // await waitForElementToBeRemoved(() => screen.getByText('No record'))
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(2);
    })

    test('No records should be shown if there are no records', () => {
        const row = screen.getByText('No record');
        expect(row).toBeTruthy();
    });


});