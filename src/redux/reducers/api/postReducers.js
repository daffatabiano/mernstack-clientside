import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { handleQueryLifecycle } from '../../../utils/apiHandlers';
import { clearLogin, login } from '../userReducers';
import fetchReducers from './fetchReducers';
import { showNotification } from '../notificationReducers';
const BASE_URL = import.meta.env.VITE_API_URL;
const postReducers = createApi({
  reducerPath: 'post-api',
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
    /* ADMIN CONTROL API ENDPOINTS */
    // AUTH ENDPOINTS
    registerAdminAccess: builder.mutation({
      query: (b) => ({
        url: '/auth/register',
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Register Success',
          errorTitle: 'Register Failed',
          callback: () => {
            dispatch(login(arg));
            if (arg.callback) arg.callback();
          },
        });
      },
    }),
    loginAdminAccess: builder.mutation({
      query: (b) => ({
        url: '/auth/login',
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const data = await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Login Success',
          errorTitle: 'Login Failed',
        });

        if (data?.success) {
          localStorage.setItem('token', data?.token);
          localStorage.setItem('user', JSON.stringify(data?.user));

          if (arg.navigate) {
            arg.navigate('/admin-panel/dashboard');
          }
        }

        if (arg.callback) {
          console.log('executing callback...');
          arg.callback();
        }

        dispatch(clearLogin());
      },
    }),
    // GIFT VOUCHER ENDPOINTS
    sendGiftVoucher: builder.mutation({
      query: (b) => ({
        url: '/gift-voucher',
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Voucher Sent',
          errorTitle: 'Failed Sending',
          callback: () => {
            // dispatch(getAllCustomers());
            if (arg.callback) arg.callback();
          },
        });
      },
    }),
    // UPDATE ROLE ENDPOINTS
    updateRole: builder.mutation({
      query: ({ b, id }) => ({
        url: `/user/${id}/change-role`,
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Role Updated Successfully',
          errorTitle: 'Role Update Failed',
        });
      },
    }),
    createProductAdmin: builder.mutation({
      query: (b) => ({
        url: '/product',
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Product Created ',
          errorTitle: 'Create Fail',
        });
        if (arg.callback) arg.callback();
      },
    }),
    createVoucherAdmin: builder.mutation({
      query: (b) => ({
        url: '/create-voucher',
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Voucher Created',
          errorTitle: 'Create Fail',
        });
        if (arg.callback) arg.callback();
      },
    }),
    createCategory: builder.mutation({
      query: (b) => ({
        url: 'category',
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Category Created',
          errorTitle: 'Create Fail',
        });
        if (arg.callback) arg.callback();
      },
    }),
    /* CUSTOMER CONTROL API ENDPOINTS */
    // OTP ENDPOINTS
    sendOTPCustomer: builder.mutation({
      query: (b) => ({
        url: '/send-otp',
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const success = data?.success || data.statusCode === 200;
        if (success) {
          dispatch(
            showNotification({
              type: 'success',
              message: 'OTP Sent',
              description: data?.message,
              visible: true,
            })
          );
        }
        return data;
      },
    }),
    verifyOTPCustomer: builder.mutation({
      query: (b) => ({
        url: '/verify-otp',
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'OTP Verified',
          errorTitle: 'Failed Verifying',
        });
        if (arg.callback) arg.callback();
        const customerProfileResponse = await dispatch(
          fetchReducers.endpoints.getCustomerProfile.initiate(arg.customerId)
        );

        return { res, customerProfileResponse };
      },
    }),

    // ORDER ENDPOINTS
    sendOrderCustomer: builder.mutation({
      query: (b) => ({
        url: '/order',
        method: 'POST',
        body: b,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await handleQueryLifecycle({
          dispatch,
          queryFulfilled,
          successTitle: 'Order Sent',
          errorTitle: 'Failed Sending',
          callback: () => {
            localStorage.removeItem('dataPayment');
          },
        });
      },
    }),
  }),
});

export const {
  useRegisterAdminAccessMutation,
  useLoginAdminAccessMutation,
  useSendGiftVoucherMutation,
  useUpdateRoleMutation,
  useCreateProductAdminMutation,
  useCreateCategoryMutation,
  useCreateVoucherAdminMutation,
  useSendOTPCustomerMutation,
  useVerifyOTPCustomerMutation,
  useSendOrderCustomerMutation,
} = postReducers;
export const postMiddleware = postReducers.middleware;
export default postReducers;
