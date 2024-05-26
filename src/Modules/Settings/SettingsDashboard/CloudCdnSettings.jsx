
import React, { useState ,useEffect,useRef} from 'react';
import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {useDisclosure} from "@chakra-ui/react";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment/moment.js";
import LoadingSoS from '../../../Components/LoadingScreen/LoadingSoS'
import { global_css } from '../../../GlobalCss/GlobalCSS';
import messengericon from '../../../assets/static/messenger.svg'
import Popnotification from '../../../Components/PopNotification/Popnotification';
import CustomEditors from '../../../Components/EditFunctionality/CustomEditors';
import { faCloudDownloadAlt, faCloudUploadAlt, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const CloudCdnSettings = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loader, setLoader] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [buttontype,setbuttontype]=useState('save')
    const[datalist,setdatalist]=useState({
        'total_usage_storage_size_mb':'123423',
        'total_deleted_storage_size_mb':'3423',
        'total_objects':'234'
    })
    const[data,setdata]=useState({
        access_key:'',
        secret_key:'',
        bucket_name:''
    })
    const updateData = (field, value) => {
        setdata(prevData => ({
            ...prevData,
            [field]: value
        }));
    };


    useEffect(() => {
      

    }, []);

  return (
    <div  className="flex justify-center h-full w-full items-center md:items-start  rounded-[3px]" style={{backgroundColor:global_css.mainPageFrontColor
    }}>

    {loader &&  <LoadingSoS  /> }
          {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 


  

            <div   style={{width:"100%",height:"100%",backgroundColor:global_css.mainPageFrontColor,color:global_css.primary_txt_color,padding:'3rem 2rem',display:"flex",flexDirection:'column'}} className=" rounded-[3px]">	
								<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:'1rem',fontSize:'1.5rem',color:global_css.primary_txt_color}}>
                                    Active cloud storage : <a href='https://wasabi.com/' > WASABI </a>
                                </div>
           
                                <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center" ,width:'100%',flexDirection:'column',gap:'4rem'}}>
                    <div style={{flex:1,display:"flex",justifyContent:"space-between",alignItems:"center" ,gap:'4%',width:'100%'}}>

                      
                                <div  style={{
                                        width: "100%",
                                        height: "150px",
                                        backgroundColor:global_css.mainPageBackColor,
                                        borderRadius: "8px",
                                        display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',
                                        padding:"1rem",
                                        boxShadow:`0px 2px 10px ${global_css.shadowcolor}`
                                        }}
                                        >
                                            <div style={{flex:'10%',display:"flex",justifyContent:'flex-start',alignItems:"center",width:'100%',fontWeight:'500',fontSize:'1.2rem'}}>Active Storage</div>
                                            <div style={{flex:'90%',display:"flex",justifyContent:'flex-start',alignItems:"center",width:'100%',gap:"4%"}}>
                                                <span><FontAwesomeIcon icon={faCloudUploadAlt} style={{color: "#134ecd",width:'40px',height:"40px",}} />
                                                 </span>
                                                <span style={{fontWeight:'510',fontSize:'1.3rem',display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',gap:'3px'}}>
                                                  
                                                   <span> {parseFloat(datalist?.total_usage_storage_size_mb).toFixed(2)} MB</span>
                                                   <span> {parseFloat((parseFloat(datalist?.total_usage_storage_size_mb).toFixed(2))/(1024)).toFixed(2)} GB</span>
                                                   
                                                   </span>
                                                </div>
                                        </div>



                                        <div  style={{
                                        width: "100%",
                                        height: "150px",
                                        backgroundColor: global_css.mainPageBackColor,
                                        borderRadius: "8px",
                                        display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',
                                        padding:"1rem",
                                        boxShadow:`0px 2px 10px ${global_css.shadowcolor}`
                                        }}
                                        >
                                            <div style={{flex:'10%',display:"flex",justifyContent:'flex-start',alignItems:"center",width:'100%',fontWeight:'500',fontSize:'1.2rem'}}>Deleted Storage</div>
                                            <div style={{flex:'90%',display:"flex",justifyContent:'flex-start',alignItems:"center",width:'100%',gap:"4%"}}>
                                            <span><FontAwesomeIcon icon={faCloudDownloadAlt} style={{color: "#ef5350",width:'40px',height:"40px",}} />
                                             </span>
                                                

                                                <span style={{fontWeight:'510',fontSize:'1.3rem',display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',gap:'3px'}}>
                                                  
                                                  <span> {parseFloat(datalist?.total_deleted_storage_size_mb).toFixed(2)} MB</span>
                                                  <span> {parseFloat((parseFloat(datalist?.total_deleted_storage_size_mb).toFixed(2))/(1024)).toFixed(2)} GB</span>
                                                  
                                                  </span>
                                                </div>
                                        </div>

                                        <div  style={{
                                        width: "100%",
                                        height: "150px",
                                        backgroundColor:global_css.mainPageBackColor,
                                        borderRadius: "8px",
                                        display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',
                                        padding:"1rem",
                                        boxShadow:`0px 2px 10px ${global_css.shadowcolor}`
                                        }}
                                        >
                                            <div style={{flex:'10%',display:"flex",justifyContent:'flex-start',alignItems:"center",width:'100%',fontWeight:'500',fontSize:'1.2rem'}}>Total Objects</div>
                                            <div style={{flex:'90%',display:"flex",justifyContent:'flex-start',alignItems:"center",width:'100%',gap:"1%"}}>
                                                <span>
                                                <FontAwesomeIcon icon={faStickyNote} style={{color: "#6afc78",width:'40px',height:"40px",}} />
                                                </span>
                                                <span style={{fontWeight:'510',fontSize:'2rem'}}> {datalist?.total_objects}</span>
                                                </div>
                                        </div>

                                       

                                            
                                       
                    </div>
                    {/* <div style={{flex:10,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:'100%',gap:'1rem' }}>
                        
                                                <span style={{fontWeight:'400',fontSize:'2rem'}}>CDN Configuaration</span>

                                         

                        <div style={{display:'flex',justifyContent:'center' ,alignItems:'center',gap:'1rem',marginTop:'1.5rem'}}>
                             <div>
                             <label className={style.field_label} htmlFor="dbobject" id={style.fieldname}>CDN Access key</label>
                             <input 
                             onChange={(e) => updateData('access_key', e.target.value)}
                                
                            value={data.access_key}
                              required  className={style.inputfield} style={{width:'25rem'}}    placeholder='acceess key' />
                           </div>

                           <div>
                             <label className={style.field_label} htmlFor="dbobject" id={style.fieldname}>CDN Secret key</label>
                             <input 
                             onChange={(e) => updateData('secret_key', e.target.value)}  required  className={style.inputfield}  style={{width:'25rem'}} value={data.secret_key}   placeholder='secret key' />
                           </div>
                           
                        </div>

                        <div style={{display:'flex',justifyContent:'center' ,alignItems:'center',gap:'1rem',marginTop:'1.5rem'}}>
                             <div>
                             <label className={style.field_label} htmlFor="dbobject" id={style.fieldname}>Bucket Name</label>
                             <input 
                             onChange={(e) => updateData('bucket_name', e.target.value)}  required  className={style.inputfield} style={{width:'25rem'}}  value={data.bucket_name}   placeholder='acceess key' />
                           </div>
                           
                        </div>



                        <Grid item xs={8} style={{paddingTop: '15px'}}>
                                {isupdate?
                                    <button type="button" 
                                    onClick={() => {opendialoguebox('update');}}
                                    style={{margin: 'auto', backgroundColor: '#ef5350', color: 'white', borderRadius: '5px', outline: '0' 
                                    ,border: '0', padding: '10px 50px', fontSize: '20px', cursor:'pointer'}}>Update</button>
                                    :
                                    <button type="button"
                                    onClick={() => {opendialoguebox('save');}}
                                    style={{margin: 'auto', backgroundColor: '#ef5350', color: 'white', borderRadius: '5px', outline: '0' 
                                    ,border: '0', padding: '8px 30px', fontSize: '20px', cursor:'pointer'}}>Submit</button>
                                }
		        	</Grid>


                    </div> */}
                  
                  </div>
                    
                    
                        <div style={{width:'100%',height:'20%',display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                            <Button
                            
                            onMouseDown={(e) => {
                                e.target.style.backgroundColor = '#1EAB5E';
                            }}
                            onMouseUp={(e) => {
                                e.target.style.backgroundColor = '#27CF7A';
                            }} 
                            style={{background: "#27CF7A", color: 'white',width:'auto',padding:'0px 3rem'}} >
                                {buttontype === 'save'?'Save' : 'Update'}
                            </Button>
                        </div>

                       
            
           
                  
				
				</div>


             
               
                 
            
      
            
            <style jsx>
                {
                    `
                      ::-webkit-scrollbar {
                        width: 12px; /* Width of the scrollbar */
                        border: 1px solid #ddd; /* Border color of the scrollbar */
                        border-radius: 8px;
                      }

                      ::-webkit-scrollbar-thumb {
                        background-color: #999; /* Color of the thumb */
                        border-radius: 3px; /* Border radius of the thumb */
                      }

                      /* For Firefox */
                      scrollbar {
                        width: 12px; /* Width of the scrollbar */
                      }

                      scrollbar-thumb {
                        background-color: #999; /* Color of the thumb */
                        border-radius: 3px; /* Border radius of the thumb */
                      }
                      FormLabel{
                        font-size: 13px;
                      }
                        
                    
                    `
                }

            </style>
      

</div>
  )
}

export default CloudCdnSettings