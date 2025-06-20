'use client'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import react from 'react';


const queryClient = new QueryClient();

export default function ReactQueryProvider({children}){
    return(
        <QueryClientProvider client = {queryClient}>
            {children}
        </QueryClientProvider>
    )
}