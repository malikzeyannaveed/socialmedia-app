import Friend from "./Friend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import Postwidget from "./Postwidget";


export default function Posts({ userId, isProfile = false }) {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}posts`, {
      method: "GET",
      headers: {auth_token:`${token}`},
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}posts/${userId}/posts`,
      {
        method: "GET",
        headers: { auth_token:`${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    console.log(data)
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps




  return (
    <div>
      {posts.map(
        ({
          _id,
          userId,
          name,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <Postwidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={name}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </div>
  )
}
