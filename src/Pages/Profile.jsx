import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const Profile = () => {
  const { userId } = useParams();
  const { isLoading, data } = useFetch(`/profile/user/${userId}`);

  if (isLoading) return <Spinner />;

  if (!data) return;

  return <div>Profile</div>;
};

export default Profile;
