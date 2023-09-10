
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [isLoading,setisLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
const navigate = useNavigate()
  const [First, setFirst] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleclick = async (event)=>{
    setisLoading(true)
    event.preventDefault();
    const data = new FormData()
      data.append('name',formData.name)
      data.append('email',formData.email)
      data.append('password',formData.password)
      data.append('picture',First)
      
      await fetch(`${import.meta.env.VITE_APP_API_URL}auth/register`, {
        method: 'POST',
        body: data,
      }).then(gg=>gg.json()).then(ff=>{console.log(ff)
        setisLoading(false)
        navigate('/login')
      })
      
      
    }
  
  
  return (
    <div>
        <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col ">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form>
            <div className="bg-white dark:bg-neutral-900  dark:text-white px-6 py-8 rounded shadow-xl text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>
              <input
                type="text"
                className="block border dark:border-none  dark:bg-black border-grey-light w-full p-3 rounded mb-4"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />

              <input
                type="text"
                className="block border dark:bg-black border-grey-light dark:border-none w-full p-3 rounded mb-4"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="file"
                onChange={(gg) => {
                  setFirst(gg.target.files[0]);
                }}
                name="image"
              />
              <input
                type="password"
                className="block border dark:bg-black dark:border-none border-grey-light w-full p-3 rounded mb-4"
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
