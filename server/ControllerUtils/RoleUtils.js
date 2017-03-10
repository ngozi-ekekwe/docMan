import validateParameters from '../ControllerUtils/Utils';
import { Role } from '../models';

const requiredParameters = ['title'];
let found;

const validate = request => new Promise((resolve) => {
  if (validateParameters(request, requiredParameters)) {
    Role.findOne({ where: { title: request.body.title } })
      .then((foundRole) => {
        if (foundRole) {
          found = true;
        } else {
          found = false;
        }
        resolve(found);
      });
  } else {
    resolve('Fields Missing');
  }
});

export const indexPagination = (request, pageCount, totalCount, query) => ({
  page: Number(request.query.offset) || 1,
  page_count: Math.floor((totalCount.count + 1) / 10),
  page_size: Number(query.limit) || 10,
  total_count: totalCount.count
});


export default validate;
