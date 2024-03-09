import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/mark-logo.png";

const MainFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <div className="container px-4 mx-auto  pb-10">
        <div className="grid lg:grid-cols-2">
          <div className="lg:max-w-96">
            <h1 className="mb-8">
              <a href="/">
                <img
                  src={logo}
                  alt="logo"
                  className="flex-shrink-0 relative h-12 w-auto"
                />
              </a>
            </h1>
            <p className="font-medium text-neutral-950 dark:text-neutral-dark-950 max-w-[350px]">
              Empowering Malegaon's community with precise Namaz schedules, our
              locally maintained app ensures timely updates, fostering spiritual
              connectivity and convenience for all.
            </p>
          </div>
        </div>
        <div className="pt-8">
          <p className="text-sm text-neutral-700 dark:text-neutral-dark-700">
            © 2024. Designed by{" "}
            <Link
              to="https://github.com/izhar-ahmed"
              className="text-neutral-950 dark:text-neutral-dark-950"
            >
              Izhar Ahmed
            </Link>
          </p>
        </div>
      </div>
      <div className="sub-footer">
        {/* <div className=" flex justify-between">
          <p className="">Copyright &copy; 2024</p>
          <p className="">Copyright &copy; 2024</p>
        </div> */}
      <div className="container mx-auto pt-5 pb-5 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-gray-500 dark:text-gray-400">© 2024 [Your App]. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="hover:underline underline-offset-4" to="/terms-and-services">
            Terms of Service
          </Link>
        </nav>
      </div>
      </div>


      <button
        id="scrollUp"
        onClick={scrollToTop}
        style={{ position: "fixed", zIndex: 2147483647 }}
      >
        <span></span>
      </button>
    </footer>
  );
};

export default MainFooter;
