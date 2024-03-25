"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Loader from "../../components/Loader";

const Story: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    
    <>{isLoading ? (
      <Loader />
    ) : (
      <div className="container mx-auto my-10">
        Hi
      </div>)}
    </>
  );
};

export default Story;