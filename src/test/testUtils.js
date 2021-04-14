import checkPropTypes from 'check-prop-types'


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
export {findByTestAttr, checkProps}

