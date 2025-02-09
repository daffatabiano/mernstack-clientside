import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { handlePutLifecycle } from '../../../utils/apiHandlers';
const BASE_URL = import.meta.env.VITE_API_URL;

const putReducers = createApi({
  reducerPath: 'put-api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', token);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateCategory: builder.mutation({
      query: (b, id) => ({
        url: `/category/${id}`,
        method: 'PUT',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handlePutLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Update Success',
          errorTitle: 'Update Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    updateCustomerProfile: builder.mutation({
      query: (b) => ({
        url: `/update-customer/${b.id}`,
        method: 'PUT',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handlePutLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Update Success',
          errorTitle: 'Update Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    collectOrdersByAdmin: builder.mutation({
      query: (b, id) => ({
        url: `/collect-orders/${id}`,
        method: 'PUT',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handlePutLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Collected',
          errorTitle: 'Collect Fail',
        });

        if (arg.callback) arg.callback();
      },
    }),
    updateProduct: builder.mutation({
      query: (b, id) => ({
        url: `/product/${id}`,
        method: 'PUT',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handlePutLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Update Success',
          errorTitle: 'Update Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    updateAdminProfile: builder.mutation({
      query: (b, id) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handlePutLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Update Success',
          errorTitle: 'Update Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    updatePasswordAdmin: builder.mutation({
      query: (b, id) => ({
        url: `/user-change-password/${id}`,
        method: 'PUT',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handlePutLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Update Success',
          errorTitle: 'Update Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    updateVoucher: builder.mutation({
      query: (b, id) => ({
        url: `/voucher/${id}`,
        method: 'PUT',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handlePutLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Update Success',
          errorTitle: 'Update Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
  }),
});

export const {
  useUpdateCategoryMutation,
  useUpdateCustomerProfileMutation,
  useCollectOrdersByAdminMutation,
  useUpdateProductMutation,
  useUpdateAdminProfileMutation,
  useUpdatePasswordAdminMutation,
  useUpdateVoucherMutation,
} = putReducers;
export const putMiddleware = putReducers.middleware;

export default putReducers;
