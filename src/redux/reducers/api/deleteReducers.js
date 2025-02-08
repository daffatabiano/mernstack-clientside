import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { handleQueryLifecycle } from '../../../utils/apiHandlers';
const BASE_URL = import.meta.env.VITE_API_URL;

const deleteReducers = createApi({
  reducerPath: 'delete-api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    categoryDelete: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Delete Success',
          errorTitle: 'Delete Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    ordersDelete: builder.mutation({
      query: () => ({
        url: `/orders/cashier/clear-history-orders`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Delete Success',
          errorTitle: 'Delete Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    productDelete: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Delete Success',
          errorTitle: 'Delete Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    userDelete: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Delete Success',
          errorTitle: 'Delete Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    vouchersDelete: builder.mutation({
      query: (id) => ({
        url: `delete-all-vouchers/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Delete Success',
          errorTitle: 'Delete Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
    voucherDelete: builder.mutation({
      query: (id) => ({
        url: `delete-voucher/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Delete Success',
          errorTitle: 'Delete Failed',
        });
        if (arg.callback) arg.callback();
      },
    }),
  }),
});

export const {
  useCategoryDeleteMutation,
  useOrdersDeleteMutation,
  useProductDeleteMutation,
  useUserDeleteMutation,
  useVouchersDeleteMutation,
  useVoucherDeleteMutation,
} = deleteReducers;
export const deleteMiddleware = deleteReducers.middleware;
export default deleteReducers;
