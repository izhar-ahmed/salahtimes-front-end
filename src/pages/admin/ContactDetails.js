import { useParams } from "react-router-dom";
import ContactInfo from "../../components/admin/ContactInfo";

const ContactDetails = () => {
	const { contactId } = useParams();
	return (
		<ContactInfo contactId={contactId} />
	);
}

export default ContactDetails;