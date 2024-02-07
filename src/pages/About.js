import React from 'react';
import './Common.css'
import masjidImage from '../img/mosque_1280.jpg';
import CustomCTASection from '../components/CustomCTASection';
import Header2 from '../components/Header2';
const About = () => {
	return (
		<section className="">
			<Header2
				heading={<h1 class="text-5xl leading-tight md:text-6xl lg:text-6xl font-bold text-grey mb-0">
					Let’s Stay <span class="font-light">Connected</span>
				</h1>}
				subHeading={`Call us, use our live chat widget or send us an email and we will get back to you as soon as possible.`}
			/>
			<div className="container mx-auto px-4">
				<div className='flex'>
				<div className="md:w-3/4 lg:w-1/2">
					<h1 className="heading-2 max-w-7xl mb-12 text-neutral-950 dark:text-neutral-dark-950">
						<span className="font-light">Let's</span> explore{" "}
						<span className="font-light">and</span>
						<br /> Pray <span className="font-light">together!</span>
					</h1>
					<p className="mb-8 text-base font-md text-neutral-950 dark:text-neutral-dark-950">
						Assalamu Alaikum and welcome to our mosque web app! I'm honored to be your guide in navigating the world of Islamic prayer times and mosque schedules. As a dedicated member of our community, I'm excited to assist you in staying connected with our local mosques and ensuring you never miss a prayer.
					</p>
					<p className="mb-8 text-base font-md text-neutral-950 dark:text-neutral-dark-950">
						With our mosque web app, you can explore accurate prayer timings for each mosque in our area, fostering a deeper connection to our faith and community. Together, let's embark on this digital journey where spirituality meets technology, and where every prayer becomes a moment of reflection and devotion.
					</p>
				</div>
				<div className='md:w-3/4 lg:w-1/2'>
					<img
						src={masjidImage}
						alt=""
						className="rounded-3xl"
					/>
				</div>
				</div>
				<div className="grid md:grid-col-2 lg:grid-cols-4 mt-24">
					<div className="flex flex-col">
						<h6 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-dark-900">
							Address
						</h6>
						<p className="mb-8 text-base font-md text-neutral-950 dark:text-neutral-dark-950">
							Alamgir, Ahmadnagar <br />
							Maharashtra, india
						</p>
					</div>
					<div className="flex flex-col">
						<h6 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-dark-900">
							Email
						</h6>
						<p className="mb-8 text-base font-md text-neutral-950 dark:text-neutral-dark-950">
							izharahmed1280@gmail.com
						</p>
					</div>
					<div className="flex flex-col">
						<h6 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-dark-900">
							Phone
						</h6>
						<p className="mb-8 text-base font-md text-neutral-950 dark:text-neutral-dark-950">
							+91 7770052360
						</p>
					</div>
					<div className="flex flex-col">
						<h6 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-dark-900">
							Skype
						</h6>
						<p className="mb-8 text-base font-md text-neutral-950 dark:text-neutral-dark-950">
							izharahmed1280
						</p>
					</div>
				</div>

			</div>
			<CustomCTASection
				heading={<h2 className="text-5xl leading-tight md:text-6xl lg:text-6xl font-bold text-white mb-0"><span className="font-light">Let's</span> Explore The Mosque Locations <span class="font-light">together!</span></h2>}
				subheading={<p className="text-lg font-medium text-white">Find the Right Direction for Prayer.</p>}
				exploreLabel="Explore Mosques"
				directionsLabel="Get Directions"
			/>
		</section>

	);
};

export default About;
