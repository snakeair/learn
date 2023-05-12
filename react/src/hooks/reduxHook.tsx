/**
 * // NOTE: rtk 操作的hook，不用频繁引入和声明一堆东西
 */

import react ,{useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {tsState} from '@/store/store'

interface argTs {
  [key: string]: any
}

export default function redux(args:argTs) {
  const dispatch = useDispatch();

  const dispatchFn = (callback:any) => {
    dispatch(callback)
  }

  return {
    dispatchFn
  }
}