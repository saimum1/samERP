import React, { useState } from 'react';
import { Select, SelectItem } from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faChevronDown, faL, faUserTie} from "@fortawesome/free-solid-svg-icons";
import usa from '../../assets/static/usa.png'
import Avatar from "../Avatar.jsx";
import { data } from 'autoprefixer';
import italyimagesvg from '../Navbar/Image/IT.svg'
import usaimagesvg from '../Navbar/Image/US.svg'
import profilepic from '../../assets/static/propic.png'
import companylogo from '../../assets/static/companylogo.png'
import {useAuth} from "../../Context/AuthInfo.jsx";
import { global_css } from '../../GlobalCss/GlobalCSS.js';
import { Link } from 'react-router-dom';
import LandingRoute from '../../Modules/LandingPage/LandingRoute.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { changeModuleRoute } from '../../toolkit/features/componentRoutingSlice.jsx';

const Navabar = () => {
    
    const dispatch=useDispatch() 
    const { user , logout} = useAuth();
    const[selectedlang,Setselectedlang]=useState({
        lang:'EN',
        image:usaimagesvg
    })
    const[clicked,setclicked]=useState(false)
    const[clickedsec,setclickedsec]=useState(false)
    

    const data=[
        {
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
    }

    const setlang=(e)=>{
        for(const i of data){
            console.log("showinf i ",i)
            if(i.code === e){
                selectedlang.lang = i.lang
                selectedlang.image = i.image
            }
        }
        showlangoptions()

    }
    return (
       
        <div style={{backgroundColor:global_css.navbarBackColor,display:"flex",height:"4.5rem" ,
        width:'100%',justifyContent:'space-between',alignItems:'center' }} >
          
               <div style={{height:"auto",width:'auto',marginLeft:'4%'}}>
                {companylogo ? 
                    <img src={companylogo} style={{width:'93px'}} />:
               
                   <span 
                    onClick={()=>dispatch(changeModuleRoute(null))}
                    style={{width:'193px',color:global_css.primary_txt_color,cursor:'pointer'}}>Company logo</span>}
                 
               </div>



            <div style={{display : 'flex', gap : '3%', alignItems : 'center'}}>
                {/* {user? <p onClick={logout} style={{color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>Logout</p> : null} */}
            <div style={{backgroundColor:global_css.profileCardBackColor
                ,height:"auto",width:'14.5rem', borderTopRightRadius:"8px",
                borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'8px',
                marginRight:"3rem",display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                

                <div style={{backgroundColor:global_css.profileCardBackColor ,cursor:'pointer'
                        ,height:"2.6rem",width:'100%' , borderTopRightRadius:"8px",
                        borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'8px',
                        padding:'8px 16px',display:"flex",justifyContent:'center',alignItems:'center'}}
                        
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor =global_css.profileCardBackColor)}
                        onClick={()=>showlangoptions()}
                        >
                {/* #8d9aaa */}
                        <div style={{display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%'}}>
                            {/* <img src={selectedlang.image} style={{width:'48px' ,height:'25px'}}/> */}
                            <div style={{width:'28px' ,height:'28px',borderRadius:'50%',border:`1px solid ${global_css.shadowcolor}`,overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',boxShadow:'0px 0px 10px  whitesmoke',}}>
                             {/* <FontAwesomeIcon icon={faUserTie} style={{width:'90%' ,height:'90%',color:'#6d85a3',borderRadius:'50%'}}/> */}
                             <img src={profilepic}  style={{width:'100%' ,height:'100%'}}/>
                            </div> 
                           
                        </div>
                        <div style={{display:'flex',justifyContent:'flex-start' ,alignItems:'center' ,flex:'8',width:'100%' ,height:'100%',
                        color:global_css.primary_txt_color ,fontFamily:"inter",fontWeight:"400" ,lineHeight:"15px",fontSize:"100%",paddingLeft:'16px'}}>
                                    RH Saimum
                            </div>
                        <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%',transition:'all 300ms'}} 
                          
                        >
                             <FontAwesomeIcon icon={faCaretDown} style={{color:global_css.profileArrowColor ,height:'25px' ,width:"25px",transition:'all 400ms'}} rotation={clicked && 180 || 0}/>
                        </div>
                
                  </div>

                                        <div 
                                            style={{
                                            cursor: "pointer",
                                            backgroundColor: global_css.profileCardBackColor,
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
                                            transition: "all 500ms"
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
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = global_css.profileCardBackColor)}
                                                onClick={()=>setlang(item.code)}
                                            >
                                                 {item.image &&  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1", width: "100%", height: "100%" }}>
                                              <img src={item.image} style={{ width: "48px", height: "25px" }} alt='' />
                                                </div>}
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1", width: "100%", height: "100%", color:global_css.primary_txt_color, fontFamily: "inter", fontWeight: "500", lineHeight: "15px", fontSize: "16px" }}>
                                                  {item.lang} 
                                                </div>
                                            </div>
                                            ))}
                                        </div>


           

           

            
                

            </div>



            </div>
               



        </div>

       
    );
};

export default Navabar;