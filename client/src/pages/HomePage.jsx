import {usePosts} from '../context/postContex'
import {VscEmptyWindow} from 'react-icons/vsc'
import {Link} from 'react-router-dom'

const HomePage = () => {
const {posts} = usePosts()

if(posts.length === 0){
  return <div className='flex flex-col justify-center items-center'>
    <h1>There are no posts</h1>
    <VscEmptyWindow size={100}/>
  </div>
}
  

  return (
    <div>
      <Link to = '/new'>Create a new post</Link>
      {posts.map((post, ) => <div key={post._id}>
        {post.title}
        {post.desc}
        {/* <img src={post.image.url} alt="image" /> */}
      </div>)}
    </div>
  );
};

export default HomePage;
