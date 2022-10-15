import axios from "axios";

export const getPostsRequest = async () =>
  await axios.get("http://localhost:8000/posts");

  export const postPostsRequest = async (post) => {
    const form = new FormData();
    for (let key in post) {
      form.append(key, post[key]);
    }
    return await axios.post("http://localhost:8000/posts", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  

  export const deletePostRequest = async (id) =>
  await axios.delete("http://localhost:8000/posts/" + id);

  export const getPostRequest = async (id) =>
  await axios.get("http://localhost:8000/posts/" + id);

  export const putPostRequest = async (id, newFields) =>
  await axios.put(`http://localhost:8000/posts/${id}`, newFields);
