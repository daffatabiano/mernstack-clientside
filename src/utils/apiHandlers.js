import { setLoading } from '../redux/reducers/loadingReducers';
import { showNotification } from '../redux/reducers/notificationReducers';

export const handleQueryLifecycle = async ({
  dispatch,
  queryFulfilled,
  successTitle = 'Success',
  errorTitle = 'Error',
}) => {
  try {
    dispatch(setLoading(true));
    const { data } = await queryFulfilled;
    const success = data.success || data.statusCode === 200;
    if (success) {
      dispatch(
        showNotification({
          type: 'success',
          message: successTitle,
          description: data?.message,
          visible: true,
        })
      );
    }
    return data;
  } catch (e) {
    const err = e?.error?.data?.message || e?.data?.message;
    dispatch(
      showNotification({
        type: 'error',
        message: errorTitle,
        description: err,
        visible: true,
      })
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const handleFetchLifecycle = async ({ dispatch, queryFulfilled }) => {
  try {
    dispatch(setLoading(true));
    const { data } = await queryFulfilled;
    const success = data.success || data.statusCode === 200;

    if (success) {
      return data;
    }
  } catch (e) {
    const err =
      e.error.data.message ||
      e.error.message ||
      e.error ||
      e.message ||
      dispatch(
        showNotification({
          type: 'error',
          message: 'Error',
          description: err,
          visible: true,
        })
      );
  } finally {
    dispatch(setLoading(false));
  }
};

export const handlePutLifecycle = async ({ dispatch, queryFulfilled }) => {
  try {
    dispatch(setLoading(true));
    const { data } = await queryFulfilled;
    const success = data.success || data.statusCode === 200;

    if (success) {
      return data;
    }
  } catch (e) {
    const err =
      e.error.data.message ||
      e.error.message ||
      e.error ||
      e.message ||
      dispatch(
        showNotification({
          type: 'error',
          message: 'Error',
          description: err,
          visible: true,
        })
      );
  } finally {
    dispatch(setLoading(false));
  }
};

export const handleDeleteLifecycle = async ({ dispatch, queryFulfilled }) => {
  try {
    dispatch(setLoading(true));
    const { data } = await queryFulfilled;
    const success = data.success || data.statusCode === 200;

    if (success) {
      return data;
    }
  } catch (e) {
    const err =
      e.error.data.message ||
      e.error.message ||
      e.error ||
      e.message ||
      dispatch(
        showNotification({
          type: 'error',
          message: 'Error',
          description: err,
          visible: true,
        })
      );
  } finally {
    dispatch(setLoading(false));
  }
};
