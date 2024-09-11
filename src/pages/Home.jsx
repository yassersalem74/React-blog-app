import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Home() {
  return (
    <div className="relative">
      <div className="p-5">
        <PostCard />
      </div>
      <div className="fixed bottom-24 right-0 w-2/6 sm:w-1/6">
        <Link to="/add" className="text-3xl font-bold text-white flex justify-end">
          <img src="https://ojukwu-twitter-clone.netlify.app/img/t26_c6_a4_p2.png" alt="" className='w-2/3' />
        </Link>
      </div>
    </div>
  )
}