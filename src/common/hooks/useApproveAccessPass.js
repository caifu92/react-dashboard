import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSnackbar } from '../../hooks';
import { approveAccessPassById } from '../../store/slices';

import { useUpdateAccessPass } from './useUpdateAccessPass';

export const useApproveAccessPass = (accessPass) => {
  const { isSuccess, error, reset, ...rest } = useUpdateAccessPass();
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      const { key, referenceId } = accessPass;

      showSnackbar({
        message: `Approved application with Reference ID: ${referenceId}`,
        severity: 'success',
      });

      dispatch(approveAccessPassById(key));
      reset();
    }
  }, [dispatch, accessPass, showSnackbar, isSuccess, reset]);

  return {
    reset,
    isSuccess,
    ...rest,
  };
};
