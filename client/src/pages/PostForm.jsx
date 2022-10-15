import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePosts } from "../context/postContex";
import * as Yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const PostForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { createPost, getPost, updatePost } = usePosts();
  const [post, setPost] = useState({
    title: "",
    desc: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost(post);
      }
    })();
  }, [params.id, getPost]);

  return (
    <div className="text-black flex flex-col justify-center items-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black rounded-lg">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Go back
          </Link>
        </header>

        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            desc: Yup.string().required("Description is required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center"
            >
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Title
              </label>
              <Field
                component="textarea"
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none bg-gray-600 rounded text-white m-4"
              />
              <ErrorMessage
                component="p"
                name="title"
                className="text-red-400 text-sm"
              />
              <label
                htmlFor="desc"
                className="text-sm block font-bold text-gray-400"
              >
                Description
              </label>
              <Field
                component="textarea"
                name="desc"
                placeholder="description"
                className="px-3 py-2 focus:outline-none bg-gray-600 rounded text-white m-4"
              />
              <ErrorMessage
                component="p"
                name="desc"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="desc"
                className="text-sm block font-bold text-gray-400"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                className="py-2 px-3 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <button
                className="m-4  hover:bg-sky-600 rounded-md bg-sky-400 text-white w-24"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (<AiOutlineLoading className="animate-spin h-4 w-5"/>) : ("Save Post")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostForm;
