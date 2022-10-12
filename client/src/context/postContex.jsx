import { useState, useEffect, createContext, useContext } from "react";
import {getPostsRequest,postPostsRequest} from '../api/posts'

 const postsContext = createContext();

 export const usePosts = () => {

  const context = useContext(postsContext)
  return context
 }

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () =>{
  const res = await getPostsRequest()
  setPosts(res.data)
  }

  const createPost = async(post) =>{
    const req = await postPostsRequest(post)
    setPosts([...posts,req.data])
  }

  useEffect(()=>{
    getPosts()
    },[])
 
  return <postsContext.Provider value={{
    posts,
    getPosts,
    createPost
  }}>
    {children}
    </postsContext.Provider>;
};
