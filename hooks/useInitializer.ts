"use client"
import { useMainStore } from '@/stores/mainStore';
import { useEffect } from 'react';
 

export const useInitializer = () => {
  const {initializeStore} = useMainStore( );

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);
};