import React from "react";
import MVText from "../MV/Text";
import { Link } from "@nextui-org/react";
const Page404 = () => {
  return (
    <>
      <main className="grid min-h-full h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <MVText className="text-base font-semibold text-indigo-600">
            404
          </MVText>
          <div className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </div>
          <Link
            isBlock
            href="/"
            color="warning"
            className="mt-5"
          >
            Back To Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default Page404;
