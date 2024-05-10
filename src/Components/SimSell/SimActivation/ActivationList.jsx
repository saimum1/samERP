import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../Context/AuthInfo.jsx";
import {useDisclosure} from "@chakra-ui/react";
import axios from "axios";
import config from "../../../config.jsx";
import AddAgentReques from "../../Users/AgentRequest/AddAgentReques.jsx";
import AlertBox from "../../AlertBox/AlertBox.jsx";
import LoadingSoS from "../../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../../PopNotification/Popnotification.jsx";
import {
    Card,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    Title
} from "@tremor/react";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import {SearchIcon} from "@heroicons/react/outline";
import Dropdown from "../../Dropdown/Dropdown.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import NewEditOption from "../../EditFunctionality/NewEditOption.jsx";
import Nodatafound from "../../NoDataFound/Nodatafound.jsx";
import moment from "moment";
import CustomEditors from "../../EditFunctionality/CustomEditors.jsx";
import ViewClientInfo from '../ViewClient/ViewClientInfo.jsx';


const ActivationList = () => {
    const { user , token } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen , onOpen, onClose } = useDisclosure()
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [selected, setSelected] = useState([]);
    const [selectedItem, setselecteditem] = useState({});
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [nodata, setNodata] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [actiontype,setactiontype]=useState(false)
    const [filterOpen, setFilterOpen] = useState(false);
    const [now , setNow] = useState('')
    const [preview , setPreview] = useState(false)
    const [searchText , setSearchText] = useState('')
    const { isOpen : isClientOpen, onOpen: onClientOpen, onClose: onClientClose } = useDisclosure()

    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
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

        console.log('action cccc',e)
        if(e.type === 'edit'){
            // console.log("seleceted",selecteditem)
            // // GetSimForUpdate(selecteditem)


            setactiontype(true)
            onOpen()


        }else if(e.type === 'delete'){

            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText('Yes, Delete')
            setAlertButtonTextSecond('Cancel')
            setactiontype(false)
        }else if(e.type === 'view'){
            console.log("dsfsdfsdfsd")
            onClientOpen()
            // onAlertOpen();
            // setAlertType('')
            // setAlertText('Are you sure you want to delete this data?');
            // setAlertButtonText('Yes, Delete')
            // setAlertButtonTextSecond('Cancel')
            // setactiontype(false)
        }

    }


    const deleteOperator = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/agentRequests/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            await AgeentList()
            await onAlertClose()
            setshowpopupmsg('Delete Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        } catch (error) {
            console.error('Error deleting operator:', error);
            setshowpopupmsg('Delete Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        }
    };

    const handleSearch = async (v) => {
        try {
            setLoader(true);
            setSearchText(v);
            const response = await axios.get(`${config.apiUrl}/api/agentRequests?q=${v}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data.agentRequests);
            setTableData(response.data.agentRequests);
            setNodata(response?.data?.agentRequests.length <= 0);
            setLoader(false);
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false);
            throw error;
        }
    };
    const AgeentList = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`${config.apiUrl}/api/sales`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response: 34545dfdrr--------', response.data.SIMCards);
            setTableData(response.data.SIMCards);
            setNodata(response?.data?.SIMCards.length <= 0);
            setLoader(false);
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false);
            throw error;
        }
    };

    useEffect(() => {
        AgeentList()
    }, []);


    const getselecteditem = async (e) => {
        try {

            const datak = {
                'status' : `${e.lang.toLowerCase()}`
            }

            const response = await axios.put(`${config.apiUrl}/api/agentRequests/${selectedItem.id}`, datak, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);

            setshowpopupmsg('Status successfully Updated');
            setshowpopupstatus('success');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            onClose();
            await AgeentList()
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg('Update Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }}

    return (
        <div   className="border-none h-full w-full">
            <ViewClientInfo   isOpen={isClientOpen} onClose={onClientClose} data={selectedItem?.id} type={'activation'}/>
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType}
                      deleteId={selectedItem}
                      text={alertText} buttonText={alertButtonText}
                      seconDbuttonText={alertButtonTextSecond}
                      exFunc={deleteOperator}

            />
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>
                <div className="flex justify-between items-center mb-14">
                    <Title className="text-4xl">Agent request list</Title>
                    <div  className="flex justify-end  items-center gap-3 w-4/12">
                        <label  style={{border : '1px solid #595959', position: 'relative', display: 'inline-block', zIndex : '1' }} htmlFor="file-input" className="w-8/12 h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span onClick={() => {
            if(!filterOpen){setFilterOpen(true) }else{setFilterOpen(false)}
        }} className="flex items-center justify-between p-0">
            <span  className="flex items-center">
                <Icon size="sm" icon={SearchIcon} />{searchText === ''? 'Search' : ''}
                <input onChange={(e) => handleSearch(e.target.value) }  style={{background : 'none', outline : 'none', border : 'none'}} type='text'/>
              </span>
        </span>

                        </label>
                        <button onClick={onOpen} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-3/12">Add new</button>
                    </div>
                </div>
                <Table onClick={() =>setFilterOpen(false)} className="mt-8 h-[80vh]">
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> Serial</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Operator</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Sim number</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>ICCID number</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Order by</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Sales date</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Status</TableHeaderCell>
                            <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{height:'100%',backgroundColor:"",transition: "all 300ms"}} className='transition-all[300ms]'>
                        {tableData?.map((item, index) => (
                            <TableRow key={index} style={{borderColor:'#595959',transition: "all 300ms"}}>
                                <TableCell>
                                    <input checked={selected.includes(item.id)}
                                           onChange={() => handleSelect(item.id)}
                                           type="checkbox"
                                           id={`my-checkbox-${index}`}/>
                                    <span className="ml-2">{(index + 1).toString().padStart(2, '0')}</span>
                                </TableCell>
                                <TableCell>
                                    <Text className="flex gap-3"><img style={{height : '24px', width : '24px'}} src={`${config.apiUrl}/${item?.operator?.logoUrl}`} alt=""/> <span>{item?.operator?.name}</span> </Text>

                                </TableCell>
                                <TableCell>
                                    <Text>{item.simCardNumber}</Text>
                                </TableCell>


                                <TableCell>
                                    <Text>{item.iccidNumber}</Text>
                                </TableCell>

                                <TableCell>
                                    <Text></Text>
                                </TableCell>

                                <TableCell>
                                    <Text>{moment(item.entryDate).format(("YYYY-MM-DD"))}</Text>
                                </TableCell>

                                {user.role === 'AGENT'?
                                    <TableCell>
                                        <Text style={{color : `${item.status === 'approved'? '#27CF7A' : item.status === 'cancelled'? 'red' : '#F5F5F5'}`}}>{item.status}</Text>
                                    </TableCell> :

                                    <TableCell onClick={()=>setselecteditem(item)} style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>

                                        <div style={{width:"8rem",backgroundColor:''}}> <Dropdown dropType={'agent'} getdata={getselecteditem}  order_status={item.status}/></div>


                                    </TableCell>}

                                <TableCell>
                                    <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index !== showeditindex);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                            <CustomEditors
                                                getdata={getaction} selected={['view','delete']}/>

                                        </div>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/*<div className="max-w-sm mt-5  flex items-center">*/}
                {/*    <select style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] h-10 hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>*/}
                {/*        <option value="">*/}
                {/*            Select Status*/}
                {/*        </option>*/}
                {/*        <option value="Available">*/}
                {/*            Available*/}
                {/*        </option>*/}
                {/*        <option value="Inactive">*/}
                {/*            Inactive*/}
                {/*        </option>*/}
                {/*    </select>*/}
                {/*    <Button onClick={()=>{onAlertOpen(); setAlertType('warning'); setAlertText('Are you sure you want to change the status?'); setAlertButtonTextSecond('Cancel'); setAlertButtonText('Yes, Update')}} variant='outline'  style={{border: "1px solid #27CF7A", color: '#27CF7A', marginTop : '-0.1%'}} ml={3}>*/}
                {/*        Apply*/}
                {/*    </Button>*/}

                {/*</div>*/}
            </Card>:<Nodatafound btn_text={'Add Agent Request'}  tittle_head={'No Agent Request List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onOpen}/>}
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

export default ActivationList;