import { FaUser } from "react-icons/fa"
import PageAccessTemplate from "../../components/dashboard/PageAccessTemplate"

const UserPage = () => {
  return (
    <div className="pageTemplate2">
      <PageAccessTemplate color="black" icon={FaUser} role="User"/>
    </div>
  )
}

export default UserPage