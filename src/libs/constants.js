/*
 * constants
 * @param actions{Array} the action's type
 * @param prefix{String} the type prefix
 *
 * example
 * constants(['FETCH_EXAMPLE', 'FETCH_EXAMPLE_SUCCESS', 'FETCH_EXAMPLE_FAILED'], 'example')
 */

export default (actions, prefix = '') =>
  actions.reduce((types, action) => ({
    ...types,
    [action]: `${prefix}${action}`,
  }), {});
