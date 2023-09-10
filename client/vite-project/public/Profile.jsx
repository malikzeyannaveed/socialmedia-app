import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
    const user = useSelector((state)=>state.user)
  return (
    <div>
      <div>
        <div className='bg-white w-fit'>
            <img src={`${import.meta.env.VITE_APP_IMAGE}${user.picturePath}`} alt="" />
            <h2>{user.name}</h2>
        </div>
        <div>
            <div>
            <h5> viewes on your profile:</h5>
            <h5>{user.impession}</h5>
            </div>
            <div>
            <h5>impression of your posts</h5>
            <h5>{user.impressions}</h5>
            </div>
        </div>
        <div className="social">
            <h3>
        Social Profiles
            </h3>
            <div>
                <img src="" alt="" srcset="" />
                <h6>Twitter</h6>
<p>Social Network</p>
            </div>
            <div>
                <img src="" alt="" srcset="" />
                <h6>Linkedin</h6>
<p>Social Network</p>
            </div>
        </div>
      </div>
    </div>
  )
}
