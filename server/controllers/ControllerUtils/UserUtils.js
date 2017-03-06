import Utils from '../Utils';
import { User } from '../../models';
let found

const utils = new Utils();
const requiredParameters = ['firstname', 'lastname', 'username', 'password', 'email'];

const validate  = (request) => {
	return new Promise((resolve, reject) => {
		if (utils.validateParameters(request, requiredParameters)) {
		User.findOne({
			where: {email: request.body.email}
		})
		.then((foundUser) => {
			if(foundUser) {
				found  = true;
			}
			else {
				found = false;
			}
			resolve(found);
		});
		}
		else {
			resolve('Fields Missing');
		}	
	})
}

export const indexPagination = (request,page_count, total_count, query) => {
	return({
	page: Number(request.query.offset) || null,
	page_count: Math.floor((total_count.count + 1) / 10),
	page_size: Number(query.limit) || null,
	total_count: total_count.count
	})
}

export default validate;