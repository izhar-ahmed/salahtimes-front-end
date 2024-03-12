import Error404 from "../components/NotFound/Error404";
import { Link } from "react-router-dom";

const NotFoundPageContent = () => {
  return (
    <>
      <p className="text-lg text-neutral-700 dark:text-neutral-dark-700 font-bold mb-12">
        <span className="inline-block mb-2">
          Sorry, the page you are looking for doesn&quot;t exits or has been moved.
        </span>
        <Link className="text-neutral-950 dark:text-neutral-dark-950 item-link" to="/m-admin">
          Back to Dashboard
        </Link>
      </p>
    </>
  )
}


const NotFound2 = () => {
	return (
		<>
			<Error404 heading=<NotFoundPageContent /> />
		</>
	);
}

export default NotFound2;