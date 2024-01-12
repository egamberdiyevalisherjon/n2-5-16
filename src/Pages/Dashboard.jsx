import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const Dashboard = () => {
  const { data: profile, isLoading } = useFetch("/profile/me");

  return isLoading ? (
    <Spinner />
  ) : profile ? (
    <div>
      Dashboard <Link to="/edit-profile">Edit your profile</Link>
    </div>
  ) : (
    <div>
      <Link to="/create-profile">Create</Link> a profile please.{" "}
    </div>
  );
};

export default Dashboard;
