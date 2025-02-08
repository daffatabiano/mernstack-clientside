import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { handleFetchLifecycle } from '../../../utils/apiHandlers';
const BASE_URL = import.meta.env.VITE_API_URL;

const fetchReducers = createApi({
  reducerPath: 'fetch-api',
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
    /* CUSTOMER CONTROL API ENDPOINTS */
    //PROFILE API ENDPOINTS
    getAllCustomers: builder.query({
      query: (page = 1, limit = 10) => ({
        url: `/customers?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleFetchLifecycle({
          dispatch,
          queryFulfilled,
        });
        if (arg.callback) arg.callback();
      },
    }),
    getCustomerProfile: builder.query({
      query: (id) => ({
        url: `customer-profile/${id}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await handleFetchLifecycle({
          dispatch,
          queryFulfilled,
        });
        if (arg.callback) arg.callback();
        return res;
      },
    }),
    /* ADMIN CONTROL API ENDPOINTS */
    //ORDER API ENDPOINTS
    getAllOrders: builder.query({
      query: () => ({
        url: '/orders',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await handleFetchLifecycle({
          dispatch,
          queryFulfilled,
        });
        // if (arg.callback) arg.callback();
        return res;
      },
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `order/${id}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await handleFetchLifecycle({
          dispatch,
          queryFulfilled,
        });
        if (arg.callback) arg.callback();
        return res;
      },
    }),
    getHistoryOrders: builder.query({
      query: (page = 1, limit = 10) => ({
        url: `/history-orders?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await handleFetchLifecycle({
          dispatch,
          queryFulfilled,
        });
        if (arg.callback) arg.callback();
        return res;
      },
    }),
    getAllProducts: builder.query({
      query: ({
        page = 1,
        limit = 10,
        category = '',
        search = '',
        sort = 'createdAt',
      }) => ({
        url: `/products?page=${page}&limit=${limit}&category=${category}&search=${search}&sort=${sort}`,
        method: 'GET',
        provideTags: ['Products'],
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `product/${id}`,
        method: 'GET',
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
    }),
    getAllCrew: builder.query({
      query: (page, limit) => ({
        url: `users?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
    getCrewById: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await handleFetchLifecycle({
          dispatch,
          queryFulfilled,
        });
        if (arg.callback) arg.callback();
        return res;
      },
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerProfileQuery,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useGetHistoryOrdersQuery,
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useGetSingleProductQuery,
  useGetAllCrewQuery,
  useGetCrewByIdQuery,
} = fetchReducers;

export const fetchMiddleware = fetchReducers.middleware;
export default fetchReducers;
