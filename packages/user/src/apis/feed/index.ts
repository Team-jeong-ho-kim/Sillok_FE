import { useQuery } from "@tanstack/react-query";
import { instance } from "../axios";
import { FeedResponse } from "./type";

const router = "/feed";

export const useGetFeed = () => {
  return useQuery({
    queryKey: ["getFeedInfo"],
    queryFn: async () => {
      const { data } = await instance.get<FeedResponse[]>(`${router}`);
      return data;
    }
  })
};