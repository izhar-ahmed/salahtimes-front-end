// src/pages/Contact.jsx
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import CustomCTASection from '@/components/CustomCTASection';
import Header2 from '@/components/common/Header2';
import Header from '@/components/Contact/Header';
import SubHeader from '@/components/Contact/SubHeader';
import CTAHeader from '@/components/Contact/CTAHeader';
import CTASubHeader from '@/components/Contact/CTASubHeader'
import ContactForm from '@/components/Contact/ContactForm';

const Contact = () => {
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{/* SEO */}
			<Helmet>
				<title>Contact Us | Salahtimes</title>
			</Helmet>

			{/* Header Section */}
			<section id="contact-hero-section">
				<Header2 heading=<Header /> subHeading=<SubHeader /> />
			</section>

			{/* Contact Form Section */}
			<section id='cotact-form-section'>
				<ContactForm successMessage={successMessage} onSetSuccessMessage={setSuccessMessage} />
			</section>

			{/* Contact Information Section */}
			<section id="contact-info">
				<section className="pb-24">
					<div className="container w-[80%] mx-auto">
						<div className="flex flex-col gap-8 md:flex-row justify-between items-center mx-auto lg:max-w-[950px]">
							{/* Contact Info Block 1 */}
							<div className="flex flex-col item-center justify-center text-center">
								<div className="size-20 rounded-full bg-primary-light-950 dark:bg-primary-dark-950 flex items-center justify-center mx-auto">
									<svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 25" className="fill-white dark:fill-white">
										<path d="M27.143 0H2.85699C2.09993 0.00230487 1.37451 0.32223 0.839193 0.889884C0.303874 1.45754 0.00217357 2.22678 0 3.02956V21.9704C0.00217357 22.7732 0.303874 23.5425 0.839193 24.1101C1.37451 24.6778 2.09993 24.9977 2.85699 25H27.143C27.9001 24.9977 28.6255 24.6778 29.1608 24.1101C29.6961 23.5425 29.9978 22.7732 30 21.9704V3.02956C29.9978 2.22678 29.6961 1.45754 29.1608 0.889884C28.6255 0.32223 27.9001 0.00230487 27.143 0ZM26.7855 6.43826L15 14.7704L3.21287 6.43826V3.40869L14.9984 11.7409L26.7838 3.40869L26.7855 6.43826Z" />
									</svg>
								</div>
								<div className="mt-4">
									<h6 className="text-2xl font-bold text-neutral-950 dark:text-neutral-dark-950 mb-2">Send Email</h6>
									<p className="text-base font-medium text-neutral-700 dark:text-neutral-dark-700 mb-0">contact@malegaon-namaz-schedule.in</p>
									<p className="text-base font-medium text-neutral-700 dark:text-neutral-dark-700 mb-0">support@malegaon-namaz-schedule.in</p>
								</div>
							</div>
							{/* Contact Info Block 2 */}
							<div className="flex flex-col item-center justify-center text-center">
								<div className="size-20 rounded-full bg-primary-light-950 dark:bg-primary-dark-950 flex items-center justify-center mx-auto">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="fill-white dark:fill-white">
										<path d="M24.3282 21.1673C23.2827 20.1352 21.9776 20.1352 20.9388 21.1673C20.1464 21.9531 19.354 22.7388 18.5749 23.5379C18.3618 23.7576 18.182 23.8043 17.9223 23.6578C17.4096 23.3781 16.8635 23.1517 16.3708 22.8454C14.0735 21.4004 12.149 19.5426 10.4444 17.4517C9.59869 16.4129 8.84623 15.3008 8.32018 14.049C8.21364 13.7959 8.23361 13.6295 8.44004 13.423C9.23245 12.6573 10.0049 11.8715 10.784 11.0858C11.8694 9.99371 11.8694 8.7152 10.7773 7.61648C10.158 6.99054 9.53876 6.37792 8.91948 5.75199C8.28022 5.11273 7.64763 4.46682 7.00172 3.83422C5.95627 2.81541 4.65112 2.81541 3.61234 3.84088C2.81327 4.62663 2.0475 5.43236 1.23511 6.20479C0.482654 6.91729 0.103097 7.78961 0.0231904 8.80842C-0.103329 10.4665 0.302864 12.0313 0.875529 13.5562C2.0475 16.7125 3.83208 19.5159 5.99622 22.0863C8.91948 25.5622 12.4087 28.3123 16.4906 30.2967C18.3285 31.189 20.2329 31.8748 22.3039 31.988C23.7289 32.068 24.9674 31.7084 25.9596 30.5963C26.6388 29.8372 27.4046 29.1447 28.1237 28.4189C29.1892 27.3401 29.1958 26.035 28.1371 24.9696C26.8719 23.6977 25.6 22.4325 24.3282 21.1673Z" />
										<path d="M23.0595 15.8642L25.5166 15.4447C25.1304 13.1873 24.065 11.1431 22.4468 9.51829C20.7355 7.80696 18.5714 6.72822 16.1875 6.39527L15.8412 8.86572C17.6857 9.12542 19.3638 9.95778 20.6889 11.2829C21.9408 12.5348 22.7598 14.1196 23.0595 15.8642Z" />
										<path d="M26.8997 5.18062C24.063 2.34393 20.4738 0.552689 16.5118 0L16.1655 2.47045C19.5882 2.94989 22.6913 4.50142 25.1417 6.94523C27.4657 9.26919 28.9906 12.2058 29.5433 15.4353L32.0004 15.0158C31.3545 11.2735 29.5899 7.87748 26.8997 5.18062Z" />
									</svg>
								</div>
								<div className="mt-4">
									<h6 className="text-2xl font-bold text-neutral-950 dark:text-neutral-dark-950 mb-2">Call Us</h6>
									<p className="text-base font-medium text-neutral-700 dark:text-neutral-dark-700 mb-0">(319) 555-0115</p>
									<p className="text-base font-medium text-neutral-700 dark:text-neutral-dark-700 mb-0">(239) 555-0108</p>
								</div>
							</div>
							{/* Contact Info Block 3 */}
							<div className="flex flex-col item-center justify-center text-center">
								<div className="size-20 rounded-full bg-primary-light-950 dark:bg-primary-dark-950 flex items-center justify-center mx-auto">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="fill-white dark:fill-white">
										<path d="M31.1372 13.9185L18.0816 0.863281C17.5252 0.306641 16.7854 0 15.9986 0C15.2117 0 14.472 0.306396 13.9153 0.863037L0.868685 13.9094C0.864291 13.9138 0.859896 13.9185 0.855502 13.9229C-0.287077 15.072 -0.285123 16.9365 0.861117 18.0828C1.3848 18.6067 2.07645 18.9102 2.81595 18.9419C2.84598 18.9448 2.87625 18.9463 2.90677 18.9463H3.42703V28.5525C3.42703 30.4534 4.97367 32 6.87503 32H11.982C12.4995 32 12.9195 31.5803 12.9195 31.0625V23.5312C12.9195 22.6638 13.625 21.9583 14.4925 21.9583H17.5047C18.3721 21.9583 19.0777 22.6638 19.0777 23.5312V31.0625C19.0777 31.5803 19.4973 32 20.0152 32H25.1221C27.0235 32 28.5701 30.4534 28.5701 28.5525V18.9463H29.0525C29.8391 18.9463 30.5789 18.6399 31.1358 18.0833C32.2832 16.9351 32.2837 15.0674 31.1372 13.9185Z" />
									</svg>
								</div>
								<div className="mt-4">
									<h6 className="text-2xl font-bold text-neutral-950 dark:text-neutral-dark-950 mb-2">Office</h6>
									<p className="text-base font-medium text-neutral-700 dark:text-neutral-dark-700 mb-0">4517 Washington Ave. </p>
									<p className="text-base font-medium text-neutral-700 dark:text-neutral-dark-700 mb-0">Manchester, Kentucky 39495</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</section>

			{/* Custom CTA Section */}
			<section id="cta-section">
				<CustomCTASection
					heading=<CTAHeader />
					subheading=<CTASubHeader />
					exploreLabel="Explore Mosques"
					directionsLabel="Get Directions"
				/>
			</section>
		</>
	);
}

export default Contact;
