import UserProfileTab from "@/components/admin/UserProfileTab";
import ResetPasswordTab from "@/components/admin/ResetPasswordTab";
import TabComponent from "@/components/admin/TabComponent";
import { getLocalStorageItem } from "@/util/common";

const UserProfilePage = () => {
  const token = getLocalStorageItem("token");

  return (
    <div className="container mx-auto pb-8">
      <h1 className="text-2xl mb-4">User Profile</h1>
      <TabComponent>
        <div title="User Profile">
          <UserProfileTab token={token} />
        </div>
        <div title="Reset Password">
          <ResetPasswordTab token={token} />
        </div>
      </TabComponent>
    </div>
  );
};

export default UserProfilePage;
