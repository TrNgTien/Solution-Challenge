import { PaginateResult } from '../../../../bounded-context/type';
import { Query } from '../query';

export async function paginate<T = any>(query: Query) {
  const { offset, limit } = query.options;

  if (!offset && offset !== 0) { throw Error('missing offset'); }
  if (!limit) { throw Error('missing limit'); }

  const data = await this.findAndCountAll(query.options);

  const result: PaginateResult<T> = {
    docs: data.rows,
    total: data.count,
    limit,
    offset,
  };

  return result;
}
