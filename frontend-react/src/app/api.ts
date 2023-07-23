// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GroceryItem } from "../grocery-item";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["list"],
  endpoints: (builder) => ({
    getList: builder.query<Array<GroceryItem>, void>({
      query: () => "/",
      providesTags: ["list"],
    }),
    purchase: builder.mutation<GroceryItem, number>({
      query: (id) => ({
        url: `/${id}/purchase`,
        method: "PUT",
      }),
      invalidatesTags: ["list"],
    }),
    addItem: builder.mutation<GroceryItem, Partial<GroceryItem>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["list"],
    })
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetListQuery, usePurchaseMutation, useAddItemMutation } = api;
