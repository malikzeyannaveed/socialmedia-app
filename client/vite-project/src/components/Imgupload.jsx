import { useCallback } from "react";
import {useDropzone} from 'react-dropzone'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {setPosts} from '../state/index'

export default function Imgupload() {
  const dispatch = useDispatch()
  const [desc, setdesc] = useState('')
  const [img, setimg] = useState()
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

//   const onDrop = useCallback((acceptedFiles) => {
//     setimg(acceptedFiles[0])

// }, []);

const onDrop = useCallback((acceptedFiles) => {
  console.log("Accepted Files:", acceptedFiles);
  setimg(acceptedFiles[0]);
}, [])




const makedata = ()=>{

  const formData = new FormData();
  formData.append('picture',img);
  formData.append('userId',user._id);
  formData.append('name',user.name);
  formData.append('userPicturePath',user.picturePath);
  formData.append('description',desc);
return formData
}



const handleclick = async ()=>{
 
  const makeddata = await makedata()
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}posts`, {
      method: "POST",
      headers:{auth_token:`${token}`},
      body: makeddata,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));

  }




  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div className="">
        <div className="bg-white dark:bg-neutral-900 dark:text-white rounded-3xl px-5 py-2 shadow-md ">
          <div className="py-2 px-2">
          <div {...getRootProps()} className="dropzone border-dashed  border-2 py-6 px-4" >
        <input {...getInputProps()} />
        <p>Drag &amp; drop an image here, or click to select one</p>
      </div>

<div className="flex justify-between mt-3">
  <input type="text" value={desc} onChange={(e)=>setdesc(e.target.value)} placeholder="What's on your mind......" className=" border-2 w-full mr-4 border-neutral-200 p-1 dark:bg-black" />
  <button onClick={handleclick} className="bg-cyan-500 px-4 py-1 rounded  text-white">Upload</button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
