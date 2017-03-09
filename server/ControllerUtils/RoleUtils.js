import validateParameters from '../ControllerUtils/Utils';
import { Role } from '../models'

const requiredParameters = ['title'];
let found;

const validate  = (request) => {
	return new Promise((resolve, reject) => {
		if (validateParameters(request, requiredParameters)) {
		Role.findOne({
			where: {title: request.body.title}
		})
		.then((foundRole) => {
			if(foundRole) {
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
	page: Number(request.query.offset) || 1,
	page_count: Math.floor((total_count.count + 1) / 10),
	page_size: Number(query.limit) || 1,
	total_count: total_count.count
	})
}


export default validate;