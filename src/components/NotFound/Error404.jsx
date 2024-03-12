import errorImage from './404.svg';
import PropTypes from 'prop-types';

const Error404 = ({heading}) => {
	return (
		<>
			<section className='mt-5'>
				<div className="container mx-auto">
					<div className="flex flex-col lg:flex-row gap-8 items-center">
						<div className="lg:pr-8 w-1/2">
							<img src={errorImage} alt="" />
						</div>
						<div className="lg:pl-8  lg:w-1/2">
							<h1 className="text-9xl text-neutral-950 dark:text-neutral-dark-950 font-bold mb-2">
								404
							</h1>
							<h6 className="text-5xl text-neutral-950 dark:text-neutral-dark-950 font-bold mb-2">
								Oops! We Can&apos;t find that page
							</h6>
							{heading}
						</div>
					</div>
				</div>
			</section>
		</>

	);
}

Error404.propTypes = {
  heading: PropTypes.element.isRequired
}

export default Error404;