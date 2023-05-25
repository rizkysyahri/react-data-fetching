import { axiosInstance } from "../axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["fetch.products"],
    queryFn: async () => {
      const productResponse = await axiosInstance.get("/products");

      return productResponse;
    },
  });
};
