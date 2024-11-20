'use client';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { SetInitialFinanceDataAsync, setToken } from './features/financeDataSlice';
import { decodeJwt } from 'jose';
import { CustomJWTPayload } from '@/types';

export default function StoreProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current && token) {
      const jwtPayload = decodeJwt(token) as CustomJWTPayload;

      storeRef.current.dispatch(setToken(jwtPayload));
      storeRef.current.dispatch(SetInitialFinanceDataAsync(parseInt(jwtPayload.nameid)));
    }
  });

  return <Provider store={storeRef.current}>{children}</Provider>;
}
