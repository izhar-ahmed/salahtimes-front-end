const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="relative isolate p-6 lg:p-14 overflow-hidden">
        <div className="absolute inset-x-0 top-0 bottom-0 -z-10 transform-gpu blur-3xl sm:top-0 sm:bottom-0" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="mx-auto max-w-2xl sm:py-32 lg:py-16">
          <div className="text-center">
            <h1 className="text-3xl leading-tight md:text-6xl lg:text-6xl font-bold text-grey mb-0">
              Welcome To <span className="font-light">[Your App]</span>
            </h1>
            <p className="mt-6 text-lg font-bold text-neutral-700">
              Discover the beauty of prayer and find the perfect time for Salah
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Explore Mosques
              </button>
              <button href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Contact Us <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-0 sm:bottom-0" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
