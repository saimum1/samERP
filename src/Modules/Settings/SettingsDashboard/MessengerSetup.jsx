
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

const MessengerSetup = () => {

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
  
    const [pagedata, setpagedata] = useState({
        page_name: '',
        page_id: '',
        app_id: '',
        app_secret_code: '',
        grant_type: '',
        token_expiry_date: '',
        access_token: ''
    });

    const handleChange = (field, value) => {
        setpagedata((prevdata) => ({
            ...prevdata,
            [field]: value,
        }));
    };


    const handleSubmit = async () => {
        try {
            const data = {
                "taxIdCode": agent.taxIdCode,
                "vatNumber": agent.vatNumber,
                "pecId": agent.pecId,
                "codiceUnivoco": agent.codiceUnivoco,
                "address": agent.address,
                "city": agent.city,
                "referenceCode": agent.referenceCode,
                "contactPerson": agent.contactPerson,
                "agentName": agent.name,
                "userName": agent.username,
                "email": agent.email,
                "phone": agent.phone,
            };

            const response = await axios.post(`${config.apiUrl}/api/agentRequests`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);

            setAgent({
                name: '',
                email: '',
                username: '',
                phone: '',
                contactPerson: '',
                taxIdCode: '',
                vatNumber: '',
                pecId: '',
                codiceUnivoco: '',
                address: '',
                city: '',
                referenceCode: '',
            });
            setshowpopupmsg('Agent request added!');
            setshowpopupstatus('success');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false)
            }, 1500);
            onClose();
            await getData()
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg(error.response.data.error)
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)
            }, 1500);
            throw error;
        }
    };
    const handleUpdate = async () => {
        try {
            const datak =    {
                "taxIdCode": agent.taxIdCode,
                "vatNumber": agent.vatNumber,
                "pecId": agent.pecId,
                "codiceUnivoco": agent.codiceUnivoco,
                "address": agent.address,
                "city": agent.city,
                "referenceCode": agent.referenceCode,
                "contactPerson" : agent.contactPerson,
                "agentName": agent.name,
                "userName": agent.username,
                "email": agent.email,
                "phone": agent.phone,

            }


            const response = await axios.put(`${config.apiUrl}/api/agentRequests/${data.id}`, datak, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);


            setAgent({
                name: '',
                email: '',
                username: '',
                phone: '',
                contactPerson: '',
                taxIdCode: '',
                vatNumber: '',
                pecId: '',
                codiceUnivoco: '',
                address: '',
                city: '',
                referenceCode: '',
            });
            setshowpopupmsg('Agent successfully Updated');
            setshowpopupstatus('success');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            onClose();
            await getData()
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg(error.response.data.error)
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }



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
                                    Messenger Config page
                                </div>
           
                        <FormControl className="mb-4">
                            <FormLabel style={{fontWeight :'bold'}}>Page Name</FormLabel>
                            <Input
                                value={pagedata.page_name}
                                onChange={(e) => handleChange('page_name', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}

                                placeholder='Enter page name'/>
                        </FormControl>



                        <FormControl className="mb-4">
                            <FormLabel style={{fontWeight :'bold'}}>Page Id</FormLabel>
                            <Input
                                value={pagedata.page_id}
                                onChange={(e) => handleChange('page_id', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}

                                placeholder='Enter page id'/>
                        </FormControl>


                        <div className="flex items-center gap-2 justify-between mb-4">
                            <FormControl>
                                <FormLabel style={{fontWeight :'bold'}}>App Id</FormLabel>
                                <Input
                                    value={pagedata.app_id}
                                    onChange={(e) => handleChange('app_id', e.target.value)}

                                    type="email"  style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='34534rf34t34'/>
                            </FormControl>

                            <FormControl>
                                <FormLabel style={{fontWeight :'bold'}}>App secret code</FormLabel>

                                <Input
                                    value={pagedata.app_secret_code}
                                    onChange={(e) => handleChange('app_secret_code', e.target.value)}

                                    style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border : '1px solid #595959',
                                        background : '#404040'
                                    }}  placeholder='app secret code'/>
                            </FormControl>
                        </div> 
                        
                        <div className="flex items-center gap-2 justify-between mb-4">
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Grant type</FormLabel>
                            <Input
                                value={pagedata.grant_type}
                                onChange={(e) => handleChange('grant_type', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder=' ex exchange token'/>
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Token expiry date</FormLabel>

                            <Input

                                value={pagedata.token_expiry_date}
                                onChange={(e) => handleChange('token_expiry_date', e.target.value)}
                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='2024-12-12'/>
                        </FormControl>
                    </div> 


                    <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Access token</FormLabel>

                            <Input

                                value={pagedata.access_token}
                                onChange={(e) => handleChange('access_token', e.target.value)}
                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='access_token'/>
                        </FormControl>
                    
                    
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

export default MessengerSetup