import React, {useState,useEffect} from 'react';
import {
    chakra,
    FormControl,
    FormLabel, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Input, background
} from "@chakra-ui/react";
import {global_css} from "../../../../GlobalCss/GlobalCSS.js";
import Popnotification from '../../../PopNotification/Popnotification.jsx';
import LoadingSoS from '../../../LoadingScreen/LoadingSoS.jsx';
import axios from "axios";
import config from "../../../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment";
import activexiconwhite from '../../../../assets/static/activexwhite.svg'
import activexicongreen from '../../../../assets/static/activex.svg'
import activexfullgreen from '../../../../assets/static/activexgreen.svg'
import OfferDropDown from '../../OfferDropDown.jsx';

const ItemSimInfo = ({oid}) => {
    

    const [datalist,setdatalist]=useState({

        'operator_name':'',
        'operator_logo':'',
        'iccid':'',
        'sim_number':'',
        'offerid':null
    })


    const getofferdata=(e)=>{
        console.log("offersde",e)
    }


   

    useEffect(() => {

       let locaStoragedata=JSON.parse(localStorage.getItem('saleId'))
       console.log("local datau",locaStoragedata)
       let actualDatax=locaStoragedata?.filter(n=>n.id === oid)
       let actualData=actualDatax[0]

      
        if(actualData){ 
            setdatalist(prevState => ({
                ...prevState,
                operator_name: actualData?.data.operator_name,
                operator_logo: actualData?.data.operator_logo,
                iccid: actualData?.data.iccid,
                sim_number: actualData?.data.sim_number,
                offerid: actualData?.data.offerid,
            }));
    
            
        }


    }, [])
    
 

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:"100%"}}>
          {/* {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
          {loader &&  <LoadingSoS  /> }  */}

           
                <div bg={global_css.modal_bg} style={{color : 'white',width:'100%'}}>
                  
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem'}}>

                    <div style={{display:'flex' ,width:'100%' ,height:'auto' ,flexDirection:'column',gap:'.5rem'}}>
                          <FormLabel style={{fontWeight :'bold',fontSize:'13px',float:'left',display:'flex',width:'95%',justifyContent:"flex-start",alignItems:'center'}}>Operator</FormLabel>

                            <div style={{width: '100%',height:'2.7rem',display: 'flex',border : '1px solid #595959',borderRadius:'5px' }}>
                                         <div   style={{backgroundColor:'#404040',width:'100%',padding:'5px',borderRadius:'5px',gap:'0.5rem' ,height:'100%', transition: 'all 300ms',display:'flex' ,alignItems:'center' ,justifyContent:'flex-start'}} >
                                            <img src={`${config.apiUrl}/${datalist?.operator_logo && datalist?.operator_logo}`} style={{height:'30px' ,width:'30px'}}/> <span >{datalist?.operator_name && datalist?.operator_name}</span></div>
                            </div>  

                    </div>  

                    <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>ICCID number <span style={{color:'red'}}>*</span></FormLabel>
                            <Input name='iccid' type='number'
                             value={datalist?.iccid}
                              style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}   placeholder='Ex. 1242353455' />
                            
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>SIM Number <span style={{color:'red'}}>*</span></FormLabel>
                            <Input name='sim_number' type='number' 
                            value={datalist.sim_number} 
                             style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',fontSize:'13px'
                            }}   placeholder='Ex. 1242353455' />
                        </FormControl>
                    </div>


                    

                        <FormControl  style={{width:'100%'}}>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Offer</FormLabel>
                         
                             <OfferDropDown   selected={datalist.offerid}  getofferdata={getofferdata} oid={oid} objskey={'offerid'}/>
                       
                          
                        </FormControl>

                     
                    </div>
                    </div>
                    
         
        

            <style jsx>
                {
                    ``
                }
            </style>
        </div>
    );
};

export default ItemSimInfo