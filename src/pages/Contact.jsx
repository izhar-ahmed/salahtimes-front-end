import { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Header2 from '../components/common/Header2';
import CustomCTASection from '../components/CustomCTASection';
import ReCAPTCHA from 'react-google-recaptcha';
import * as DOMPurify from 'dompurify';
import { Helmet } from "react-helmet-async";
import { createContact } from '../util/util';


const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	subject: Yup.string().required('Subject is required'),
	message: Yup.string().required('Message is required'),
});

const Contact = () => {
	const [successMessage, setSuccessMessage] = useState('');
	const [recaptchaToken, setRecaptchaToken] = useState('');
	const recaptchaRef = useRef(null);

	const onRecaptchaChange = (token) => {
		console.log(token);
		setRecaptchaToken(token);
	};

	const setCaptchaRef = (ref) => {
		if (ref) {
			return recaptchaRef.current = ref;
		}
	};

	const resetCaptcha = () => {
		// maybe set it till after is submitted
		if (recaptchaRef.current && typeof recaptchaRef.current.reset !== 'undefined') {
			recaptchaRef.current.reset();
		}
	}

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			const sanitizedValues = Object.keys(values).reduce((acc, key) => {
				acc[key] = DOMPurify.sanitize(values[key]);
				return acc;
			}, {});
			await axios.post(createContact, {
				...sanitizedValues,
				recaptchaToken,
			});
			setSuccessMessage('Message sent successfully');
			setTimeout(() => {
				setSuccessMessage('');
			}, 3000);
			resetForm();
			setRecaptchaToken('');
			// Reset reCAPTCHA component
			resetCaptcha()
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setSubmitting(false);
		}
	};


	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Helmet>
				<title>Contact Us | Salahtimes</title>
				<meta
					name="description"
					content="Get in touch with Salahtimes to discover accurate and reliable Namaz time schedules. Call us, use our live chat widget, or send us an email, and we will get back to you as soon as possible."
				/>
			</Helmet>
			{/* Header Section */}
			<Header2 heading={<h1 className="text-2xl leading-tight md:text-6xl lg:text-6xl font-bold text-grey mb-0">Let’s Stay <span className="font-light">Connected</span></h1>} subHeading={`Call us, use our live chat widget or send us an email and we will get back to you as soon as possible.`} />

			{/* Contact Form Section */}
			<section className="pb-20">
				{/* Formik Wrapper */}
				<Formik
					initialValues={{ name: '', email: '', subject: '', message: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className="container w-[80%] mx-auto">
							{/* Form Inputs */}
							<div className="max-w-[850px] mx-auto bg-neutral-0 dark:bg-neutral-dark-0 rounded-3xl p-8 md:p-12 lg:p-20 border border-neutral-200 dark:border-neutral-dark-200">
								<h4 className="text-neutral-950 dark:text-neutral-dark-950 text-3xl font-bold mb-8"><span className="font-light">Get In</span> Touch</h4>
								{successMessage && <div className="text-green-500">{successMessage}</div>}
								<div className="grid md:grid-cols-3 gap-4 mb-4 md:mb-0">
									<div className='mb-4'>
										<Field type="text" name="name" placeholder="Name" className="input-default" />
										<ErrorMessage name="name" component="div" className="text-red-500 mb-4" />
									</div>
									<div className='mb-4'>
										<Field type="email" name="email" placeholder="Email" className="input-default" />
										<ErrorMessage name="email" component="div" className="text-red-500 mb-4" />
									</div>
									<div className='mb-4'>
										<Field type="text" name="subject" placeholder="Subject" className="input-default" />
										<ErrorMessage name="subject" component="div" className="text-red-500" />
									</div>
								</div>
								<div className='mb-4'>
									<Field as="textarea" name="message" placeholder="Message" className="textarea-default" />
									<ErrorMessage name="message" component="div" className="text-red-500 mb-4" />
								</div>
								<ReCAPTCHA sitekey="6Le8g3IpAAAAAFixDZCvnUbZRWFS07FWlOVEIWI5" onChange={onRecaptchaChange} className="mb-4" ref={setCaptchaRef} />
								<button type="submit" className="group btn bg-primary-light-950 dark:bg-primary-dark-950 rounded-full px-8 py-4 text-xl text-white dark:text-white flex gap-2 items-center" disabled={isSubmitting}>
									{isSubmitting ? 'Sending...' : 'Send Message'}
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-neutral-950 dark:fill-white group-hover:translate-x-1 transition-all duration-300">
										<g clipPath="url(#clip0_253_4238)">
											<path d="M23.6164 11.0663L14.9491 2.39884C14.7017 2.15143 14.372 2.01562 14.0204 2.01562C13.6684 2.01562 13.3388 2.15162 13.0914 2.39884L12.3045 3.18596C12.0573 3.43298 11.9211 3.76293 11.9211 4.11473C11.9211 4.46634 12.0573 4.80741 12.3045 5.05443L17.3608 10.1219H1.29657C0.572288 10.1219 0 10.6889 0 11.4134V12.5262C0 13.2507 0.572288 13.8748 1.29657 13.8748H17.4182L12.3047 18.9706C12.0575 19.218 11.9213 19.539 11.9213 19.8908C11.9213 20.2422 12.0575 20.5679 12.3047 20.8151L13.0916 21.5997C13.339 21.8471 13.6686 21.9819 14.0206 21.9819C14.3722 21.9819 14.7019 21.8453 14.9493 21.5979L23.6166 12.9307C23.8646 12.6825 24.001 12.3512 24 11.999C24.0008 11.6456 23.8646 11.3141 23.6164 11.0663Z"></path>
										</g>
										<defs>
											<clipPath id="clip0_253_4238">
												<rect width="24" height="24"></rect>
											</clipPath>
										</defs>
									</svg>
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</section>

			{/* Contact Information Section */}
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

			{/* Custom CTA Section */}
			<CustomCTASection
				heading={<h2 className="text-2xl leading-tight md:text-4xl lg:text-4xl font-bold text-white mb-0"><span className="font-light">Let&apos;s</span> Explore The Mosque Locations <span className="font-light">together!</span></h2>}
				subheading={<p className="text-lg font-medium text-white">Find the Right Direction for Prayer.</p>}
				exploreLabel="Explore Mosques"
				directionsLabel="Get Directions"
			/>
		</>
	);
}

export default Contact;
