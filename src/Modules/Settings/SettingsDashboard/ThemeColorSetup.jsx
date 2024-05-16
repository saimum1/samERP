import React, { useState ,useEffect} from 'react';
import {Bar,ComposedChart, BarChart , Line, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,LabelList, CartesianGrid} from 'recharts';
import { SketchPicker } from 'react-color';
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Badge,
    Card, Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text, TextInput,
    Title,

} from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faChevronDown, faEllipsisVertical, faSquare, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {useDisclosure, Button} from "@chakra-ui/react";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment/moment.js";
import LoadingSoS from '../../../Components/LoadingScreen/LoadingSoS';
import { global_css } from '../../../GlobalCss/GlobalCSS';
import { transform } from 'framer-motion';
import { homelandingdataset } from '../../LandingPage/LandingDashboardData';
const ThemeColorSetup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loader, setLoader] = useState(false);
    const [showColorpicker, setshowColorpicker] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [activeIndex, setactiveIndex] = useState(null);
    const [colorPickerActive, setColorPickerActive] = useState(false);
    
    const[colorset,setColoset]=useState([
        {'name':'Navbar Background','color':'',code:0},
        {'name':'Profile Background','color':'',code:0},
        {'name':'Profile Shadow','color':'',code:0},
        {'name':'Profile Arrow','color':'',code:0},
        {'name':'Left Menu Hover Text','color':'',code:0},
        {'name':'Left Menu Hover','color':'',code:0},
        {'name':'Home Background','color':'',code:0},
        {'name':'Main Page Background','color':'',code:0},
        {'name':'Main Page Fron','color':'',code:0},
        {'name':'Dashboard Back','color':'',code:0},


    ])

    const handleTogglePicker=(e)=>{
            setactiveIndex(e)
            setshowColorpicker(e=== activeIndex ? !showColorpicker : true)
    }




    const shandleTogglePicker = (name, selectedColor) => {
        setColoset((prevState) => {
            return prevState.map((item, index) => {
                if (item.name === name) {
                    return { ...item, color: selectedColor?.hex};
                }
                return item;
            });
        });

        console.log("asasas",selectedColor?.hex)
      
    };
    
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedIndex, setselectedIndex] = useState(null);
    const [HoveredIndexInner, setHoveredIndexInner] = useState(null);
    const [selectedIndexOuter, setselectedIndexOuter] = useState(null);
    const [ordercount, setordercount] = useState(0);
    const [offerCount, setOfferCount] = useState(0);

    const [showcomponent, setshowcomponent] = useState(0)
    const [showcomponentouter, setshowcomponentouter] = useState('')

    const dataset=[
        {
        'img':'charticon',
        'imgsec':'charticongreen',
        'name':'Dashboard',
        'menu':[],
        'code':0
         },
         {
            'img':'datasetsicon',
             'imgsec':'datasetsicongreen',
            'name':' Campaign',
            'menu':[{name:'Facebook',code:'m1'},{name:'Instagram',code:'m2'},{name:'Linkedin',code:'m3'}],
            'code':1
                },
                 
    
    
    ]





    
    const styles = {
       
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative', 
            transition:'all 400ms'
          },
          shadow: {
            position: 'absolute',
            width: '35%', 
            height: '90%',
            borderRadius: '50%', 
            backgroundColor: 'rgba(255, 255, 255, 0.5)', 
            zIndex: 0, 
            filter: 'blur(10px)', 
            opacity:'15%',
            transition:'all 400ms'
          },
          image: {
            width: '55%', // Adjust the size of the image relative to the container
            height: '100%',
            opacity: 1,
            filter: 'contrast(2.5)', // Optional: Enhance contrast
            imageRendering: 'crisp-edges', // Optional: Improve sharpness
          },
       
      };


  return (
    <div  className="flex justify-center h-full w-full items-center md:items-start  rounded-[3px]" style={{backgroundColor:global_css.mainPageFrontColor
    }}>

    {loader &&  <LoadingSoS  /> }


  
         <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',color:global_css.primary_txt_color,}}>
   
           <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'flex',width:'90%',height:'85%',backgroundColor:''}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',flex:3}}>

                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',flex:1,flexDirection:'column',gap:'1rem'}}>
                      
              {colorset?.map((e,index)=>{
                return(
                    <div  key={index} style={{display:'flex',width:'100%',height:'2rem',fontSize:'13px',position:'relative'}}>
                            <span style={{width:'10rem',backgroundColor:'',height:'100%',display:'flex',justifyContent:'start',alignItems:'center'}}>{e.name}</span>
                            <span style={{width:'1rem'}}>:</span>
                            <span style={{width:'7rem',display:'flex'}}>  <div
                                                    style={{
                                                        width: '70px',
                                                        height:'100%',
                                                        backgroundColor: e?.color,
                                                        cursor: 'pointer',
                                                        borderRadius:'4px',
                                                        border:'3px solid black',
                                                        boxShadow:activeIndex === index &&`0px 0px 15px ${global_css.shadowcolor}`
                                                    }}
                                                  
                                                    onClick={() => handleTogglePicker(index)}
                                                ></div>

                                              
                             </span>

                                                {
                                                ( activeIndex === index) &&          
                                                    <div style={{display:'flex',width:'15%',height:'auto',position:'fixed',left:'48%',top:'30%' }}
                                                  
                                                    >
                                                      <SketchPicker  color={e.color} onChange={(selectedColor) => shandleTogglePicker(e.name, selectedColor)}  />
                                                    </div>
                                                }
                        </div>

                )
              })}
                        


                    </div>
                  
                </div>


                <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:'100%',height:'85%',flex:2,gap:'2rem'}}>

                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',border:'1px solid white',boxShadow:`0px 0px 12px ${global_css.shadowcolor}`}}> 
                            <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column'}}>

                                       <div style={{backgroundColor:global_css.navbarBackColor,display:"flex",height:"3rem" ,
                                         width:'100%',justifyContent:'space-between',alignItems:'center' }} >
                            
                                        <div style={{height:"auto",width:'auto',marginLeft:'4%'}}>
                                           <span   style={{width:'93px',color:global_css.primary_txt_color,cursor:'pointer',fontSize:'12px'}}>Company logo</span>
                                    
                                        </div>

                                        <div style={{display : 'flex', gap : '3%', alignItems : 'center'}}>

                                        <div style={{backgroundColor:global_css.profileCardBackColor
                                            ,height:"auto",width:'8.5rem', borderTopRightRadius:"8px",
                                            borderTopLeftRadius: "8px",borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px',
                                            marginRight:"3rem",display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                                            

                                         <div style={{backgroundColor:global_css.profileCardBackColor ,cursor:'pointer'
                                            ,height:"1.8rem",width:'100%' , borderTopRightRadius:"8px",
                                            borderTopLeftRadius: "8px",borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px',
                                            padding:'4px 8px',display:"flex",justifyContent:'center',alignItems:'center'}}
                                            
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor =global_css.profileCardBackColor)}
                                        
                                            >
                                
                                        <div style={{display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%'}}>
                    
                                                <div style={{width:'17px' ,height:'17px',borderRadius:'50%',border:`1px solid ${global_css.shadowcolor}`,overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',boxShadow:'0px 0px 10px  whitesmoke',}}>
                                                <FontAwesomeIcon icon={faUserTie} style={{width:'90%' ,height:'90%',color:'#6d85a3',borderRadius:'50%'}}/>
                                         
                                                </div> 
                                            
                                            </div>
                                            <div style={{display:'flex',justifyContent:'flex-start' ,alignItems:'center' ,flex:'8',width:'100%' ,height:'100%',
                                            color:global_css.primary_txt_color ,fontFamily:"inter",fontWeight:"400" ,fontSize:"12px",paddingLeft:'12px',}}>
                                                        RH Saimum
                                                </div>
                                            <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%',transition:'all 400ms'}} 
                                            
                                            >
                                                <FontAwesomeIcon icon={faCaretDown} style={{color:global_css.profileArrowColor ,height:'25px' ,width:"25px",transition:'all 400ms'}} />
                                            </div>
                
                                 </div>

                                        


           

           

            
                

            </div>



            </div>
               



                                         </div>


                                         <div   style={{height : '100%', width:'100%', backgroundColor:global_css.primary_bg,display:'flex' ,justifyContent:'center',alignItems:'flex-start',paddingTop:'2px',overflow:'hidden'}}>
        
                                                <div style={{flex:'22%' ,backgroundColor:global_css.leftMenuBackColor,height:'98.5%',width:'auto',display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

                                                    <div style={{flex:'55%',height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',paddingTop:'1rem',transition:'all 300ms',gap:'2px'}}>

                                                            {dataset &&  dataset.map((n,index)=>{
                                                                console.log("index",index)
                                                                return(<div style={{display:'flex',flexDirection:'column',width:'95%'}}
                                                                >
                                                                        <div  
                                                                            key={index} style={{width:'100%',height:'1.4rem',display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'.7rem',backgroundColor: (hoveredIndex === index || selectedIndex === index) ? global_css.leftMenuHoverColor : '',paddingLeft: (hoveredIndex === index || selectedIndex === index) ?'1rem':'0.5rem',borderRadius:'6px',cursor:"pointer",transition:'all 300ms',margin:'4px 0px'}}
                                                                            onMouseEnter={() => {setHoveredIndex(index)}}
                                                                            onMouseLeave={() => setHoveredIndex(null)}

                                                                            onClick={() => {
                                                                                if (n.menu.length === 0) {
                                                                                    setshowcomponent(n.code);
                                                                                    setselectedIndex(selectedIndex === index ? '' : index);
                                                                                    setshowcomponentouter('');
                                                                                    setselectedIndexOuter('');
                                                                                    settransition();
                                                                                }else if(n.menu.length > 0){
                                                                                setselectedIndex(selectedIndex === index ? '' : index);
                                                                                setshowcomponentouter('');
                                                                                setselectedIndexOuter('');
                                                                                }
                                                                                }}
                                                                            >
                                                                                                    
                                                                            <span style={{color: (hoveredIndex === index || selectedIndex === index) ? global_css.leftMenuHoverTextColor : global_css.primary_txt_color ,fontFamily:'Lexend',fontWeight:'400',fontSize:'12px',}}>{n.name}</span>
                                                                        
                                                                        </div>

                                                                    
                                                                    
                                                                        </div>
                                                                )
                                                            })}
                                                                
                                                                
                                                    </div>

                                                    <div style={{flex:'1%',height:'100%',width:'100%',display:'flex',justifyContent:'center' ,alignItems:'center'}}>
                                                        
                                                    </div>

                                                    <div style={{flex:'44%',height:'100%',width:'100%'}}>

                                                    </div>
                                                </div>
                                            
                                            
                                            
                                                <div style={{flex:'84%',height:'100%',width:'100%',backgroundColor:global_css.mainPageBackColor,display:'flex',justifyContent:'center',alignItems:'flex-start',transition:'all 300ms'}} >
                                                    <div  id='showcomp' style={{height:'98.5%',width:'99%',display:'flex',justifyContent:'center',alignItems:'center' ,transition:'all 300ms',borderRadius:global_css.card_border_radius}}>
                                                
                                                        <div  id='showcomp' style={{height:'100%',width:'99%',display:'flex',justifyContent:'center',alignItems:'center' ,transition:'all 300ms',borderRadius:global_css.card_border_radius,backgroundColor:global_css.mainPageFrontColor}}>
                                                    
                                                        </div>
                                                    </div>
                                                </div>

                                         </div>
                            </div>

                    </div>


                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',border:'1px solid white',boxShadow:`0px 0px 12px ${global_css.shadowcolor}`}}> 
                            <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column'}}>

                                 <div style={{backgroundColor:global_css.navbarBackColor,display:"flex",height:"3rem" ,
                                         width:'100%',justifyContent:'space-between',alignItems:'center' }} >
                            
                                        <div style={{height:"auto",width:'auto',marginLeft:'4%'}}>
                                           <span   style={{width:'93px',color:global_css.primary_txt_color,cursor:'pointer',fontSize:'12px'}}>Company logo</span>
                                    
                                        </div>

                                        <div style={{display : 'flex', gap : '3%', alignItems : 'center'}}>

                                        <div style={{backgroundColor:global_css.profileCardBackColor
                                            ,height:"auto",width:'8.5rem', borderTopRightRadius:"8px",
                                            borderTopLeftRadius: "8px",borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px',
                                            marginRight:"3rem",display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                                            

                                         <div style={{backgroundColor:global_css.profileCardBackColor ,cursor:'pointer'
                                            ,height:"1.8rem",width:'100%' , borderTopRightRadius:"8px",
                                            borderTopLeftRadius: "8px",borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px',
                                            padding:'4px 8px',display:"flex",justifyContent:'center',alignItems:'center'}}
                                            
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor =global_css.profileCardBackColor)}
                                        
                                            >
                                
                                        <div style={{display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%'}}>
                    
                                                <div style={{width:'17px' ,height:'17px',borderRadius:'50%',border:`1px solid ${global_css.shadowcolor}`,overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',boxShadow:'0px 0px 10px  whitesmoke',}}>
                                                <FontAwesomeIcon icon={faUserTie} style={{width:'90%' ,height:'90%',color:'#6d85a3',borderRadius:'50%'}}/>
                                         
                                                </div> 
                                            
                                            </div>
                                            <div style={{display:'flex',justifyContent:'flex-start' ,alignItems:'center' ,flex:'8',width:'100%' ,height:'100%',
                                            color:global_css.primary_txt_color ,fontFamily:"inter",fontWeight:"400" ,fontSize:"12px",paddingLeft:'12px',}}>
                                                        RH Saimum
                                                </div>
                                            <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%',transition:'all 400ms'}} 
                                            
                                            >
                                                <FontAwesomeIcon icon={faCaretDown} style={{color:global_css.profileArrowColor ,height:'25px' ,width:"25px",transition:'all 400ms'}} />
                                            </div>
                
                                 </div>
                          </div>
                    </div>
               

                                 </div>


                                         <div   style={{height : '100%', width:'100%', backgroundColor:global_css.primary_bg,display:'flex' ,justifyContent:'center',alignItems:'flex-start',paddingTop:'2px',overflow:'hidden'}}>
        
                                         <div className="grid-container" style={{transition:'all 400ms'}}>
                                                {homelandingdataset?.map((e,index)=>{
                                                        return(

                                                            <div className="grid-item" 

                                                            key={index}
                                                            >
                                                                <div style={styles.container} >
                                                                <div style={styles.shadow}  ></div>
                                                                  
                                                                            <img
                                                                            src={e.img}
                                                                            alt="Actual GIF"
                                                                            style={{ width: '20%', height: '60%', opacity:  1  , filter: 'contrast(1.5)', 
                                                                            imageRendering: 'crisp-edges',transition:'all 400ms'}}
                                                                      
                                                                            onMouseEnter={(e)=>{e.currentTarget.style.transform = 'scale(1.2)'}}
                                                                            onMouseLeave={(e)=>{e.currentTarget.style.transform = 'scale(1)'}}
                                                                        />
                                        
                                                                </div>
                                        
                                        
                                                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',width:'100%'}} className='textContainer'>
                                        
                                                                    
                                                                        {e.name}
                                                                
                                                                </div>
                                        
                                        
                                        
                                                            </div>
                                                        )
                                                })}
               
                 



                   
                </div>

                                         </div>
                            </div>

                    </div>




                </div>
           </div>
       
        </div>

    <style jsx>
        {`body::-webkit-scrollbar {
display: none;
}

/* Hide scrollbar for IE, Edge */
body {
-ms-overflow-style: none;
}

/* Hide scrollbar for Firefox */
body {
scrollbar-width: thin;
scrollbar-color: transparent transparent;
}

        input[type="checkbox"] {
          appearance: none;
          width: 15px;
          height: 15px;
          border: 2px solid #ddd;
          border-radius: 3px;
          background-color: transparent;
        }

        input[type="checkbox"]:checked {
          background-color: #4CAF50; /* Green background when checked */
        }

        .checkbox-box {
          display: none; /* Not needed anymore */
        }




        .my-component {
            position: relative;
            
        }
        
        .uid {
            position: relative;
            cursor: pointer;
            
        }
        
        .tooltip {
            visibility: hidden;
            width: auto;
            background-color: #000;
            color: #fff;
            text-align: center;
            padding: 5px;
            border-radius: 6px;
            position: absolute;
            z-index: 1;
            top: 0;
            white-space: nowrap;
        }
        
        .uid:hover .tooltip {
            visibility: visible;
        }

        .copied-message {
            position: absolute;
            top: 0%;
            left: 40%;
            transform: translate(-50%, -50%);
            background-color: #000;
            color: #fff;
            padding: 5px;
            border-radius: 4px;
            z-index: 9999; /* Ensure the message is on top */
        }
        




        .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* Each row contains 4 items with equal width */
            gap: 10px; /* Gap between items */
           
            width: 100%; /* Ensure the grid container takes up the available width */
            justify-content: center; /* Center grid items horizontally */
            transition:all 400ms;
          }
          
          .grid-item {
            display:flex;
            justify-content:center;
            align-items:center;
            width:100%;
            flex-direction:column;
            padding: 3px; /* Padding around items */
            text-align: center; /* Center text */
            height:100%;
            cursor:pointer;
          }



          .textContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            width: 100%;
        
            font-family: "Inter", system-ui, sans-serif;
            font-size: 10px;
            font-weight:bold; 
          }
          

        `}
    </style>
</div>
  )
}

export default ThemeColorSetup