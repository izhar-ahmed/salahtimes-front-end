import { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import DOMPurify from "dompurify";
import { consts } from '@/util/APIEndpoints';
import PropTypes from 'prop-types';
import { SITE_KEY } from "@/util/env";
import './ContactForm.css'

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	subject: Yup.string().required('Subject is required'),
	message: Yup.string().required('Message is required'),
});



const ContactForm = ({ successMessage, onSetSuccessMessage }) => {
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
			
			await axios.post(consts.CREATE_CONTACT_API, {
				...sanitizedValues,
				recaptchaToken,
			});
			onSetSuccessMessage('Message sent successfully');
			setTimeout(() => {
				onSetSuccessMessage('');
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

	return (
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
							<div className="grid md:grid-cols-2 gap-2 mb-2 md:mb-2">
								<div>
									<Field type="text" name="name" placeholder="Name" className="input-default" />
									<ErrorMessage name="name" component="div" className="text-red-500" />
								</div>
								<div>
									<Field type="email" name="email" placeholder="Email" className="input-default" />
									<ErrorMessage name="email" component="div" className="text-red-500" />
								</div>
								<div>
									<Field type="text" name="subject" placeholder="Subject" className="input-default" />
									<ErrorMessage name="subject" component="div" className="text-red-500" />
								</div>
							</div>
							<div className='mb-2'>
								<Field as="textarea" name="message" placeholder="Message" className="textarea-default" />
								<ErrorMessage name="message" component="div" className="text-red-500 mb-4" />
							</div>
							<ReCAPTCHA sitekey={SITE_KEY} onChange={onRecaptchaChange} className="mb-4" ref={setCaptchaRef} />
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
	);
}

ContactForm.propTypes = {
	successMessage: PropTypes.string,
	onSetSuccessMessage: PropTypes.any
}

export default ContactForm;
