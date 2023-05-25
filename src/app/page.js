"use client";

import * as React from "react";
import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className=" flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-2xl">Home Page</h1>
        <div className="container flex shadow-md sm:rounded-lg mx-auto">
          <Cards />
        </div>

        
      </main>
    </div>
  );
}
