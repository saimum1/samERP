import React,{useState,useEffect} from 'react'

import LdashBoard from './LdashBoard';
import { global_css } from '../../GlobalCss/GlobalCSS';
import Dashboardskeleton from '../../Components/SkeletonDashboard/Dashboardskeleton';
import { useParams } from 'react-router-dom';
import CRMSkeleton from '../CRM/CRMSkeleton';
import DashboardCrm from '../CRM/MarketingDashboard/DashboardCrm';
import SettingsSkeleton from '../Settings/SettingsSkeleton';
import HelpDeskSkeleton from '../HelpDesk/HelpDeskSkeleton';


const LandingRoute = () => {
   

    const [showcomponent, setshowcomponent] = useState()

    const [pageview, setpageview] = useState(true)
    const [isPageChanging, setIsPageChanging] = useState(false)


    const getRenderCode=(e)=>{
        console.log("get the code",e)
        settransition()
        setshowcomponent(e)
    }


    const renderComponent = () => {
    
    switch (showcomponent) {

      case 0:
        return <HelpDeskSkeleton  />
       
        case 2:
        return <CRMSkeleton  />

        case 6:
          return <SettingsSkeleton  />
       
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