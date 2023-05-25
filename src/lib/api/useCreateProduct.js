import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export const useCreateProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.post("/products", body);

      return productResponse;
    },
    onSuccess,
  });
};
