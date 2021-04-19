
import {ShallowWrapper, shallow} from 'enzyme';

import Dialog from './Dialog';
import React from 'react';

interface Test {
    isOpen: boolean
}

const setup:ShallowWrapper<Test> = ({isOpen, }: Test) => {
    isOpen = isOpen || false;

    return shallow(
        <Dialog />
    )
}

describe("", () => {
    test("", () => {

    });
})
