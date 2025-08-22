import React,{useState,useEffect} from 'react'
import LdashBoard from './LdashBoard';
import { global_css } from '../../GlobalCss/GlobalCSS';
import CRMSkeleton from '../CRM/CRMSkeleton';
import SettingsSkeleton from '../Settings/SettingsSkeleton';
import HelpDeskSkeleton from '../HelpDesk/HelpDeskSkeleton';
import { useSelector, useDispatch } from 'react-redux';
import ProductSkeleton from '../Products/ProductSkeleton';
import OrderListSkeleton from '../OrderList/OrderListSkeleton';
import toast, { Toaster } from "react-hot-toast";


const LandingRoute = () => {
   
    const moduleCode=useSelector((state)=>state.moduleRouting.modularCode)
console.log("asas",useSelector((state)=>state.moduleRouting.modularCode))
    const [showcomponent, setshowcomponent] = useState()

    const [pageview, setpageview] = useState(true)
    const [isPageChanging, setIsPageChanging] = useState(false)


    const getRenderCode=(e)=>{
        // console.log("get the code",e)
        // settransition()
        // setshowcomponent(e)
    }


    useEffect(() => {
       settransition()
       setshowcomponent(moduleCode)
    }, [moduleCode])
    


    const renderComponent = () => {
    
    switch (showcomponent) {

      case 0:
        return <HelpDeskSkeleton  />
       
        case 2:
        return <CRMSkeleton  />
         

        case 6:
          return <SettingsSkeleton  />
        case 7:
          return <ProductSkeleton  />
          case 5:
          return <OrderListSkeleton  />
       
      default:
        return <LdashBoard getRenderCode={getRenderCode}/>;
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
  
    console.log('Navigated to LandingRoute with URL:', location.pathname);
   
  }, [showcomponent,location])
  
  
  return (
    <div   style={{height : 'calc(100vh - 4.5rem)', width:'100vw', backgroundColor:global_css.primary_bg,display:'flex' ,justifyContent:'center',alignItems:'center'}}>
        
          <Toaster
                      position="top-right"
                      reverseOrder={false}
                      />
                <div className={`page-transition ${isPageChanging ? 'changing' : ''}`} id='showcomp' style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center' ,transition:'all 300ms'}}>
                     { pageview && renderComponent()}
                </div>
          
            <style>
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


export default LandingRoute