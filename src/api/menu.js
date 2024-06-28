import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import axios from "axios"
import { QueryClient } from "@tanstack/react-query"

const initialState = {
    openedItem: 'default',
    openedComponent: 'buttons',
    openedHorizontalItem: null,
    isDashboardDrawerOpened: false,
    isComponentDrawerOpened: true
};

export const endpoints = {
    key: 'api/menu',
    master: 'master',
    customFetch: axios.create({ baseURL: 'http://localhost:5253' }),
    queryClient: new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
            },
        },
    })
};

export function useGetMenuMaster() {
    const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const memoizedValue = useMemo(
        () => ({
            menuMaster: data,
            menuMasterLoading: isLoading
        }),
        [data, isLoading]
    );

    return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened) {
    // to update local state based on key

    mutate(
        endpoints.key + endpoints.master,
        (currentMenuMaster) => {
            return { ...currentMenuMaster, isDashboardDrawerOpened };
        },
        false
    );
}

export function handlerActiveItem(openedItem) {
    // to update local state based on key

    mutate(
        endpoints.key + endpoints.master,
        (currentMenuMaster) => {
            return { ...currentMenuMaster, openedItem };
        },
        false
    );
}
