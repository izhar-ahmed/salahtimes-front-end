import { Link } from 'react-router-dom';
import errorImage from '../img/404.svg';
import '../pages/Common.css'
const Error404 = () => {
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
								Oops! We Can’t find that page
							</h6>
							<p className="text-lg text-neutral-700 dark:text-neutral-dark-700 font-bold mb-12">
								Sorry, the page you are looking for doesn’t exits or has been moved.
								<br></br>
								<Link className="text-neutral-950 dark:text-neutral-dark-950 item-link" to="/">
									Back to Home
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</>

	);
}

export default Error404;