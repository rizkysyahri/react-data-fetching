import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export const useDeleteProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      const productResponse = await axiosInstance.delete(`/products/${id}`);

      return productResponse;
    },
    onSuccess,
  });
};
