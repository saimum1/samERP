import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import axios from "axios";
import config from "../../../config.jsx";

import toast, { Toaster } from "react-hot-toast";
import LoadingSoS from "../../../Components/LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../../../Components/PopNotification/Popnotification.jsx";
import TickForm from '../../../Components/TickForm/TickForm.jsx';
import VideoUploader from '../../../Components/PopNotification/VideoUploader.jsx';
import { useAuth } from '../../../Context/AuthInfo.jsx';


const AddProduct = ({isOpen, onClose, GetOperators ,actionType, operatorForEdit}) => {
    console.log('action=-0=',actionType)
      const { user , token ,profileInfo} = useAuth();

    const t='';
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [operatorName, setOperatorName] = useState('');
    const [operatorCode, setOperatorCode] = useState('');
    const [operatorStatus, setOperatorStatus] = useState(false);
    const [url, setURL] = useState('');
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [logourlFromPrev,setLogourlFromPrev]=useState('')

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
    };

    console.log("operator for edit", operatorForEdit)

    const SaveOperator = async () => {
        try {
            const data = {
                "name": operatorName,
                'code': operatorCode,
                "logo": url,
                "status": operatorStatus ? 'available' : 'not_available'
            };

            const response = await axios.post(`${config.apiUrl}/api/operator`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:operator', response);

                await GetOperators();
                onClose();
                setURL('');
                setOperatorStatus(false);
                setOperatorCode('');
                setOperatorName('');
                setSelectedFile(null);
                setshowpopupmsg('Save Success');
                setshowpopupstatus('success');
                setshowpopup(true);
                setTimeout(() => {
                    setshowpopup(false);
                }, 1500);


        } catch (error) {
            console.error('Error:', error);
            if (error.response?.status === 403) {
                setshowpopupmsg('Operator already exists');
                setshowpopupstatus('fail');
                setshowpopup(true);
                setTimeout(() => {
                    setshowpopup(false);
                }, 1500);

            } else {
                setshowpopupmsg('Save Failed');
                setshowpopupstatus('fail');
                setshowpopup(true);
                setTimeout(() => {
                    setshowpopup(false);
                }, 1500);
            }
        }
    };

    const UpdateOperator = async () => {
        try {


            const data = {
                "name": operatorName,
                'code': operatorCode,
                "logo": url,
                "status": operatorStatus ? 'available' : 'not_available'
            }

            const response = await axios.put(`${config.apiUrl}/api/operator/${operatorForEdit.id}`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:operator', response);
            await GetOperators()
            onClose()
            setOperatorStatus(false)
            setOperatorCode('')
            setOperatorName('')
            setSelectedFile(null)
            // setshowpopupmsg(response.statusText)
            setshowpopupmsg('Update Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);


        } catch (error) {
            console.error('Error:', error);

            // Optionally log more specific details about the error
            if (error.response?.status === 403) {
                setshowpopupmsg('Operator already exists');
                setshowpopupstatus('fail');
                setshowpopup(true);
                setTimeout(() => {
                    setshowpopup(false);
                }, 1500);

            } else {
                setshowpopupmsg('Save Failed');
                setshowpopupstatus('fail');
                setshowpopup(true);
                setTimeout(() => {
                    setshowpopup(false);
                }, 1500);
            }



            throw error;
        }
    };
    useEffect(() => {
        if (actionType) {
            setOperatorName(operatorForEdit?.name || '');
            setOperatorCode(operatorForEdit?.code || '');
            setOperatorStatus(operatorForEdit?.status === 'available' || false);
            setLogourlFromPrev(operatorForEdit?.logoUrl || '')
        }else{
            setOperatorName( '');
            setOperatorCode('');
            setOperatorStatus(false);
            setLogourlFromPrev('')
        }
    }, [actionType, operatorForEdit]);

    const handleCheckboxChange = () => {
      setOperatorStatus(!operatorStatus);
    };

    const geturl = (e) => {
        console.log("urlbody", e);
        let url = e?.data?.fileUrl;
        setURL(url)
    }

    return (
        <div>
              
            <Toaster
                position="top-right"
                reverseOrder={false}
                />
            <VideoUploader filex={selectedFile} geturl={geturl}/>
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            <Modal
                isOpen={isOpen}
                onClose={onClose}


            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >{actionType?'Edit Category':'Add new Category'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Category Name </FormLabel>
                            <Input style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }} onChange={(e) => setOperatorName(e.target.value)}
                                   value={operatorName}
                                   placeholder='category name'/>
                        </FormControl>

                        <FormControl mt={4} mb={8}>
                            <FormLabel>Category Logo</FormLabel>
                            <Input  type="file" id="file-input" className="hidden" onChange={handleFileChange} />
                            <label style={{border : '1px solid #595959'}} htmlFor="file-input" className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span className="flex items-center justify-between p-0">
            <span className="flex items-center">
<svg className="mr-2 mb-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M6.1579 7.4871H5.3804C3.68457 7.4871 2.30957 8.8621 2.30957 10.5579L2.30957 14.6204C2.30957 16.3154 3.68457 17.6904 5.3804 17.6904H14.6554C16.3512 17.6904 17.7262 16.3154 17.7262 14.6204V10.5496C17.7262 8.85876 16.3554 7.4871 14.6646 7.4871H13.8787" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.0177 1.82618V11.8604" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.58838 4.26562L10.0175 1.82562L12.4475 4.26562" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                {selectedFile ? `${selectedFile.name.slice(0, 20)}...` : `${'dragDrop'}`}</span> <span className="bg-amber-50 text-black px-2 py-1 mr-[-3%] rounded-[4px] hover:bg-amber-100">chooseFile</span>
        </span>
                            </label>
                        </FormControl>
                        <div className="flex items-center gap-2 justify-between">
                        <FormControl className="mt-16">
                            <FormLabel style={{fontWeight :'bold'}}>Category Code <span style={{color : 'red'}}>*</span></FormLabel>
                            <Input value={operatorCode} style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }} onChange={(e) => setOperatorCode(e.target.value)} placeholder='Ex. +88'/>
                        </FormControl>

                        <FormControl className="mt-5">
                            <FormLabel style={{fontWeight :'bold'}}>status <span style={{color:'red'}}>*</span></FormLabel>

                        <label style={{border : '1px solid #595959',transition:'all 300ms'}} className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex gap-2 items-center">
                            <input 
                                type="checkbox"
                                checked={operatorStatus}
                                onChange={(e) => setOperatorStatus(e.target.checked)}
                                style={{ display: 'none' }} 
                            />
                            <div style={{width:'18px',height:'18px'}}>
                                <TickForm  status={operatorStatus}/> 
                            </div>
                            <span>Available</span>
                            </label>
                        </FormControl>
                        </div>
                    </ModalBody>

                    <ModalFooter>

                        <Button colorScheme='white' variant='outline' onClick={onClose}>Cancel</Button>
                        <Button onClick={actionType? UpdateOperator : SaveOperator} style={{background: "#27CF7A", color: 'white'}} ml={3}>
                            {actionType?'Update' : 'Save'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <style jsx>
                {
                    `
                      .custom-file-upload {
                        padding: 4px 2px;
                        cursor: pointer;
                        //background-color: #f5f5f5;
                        font-size: 15px;
                      }

                      //.custom-file-upload:hover {
                      //  background-color: red;
                      //}

                      .custom-file-upload:active {
                        background-color: white;
                        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
                      }

                      input:focus{
                        outline: none;
                      }
                        
                    
                    `
                }

            </style>
        </div>
    );
};

export default AddProduct;

