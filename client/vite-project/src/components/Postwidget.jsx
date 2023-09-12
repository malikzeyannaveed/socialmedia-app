import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import Friend from "./Friend";
import comment from "/comment.png";
import blackheart from "/heartq.png";
import redheart from "/heart.png";

export default function Postwidget({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  console.log(
    postId,
    postUserId,
    name,
    description,
    picturePath,
    userPicturePath,
    likes,
    comments
  );

  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          auth_token: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div>
      <div>
        <div className="bg-white my-4 dark:bg-neutral-900 shadow-lg rounded-lg p-4">
          <Friend
            name={name}
            friendId={postUserId}
            userPicturePath={userPicturePath}
          />
          <div>
            <img
              className="w-fit mt-2 h-auto"
              src={`${import.meta.env.VITE_APP_IMAGE}${picturePath}`}
              alt=""
            />
          </div>
          <div className="ikeandcomment mt-2 flex">
            <div>
              {isLiked ? (
                <img
                  src={redheart}
                  className="transition duration-300 ease-in-out object-contain w-7 h-7"
                  onClick={() => {
                    patchLike();
                  }}
                  alt=""
                />
              ) : (
                <img
                  src={blackheart}
                  className="object-contain w-7 h-7 transition duration-300 ease-in-out"
                  onClick={() => {
                    patchLike();
                  }}
                  alt=""
                />
              )}
            </div>
            <span className="ml-1 dark:text-white mt-1">{likeCount}</span>

            <div >
              <img
                className="object-contain w-7 h-7 transition duration-300 ml-40 mb-2 ease-in-out"
                src={comment}
                onClick={() => {
                  setIsComments(!isComments);
                }}
                alt=""
              />
              {isComments && (
                <div>
                  {comments ? (
                      comments.map((comment) => <div>{comment}</div>)
                  ) : (
                    <span>No comment</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
