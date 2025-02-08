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
  }),
});
