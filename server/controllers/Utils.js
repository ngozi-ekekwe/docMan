let requestBody, parameterKeys;

class Utils  {
  /**
  * request {Object} Http Request Object
  * requiredParameters {Array} Required Paremeters in the body of request
  * @return Boolean
  **/

  validateParameters(request, requiredParameters) {

    const requestBody = request.body;

    const parameterKeys = Object.keys(request.body);

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

  validateDocument(request) {
    Document.findOne({
      where: {title: request.body.title}
    })
  }
};

export default Utils;
