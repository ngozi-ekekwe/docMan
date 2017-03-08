let requestBody, parameterKeys;

	/**
	 * method to validate require parameters
	 */
  const validateParameters = (request, requiredParameters) => {
    requestBody = request.body;

    parameterKeys = Object.keys(request.body);

    try {
      requiredParameters.forEach(requiredParameter => {
      if (!(parameterKeys.indexOf(requiredParameter) > -1)) {
        throw Error('missing key');
      };
    });
      return true;
    } catch (error) {
      return false;
    };
  };

export default validateParameters;
