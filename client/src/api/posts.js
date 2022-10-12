import axios from 'axios'


export const getPostsRequest = async () => await axios.get('http://localhost:8000/posts')
export const postPostsRequest = async (post) => await axios.post('http://localhost:8000/posts', post)