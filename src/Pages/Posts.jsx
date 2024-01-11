import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Posts = () => {
  const { data: posts, isLoading, setData } = useFetch("/posts");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreatePost(e) {
    e.preventDefault();

    if (!text) return toast("Text is required", { type: "error" });

    setLoading(true);
    try {
      const { data } = await axios.post("/posts", { text });
      setData([data, ...posts]);
    } catch (error) {
      console.log(error);
      const errors = error?.response?.data?.errors;
      if (errors?.length > 0) {
        errors.forEach((err) => {
          toast(err.msg, { type: "error" });
        });
      }
    } finally {
      setLoading(false);
      setText("");
    }
  }

  return (
    <section>
      <Container>
        <h1 className="text-info display-4 fw-bold">Sign In</h1>
        <p className="fs-4">
          <FaUser /> Welcome to the community
        </p>
        <p className="bg-info text-light py-2 px-4">Say Something...</p>
        <Form className="d-grid gap-3 my-3" onSubmit={handleCreatePost}>
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            as="textarea"
            placeholder="Create a Post"
          />
          <Button type="submit" variant="dark" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </Form>
        {isLoading ? (
          <Spinner />
        ) : (
          posts && (
            <div>
              <ul>
                {posts.map((post) => {
                  return (
                    <li key={post._id}>
                      <Link to={`/posts/${post._id}`}>
                        {post.text} ({post.likes.length}{" "}
                        {post.likes.length > 1 ? "likes" : "like"})
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
        )}
      </Container>
    </section>
  );
};

export default Posts;
