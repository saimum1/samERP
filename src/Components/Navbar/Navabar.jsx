import React, { useState } from 'react';
import { Select, SelectItem } from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faChevronDown, faL, faUserTie} from "@fortawesome/free-solid-svg-icons";
import usa from '../../assets/static/usa.png'
import Avatar from "../Avatar.jsx";
import { data } from 'autoprefixer';
import italyimagesvg from '../Navbar/Image/IT.svg'
import usaimagesvg from '../Navbar/Image/US.svg'
import companylogo from '../../assets/static/companylogo.svg'
import {useAuth} from "../../Context/AuthInfo.jsx";
import { global_css } from '../../GlobalCss/GlobalCSS.js';
import { Link } from 'react-router-dom';
import LandingRoute from '../../Modules/LandingPage/LandingRoute.jsx';
const Navabar = () => {
    const { user , logout} = useAuth();

  const[selectedlang,Setselectedlang]=useState({
    lang:'EN',
    image:usaimagesvg
  })
  const[clicked,setclicked]=useState(false)
  const[clickedsec,setclickedsec]=useState(false)
   

   const data=[{
        'lang':'Change password',
        'image':'',
        'code':1
    },
    {
        'lang':'Sign out',
        'image':'',
        'code':2
    }

]


    const showlangoptions=()=>{
            setclicked(!clicked)
            setclickedsec(!clickedsec)

            // setTimeout(() => {
            //     setclickedsec(!clickedsec)
            //  }, 300);
    }

    const setlang=(e)=>{
        for(const i of data){
            console.log("showinf i ",i)
            if(i.code === e){
                selectedlang.lang = i.lang
                selectedlang.image = i.image
            }
        }
        setclicked(!clicked)

    }
    return (
       
        <div style={{backgroundColor:"#303038",display:"flex",height:"4.5rem" ,
        width:'100%',justifyContent:'space-between',alignItems:'center' }} >
          
               <div style={{height:"auto",width:'auto',marginLeft:'2%'}}>
                    {/* <img src={companylogo} style={{width:'193px'}} /> */}
               
                   <span  onClick={()=> window.location.reload()} style={{width:'193px',color:global_css.primary_txt_color,cursor:'pointer'}}>Company logo</span>
                 
               </div>



            <div style={{display : 'flex', gap : '3%', alignItems : 'center'}}>
                {/* {user? <p onClick={logout} style={{color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>Logout</p> : null} */}
            <div style={{backgroundColor:"var(--Dark-Gery, #444)" 
                ,height:"auto",width:'14.5rem', borderTopRightRadius:"8px",
                borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'8px',
                marginRight:"3rem",display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                

                <div style={{backgroundColor:"var(--Dark-Gery, #444)" 
                        ,height:"2.6rem",width:'100%' , borderTopRightRadius:"8px",
                        borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'8px',
                        padding:'8px 16px',display:"flex",justifyContent:'center',alignItems:'center'}}>
                
                        <div style={{display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%'}}>
                            {/* <img src={selectedlang.image} style={{width:'48px' ,height:'25px'}}/> */}
                            <FontAwesomeIcon icon={faUserTie} style={{width:'48px' ,height:'25px',color:'#8d9aaa'}}/>
                        </div>
                        <div style={{display:'flex',justifyContent:'flex-start' ,alignItems:'center' ,flex:'8',width:'100%' ,height:'100%',
                        color:'rgba(255, 255, 255, 0.85)' ,fontFamily:"inter",fontWeight:"400" ,lineHeight:"15px",fontSize:"100%"}}>
                                    RH Saimum
                            </div>
                        <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%'}} 
                            onClick={()=>showlangoptions()}
                        >
                             <FontAwesomeIcon icon={faCaretDown} style={{color:'#2aea87' ,height:'25px' ,width:"25px",}} rotation={clicked && 180}/>
                        </div>
                
                  </div>

                                {/* {clickedsec && ( */}
                                        <div
                                            style={{
                                            cursor: "pointer",
                                            backgroundColor: "var(--Dark-Gery, #444)",
                                            width: "14.5rem",
                                            borderBottomRightRadius: "8px",
                                            borderBottomLeftRadius:"8px",
                                            height: clicked?'5rem':"0px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            position: "absolute",
                                            top: "3.7rem",
                                            right: "3rem",
                                            zIndex: 1,
                                            transition: "all 600ms"
                                            }}
                                        >
                                            {clickedsec && data.map((item,index,array) => (
                                            <div
                                                key={item.code}
                                                style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "100%",
                                                height: "2.6rem",
                                                borderBottomLeftRadius:index === (array.length -1)? '8px':'',
                                                borderBottomRightRadius:index === (array.length -1)? '8px':'',
                                                borderBottom:index === (array.length -1)?'':'2px solid #303038'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--Dark-Gery, #444)")}
                                                onClick={()=>setlang(item.code)}
                                            >
                                                 {item.image &&  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1", width: "100%", height: "100%" }}>
                                              <img src={item.image} style={{ width: "48px", height: "25px" }} alt='' />
                                                </div>}
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1", width: "100%", height: "100%", color: "rgba(255, 255, 255, 0.85)", fontFamily: "inter", fontWeight: "500", lineHeight: "15px", fontSize: "16px" }}>
                                                  {item.lang} 
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                        {/* )} */}


           

           

            
                

            </div>



            </div>
               



        </div>

       
    );
};

export default Navabar;