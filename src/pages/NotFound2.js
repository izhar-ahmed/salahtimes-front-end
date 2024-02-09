import Error404 from "../components/Error404";
import { Link } from "react-router-dom";
const NotFound2 = () => {
	return (
		<>
		<Error404 heading={<p className="text-lg text-neutral-700 dark:text-neutral-dark-700 font-bold mb-12">
        Sorry, the page you are looking for doesn’t exits or has been moved.
        <br></br>
        <Link className="text-neutral-950 dark:text-neutral-dark-950 item-link" to="/m-admin">
          Back to Dashboard
        </Link>
      </p>}/>
		</>
	);
}

export default NotFound2;