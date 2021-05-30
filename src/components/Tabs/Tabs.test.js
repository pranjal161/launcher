import React, { useRef } from 'react';
import TabButton, { MemoTabButton } from './components/TabButton/TabButton';

import PropTypes from 'prop-types';
import Tab from './components/Tab/Tab';
import Tabs from './Tabs';

import { findByTestAttr } from "../../test/testUtils";
import { mount } from 'enzyme';


let defaultTabs = ["tabId-1", "tabId-2", "tabId-3", "tabId-4"];
const defaultActiveTab = defaultTabs[1];
const defaultCloseTabsClick = (tabId) => {
    for(let i = 0; i < defaultTabs.length; i++) {
        if(tabId === defaultTabs[i]) {
            defaultTabs.splice(i, 1);
            break;
        }
    }
};

const defaultProps = {
    activeTabId: defaultActiveTab,
    onTabClose: defaultCloseTabsClick
};

const tabIDObject = {
    "tabId-1": "Tab Label 1",
    "tabId-2": "Tab Label 2",
    "tabId-3": "Tab Label 3",
    "tabId-4": "Tab Label 4"
};

const SimpleComponent = ({text}) => {
    // used to count the number of times the component renders
    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;

    return (
        <div>
            <p>
                Render text: {text}
            </p>
            <p
                className="render-count">
                {renderCount.current}
            </p>
        </div>
    )
};

SimpleComponent.propTypes = {
    text: PropTypes.string
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return mount(
        <Tabs {...setupProps} >
            {
                defaultTabs.map((tabId) => (
                    <Tab
                        key={tabId}
                        tabId={tabId}
                        tabLabel={tabIDObject[tabId]}
                        isActiveTab = {defaultActiveTab === tabId}>
                        <SimpleComponent text={tabId} />
                    </Tab>
                ))
            }
        </Tabs>)
}


describe('test 4 tabs component', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = setup();
    });

    afterAll(() => {
        wrapper.unmount();
    });

    test('renders Tabs component', () => {
        const component = wrapper.find(`Tabs`);
        expect(component.length).toBe(1);
    });
    
    test('render 4 tabs', () => {
        const tabButtons = wrapper.find(MemoTabButton);
        expect(tabButtons.length).toBe(4);
    });
    
    test('render 4 tabs with the second active', () => {
        const tabsContentArray = findByTestAttr(wrapper, "tab-content");
        tabsContentArray.forEach((tabDiv, index) => {
            if(index !== 1)
                expect(tabDiv.props().style).toHaveProperty('display', 'none');
            else
                expect(tabDiv.props().style).toHaveProperty('display', 'block');
        });
    });

    test('render 4 tabs, change active tab from default', () => {
        const tabsButtons = wrapper.find(TabButton);
        const lastTabIndex = defaultTabs.length - 1;
        tabsButtons.at(lastTabIndex).find('div').first().simulate('click');
        const tabsContentArray = findByTestAttr(wrapper, "tab-content");
        tabsContentArray.forEach((tabDiv, index) => {
            if(index !== lastTabIndex)
                expect(tabDiv.props().style).toHaveProperty('display', 'none');
            else
                expect(tabDiv.props().style).toHaveProperty('display', 'block');
        });
    });

    test('render 4 tabs, change active tabs, check component rerender', () => {
        const tabsButtons = wrapper.find(TabButton);
        const newTabIndex = 2;
        tabsButtons.at(newTabIndex).find('div').first().simulate('click');
        tabsButtons.at(newTabIndex - 1).find('div').first().simulate('click');
        const tabsContentCmpArray = wrapper.find(SimpleComponent);
        tabsContentCmpArray.forEach((cmp) => {
            expect(cmp.find('p.render-count').text()).toBe('1');
        });
    });

    test('render 4 tabs, close last tab', () => {
        const tabsButtons = wrapper.find(TabButton);
        const lastTabIndex = defaultTabs.length - 1;
        const lastTabCloseIcon = findByTestAttr(tabsButtons.at(lastTabIndex), 'close-icon');
        lastTabCloseIcon.find('span').simulate('click');
        // component has to be unmounted and remounted, because it doesn't receive props, 
        // but its children are rendered with map. Standard wrapper.update() doesn't work here.
        wrapper.unmount();
        wrapper = setup();
        const tabsContentCmpArray = wrapper.find(SimpleComponent);
        expect(tabsContentCmpArray.length).toBe(3);
    });
});