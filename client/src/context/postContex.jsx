import { useState, useEffect, createContext, useContext } from "react";
import {
  getPostsRequest,
  postPostsRequest,
  deletePostRequest,
  getPostRequest,
  putPostRequest,
} from "../api/posts";

const postsContext = createContext();

export const usePosts = () => {
  const context = useContext(postsContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequest();
    setPosts(res.data);
  };

  const createPost = async (post) => {
    try {
      const res = await postPostsRequest(post);
    setPosts([...posts, res.data]);
    } catch (error) {
      console.log(error)
    }
  };

  const deletePost = async (id) => {
    const res = await deletePostRequest(id);
    if (res.status === 204) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res.data;
  };

  const updatePost = async (id, post) => {
    const res = await putPostRequest(id, post);
    setPosts(posts.map((post) => post._id === id ? res.data : post));
  };


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <postsContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost,
      }}
    >
      {children}
    </postsContext.Provider>
  );
};
