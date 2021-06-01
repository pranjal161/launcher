import { applyMiddleware, createStore } from 'redux'

import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import React from 'react'
import checkPropTypes from 'check-prop-types'
import reducers from 'store/reducers';
import { render as rtlRender } from '@testing-library/react'

const findByTestAttr = (wrapper, id) => wrapper.find(`[data-test="${id}"]`)
// eslint-disable-next-line valid-jsdoc
/**
 * Throw error if conformingProps do not pass propTypes validation.
 * @param {React.component} component - Component to check props against.
 * @param {object} conformingProps - Props we expect to conform to defined propTypes.
 */
const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop',
        component.name);
    expect(propError).toBeUndefined();
}
export { findByTestAttr, checkProps };

const thunk =
    ({ dispatch, getState }) => (next) => (action) => {
        if (typeof action === 'function') {
            return action(dispatch, getState, { getFirebase: () => null, getFirestore: () => null })
        }

        return next(action)
    }

/**
 * Render for testing with Redux store
 * @param {any} ui Component to renders
 * @param {any} initialState initialState of the store
 * @param {any} store Store
 * @param {any} renderOptions Options
 * @return {any} render
 */
function renderWithRedux(
    ui,
    {
        initialState,
        store = createStore(reducers, initialState, applyMiddleware(thunk)),
        ...renderOptions
    } = {}
) {
    const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    Wrapper.propTypes = {
        children: PropTypes.element.isRequired
    };

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { renderWithRedux }


