
import React, {useEffect,useRef,  useState} from 'react';
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Badge,
    Card, Icon, Select, SelectItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text, TextInput,
    Title,


} from "@tremor/react";
import {Button} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {useDisclosure} from "@chakra-ui/react";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import axios from "axios";
import config from "../../../config.jsx";
import toast from "react-hot-toast";
import SearchDialouge from "../../../Components/SearchComponent/SearchDialouge.jsx";
import AlertBox from "../../../Components/AlertBox/AlertBox.jsx";
import Nodatafound from "../../../Components/NoDataFound/Nodatafound.jsx";
import LoadingSoS from "../../../Components/LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../../../Components/PopNotification/Popnotification.jsx";
import CustomEditors from "../../../Components/EditFunctionality/CustomEditors.jsx";
import {convertString} from "../../../Components/commonFunctions/StringConversion.jsx";
import { useAuth } from '../../../Context/AuthInfo.jsx';
import AddOrder from './AddOrder.jsx';
import Dropdown from '../../../Components/Dropdown/Dropdown.jsx';

const OrderList = () => {
          const { user , token ,profileInfo} = useAuth();
    

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ tableData, setTableData ] = useState([])
    const [ bulkIds, setBulkIds ] = useState([])
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [status, setStatus]=useState('')
    const [filterOpen, setFilterOpen] = useState(false);
    const [productForEdit, setProductForEdit] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [nodata, setNodata] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const dropdownRef = useRef(null);

    console.log("ssssssssssss", status)


  

    const handleSelect = (value) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((item) => item !== value);
            } else {
                return [...prevSelected, value];
            }
        });

        setIsAllSelected(selected.length === tableData.length);
    };

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : tableData.map((option) => option.id));
        setIsAllSelected(!isAllSelected);
    };
    const getaction=(e)=>{

        if(e.type === 'edit'){
            // GetOperatorForUpdate(selecteditem.id)
             setProductForEdit(selecteditem)
             setactiontype(true)

            onOpen()
        }else if(e.type === 'delete'){
            onAlertOpen();
            setAlertType('')
            setAlertText('areyousureDelOperators');
            setAlertButtonText('yesDel')
            setAlertButtonTextSecond('cancel')
            setactiontype(false)
        }

    }

  

  

    const GetProducts = async () => {
        axios.get(`${config.apiUrl}/api/product/order`).then(res => {
                console.log("orderlistw32", res.data);
                setTableData(res.data)
                });
    };

    
    const deleteOperator = async (id) => {
        console.log("dataxxtodelete",id)
        try {
            await axios.delete(`${config.apiUrl}/api/product/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Operator deleted successfully');
            await GetProducts()
            onAlertClose()
            setshowpopupmsg('Delete Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        } catch (error) {
            console.error('Error deleting operator:', error);
            setshowpopupmsg('Delete Failed')
            setshowpopupstatus('failed')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        }
    };

    const UpdateBulk = async () => {
        try {

            const data ={
                operatorIds: selected,
                    status: status
            }
            const response = await axios.put(`${config.apiUrl}/api/operator/update/bulk`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            await GetOperators()
            await setBulkIds([])
            await onAlertClose()
            setshowpopupmsg('Update Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg('Update Failed')
            setshowpopupstatus('failed')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
       
        }
    };



    const getselecteditem = (item,status) => {
        console.log("status",status,item)
                    axios.patch(`${config.apiUrl}/api/product/order/${item?.id}?status=${status.lang}`, 
            {}, 
            { headers: { Authorization: `Bearer ${token}` } }
            ).then(res => {
              GetProducts()
              setshowpopupmsg('Update Success')
                setshowpopupstatus('success')
                setshowpopup(true)
                setTimeout(() => {
                    setshowpopup(false)

                }, 1500);
            }).catch(err => {
                setshowpopupmsg('Update Failed')
                setshowpopupstatus('failed')
                setshowpopup(true)
                setTimeout(() => {
                    setshowpopup(false)

                }, 1500);
        
            })

    };


    useEffect(() => {
        GetProducts()
    },[])

    return (
       <div   style={{width:"100%",height:"100%",backgroundColor:global_css.mainPageFrontColor,color:global_css.primary_txt_color}} className=" rounded-[3px]">	
            <AddOrder isOpen={isOpen} onClose={onClose} actionType={actiontype} GetProducts={GetProducts} productForEdit={productForEdit} />
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={alertType==='warning'?UpdateBulk : deleteOperator}/>
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>
                <div className="flex justify-between items-center mb-14">

                <Title className="text-4xl">Order List</Title>

                    <div  className="flex justify-end  items-center gap-3 w-4/12">
                        <label  style={{border : '1px solid #595959', position: 'relative', display: 'inline-block', zIndex : '1' }} htmlFor="file-input" className="w-8/12 h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span onClick={() => {
            if(!filterOpen){setFilterOpen(true) }else{setFilterOpen(false)}
        }} className="flex items-center justify-between p-0">
            <span  className="flex items-center">
                <Icon size="sm" icon={SearchIcon} />search

              </span> <span ><FontAwesomeIcon icon={faChevronDown} /></span>
        </span>
                            {filterOpen && (<SearchDialouge  setFilterOpen={setFilterOpen} setTableData={setTableData} type={'operator'}/>)}
                        </label>
                        <button onClick={() => {onOpen(); setactiontype(false)}} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-3/12">Add New</button>
                    </div>
                </div>

            
                <Table className="mt-5 h-[60vh] transition-all[300]">
                        <TableHead>
                            <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{ margin: '0px 4px', backgroundColor: '' }}>
                                <TableHeaderCell style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', borderRight: '2px solid #303038' }}>
                                    <input type="checkbox" /> seria
                                </TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>order no</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>order details</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>lead Name</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>lead Email</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>total quantity</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>total price</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>status</TableHeaderCell>
                                <TableHeaderCell style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>Action</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ height: '100%', backgroundColor: "", transition: "all 300ms" }} className='transition-all[300ms]'>
                            {tableData?.map((item, index) => (
                                <TableRow key={index} style={{ borderColor: '#595959', transition: "all 300ms" }}>
                                    <TableCell>
                                        <input type="checkbox" style={{ backgroundColor: '#2B2B33' }} />
                                        <span style={{ backgroundColor: '#2B2B33' }} className="ml-5">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Text>{item.orderid}</Text>
                                        </div> */}
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                maxWidth: "100px",     // 👈 must set width/constraint
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                            >
                                            <Text>{item.orderid}</Text>
                                            </div>

                                    </TableCell>
                                    <TableCell>
                                        <Text style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', gap: '5px', height: 'auto' }}>
                                            {item.items?.map((n, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                                                    <span style={{ width: '84%', textAlign: 'left' }}>{n?.name}</span>
                                                    <span style={{ width: '2%' }}>:</span>
                                                    <span style={{ width: '15%', textAlign: 'left', marginLeft: '10px' }}>{n?.quantity}</span>
                                                </div>
                                            ))}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{item.leadname}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{item.leademail}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{item.items?.reduce((total, item) => total + item.quantity, 0)}</Text>
                                    </TableCell>

                                    <TableCell>
                                        <Text>{item.items?.reduce((total, item) => total + item.price * item.quantity, 0)}</Text>
                                    </TableCell>
                                    
                                    <TableCell >
                                        <Text><div style={{ backgroundColor: '', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', transition: "all 300ms", width: '8.5rem' }}>
                                            <Dropdown 
                                            // onClick={() => setselecteditem(item)}
                                             dropType={''} 
                                            //  getdata={getselecteditem}
                                            getdata={(status) => getselecteditem(item, status)} 
                                              order_status={item.status} />
                                        </div></Text>
                                    </TableCell>
                                   
                                    <TableCell>
                                        <Text>1</Text>
                                    </TableCell>
                                  



                                  


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                <div className="max-w-sm mt-5  flex items-center">
                    <select style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] h-10 hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
                        <option value="">
                            selectStatus
                        </option>
                        <option value="available">
                            Available
                        </option>
                        <option value='not_available'>
                            Not Available
                        </option>
                    </select>
                    <Button onClick={()=>{onAlertOpen(); setAlertType('warning'); setAlertText('Are you sure you want to change the status?'); setAlertButtonTextSecond('Cancel'); setAlertButtonText('Yes, Update')}} variant='outline'  style={{border: "1px solid #27CF7A", color: '#27CF7A', marginTop : '-0.1%'}} ml={3}>
                        Apply
                    </Button>

                </div>
            </Card>:<Nodatafound btn_text={'Add Operator'}  tittle_head={'No Operator List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onOpen}/>}
            <style jsx>
            {
              ` input[type="checkbox"] {
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
              

              `
            }
            </style>
          </div>
         
    );
};

export default OrderList