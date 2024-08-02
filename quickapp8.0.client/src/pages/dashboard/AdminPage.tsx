import { FaUserShield } from "react-icons/fa";
import PageAccessTemplate from "../../components/dashboard/PageAccessTemplate";

const AdminPage = () => {
  return (
    <div className="pageTemplate2">
      <PageAccessTemplate color="black" icon={FaUserShield} role="Admin" />
    </div>
  );
};

export default AdminPage;