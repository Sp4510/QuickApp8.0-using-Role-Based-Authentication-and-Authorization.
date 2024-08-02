import { FaUserCog } from "react-icons/fa"
import PageAccessTemplate from "../../components/dashboard/PageAccessTemplate"

const OwnerPage = () => {
  return (
    <div className="pageTemplate2">
        <PageAccessTemplate color="black" icon={FaUserCog} role="Owner" />
    </div>
  );
};

export default OwnerPage;