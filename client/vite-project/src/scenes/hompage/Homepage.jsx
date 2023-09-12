
import Friendlist from '../../components/Friendlist'
import Profile from '../../components/Profile'
import Posts from '../../components/Posts'
import { useSelector } from 'react-redux';
import Imgupload from '../../components/Imgupload';

export default function Homepage() {

  const user = useSelector((state)=>state.user)

  


  return (
    <div>
      <div className='mt-5 w-[90%]  mx-auto'>
        <div className='flex max-lg:flex-wrap'>
          <div className="left w-full lg:w-1/4 px-4 mb-4">
          <Profile userId={user._id}/>
          </div>
          <div className="main w-full lg:w-2/4 px-4 mb-4  ">
            <Imgupload/>
            <Posts userId={user._id}/>
          </div>
          <div className="right w-full lg:w-1/4 max-md:hidden  px-4 mb-4">
<Friendlist userId={user._id}/>
          </div>
        </div>
      </div>
    </div>
  )
}
