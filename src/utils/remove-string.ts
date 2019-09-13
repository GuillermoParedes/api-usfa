/**
 * @description Replace string to other
 * @param value
 */
export const removeString = (value: string = '') => {
  console.log('removeString', value);
  return value.replace(/_normal/g, '');
};
