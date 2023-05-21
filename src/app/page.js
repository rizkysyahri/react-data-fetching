"use client";

import * as React from "react";
import { axiosInstance } from "@/lib/axios";

export default function Home() {
  const [products, setProducts] = React.useState([]); // untuk menyimpan data response GET

  const fetchProduct = async () => {
    try {
      setTimeout(async () => {
        const productResponse = await axiosInstance.get("/products");

        // console.log(productResponse.data);
        setProducts(productResponse.data);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const renderProduct = () => {
    return products.map((product) => {
      return (
        <tr key={product.id}>
          <td className="px-3 py-2">{product.name}</td>
          <td className="px-3 py-2">{product.price}</td>
          <td className="px-3 py-2">{product.description}</td>
          <td className="px-3 py-2">{product.image}</td>
        </tr>
      );
    });
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Image
              </th>
            </tr>
          </thead>
          <tbody>{renderProduct()}</tbody>
        </table>
      </div>
    </main>
  );
}
