/**
 * Searches an array of objects for an object with a matching 'id' property 
 * and returns the value of a specified key from that object.
 *
 * @param searchId    The value to match against the 'id' property of each 
 *                    object in the array.
 * @param targetKey   The key whose value should be returned from the matched 
 *                    object.
 * @param items       The array of objects to search through.
 * @returns           The value of the targetKey from the matched object,
 *                    or undefined if no match is found.
 */

const getFieldById = (searchId: any, targetKey: any, items: any[]) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id == searchId) {
      return items[i][targetKey];
    }
  }
  // If ran list found nothing.
  return undefined;
};

export default getFieldById;
