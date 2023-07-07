import React from "react";
import apple from "../Images/Fruits/apple.jpg";
import banana from "../Images/Fruits/banana.jpg";
import kiwi from "../Images/Fruits/kiwi.jpg";

function ProductCard() {
  return (
    <>
      <section className="bg-white py-12 w-full text-gray-700 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              Fresh Fruits & Vegetables
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                  src={apple}
                  alt=""
                />
              </div>
              <div className="absolute top-0 m-2 rounded-full bg-white">
                <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                  Sale
                </p>
              </div>
              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                  <p className="mr-3 text-sm font-semibold">$99.00</p>
                  <del className="text-xs text-gray-400"> $79.00 </del>
                </div>
                <h3 className="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <button className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                <div
                  className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition  group-hover:bg-[#fcae14]
 group-hover:text-white"
                >
                  Add
                </div>
                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                  +
                </div>
              </button>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                  src={apple}
                  alt=""
                />
              </div>
              <div className="absolute top-0 m-2 rounded-full bg-white">
                <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                  Sale
                </p>
              </div>
              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                  <p className="mr-3 text-sm font-semibold">$99.00</p>
                  <del className="text-xs text-gray-400"> $79.00 </del>
                </div>
                <h3 className="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <button className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-[#fcae14] group-hover:text-white">
                  Add
                </div>
                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                  +
                </div>
              </button>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                  src={banana}
                  alt=""
                />
              </div>

              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                  <p className="mr-3 text-sm font-semibold">$99.00</p>
                </div>
                <h3 className="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <button className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-[#fcae14] group-hover:text-white">
                  Add
                </div>
                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                  +
                </div>
              </button>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                  src={banana}
                  alt=""
                />
              </div>

              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                  <p className="mr-3 text-sm font-semibold">$99.00</p>
                </div>
                <h3 className="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <button className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-[#fcae14] group-hover:text-white">
                  Add
                </div>
                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                  +
                </div>
              </button>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                  src={kiwi}
                  alt=""
                />
              </div>

              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                  <p className="mr-3 text-sm font-semibold">$99.00</p>
                </div>
                <h3 className="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <button className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-[#fcae14] group-hover:text-white">
                  Add
                </div>
                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                  +
                </div>
              </button>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                  src={kiwi}
                  alt=""
                />
              </div>

              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                  <p className="mr-3 text-sm font-semibold">$99.00</p>
                </div>
                <h3 className="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <button className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-[#fcae14] group-hover:text-white">
                  Add
                </div>
                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                  +
                </div>
              </button>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                  src={apple}
                  alt=""
                />
              </div>

              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                  <p className="mr-3 text-sm font-semibold">$99.00</p>
                </div>
                <h3 className="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <button className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-[#fcae14] group-hover:text-white">
                  Add
                </div>
                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                  +
                </div>
              </button>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                  src={kiwi}
                  alt=""
                />
              </div>
              <div className="absolute top-0 m-2 rounded-full bg-white">
                <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                  Sale
                </p>
              </div>
              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                  <p className="mr-3 text-sm font-semibold">$99.00</p>
                  <del className="text-xs text-gray-400"> $79.00 </del>
                </div>
                <h3 className="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <button className="group mx-auto mb-2 flex h-8 md:h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-[#fcae14] group-hover:text-white">
                  Add
                </div>
                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-[#EDA415] group-hover:text-white">
                  +
                </div>
              </button>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductCard;
