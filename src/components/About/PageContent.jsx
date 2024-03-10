import aboutIMG from './about.svg';

const PageContent = () => {
	return (
		<div className="container mx-auto px-4 mb-10">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
				<div>
					<section className="mb-2">
						<h2 className="text-xl lg:text-3xl max-w-7xl mb-2 text-neutral-950 dark:text-neutral-dark-950">
							<span className="font-light">Our</span> Mission
						</h2>
						<p className="lg:text-lg leading-relaxed">
							At Salahtimes, our mission is to empower communities with
							accurate and reliable Namaz time schedules. We believe that
							access to precise prayer timings is essential for individuals to
							observe their religious practices effectively.
						</p>
					</section>
					<section className="mb-2">
						<h2 className="text-xl lg:text-3xl max-w-7xl mb-2 text-neutral-950 dark:text-neutral-dark-950">
							<span className="font-light">Our</span> Vision
						</h2>
						<p className="lg:text-lg leading-relaxed">
							Our vision is to create a seamless experience for users seeking
							to stay connected to their spiritual practice. By providing
							timely updates and convenient access to prayer schedules, we aim
							to facilitate a deeper connection to faith and community.
						</p>
					</section>
					<section className="mb-2">
						<h2 className="text-xl lg:text-3xl max-w-7xl mb-2 text-neutral-950 dark:text-neutral-dark-950">
							<span className="font-light">Our</span> Commitment
						</h2>
						<p className="lg:text-lg leading-relaxed">
							We are committed to delivering excellence in service and
							reliability. Our team is dedicated to maintaining the Salahtimes
							app with the highest standards of accuracy and efficiency,
							ensuring that users can rely on us for their daily prayer needs.
						</p>
					</section>
				</div>
				<div>
					<img src={aboutIMG} alt="" className='w-full' />
				</div>
			</div>
		</div>
	);
}

export default PageContent;
