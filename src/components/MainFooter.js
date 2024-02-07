import "./../pages/Common.css";
import logo from '../img/mark-logo.svg'

const MainFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full pb-20">
      <div className="container px-4 mx-auto">
        
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
              Empowering Malegaon's community with accurate and reliable Namaz time schedules, our app is locally maintained by dedicated individuals passionate about serving their city. Stay connected to your spiritual practice with ease, as our app ensures timely updates and convenience for all.
            </p>
          </div>
        </div>
        <div className="pt-8">
          <p className="text-sm text-neutral-700 dark:text-neutral-dark-700">
            © 2024. Designed by{" "}
            <a
              href=""
              className="text-neutral-950 dark:text-neutral-dark-950"
            >
              Izhar Ahmed
            </a>
          </p>
        </div>
      </div>
      <button id="scrollUp" onClick={scrollToTop} style={{position: 'fixed', zIndex: 2147483647}}><span></span></button>
    </footer>

  );
};

export default MainFooter;