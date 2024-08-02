import { FaUserTie } from "react-icons/fa"
import PageAccessTemplate from "../../components/dashboard/PageAccessTemplate"

const ManagerPage = () => {
    return (
      <div className='pageTemplate2'>
        <PageAccessTemplate color="black" icon={FaUserTie} role="Manager" />
      </div>
    );
};
  
export default ManagerPage