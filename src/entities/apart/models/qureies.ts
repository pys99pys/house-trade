import axios from "axios";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { GetApartRequest, GetApartResponse } from "./types";

export const useGetApartQuery = (params: GetApartRequest): UseQueryResult<GetApartResponse, unknown> => {
  return useQuery({
    queryKey: ["getApart", params],
    staleTime: 86_400,
    gcTime: 86_400,
    queryFn: () => axios.get(`/api/apart?regionCode=${params.regionCode}&apartName=${params.apartName}`),
    select: (res) => res.data,
  });
};
