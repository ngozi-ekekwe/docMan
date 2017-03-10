/**
 * method to validate require parameters
 * @param {Object} request object
 * @param {Object} requiredParameters object
 * @returns {Boolean} true or false
 */
const validateParameters = (request, requiredParameters) => {
  const parameterKeys = Object.keys(request.body);
  try {
    requiredParameters.forEach((requiredParameter) => {
      if (!(parameterKeys.indexOf(requiredParameter) > -1)) {
        throw Error('missing key');
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default validateParameters;
