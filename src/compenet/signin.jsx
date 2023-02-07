import axios from "axios";
import { useState } from "react";

export default function Signin()
{
    const [loading, setLoading] = useState(false);
    const [err,setErr] = useState('')
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/v1/signin',
            headers: { 
            'Content-Type': 'application/json'
            },
            data : {
                "email": e.target[0].value.toLowerCase(),
                "password": e.target[1].value
              }
        };
        
        await axios(config)
        .then(function (response) {
            console.log(response.data)
            if(response.data.status == 'ok')
                {window.localStorage.setItem("token",response.data.token);
                window.location.href = '/';}
            else {
                if (response.data.stat == 'pwd')
                {
                    setErr("Password Invalid")
                }
                else {
                    setErr("Email Not found")
                }
            }
        })
        setLoading(false);
          
        
    }
    return (
        <div className="p-10  w-screen flex h-screen place-content-center place-items-center z-10 poppins">
        <form className="w-full md:w-1/2 m-auto  z-10" onSubmit={handleSubmit}>
            
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 text-white">Email address</label>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="othmane.elkhiari@company.com" required />
            </div> 
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 text-white">Password</label>
                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="•••••••••" required />
            </div> 
            {err == ''?'': <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  bg-gray-800  text-red-400" role="alert"><svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg><span className="sr-only">Info</span><div><span class="font-medium">{err}</span>.</div></div>}
            
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">{loading ? <p>Loading...</p> : <p>Login</p>}</button>
            <div class="text-sm mt-5 font-medium text-gray-500 text-gray-300">
            Not registered? <a href="/signup" class="text-blue-700 hover:underline text-blue-500">Create account</a>
        </div>
        </form>
    </div>
    )
}