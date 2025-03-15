"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { PropsWithChildren } from "react";

const query = new QueryClient();

const ReactQueryClient = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};

export default ReactQueryClient;
