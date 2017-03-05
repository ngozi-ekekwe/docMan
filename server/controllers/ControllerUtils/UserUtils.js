import Utils from '../Utils';
import { User } from '../../models';
let found

const utils = new Utils();
const requiredParameters = ['firstname', 'lastname', 'username', 'password', 'email'];

const validate  = (request) => {
        if (utils.validateParameters(request, requiredParameters)) {
            User.findOne({
                where: {email: request.body.email}
            })
            .then((foundUser) => {
                if(foundUser) {
                    found  = true;
                }
            })
                if (found) {
                    return true
                }

                else {
                    return false
                }
                    
        } else {
					return 'Fields Missing';
				}

}

export default validate;