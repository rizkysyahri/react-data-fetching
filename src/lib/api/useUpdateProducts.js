import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export const useUpdateProducts = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.patch(
        `/products/${body.id}`,
        body
      );

      return productResponse;
    },
    onSuccess,
  });
};
