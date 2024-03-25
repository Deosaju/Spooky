"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-gradient-to-b to-black relative">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="hero-content text-center relative z-10">
          <div className="max-w-max mt-32">
            <h1 className="text-5xl font-sans md:font-serif font-bold text-white">"Stories are the threads that weave the fabric of our shared human experience."w</h1>
            <p className="pt-6 text-white">Create, Collaborate, and Explore Immersive Narratives on the Blockchain</p>
            <p className="pb-6 text-white">Make Worlds and Charachters yours</p>
            <div className="flex gap-4 justify-center">
              <button className="btn btn-primary">Start Creating</button>
              <button className="btn btn-primary">Explore Stories</button>
            </div>
            <div className="flex gap-4 justify-center mt-5 align-middle items-center">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Get in touch?</span>
                  <span className="label-text-alt">Drop your email</span>
                </div>
                <input type="text" placeholder="email.." className="input input-bordered w-full max-w-xs" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <section className="base-100 body-font">
        <div className="max-w-7xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center">
            <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 ">
              Create Stunning Stories,Characters, Worlds 🌏
            </h1>
            <p className="mb-4 xl:w-3/4 base-100 text-lg ">
              Make Mint and Sell them ! 💵
            </p>
            <div className="flex justify-center">
              <a
                className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="https://github.com/r1/nine4-2/"
              >
                <span className="justify-center">Find out more</span>
              </a>
            </div>
          </div>
          <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10">
            <img
              className="w-100 md:ml-1 ml-44 rounded-xl"
              alt="iPhone-12"
              src="/landingPage/landing_image_1.jpeg"
            ></img>
          </div>
        </div>
        <section className="mx-auto">
          <div className="container px-5 mx-auto lg:px-24 ">
            <div className="flex flex-col w-full mb-4 text-left lg:text-center">
              <h1 className="mb-8 text-2xl Avenir font-semibold ">
                Deployed on top-tier Chain
              </h1>
            </div>
            <div className="flex gap-16 mb-16 text-center  justify-center align-middle items-center">
              <img
                src="/landingPage/landing_image_2.jpeg"
                alt="Google Logo"
                className="block object-contain h-28 rounded-xl greyC"
              ></img>
            </div>
          </div>
        </section>
        <div className="grr max-w-7xl pt-20 mx-auto text-center">
          <h1 className="mb-8 text-6xl Avenir font-semibold ">
            Spooky NFTS
          </h1>
          <h1 className="mb-8 text-2xl Avenir font-semibold base-100 text-center">
            Inline Worlds and Charachters directly from your story.
          </h1>
          <div className="grid grid-cols-2 gap-16 mb-16 text-center lg:grid-cols-4">
            <div className="flex items-center justify-center">
              <img
                src="/landingPage/landing_image_3.jpeg"
                alt="BookShip"
                className="block object-contain h-56 rounded-xl greyC"
              ></img>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/landingPage/landing_image_4.jpeg"
                alt="Book Lady"
                className="block object-contain h-56 rounded-xl greyC"
              ></img>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/landingPage/landing_image_5.jpeg"
                alt="Pixel Zoo"
                className="block object-contain h-56 rounded-xl greyC"
              ></img>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/landingPage/landing_image_6.jpeg"
                alt="Fixus World"
                className="block object-contain h-56 rounded-xl greyC"
              ></img>
            </div>
          </div>
        </div>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="py-24 md:py-36">
              <h1 className="mb-5 text-6xl Avenir font-semibold ">
                Subscribe to our newsletter
              </h1>
              <h1 className="mb-9 text-2xl font-semibold ">
                Enter your email address and get our newsletters straight away.
              </h1>
              <input
                placeholder="jack@example.com"
                name="email"
                type="email"
                autoComplete="email"
                className="border w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md border-gray-950 font-semibold hover:border-gray-900"
              ></input>{" "}
              <a
                className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium transition border-gray-950 duration-500 ease-in-out transform bg-transparent border rounded-lg "
                href="/"
              >
                <span className="justify-center">Subscribe</span>
              </a>
            </div>
          </div>
        </section>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <aside>
            <p>Copyright © 2024 - All right reserved by Spooky</p>
          </aside>
        </footer>
      </section>
    </>
  );
};

export default Home;
