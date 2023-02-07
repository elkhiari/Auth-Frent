import axios from "axios"
import { useState } from "react"
import {  useNavigate, useParams } from "react-router-dom"
import {AiFillCheckCircle,AiFillAlert} from 'react-icons/ai'
import {IconContext} from 'react-icons'

export  function Verificationemail()
{
    let {id} = useParams()
    const [looding,setLoading] = useState(false)
    const [check,setCheck] = useState('')
    const searchParams = new URLSearchParams(document.location.search)
    const validMail = ()=>{
        setLoading(1)
        axios.get(`http://localhost:8080/verify-email/${id}`)
        .then(function(res){
            setCheck(res.data.msg)
        })
        .catch(function(err){
        })
        setLoading(0)
    }
    return (
        <div className="h-screen flex place-content-center place-items-center z-10 poppins">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700 z-10">
                  {check == 'ok'?
                  <div className="flex flex-col items-center pb-10 mt-4">
                   <IconContext.Provider value={{ color: "blue", className: "global-class-name w-1/3 h-1/4 m-auto" }}>
                    <AiFillCheckCircle /> 
                   </IconContext.Provider>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 text-white">Your email has been verified</h5>
                    <a  href="/signin"  className="w-1/2 i px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 ">Signin</a>
                   </div>
                   :check == 'no'?
                   <div className="flex flex-col items-center pb-10 mt-4">
                   <IconContext.Provider value={{ color: "red", className: "global-class-name w-1/3 h-1/4 m-auto" }}>
                    <AiFillAlert /> 
                   </IconContext.Provider>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 text-white">Your email has not been verified</h5>
                    <a  href="/signin"  className="w-1/2 i px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 ">Signin</a>
                   </div>
                   :<div className="flex flex-col items-center pb-10 mt-4">
                      <h5 className="mb-1 text-xl font-medium text-gray-900 text-white">verify your email</h5>
                      <span className="text-sm text-gray-500 text-gray-400">{searchParams.get('email')}</span>
                      <div className="flex mt-4 space-x-3 md:mt-6 w-1/2">
                            <button onClick={validMail}  className="w-full i px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 ">
                            
                            <div role=" status">
                             {looding ? <p>in verification</p> : <p>verify</p>}
                                <svg aria-hidden="true" class={"inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 "+(!looding ? 'hidden' : '') } viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                            </button>
                      </div>
                  </div>}
                </div>
            </div>
    )
}