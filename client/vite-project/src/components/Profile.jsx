import { useState,useEffect } from 'react';
import linkedin from '/linkedin.png'
import twitter from '/twitter.png'
import { useSelector } from 'react-redux';

export default function Profile({userId}) {
    const [user,setuser] = useState()
    const token = useSelector((state)=>state.token)
    const getData = async ()=>{
await fetch(`${import.meta.env.VITE_APP_API_URL}users/${userId}`, {
    method: 'GET',
    headers:{auth_token:`${token}`}
}
    ).then(gg=>gg.json()).then(ff=>setuser(ff))
    }

    useEffect(() => {
getData()
    
      }, [])
    
  return (
    <div className='container '>
{user ?
      <div className='bg-white dark:bg-neutral-900  shadow-lg rounded-lg p-4'>
        <div className='flex mb-2'>
            <img className='w-14 h-14 object-contain  rounded-full ' src={`${import.meta.env.VITE_APP_IMAGE}${user.picturePath}`} alt="" />
            <h2 className='text-black dark:text-white font-semibold ml-2 mt-3 text-lg'>{user.name}</h2>
        </div>
        <div className='h-0.5 bg-neutral-400 dark:bg-black'></div>
        <div className='mb-2'>
            <div className='flex  mt-2 justify-between'>
            <h5 className='mr-16 text-neutral-600 dark:text-neutral-700'> viewes on your profile:</h5>
            <h5 className='font-semibold dark:text-white'>{user.viewedProfile}</h5>
            </div>
            <div  className='flex justify-between'>
            <h5 className='dark:text-neutral-700 text-neutral-600'>impression of your posts</h5>
            <h5 className=' dark:text-white font-semibold'>{user.impressions}</h5>
            </div>

        </div>
        <div className='h-0.5 bg-neutral-400 dark:bg-black'></div>
        <div className="social mt-2">
            <h3 className='font-bold text-lg dark:text-neutral-200'>
        Social Profiles
            </h3>
            <div className='flex mt-2'>
                <img src={twitter} className='w-8 h-8  object-contain ' alt=""  />
                <div className='ml-2 mb-2'>
                <h6 className='dark:text-neutral-200 font-bold'>Twitter</h6>
<p className='text-sm -mt-1 text-neutral-600 dark:text-neutral-700'>Social Network</p>
</div>
            </div>
            <div className='flex'>
                <img src={linkedin} className='w-8 h-8 object-contain' alt=""  />
                <div className='ml-2 mb-2'>
                <h6 className='dark:text-neutral-200 font-bold'>Linkedin</h6>
<p className='text-sm -mt-1 text-neutral-600 dark:text-neutral-700'>Social Network</p>
</div>
            </div>
        </div>
      </div>:<div>Loading</div>
      }
    </div>
  )
}
