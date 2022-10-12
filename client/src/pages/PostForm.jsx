import {Formik, Form, Field, ErrorMessage} from 'formik'
import { usePosts } from '../context/postContex'
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom'

const PostForm = () => {

  const navigate =useNavigate()
  const {createPost} = usePosts()
  return (
    <div className='text-black'>
      <Formik
      initialValues={{
        title:'',
        desc:''
      }}
      validationSchema={Yup.object({
      title: Yup.string().required("Title is required"),
      desc:Yup.string().required("Description is required")
     })}
      onSubmit={async(values, actions) => {
        await createPost(values)
        navigate('/')
      }}
      >
       {({handleSubmit})=>(
         <Form onSubmit={handleSubmit} >
         <Field name='title' placeholder="title"/>
         <ErrorMessage component="p" name= "title" />
         <Field name= 'desc'placeholder="description"/>
         <ErrorMessage component="p" name= "desc" />
         <button type='submit' className='text-white'>Save Post</button>
       </Form>
       )}
      </Formik>
    </div>
  )
}

export default PostForm