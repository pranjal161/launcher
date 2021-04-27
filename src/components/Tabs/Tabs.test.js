import React from 'react';
import Tab from './components/Tab/Tab';
import TabButton from './components/TabButton/TabButton';
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
    activeTabId: defaultActiveTab
};
const tabIDObject = {
    "tabId-1": "Tab Label 1",
    "tabId-2": "Tab Label 2",
    "tabId-3": "Tab Label 3",
    "tabId-4": "Tab Label 4"
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
                        isActiveTab = {defaultActiveTab === tabId}
                        onTabCloseClick = {defaultCloseTabsClick}>
                        <div id={tabId}>
                            {tabIDObject[tabId]}
                        </div>
                    </Tab>
                ))
            }
        </Tabs>)
}

test('renders Tabs component', () => {
    const wrapper = setup();
    const component = wrapper.find(`Tabs`);
    expect(component.length).toBe(1);
});

test('render 4 tabs', () => {
    const wrapper = setup();
    const tabsChildren = wrapper.find(TabButton);
    expect(tabsChildren.length).toBe(4);
});

test('render 4 tabs with the second active', () => {
    const wrapper = setup();
    const componentExists = findByTestAttr(wrapper, "tabs-content").exists(`div#${defaultActiveTab}`);
    expect(componentExists).toBe(true);
});

test('render 4 tabs, change active tab from default', () => {
    const wrapper = setup();
    const tabsChildren = wrapper.find(TabButton);
    const lastTabIndex = defaultTabs.length - 1;
    tabsChildren.at(lastTabIndex).simulate("click");
    const componentExists = findByTestAttr(wrapper, "tabs-content").exists(`div#${defaultTabs[lastTabIndex]}`);
    expect(componentExists).toBe(true);
});

test('render 4 tabs, close last tab', () => {
    const wrapper = setup();
    const tabsChildren = wrapper.find(TabButton);
    const lastTabIndex = defaultTabs.length - 1;
    // Get the close icon and click it
    findByTestAttr(tabsChildren.at(lastTabIndex), "close-icon").simulate("click");
    wrapper.unmount();
    // Component has to be mounted 2 times, because it doesn't rerender normally in this test
    // enzyme has some issues with conditional rendering of children in method mount
    const newWrapper = setup();
    const tabsChildrenNew = newWrapper.find(TabButton);
    expect(tabsChildrenNew.length).toBe(3);
});