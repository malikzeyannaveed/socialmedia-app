import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { setLogout, setMode } from '../../state';
import { useDispatch } from 'react-redux';
import moon from '/moon.png'

import sun from '/sun.png'
export default function Navbar() {
  const isLogin = useSelector((state)=>state.user)
  const islight = useSelector((state)=>state.mode)
    const [selectedOption, setSelectedOption] = useState('');
    const dispatch = useDispatch();
const userName  = useSelector((state)=>state.user) ?? "user"
const navigate = useNavigate()
const handleLogout = () => {
  console.log('Logout clicked');
  dispatch(setLogout())
  navigate("/");
    };
  
    const handleSignUp = () => {
      navigate("/");
      console.log('SignUp clicked');
    };
  
    const handleLogin = () => {
navigate("/login");
      console.log('Login clicked');
    };

    const handleOptionChange = (event) => {
      const selectedValue = event.target.value;
  
      // Determine which function to call based on the selected value
      switch (selectedValue) {
        case 'logout':
          handleLogout();
          break;
        case 'SignUp':
          handleSignUp();
          break;
        case 'Login':
          handleLogin();
          break;
        default:
      }
  
      setSelectedOption(selectedValue);
    };
  



  return (
    <div className='bg-white dark:bg-neutral-900 shadow pt-2 pb-2 '>
        <div className='justify-between align-middle flex'>
      <div className="left">

      </div>
      <div className="logo -mr-20">
<h2 className='text-cyan-500 max-md:text-3xl text-4xl font-extrabold'>InstaVibes</h2>

      </div>
      <div className="side mr-5 flex ">
{islight =="light" ?
        <img src={sun} onClick={()=>dispatch(setMode())} className='w-8 h-8 object-contain' alt="" />
        :
        <img src={moon} onClick={()=>dispatch(setMode())} className='w-8 h-8 object-contain' alt="" />
      }
      <select id="cars" onChange={handleOptionChange} value={selectedOption} className="border-none dark:bg-black dark:text-white ml-3 px-3 py-2 text-base bg-gray-50" name="carlist" >
  {isLogin ?
  <optgroup>
    <option value="">{userName.name}</option>
    <option value="logout">Logout</option>
    </optgroup>
  :
  <optgroup>
  <option  value="SignUp">SignUp</option>
  <option value="Login">Login</option>
  </optgroup>}
</select>
      </div>
      </div>
    </div>
  )
}
