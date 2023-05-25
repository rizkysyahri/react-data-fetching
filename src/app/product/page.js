"use client";

import * as React from "react";
import Loading from "@/components/LoadingAnimation";
import Link from "next/link";
import Head from "next/head";
import { Button, Spinner } from "flowbite-react";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import {
  useCreateProduct,
  useFetchProducts,
  useUpdateProducts,
  useDeleteProduct,
} from "@/lib/api";

export default function Product() {
  const {
    data,
    isLoading: productsIsLoading,
    refetch: refetchProducts,
  } = useFetchProducts();

  // const [products, setProducts] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);

  // const fetchProduct = async () => {
  //   setIsLoading(true);
  //   try {
  //     setTimeout(async () => {
  //       const productResponse = await axiosInstance.get("/products");

  //       // console.log(productResponse.data);
  //       setProducts(productResponse.data);
  //       setIsLoading(false);
  //     }, 1500);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(productQuery.data)

  // React.useEffect(() => {
  //   fetchProduct();
  // }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      image: "",
      id: 0,
    },

    onSubmit: () => {
      const { name, price, description, image, id } = formik.values;

      if (id) {
        // melakukan PATCH /product/id
        editProduct({
          name,
          price: parseInt(price),
          description,
          image,
          id,
        });
        alert("produk berhasil diubah");
      } else {
        // buat Melakukan POST /products
        createProduct({
          name,
          price: parseInt(price),
          description,
          image,
        });
        alert("produk berhasil ditambahkan");
      }

      formik.setFieldValue("name", "");
      formik.setFieldValue("price", 0);
      formik.setFieldValue("description", "");
      formik.setFieldValue("image", "");
      formik.setFieldValue("id", 0);
    },
  });

  const { mutate: createProduct, isLoading: createProductIsLoading } =
    useCreateProduct({
      onSuccess: () => {
        refetchProducts();
      },
    });

  const { mutate: deleteProduct } = useDeleteProduct({
    mutationFn: async (id) => {
      const productResponse = await axiosInstance.delete(`/products/${id}`);

      return productResponse;
    },
    onSuccess: () => {
      refetchProducts();
    },
  });

  const { mutate: editProduct, isLoading: editProductIsLoading } =
    useUpdateProducts({
      onSuccess: () => {
        refetchProducts();
      },
    });

  const handleFormSubmit = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const confirmationDelete = (productId) => {
    const shouldDelete = confirm("are u kidding me?");

    if (shouldDelete) {
      deleteProduct(productId);
    }
  };

  const onEditClick = (product) => {
    formik.setFieldValue("id", product.id);
    formik.setFieldValue("name", product.name);
    formik.setFieldValue("price", product.price);
    formik.setFieldValue("description", product.description);
    formik.setFieldValue("image", product.image);
  };

  const renderProduct = () => {
    return data?.data.map((product, id) => {
      return (
        <tr key={id} className="border-b">
          <td className="px-3 py-2 bg-slate-300 text-black">{product.name}</td>
          <td className="px-3 py-2 text-black">{product.price}</td>
          <td className="px-3 py-2 bg-slate-300 text-black">
            {product.description}
          </td>
          <td className="px-3 py-2 text-black">
            <Link href={product.image}>{product.image}</Link>
          </td>
          <td className="flex items-center gap-3">
            <button
              className="bg-green-600 px-3 py-3 rounded text-white"
              onClick={() => onEditClick(product)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 px-3 py-3 rounded text-white"
              onClick={() => confirmationDelete(product.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Product Page</title>
      </Head>
      <p className="text-2xl pb-5">Product Page</p>
      <div className="container relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {renderProduct()}
            {productsIsLoading && <Loading />}
          </tbody>
        </table>
      </div>

      <form className="py-5" onSubmit={formik.handleSubmit}>
        <div className="w-64 mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            onChange={handleFormSubmit}
            name="name"
            value={formik.values.name}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-64 mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            onChange={handleFormSubmit}
            name="price"
            value={formik.values.price}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-64 mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            onChange={handleFormSubmit}
            name="description"
            value={formik.values.description}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-64">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            onChange={handleFormSubmit}
            name="image"
            value={formik.values.image}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center justify-center py-2">
          {createProductIsLoading || editProductIsLoading ? (
            <Spinner />
          ) : (
            <Button type="submit">Submit Product</Button>
          )}
        </div>
      </form>
    </main>
  );
}
