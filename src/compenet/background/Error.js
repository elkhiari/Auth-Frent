import App from "./background";
import '../../App.css'
export default function Error()
{
    return(
        <div className="flex place-content-center place-items-center text-white h-screen">
            <p className="z-10 text-white text-3xl poppins font-bold ltr-25">Error 404!</p>
            <App className="-z-10" />
        </div>
    )
}