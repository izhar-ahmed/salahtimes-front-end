import useUserProfile from './UserProfileHook';
import PropTypes from "prop-types";

const UserProfileTab = ({ token }) => {
  const { userProfile, error } = useUserProfile(token);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <div>
        <p><strong>Name:</strong> {userProfile.name}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
      </div>
    </div>
  );
};

UserProfileTab.propTypes = {
  token: PropTypes.string
}

export default UserProfileTab;
