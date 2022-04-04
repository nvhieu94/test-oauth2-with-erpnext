const miscUtils = {

  /** Get gender name */
  getGenderName: gender => {
    let genderName = ''
    switch (gender) {
      case 1:
        genderName = 'Male'
        break
      case 2:
        genderName = 'Female'
        break
      case 3:
        genderName = 'Other'
        break
      default:
        genderName = undefined
        break
    }
    return genderName
  },

  /** Check nullish */
  isNullish: value => {
    return value === undefined || value === null || value === ''
  },

  /**
   * @param valueCompare value Compare
   * @param keyCompare
   * @param field Field needs to get value
   * @param array  List item
   */
  getValueOfArrayByKey: (valueCompare,keyCompare, field, array) => {
    let value = null
    if (array) {
     let findItem = array.find(item => item[keyCompare] === valueCompare);
     if(findItem) value = findItem[field]
    }
    return value
  },
}

export default miscUtils
