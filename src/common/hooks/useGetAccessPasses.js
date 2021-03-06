import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useApiQuery } from '../api';
import { maybe, createUniqueKeyFromAccessPass } from '../utils';
import { getAccessPasses, saveAccessPasses } from '../../store/slices';
import { isUnauthorized } from '../api/utils';

import { useLogout } from './useLogout';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

const mapToAccessPass = (data, index) => ({
  ...data,
  id: String(data.identifierNumber).trim(),
  status: String(data.status).toLowerCase(),
  key: createUniqueKeyFromAccessPass(data, index),
});

const maybeZero = maybe(0);
const maybeArray = maybe([]);
const maybeObject = maybe({});

export const useGetAccessPasses = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const dispatch = useDispatch();
  const accessPasses = useSelector(getAccessPasses);

  const { data, error, isLoading, query, reset, ...others } = useApiQuery(
    '/v1/registry/access-passes'
  );
  const { execute: executeLogout } = useLogout();

  const {
    rapidPassList,
    currentPage: dataCurrentPage,
    totalPages: dataTotalPages,
    totalRows: dataTotalRows,
    ...otherData
  } = maybeObject(data);

  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = isRequestSuccess(httpResponse.status) || false;

  const list = Array.isArray(rapidPassList) ? rapidPassList.map(mapToAccessPass) : [];

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveAccessPasses(list));

      setPage(dataCurrentPage);
      setTotalPages(dataTotalPages);
      setTotalRows(dataTotalRows);

      reset();
    }

    if (error && isUnauthorized(error)) {
      executeLogout();
    }
  }, [
    dataCurrentPage,
    dataTotalPages,
    dataTotalRows,
    list,
    dispatch,
    isSuccess,
    reset,
    error,
    executeLogout,
  ]);

  return {
    data: {
      list: maybeArray(accessPasses),
      page: maybeZero(page),
      totalPages: maybeZero(totalPages),
      totalRows: maybeZero(totalRows),
      ...otherData,
    },
    isLoading,
    reset,
    query,
    isSuccess,
    error,
    ...others,
  };
};
