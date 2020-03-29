import { useMutation, HttpMethod } from './useApi';

export const useUpdateAccessPasses = () => {
  const { data: accessPass, mutate, ...others } = useMutation(
    '/registry/access-passes',
    HttpMethod.PUT,
    {
      // Transform when the API is ready
      transformer: (data) => data,
    }
  );

  const execute = (id, data) => {
    mutate({
      queryParams: {
        id,
      },
      data,
    });
  };

  return {
    data: accessPass || {},
    execute,
    ...others,
  };
};