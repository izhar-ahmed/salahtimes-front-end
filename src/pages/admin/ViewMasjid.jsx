import { useParams } from "react-router";
import MasjidInfo from "../../components/admin/MasjidInfo";

const ViewMasjid = () => {
	const { masjidId } = useParams();
	return (
		<MasjidInfo masjidId={masjidId} />
	);
}

export default ViewMasjid; 