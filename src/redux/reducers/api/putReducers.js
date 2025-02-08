import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { handlePutLifecycle } from '../../../utils/apiHandlers';
const BASE_URL = import.meta.env.VITE_API_URL;

const putReducers = createApi({
  reducerPath: 'put-api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    updateCustomerProfile: builder.mutation({
      query: (b) => ({
        url: `/update-customer/${b.id}`,
        method: 'PUT',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await handlePutLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Update Success',
          errorTitle: 'Update Failed',
        });
        if (arg.callback) arg.callback();
        return res;
      },
    }),
    collectOrdersByAdmin: builder.mutation({
      query: (b, id) => ({
        url: `collect-orders/${id}`,
        method: 'PUT',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await handlePutLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Collected',
          errorTitle: 'Collect Fail',
        });

        if (arg.callback) arg.callback();
        return res;
      },
    }),
  }),
});

export const { useUpdateCustomerProfileMutation } = putReducers;
export const putMiddleware = putReducers.middleware;

export default putReducers;
