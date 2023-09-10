
import Friendlist from '../../components/Friendlist'
import Profile from '../../components/Profile'
import { useSelector } from 'react-redux';
import Imgupload from '../../components/Imgupload';

export default function Homepage() {
  const user = useSelector((state)=>state.user)
  return (
    <div>
      <div className='mt-5 w-[90%]  mx-auto'>
        <div className='flex'>
          <div className="left">
          <Profile userId={user._id}/>
          </div>
          <div className="main">
            <Imgupload/>
          </div>
          <div className="right">
<Friendlist/>
          </div>
        </div>
      </div>
    </div>
  )
}
