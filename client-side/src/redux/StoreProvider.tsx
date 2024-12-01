'use client';
import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { SetInitialFinanceDataAsync, setToken } from './features/financeDataSlice';
import { decodeJwt } from 'jose';
import { CustomJWTPayload } from '@/types';
import LoadingAnimation from '@/components/ui/LoadingAnimation';

export default function StoreProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  const [isStoreReady, setIsStoreReady] = useState(false);
  const [isClient,setIsClient] = useState(false)
  const storeRef = useRef<AppStore | null>(null);

  // Initialize store if not already initialized
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(()=>{
    setIsClient(true);
  },[])

  useEffect(() => {
    
    if (storeRef.current && token) {
      const jwtPayload = decodeJwt(token) as CustomJWTPayload;
      storeRef.current.dispatch(setToken(jwtPayload)); // Dispatch token info to the store

      // Dispatch action to load initial finance data
      storeRef.current.dispatch(SetInitialFinanceDataAsync(parseInt(jwtPayload.nameid)));
    }

    // Mark store as ready once the effect is complete
    setIsStoreReady(true);
  }, [token]);

  // Return the provider only when the store is ready
  if (!isStoreReady && isClient) return <LoadingAnimation></LoadingAnimation>;

  return <Provider store={storeRef.current}>
    {children}
    </Provider>;
}
