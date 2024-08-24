import { Link } from 'react-router-dom';
import logo from "../../assets/images/freshcart-logo.svg";
import img from "../../assets/images/error.svg"


export default function Notfound() {
    return (
        <div className='flex justify-center'>
            <diva className="w-2/3 img-container"><img src={img} className='w-full' alt="" /></diva>
        </div>
    );
}
