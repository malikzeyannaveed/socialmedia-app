import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import remove from "/delete.png"
import add from "/add-friend.png"

export default function Friend({ friendId, name, userPicturePath}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    
    const isFriend = friends.find((friend) => friend._id === friendId);
    console.log("dfs",isFriend)

    
  const patchFriend = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          auth_token:`${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };


  return (
    <div>
        
<div className="flex mb-2 justify-between">
    <div className="lef">
<div className="main flex">
    <img className="w-14 h-14 object-contain rounded-full " src={`${import.meta.env.VITE_APP_IMAGE}${userPicturePath}`} alt="" />
    <h3 className="text-black  dark:text-white font-base ml-2 mt-3 text-base">{name}</h3>
</div>
    </div>
    <div className="righ">
{isFriend?<div>
<img  onClick={() => patchFriend()} className="w-10 cursor-pointer mt-2 h-10 object-contain  rounded-full " src={remove} alt="" />
</div>:<div>
<img src={add}  className="w-10 h-10 object-contain  mt-2 cursor-pointer rounded-full " onClick={() => patchFriend()} alt="" />
</div>
}
    </div>
    </div>      
    </div>
  )
}
