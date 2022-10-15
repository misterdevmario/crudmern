import toast from "react-hot-toast";
import { usePosts } from "../context/postContex";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate()
  const { deletePost } = usePosts();
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="">
          <div className="flex justify-center items-center flex-col">
            <div className="text-white flex justify-center items-center flex-col m-4">
              Do you want to delete? <strong>{id}</strong>
            </div>
            <div>
              <button
                className="bg-red-500 hover:bg-red-400 px-3 py-2 text-white rounded-sm mx-2"
                onClick={() => {deletePost(id), toast.dismiss(t.id)}}
              >
                Delete
              </button>
              <button
                className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ),
      {
        style: {
          height: "20vh",

          background: "#202020",
        },
      }
    );
  };

  return (
    <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer w-full" onClick={()=> navigate(`/posts/${post._id}`)}>
      <div className="px-4 py-7">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold">{post.title}</h3>
          <button
            className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {e.stopPropagation(), handleDelete(post._id) }}
          >
            Delete
          </button>
        </div>
        <p>{post.desc}</p>
        {post.image && <img src={post.image.url} alt=""/>}
      </div>
    </div>
  );
};

export default PostCard;
