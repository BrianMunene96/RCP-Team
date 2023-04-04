'use client';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Image from "next/image";
import pastries from "../../image/pastries.jpg";
import "./ContactBox.css";


export const ContactBox = () => {
    return (
       <div className="box">
       <ol className="breadcrumb">
                 <li className="breadcrumb-item"> <a href="../page.js"> 🏠Home </a></li>
                 <li className="breadcrumb-item"> <a href="#"> Contact </a></li>
         </ol>
         <Image
          className="imgcontact"
          src={pastries}
          alt="pastries"
          />
        </div>

   );
};