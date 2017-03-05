import Utils from '../Utils';
import { Document } from '../../models'

const utils = new Utils();
const requiredParameters = ['ownerId', 'title', 'content', 'access'];
let found;

const validate  = (request) => {
        if (utils.validateParameters(request, requiredParameters)) {
            Document.findOne({
                where: {title: request.body.title}
            })
            .then((foundDocument) => {
							if(foundDocument) {
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

export const indexPagination = (request,page_count, total_count, query) => {
	return({
	page: Number(request.query.offset) || null,
	page_count: Math.floor((total_count.count + 1) / 10),
	page_size: Number(query.limit) || null,
	total_count: total_count.count
	})
}


export default validate;