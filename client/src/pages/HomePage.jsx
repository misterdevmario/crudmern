import { usePosts } from "../context/postContex";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const { posts } = usePosts();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>There are no posts</h1>
        <VscEmptyWindow size={100} />
        <Link to="/new">Create a new post</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/new">Create a new post</Link>
      Posts ({posts.length})
      <div className="grid grid-cols-3 gap-2">
        
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
