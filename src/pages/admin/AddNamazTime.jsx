import { useParams } from "react-router";
import AddTimeTableForm from "../../components/admin/AddTimetableFrom";

const AddNamazTime = () => {
	const {masjidId} = useParams();
	return(
		<AddTimeTableForm masjidId={masjidId} />
	);
}

export default AddNamazTime;