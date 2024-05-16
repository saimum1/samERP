import React, { useState ,useEffect} from 'react';
import {Bar,ComposedChart, BarChart , Line, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,LabelList, CartesianGrid} from 'recharts';

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
import {faChevronDown, faEllipsisVertical, faSquare} from "@fortawesome/free-solid-svg-icons";
import {useDisclosure, Button} from "@chakra-ui/react";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment/moment.js";
import { data } from './DataChartMkt';
import LoadingSoS from '../../../Components/LoadingScreen/LoadingSoS';
import { global_css } from '../../../GlobalCss/GlobalCSS';
const DashboardCrm = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loader, setLoader] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');

    const CustomTooltip = ({active, payload, label }) => {
        if(active && payload && payload.length > 0){
            // console.log("This is payload:", payload)
            
            return(
                <div className='custom-tooltip' style = {{background:'whitesmoke',padding:'6px', fontSize:'11px', boxShadow:'0px 1px 18px  #847d7d'}}>
                    <p style={{textAlign:'left', color:'#0050EF', fontSize:'13px',display:'flex',alignItems:'center'}} className="label"><FontAwesomeIcon title="" icon={faSquare} style={{color: '#0050EF', width: '14px'}}/>: {`${payload[0]?.value}`}</p> 
                    <p style={{textAlign:'left', color:'#E51400', fontSize:'13px',display:'flex',alignItems:'center'}} className="label"><FontAwesomeIcon title="" icon={faSquare} style={{color: '#E51400', width: '14px'}}/>:{`${payload[1]?.value}`}</p>  
                    <p style={{textAlign:'left', color:'#008A00', fontSize:'13px',display:'flex',alignItems:'center'}} className="label"><FontAwesomeIcon title="" icon={faSquare} style={{color: '#008A00', width: '14px'}}/>: {`${payload[2]?.value}`}</p>  
                    
                    <p style={{textAlign:'left', color:'#00DE00', fontSize:'13px',display:'flex',alignItems:'center'}} className="label"><FontAwesomeIcon title="" icon={faSquare} style={{color: '#00DE00', width: '14px'}}/>: {`${payload[3]?.value}`}</p> 
                    
    
                   
    
                </div>
                
            );
        }
        return null; 
    };


   const getyearfromdata=(e)=>{
        const val=data?.filter((n)=> n.month_name === e)
        const yr=val[0]['year']?.toString().slice(-2)
        console.log("sdadas",yr)

        return yr
}



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
        width: '70%', 
        height: '40%',
        borderRadius: '40%', 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        zIndex: 0, 
        filter: 'blur(10px)', 
        opacity:'3%',
        transition:'all 400ms',
        top:'25%'
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


  
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
    <div style={styles.shadow}  ></div>


        <div style={{textAlign: "center", marginLeft: '-80px', marginTop:"20%",display:'flex',flexDirection:'column',width:'100%',height:'100%'}}>
       

        <ResponsiveContainer width="100%" height={300} >
            <ComposedChart data={data?.slice(-12)}  margin={{top: -60, right: 0, left: 65, bottom: 5,}}>
                <XAxis padding={{ left: 40 , right:30 }} 
                    tick={{ fill: 'white', cursor: 'pointer', fontSize:'12px', fontWeight:'bold' }}
                    dataKey="month_name"
                    tickFormatter={(month) => `${month.substring(0, 3)}` + `,${getyearfromdata(month)}`}
                    // onClick={(event)=> this.monthlyLeadGeneration(event)}
                    />
                <YAxis type="number" domain={[0, 60]} tick={{fill:'white', cursor:'pointer', fontSize:'12px', fontWeight:'bold'}} dataKey='total_mql_count'
                tickFormatter={(VAL) => (Math.ceil(VAL / 100) * 100) + 100} />
                <Tooltip content={<CustomTooltip  />}/>
                <Legend verticalAlign="top" align="left" height={36} wrapperStyle={{left: 115, width: 1084, fontSize: 12}}/>
                <Bar name="MQL" dataKey="total_mql_count" barSize={15} fill="#6A00FF"/>
                <Bar name="SQL" dataKey="total_sql_count" barSize={15} fill="#E51400"/>  
                <Bar name="Client" dataKey="client" barSize={15} fill="#008A00"/> 
                <Bar name="Win Deal" dataKey="total_win_deal" barSize={15} fill="#00DE00"/> 
            </ComposedChart> 
            
        </ResponsiveContainer> 



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
        

        `}
    </style>
</div>
  )
}

export default DashboardCrm