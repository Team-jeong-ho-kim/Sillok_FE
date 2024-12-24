import { useQuery } from "@tanstack/react-query";
import { instance } from "../axios";
import { FeedResponse } from "./type";
import axios from "axios";

const router = "feed";

export const useGetFeed = () => {
  return useQuery({
    queryKey: ["getFeedInfo"],
    queryFn: async () => {
      const { data } = await axios.get<FeedResponse[]>(`https://sillok-stag-server.xquare.app/${router}`);
      return data;
    }
  })
};