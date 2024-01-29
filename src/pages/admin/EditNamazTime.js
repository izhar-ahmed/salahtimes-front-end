import { useParams } from "react-router";
import EditTimeTableForm from "../../components/admin/EditTimeTableForm";

const EditNamazTime = () => {
const {masjidId} = useParams();
return (
	<EditTimeTableForm masjidId={masjidId} />
);
}

export default EditNamazTime;