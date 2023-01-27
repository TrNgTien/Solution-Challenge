import { useController } from 'rest-hooks';

import { SCRestResource } from '@rest/sc-rest-resource';

export const useResourceActions = <Params, Data = Record<string, unknown>>(Resource: typeof SCRestResource) => {
  const { fetch, invalidate } = useController();

  return {
    create: (params: Params, data: Data) => fetch(Resource.create(), params, data),
    update: (params: Params, data: Data) => fetch(Resource.update(), params, data),
    delete: (params: Params) => fetch(Resource.delete(), params),
    list: (params: Params) => fetch(Resource.list(), params),
    invalidateList: (params: Params) => invalidate(Resource.list(), params),
    invalidateDetail: (params: Params) => invalidate(Resource.detail(), params),
  };
};
