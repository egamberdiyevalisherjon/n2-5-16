import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const Posts = () => {
  const { data: posts, isLoading } = useFetch("/posts");

  return isLoading ? (
    <Spinner />
  ) : (
    posts && (
      <div>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post._id}>
                <Link to={`/posts/${post._id}`}>{post._id}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default Posts;
