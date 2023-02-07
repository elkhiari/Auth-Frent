import App from "./background/background";
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css'
export default function Signup()
{
    const navigate = useNavigate()
    const [err,setErr] = useState('')
    const [loading, setLoading] = useState(false);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(1)
        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/v1/signup',
            headers: { 
            'Content-Type': 'application/json'
            },
            data : {
                "firstName": e.target[0].value,
                "lastName": e.target[1].value,
                "email": e.target[2].value,
                "password": e.target[3].value
              }
        };
        
        await axios(config)
        .then(function (res) {
            if(res.data.status == 'No') {
                setErr('Email is exist')
            }
            else if(res.data.status == 'Yes') navigate('/signin')
        })
        .catch(function () {
            
        });
        setLoading(0)
        
    }
    return (
        <div className="p-10  w-screen flex h-screen place-content-center place-items-center  poppins">
            <form className="w-full md:w-1/2 m-auto z-10" onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2 ">
                    <div>
                        <label for="first_name" className="block mb-2 text-sm font-medium  text-white " >First name</label>
                        <input type="text" id="first_name" className=" border border-gray-300  text-sm rounded-lg  block w-full p-2.5  bg-gray-700  border-gray-600  placeholder-gray-400  text-white  focus:ring-blue-500  focus:border-blue-500" placeholder="Othmane" required />
                    </div>
                    <div>
                        <label for="last_name" className="block mb-2 text-sm font-medium  text-white">Last name</label>
                        <input type="text" id="last_name" className=" border  border-gray-300  text-sm rounded-lg  block w-full p-2.5  bg-gray-700  border-gray-600  placeholder-gray-400  text-white  focus:ring-blue-500  focus:border-blue-500" placeholder="Elkhiari" required />
                    </div>
                
                    
                </div>
                <div className="mb-6">
                    <label for="email" className="block mb-2 text-sm font-medium  text-white">Email address</label>
                    <input type="email" id="email" className=" border border-gray-300  text-sm rounded-lg  block w-full p-2.5  bg-gray-700  border-gray-600  placeholder-gray-400  text-white  focus:ring-blue-500  focus:border-blue-500" placeholder="othmane.elkhiari@company.com" required />
                </div> 
                <div className="mb-6">
                    <label for="password" className="block mb-2 text-sm font-medium  text-white">Password</label>
                    <input type="password" id="password" className=" border border-gray-300    text-sm rounded-lg  block w-full p-2.5  bg-gray-700  border-gray-600  placeholder-gray-400  text-white  focus:ring-blue-500  focus:border-blue-500" placeholder="•••••••••" required />
                </div> 
                {err == ''?'': <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  bg-gray-800  text-red-400" role="alert"><svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg><span className="sr-only">Info</span><div><span class="font-medium">{err}</span>.</div></div>}

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  bg-blue-600  hover:bg-blue-700  focus:ring-blue-800">{loading ? <p>Loading...</p> : <p>Sign up</p>}</button>
                <div class="text-sm mt-5 font-medium  text-gray-300">
                Already have an account? <a href="/signin" class=" hover:underline text-blue-500">Sign in</a>
        </div>
            </form>
        </div>
    )
}