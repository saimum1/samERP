import React,{useState,useEffect} from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS.js'
import LineIcon from '../../assets/static/Line.svg'
import { dataset } from './CRMSKeletonData.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faL } from '@fortawesome/free-solid-svg-icons'

import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";
import DashboardCrm from './MarketingDashboard/DashboardCrm.jsx'


const CRMSkeleton = () =>{

    const {user, token} = useAuth();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedIndex, setselectedIndex] = useState(null);
    const [HoveredIndexInner, setHoveredIndexInner] = useState(null);
    const [selectedIndexOuter, setselectedIndexOuter] = useState(null);
    const [ordercount, setordercount] = useState(0);
    const [offerCount, setOfferCount] = useState(0);

    const [showcomponent, setshowcomponent] = useState(0)
    const [showcomponentouter, setshowcomponentouter] = useState('')

    const agent_permission = ['Sim request', 'SIM List', 'Dashboard', 'Sim Inventory', 'Settings', 'Agent Request', 'Users']

    const [pageview, setpageview] = useState(true)
    const [isPageChanging, setIsPageChanging] = useState(false)








    const renderComponent = () => {
  console.log(":operatorrxxx",showcomponentouter)
    switch (showcomponent) {
        case 0:
        return  <DashboardCrm />
        // <Nodatafound btn_text={'Add New Sim'}  tittle_head={'No Dashboard Item Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>;
        case 1:
              if(showcomponentouter === 'Facebook'){
                return 
                <Nodatafound btn_text={'Add New Sim'}  tittle_head={'No Dashboard Item Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/> 
             
              }
        
      default:
        return null;
    }
  }

  
  const settransition=()=>{
      setpageview(false)
      setIsPageChanging(true);
     
      setTimeout(() => {
          setIsPageChanging(false);
          setpageview(true)
        }, 200);
  }
  useEffect(() => {

    
  }, [showcomponent,ordercount, offerCount])
  
  
  return (
    <div   style={{height : 'calc(100vh - 4.5rem)', width:'100%', backgroundColor:global_css.primary_bg,display:'flex' ,justifyContent:'center',alignItems:'flex-start',paddingTop:'2px',overflow:'hidden'}}>
        
            <div style={{flex:'16%' ,backgroundColor:global_css.leftMenuBackColor,height:'98.5%',width:'auto',display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

                <div style={{flex:'55%',height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',paddingTop:'1rem',transition:'all 300ms',gap:'2px'}}>

                        {dataset &&  dataset.map((n,index)=>{
                            console.log("index",index)
                            return(<div style={{display:'flex',flexDirection:'column',width:'95%'}}
                            >
                                     <div  
                                        key={index} style={{width:'100%',height:'2.4rem',display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'.7rem',backgroundColor: (hoveredIndex === index || selectedIndex === index) ? global_css.leftMenuHoverColor : '',paddingLeft: (hoveredIndex === index || selectedIndex === index) ?'1rem':'0.5rem',borderRadius:'6px',cursor:"pointer",transition:'all 300ms',margin:'4px 0px'}}
                                        onMouseEnter={() => {setHoveredIndex(index)}}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                      //  onClick={()=>{setshowcomponent(n.code);setselectedIndex(selectedIndex=== index?'':index);setshowcomponentouter('');setselectedIndexOuter('');settransition()}}
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
                                              // setshowcomponent(n.code);
                                            }
                                            }}
                                        >
                                          <span><img src={ (hoveredIndex === index || selectedIndex === index) ? n.imgsec : n.img}  style={{width:'100%',height:'100%'}}/></span>                         
                                        <span style={{color: (hoveredIndex === index || selectedIndex === index) ? global_css.leftMenuHoverTextColor : global_css.primary_txt_color ,fontFamily:'Lexend',fontWeight:'400',fontSize:'95%',lineHeight:'20px'}}>{n.name}</span>
                                        {n.menu.length>0?
                                      
                                        <FontAwesomeIcon rotation={selectedIndex === index? 180:''} icon={faAngleUp}  style={{color:(hoveredIndex === index || selectedIndex === index)? global_css.leftMenuHoverTextColor :global_css.primary_txt_color,transition:'all 300ms'}}/>
                                        :''}
                                      </div>

                                
                                      {
                                      (n.menu.length>0)? 
                                      n.menu?.map((i,innderindex)=>{
                                        return(
                                              <div  key={innderindex}
                                              style={{margin:(selectedIndex === index)? '2px 0px':'',width:'100%',height:(selectedIndex === index) ?'2.4rem':'0rem',display:'flex',justifyContent:'flex-start',alignItems:'center',backgroundColor: (HoveredIndexInner === innderindex || selectedIndexOuter === innderindex) ?  global_css.leftMenuHoverColor  : '',paddingLeft:'30%',borderRadius:'6px',cursor:"pointer",transition:'all 300ms'}}
                                              onMouseEnter={() => {setHoveredIndexInner(innderindex)}}
                                              onMouseLeave={() => setHoveredIndexInner(null)}
                                              onClick={()=>{setshowcomponent(n.code);setshowcomponentouter(i.code);setselectedIndexOuter(innderindex);settransition()}}
                                              >
                                                                
                                            {(selectedIndex === index)? <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center' ,width:'100%'}}> <span  style={{color: (HoveredIndexInner === innderindex || selectedIndexOuter === innderindex) ? global_css.leftMenuHoverTextColor:global_css.primary_txt_color ,fontFamily:'Lexend',fontWeight:'400',fontSize:'95%',lineHeight:'20px'}}>  {i.name} </span> 
                                        </div>:''}

                                            </div>
                                        )
                                      })
                                      :''
                                      }
                                 
                                      </div>
                            )
                        })}
                            

                            
                </div>

                <div style={{flex:'1%',height:'100%',width:'100%',display:'flex',justifyContent:'center' ,alignItems:'center'}}>
                          <img src={LineIcon} style={{width:'85%'}}/>
                </div>

                <div style={{flex:'44%',height:'100%',width:'100%'}}>

                </div>
            </div>
          
          
          
            <div style={{flex:'84%',height:'100%',width:'100%',backgroundColor:global_css.mainPageBackColor,display:'flex',justifyContent:'center',alignItems:'flex-start',transition:'all 300ms'}} >
                <div className={`page-transition ${isPageChanging ? 'changing' : ''}`} id='showcomp' style={{height:'98.5%',width:'99%',display:'flex',justifyContent:'center',alignItems:'center' ,transition:'all 300ms',borderRadius:global_css.card_border_radius}}>
                     { pageview && renderComponent()}
                </div>
            </div>
            <style jsx>
    {`
   .page-transition {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
  }
  
  .page-transition.changing {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }
    `}
</style>
         
    </div>
  )
}

export default CRMSkeleton