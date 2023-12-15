import { useEffect, useState } from "react";

const Products = () => {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      // const res = await fetch("https://fakestoreapi.com/products");
      const res = await fetch("http://52.90.182.126:3000/api/cai");
      const data = await res.json();
      const allItems = Object.values(data).flatMap(
        (category) => category.items
      );
      setProducts(allItems);
    };
    fetchProduct();
  }, []);
  return (
    <div className="no-scrollbar  grid grid-cols-4 overflow-y-scroll m-2">
      {Products.map((product, index) => (
        <div key={index}>
          <div className=" my-5  w-full max-w-[16rem] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-lg tracking-tight text-slate-900">
                  {product.item_name}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                  {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
                </p>
              </div>
              <a
                href="#"
                className="flex items-center justify-center rounded-md bg-slate-900 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 bg-[#092635] focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
