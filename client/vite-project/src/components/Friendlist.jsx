import Friend from "./Friend";
import { useSelector,useDispatch } from "react-redux";
import {useState,useEffect} from 'react'
import { setFriends } from "../state";
export default function Friendlist({userId}) {

  const token = useSelector((state) => state.token);
  const first = useSelector((state) => state.user.friends);
  const dispatch = useDispatch()

  const getFriends = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}users/${userId}/friends`,
      {
        method: "GET",
        headers: {auth_token:`${token}`},
      }
    );
    const data = await response.json();
dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
<div>
    <div className="bg-white shadow-md p-4  my-4 dark:bg-neutral-900 shadow-lg  rounded-lg">
<h5 className="dark:text-white mb-2">Friend List</h5>
<div>
{
first?
  
first.map((friend)=>(
  <Friend name={friend.name} key={friend._id} friendId={friend._id} userPicturePath={friend.picturePath}/>
  )):
<div>Loading</div>

}
</div>

        </div>
        </div>      
    </div>
  )
}
