export function random (min, max) {
  return min + Math.random() * (max - min)
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  });
}

/**
 * Function to map over an object.
 * @param {*} obj An object to map over
 * @param {*} callback
 */
export function map (original, callback) {
  let obj = cloneDeep(original)
  for (let key in obj) {
    obj[key] = callback(key, obj[key])
  }
  return obj
}

/**
 * Function to filter an object's properties
 * @param {*} original
 * @param {*} callback
 */
export function filter (original, callback) {
  let obj = {}
  for (let key in original) {
    if (callback(key, original[key])) {
      obj[key] = original[key]
    }
  }
  return obj
}

/**
 * Function to reduce an object's or Map properties
 * @param {*} original
 * @param {*} callback
 * @param {*} accumulator
 */
export function reduce (original, callback, accumulator) {
  if (original instanceof Map) {
    for (let [key, value] of original) {
      accumulator = callback(accumulator, key, value)
    }
  } else {
    for (let key in original) {
      accumulator = callback(accumulator, key, original[key])
    }
  }
  return accumulator
}

/**
 * Function to convert file to base64
 * @param {*} file
 * @return {String} base 64
 */
export const fileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})
