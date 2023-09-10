
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import { useNavigate } from "react-router-dom";
export default function Loginpage() {
  const [isLoading,setisLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
const dispatch = useDispatch()
const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
    const handleclick = async (event)=>{
      event.preventDefault();
      setisLoading(true)
      await fetch(`${import.meta.env.VITE_APP_API_URL}auth/login`, {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(formData),
      }).then(gg=>gg.json()).then(ff=>{
        dispatch(setLogin({
          user:ff.userr,
          token:ff.token,
        })
        )
        localStorage.setItem('auth_token', ff.token);
        setisLoading(false)
        navigate('/home')
      })
      

    }
  
  
  return (
    <div>
        <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form>
            <div className="bg-white dark:bg-neutral-900 dark:text-white px-6 py-8 rounded shadow-xl text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login</h1>
              <input
                type="text"
                className="block dark:bg-black dark:border-none border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="password"
                className="block border border-grey-light dark:bg-black dark:border-none w-full p-3 rounded mb-4"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />

              <button
              onClick={handleclick}
                className="bg-cyan-500 px-4 py-2 rounded  text-white"
                type="submit"
              >
               {isLoading ? "Sending":"Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}
