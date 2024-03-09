import { useParams } from "react-router";
import EditMasjidForm from "../../components/admin/EditMasjidFrom";

const EditMasjid = () => {
	const {masjidId} = useParams();
	
	return (
		<>
		<EditMasjidForm masjidId={masjidId} />
		</>
	);
}

export default EditMasjid;