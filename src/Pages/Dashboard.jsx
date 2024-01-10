import { Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";

const Dashboard = () => {
  const { data: profile, isLoading } = useFetch("/profile/me");

  return isLoading ? (
    <Spinner />
  ) : profile ? (
    <div>Dashboard</div>
  ) : (
    <div>create a profile please.</div>
  );
};

export default Dashboard;
