import axios from "axios";
import { useState } from "react";

export function HomePage()
{
  const [datax,setData] = useState()
  const [check,setCheck] = useState(true)
  const [mailcheck,setMailCheck] = useState(true);
  const [sendmail,setSendMail] = useState(false)
  if (!window.localStorage.getItem("token")) window.location.href = '/signin';
        const fetchData = async()=>{
          var dataJS = ({
            "token": window.localStorage.getItem("token")
          });
          
          var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/v1/me',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : dataJS
          };
          
          await axios(config)
          .then((response)=>{
            if (response.status == 'No')
            {
              window.localStorage.removeItem('token')
              window.location.href='/signin'
            }
            setData(response.data.user);
            setMailCheck(response.data.user.isVerified)
            setCheck(false)
          })
          .catch(function (error) {
          });
        }
  if (check == true){
        fetchData();
  }

    const handleSignOut = ()=>{
        window.localStorage.removeItem('token')
        window.location.href='/signin'
    }
    const handleSendEmail = async ()=>{
      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/verify-email',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : datax
      };
      
      await axios(config)
      .then((response)=>{
        if (response.data.status == 'ok') setSendMail(true)
      })
      .catch(function (error) {
      });
    }
    return(
                    
            <div className="h-screen flex place-content-center place-items-center z-10 poppins">
              {mailcheck ?'':sendmail?
              <div class="absolute top-2  flex p-4 mb-4 text-sm  rounded-lg  bg-gray-800 text-blue-400" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium"> verification email is send ,check your boit email.</span> 
                </div>
              </div>
              :<div class="absolute top-2  flex p-4 mb-4 text-sm  rounded-lg  bg-gray-800 text-blue-400" role="alert">
                  <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">Please verify your email,</span> <button onClick={handleSendEmail} class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Send Verfication email
                    <svg aria-hidden="true" class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                  </div>
                </div>}



                  {check ? 
                  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700 z-10">
                    <div class="flex items-center justify-center w-56 h-56  rounded-lg m-auto dark:bg-gray-800 dark:border-gray-700">
                      <div class="px-3 py-1 text-xs font-medium leading-none text-center  rounded-full animate-pulse bg-blue-900 text-blue-200">loading...</div>
                  </div>
                  </div>
                  :
                  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700 z-10">
                    <div className="flex justify-end px-4 pt-4">
                    </div>
                    <div className="flex flex-col items-center pb-10">
                      <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
                      <h5 className="mb-1 text-xl font-medium text-gray-900 text-white">{datax && (check ?'Looding ...': datax.firstName+' '+datax.lastName)}</h5>
                      <span className="text-sm text-gray-500 text-gray-400">{datax && (check ?'Looding ...':datax.email)}</span>
                      <div className="flex mt-4 space-x-3 md:mt-6">
                          <button onClick={handleSignOut} href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Sign Out</button>
                          <button  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus:ring-gray-700">Get Data</button>
                      </div>
                    </div>
                  </div>}
            </div>

    )
}