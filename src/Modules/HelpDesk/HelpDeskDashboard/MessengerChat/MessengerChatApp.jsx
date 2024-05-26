
import React, { useState ,useEffect,useRef} from 'react';
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
import {faChevronDown, faEllipsisVertical, faL, faMagnifyingGlass, faRetweet, faSearch, faSquare} from "@fortawesome/free-solid-svg-icons";
import {useDisclosure, Button} from "@chakra-ui/react";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment/moment.js";
import LoadingSoS from '../../../../Components/LoadingScreen/LoadingSoS'
import { global_css } from '../../../../GlobalCss/GlobalCSS';
import UseAvatar from './UseAvatar';
import messengericon from '../../../../assets/static/messenger.svg'
import Popnotification from '../../../../Components/PopNotification/Popnotification';
import CustomEditors from '../../../../Components/EditFunctionality/CustomEditors';
const MessengerChatApp = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loader, setLoader] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState('');
    const [lastYearList, setLastYearList] = useState([]);
    const [resData, setResData] = useState(null);
    const [postMessage, setPostMessage] = useState({});
    const [serviceTypeName, setServiceTypeName] = useState('');
    const [resTypeMsg, setResTypeMsg] = useState('');
    const [showYearData, setShowYearData] = useState(false);
    const [showMonthData, setShowMonthData] = useState(false);
    const [tokenExpiryDate, setTokenExpiryDate] = useState('');
    const [filterByMonth, setFilterByMonth] = useState(false);
    const [filterByName, setFilterByName] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [filterName, setFilterName] = useState('');
    const [managementRoleFlag, setManagementRoleFlag] = useState(false);
    const [cusLoading, setCusLoading] = useState(false);
    const [cusLoadingType, setCusLoadingType] = useState('');
    const [cusLoadingText, setCusLoadingText] = useState('');
    const [filterDataByName, setFilterDataByName] = useState([]);
    const [filterByNameDataMsg, setFilterByNameDataMsg] = useState('');
    const [apiUrl, setApiUrl] = useState('http://0.0.0.0:5000');
    const[isopen,setIsOpen]=useState(false)
    const [tokenexpirydate,settokenexpirydate]=useState(null)
    const[lastUpdate,setlastUpdate]=useState(null)
    const[lastUpdatedEmployee,setlastUpdatedEmployee]=useState(null)
    const companyId= 'cd8f6048-cb91-4017-b210-595e98c1d97d'
	const employeeId= '23424'
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const [yearTextColor, setYearTextColor] = useState('');
    const [monthTextColor, setMonthTextColor] = useState('');
    const [weekTextColor, setWeekTextColor] = useState('');
    const [dateTextColor, setDateTextColor] = useState('');

    const [id, setId] = useState('');
    const [appId, setAppId] = useState('');
    const [pageId, setPageId] = useState('');
    const [pageName, setPageName] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [grantType, setGrantType] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [search, setSearch] = useState('');
    const [beforeFilterData, setBeforeFilterData] = useState([]); // Initialize this with your actual data
    const [chat, setChat] = useState([]); // Initialize this with your actual data



    const [individualConversationsCount, setIndividualConversationsCount] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [mainChatDiv, setMainChatDiv] = useState(true);
    const [textContents, setTextContents] = useState([]);
    const [userName, setUserName] = useState('')
    const [conversationsCount, setConversationsCount] = useState(0);


    const [previousLeadInfo, setPreviousLeadInfo] = useState([]);



    const [cusloading, setCusloading] = useState(false);
    const [cusloadingtype, setCusloadingtype] = useState('');
    const [cusloadingtext, setCusloadingtext] = useState('');
    const [datatlistsp, setDatatlistsp] = useState([]);
    const [dataloadmsg, setDataloadmsg] = useState('');
    const [selectedyearx, setSelectedyearx] = useState(''); // Assuming you will set this somehow
    const [selectedmonthx, setSelectedmonthx] = useState(''); 
    const messagesEndRef = useRef(null);

    const[modal,setmodal]= useState('')
    const[modalMessageId,setmodalMessageId]= useState('')
    const[MessageIdList,setMessageIdList]= useState()
    const[NewDataList,setNewDataList]= useState()

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    const getspecificdatedata = () => {
        setCusloading(true);
        setCusloadingtype('loading');
        setCusloadingtext('messenger data is loading');
    
        axios
          .get(`${apiUrl}/api/v1/message/getdatesformessenger`, {
            params: { year: selectedyearx, month: selectedmonthx },
          })
          .then((response) => {
            const datamm = response.data.data;
            setDatatlistsp(datamm);
            setCusloading(false);
            console.log("showing data for specific month", datamm);
            if (datamm.length <= 0) {
              setDataloadmsg('no data found');
            }
          })
          .catch((error) => {
            console.log("error", error);
            setDataloadmsg('Error loading data');
            setCusloading(false);
          });
      };
    
    const getCountOfUnmarkedConversation = () => {
        console.log('getCountOfUnmarkedConversation');
        axios.get(`${apiUrl}/api/v1/message/getCountOfUnmarkedConversation`, {
          params: {}
        })
        .then((response) => {
          console.log("getCountOfUnmarkedConversation", response.data.data[0].count);
          setConversationsCount(response.data.data[0].count);
        })
        .catch((error) => {
          console.log("error", error);
          setConversationsCount(0); // Setting to 0 instead of an empty array
        });
      };
    
    

    const handleInputChange = (event) => {
        console.log(event.target);
    
        let updatedMessageIdList = [...MessageIdList];
        if (event.target.checked) {
          updatedMessageIdList.push(event.target.id);
        } else {
          updatedMessageIdList = []; // or if you want to remove specific id, use: updatedMessageIdList = updatedMessageIdList.filter(id => id !== event.target.id);
        }
        setMessageIdList(updatedMessageIdList);
        console.log(updatedMessageIdList);
    
        let updatedNewDataList = [...newDataList];
        if (event.target.checked) {
          updatedNewDataList.push({ [event.target.name]: event.target.value });
        } else {
          updatedNewDataList = []; // or if you want to remove specific data, use: updatedNewDataList = updatedNewDataList.filter(data => Object.keys(data)[0] !== event.target.name);
        }
        setNewDataList(updatedNewDataList);
        console.log(JSON.stringify(updatedNewDataList));
      };
    

    const allSelectFunction = (event) => {
        console.log("showing all data", event.target.value);
        const { target } = event;
        console.log("targeted msg", textContents, target);
    
        if (target.checked) {
          const filteredMessages = textContents.filter((item) => item.from_id === target.id);
          const MessageIdList = filteredMessages.map((item) => item.message_id);
          const newDataList = filteredMessages.map((item) => ({
            [item.from_name !== 'Sheraspace' ? `<span style="font-size: 12px;color:#adabab;margin-right:3px;">${moment(item.message_date, "ddd, DD MMM YYYY HH:mm:ss z").format("YYYY/MM/DD hh:mma")}</span>` + item.from_name :
              `<span style="font-size: 12px;color:#adabab;margin:0px 9px;">${moment(item.message_date, "ddd, DD MMM YYYY HH:mm:ss z").format("YYYY/MM/DD hh:mma")}</span>` + `Sheraspace ( ${item.employee_name})`]: `${item.message_data} `
          }));
    
          setMessageIdList(MessageIdList);
          setNewDataList(newDataList);
        } else {
          setMessageIdList([]);
          setNewDataList([]);
        }
      };
  
    const getCountOfUnmarkedIndividualConversation = () => {
        console.log('getCountOfUnmarkedIndividualConversation');
        axios.get(`${apiUrl}/api/v1/message/getCountOfUnmarkedIndividualConversation`, {
            params: {}
        }).then((response) => {
            setIndividualConversationsCount(response.data.data);
            console.log("getCountOfUnmarkedIndividualConversation", response.data.data);
        }).catch((error) => {
            console.log("error", error);
            setIndividualConversationsCount([]);
        });
    };


    const getPreviousLeadInfo = () => {
        console.log('getPreviousLeadInfo');
        axios.get(`${apiUrl}/api/v1/message/getPreviousLeadInfo`, {
            params: {}
        }).then((response) => {
            setPreviousLeadInfo(response.data.data);
            console.log("getPreviousLeadInfo", response.data.data);
        }).catch((error) => {
            console.log("error", error);
            setPreviousLeadInfo([]);
        });
    };

    const openUserMessages = (id, name) => {
        setSelectedId(id);
        setMainChatDiv(false);
        setCusLoading(true);
        setCusLoadingText(' ');
        setCusLoadingType('loading');
        
        console.log("received", id);
        axios.get(`${apiUrl}/api/v1/message/getUserMessages`, { params: { fromId: id } })
            .then((response) => {
                console.log("response user messages: ", response.data.data);
                setTextContents(response.data.data);
                setUserName(name);
                setCusLoading(false);
                // setMainChatDiv(true); // Uncomment if needed
            })
            .catch((error) => {
                console.log("error", error);
                setCusLoading(false);
            });
    };



    const handleFilterOptions = (event) => {
        console.log("You have entered", event.target.value);
        setSearch(event.target.value);

        if (event.target.value === '') {
            // Uncomment and implement getMessengerData if needed
            // getMessengerData();
            setChat(beforeFilterData);
        } else {
            const searchTerm = event.target.value.toLowerCase();
            const filteredData = chat.filter(res => 
                JSON.stringify(res).toLowerCase().includes(searchTerm)
            );
            setChat(filteredData);
            console.log("This is the search Result", filteredData);
        }
    };

    const handleEventChange = (event, type) => {
        console.log("Event and type handling", event, type);
        if (type === 'year') {
            setSelectedYear(event);
            setYearTextColor('blue');
            setMonthTextColor('');
            setWeekTextColor('');
            setDateTextColor('');
        } else if (type === 'month') {
            setSelectedMonth(event);
            setYearTextColor('');
            setMonthTextColor('blue');
            setWeekTextColor('');
            setDateTextColor('');
        } else if (type === 'week') {
            setSelectedWeek(event);
            setYearTextColor('');
            setMonthTextColor('');
            setWeekTextColor('blue');
            setDateTextColor('');
        } else if (type === 'date') {
            setSelectedDate(event);
            setYearTextColor('');
            setMonthTextColor('');
            setWeekTextColor('');
            setDateTextColor('blue');
        }
    };

    const getMessengerConfig = () => {

        let x={
            msg:'Message synced successfully',
            status:'success'
        }
        notificationopens(x)
        // setCusLoading(true);
        // setCusLoadingType('loading');
        // setCusLoadingText('Messenger is syncing...');

        // axios.get(`${apiUrl}/api/v1/batchProcess/getMessengerConfig`, { params: { companyId } })
        //     .then((response) => {
        //         console.log("get Messenger Config", response.data.data);
        //         const responseData = response.data.data;
        //         console.log("responseData.id", responseData.id);
        //         saveMessangerData(responseData.pageId, responseData.accessToken);

        //         setId(responseData.id);
        //         setAppId(responseData.appId);
        //         setPageId(responseData.pageId);
        //         setPageName(responseData.pageName);
        //         setClientSecret(responseData.clientSecret);
        //         setGrantType(responseData.grantType);
        //         setAccessToken(responseData.accessToken);
        //     })
        //     .catch((error) => {
        //         console.log("error", error);
        //     });
    };

    const saveMessangerData = (pageId, accessToken) => {
        // Implement the saveMessangerData logic here
    };
    
    const getLast4Years = () => {
        const currentYear = new Date().getFullYear();
        const currentMonthIndex = new Date().getMonth();
        const currentMonth = monthList[currentMonthIndex];
        console.log("Showing current month:", currentMonth);
        const years = Array.from({ length: 4 }, (_, index) => currentYear - index);

        setSelectedYear(currentYear);
        setSelectedMonth(currentMonth);
        setLastYearList(years);
    };

    const getCloseMsg = ({ returnActionType, res, serviceRequestType, postMessage }) => {
        if (returnActionType === "true") {
            console.log("Res message:", res);
            const autoId = { 'Auto generated id': res?.autoid };
            const d = {
                ...autoId,
                ...postMessage,
            };
            setResData(res);
            setPostMessage(d);
            setServiceTypeName(serviceRequestType);
            setResTypeMsg(res?.status);

            if (serviceRequestType === 'On-hold') {
                closePopUp('popupOnHoldServiceRequest');
                popUpChange();
            } else if (serviceRequestType === 'Service') {
                closePopUp('popupServiceRequest');
                popUpChange();
                closeActionModal();
            } else if (serviceRequestType === 'Curious') {
                console.log("Got it curious");
                closeNavSecond();
            } else if (serviceRequestType === 'spam') {
                closeNavFifth();
            } else if (serviceRequestType === 'problemincident') {
                closeNavThird();
            }
            setIsOpen(true);
        } else if (returnActionType === 'close') {
            setIsOpen(false);
        }
    };

    const showYrData = (e) => {
        console.log("Showing show data:", e);
        if (e === 'year') {
            setShowYearData(!showYearData);
            setShowMonthData(false);
        } else if (e === 'month') {
            setShowMonthData(!showMonthData);
            setShowYearData(false);
        }
    };

    const getMessengerConfigDetails = () => {
        axios
            .get(apiUrl + "/api/v1/message/getmessengercofigdetails")
            .then((res) => {
                console.log("Messenger config:", res);
                setTokenExpiryDate(res.data.data[0].token_expiry_date);
            });
    };

    const handleOptionChange = (event) => {
        console.log("Show radio result:", event.target.value);
        if (event.target.value === 'Month') {
            setFilterByMonth(true);
            setFilterByName(false);
        } else if (event.target.value === 'Name') {
            setFilterByMonth(false);
            setFilterByName(true);
        }
    };

    const handleToggleDates = (weekNumber) => {
        if (selectedWeek === weekNumber) {
            setSelectedWeek(null);
            setSelectedDate(null);
        } else {
            setSelectedWeek(weekNumber);
        }
    };

    const handleToggleDatesAndDate = (date) => {
        if (selectedDate === date) {
            setSelectedDate(null);
            console.log("Worked 'off'", date);
        } else {
            setSelectedDate(moment(date).format('YYYY-MM-DD'));
            console.log("Worked 'on'", moment(date).format('YYYY-MM-DD'));
        }
    };

    const filterData = () => {
        const filter = isInputValid(filterName);
        console.log("Showing test results:", filter, filterName);

        if (filterName === '181040') {
            setManagementRoleFlag(!managementRoleFlag);
        }

        if (filter) {
            setCusLoading(true);
            setCusLoadingType('loading');
            setCusLoadingText('Messenger data is loading');
            axios
                .get(apiUrl + "/api/v1/message/filterdaatabyname", { params: { 'name': filterName } })
                .then((response) => {
                    const data = response.data.data;
                    setFilterDataByName(data);
                    setCusLoading(false);
                    console.log("Showing data for filter name:", data, filterName);
                    if (data.length <= 0) {
                        setFilterByNameDataMsg('No data found');
                    }
                })
                .catch((error) => {
                    console.log("Error:", error);
                    setFilterByNameDataMsg([]);
                });
        } else {
            setFilterByNameDataMsg('Please input a valid name');
            setFilterDataByName([]);
        }
    };

    const isInputValid = (input) => {
        const validPattern = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~`|\\\/\- \u0980-\u09FF]+$/;
        const containsNonWhitespace = /^(?!\s*$)/.test(input);
        return validPattern.test(input) && containsNonWhitespace;
    };

    const countWeekData = (data) => {
        console.log("Data for count week:", data);
        let count = 0;
        if (data && Array.isArray(data.datewithdata)) {
            data.datewithdata.forEach((item) => {
                if (item.data && Array.isArray(item.data)) {
                    count += item.data.length;
                }
            });
        }
        return count;
    };



 



    const getBatchProcessData = () => {
		console.log("getBatchProcessData,,,,,,,,,,,,,");
		axios
			.get(apiUrl + "/api/v1/message/batchProcess", {
				params: { employeeId: employeeId, companyId: companyId, },
			})
			.then((response) => {
				console.log("response batchprocess: ", response.data.data[0].created_date_str);
                setlastUpdate( response.data.data[0].created_date_str)
                setlastUpdatedEmployee(response.data.data[0].employee_name)
			
			})
			.catch((error) => {
				console.log("error", error);
				// this.setState({chat: []});
			});
	};

    const closePopUp = (popupId) => {
        // Implement the closePopUp logic
    };

    const popUpChange = () => {
        // Implement the popUpChange logic
    };

    const closeActionModal = () => {
        // Implement the closeActionModal logic
    };

    const closeNavSecond = () => {
        // Implement the closeNavSecond logic
    };

    const closeNavFifth = () => {
        // Implement the closeNavFifth logic
    };

    const closeNavThird = () => {
        // Implement the closeNavThird logic
    };

	const getMessangerData = () => {
		console.log("getMessangerData,,,,,,,,,,,,,");
		axios
			.get(apiUrl + "/api/v1/message/getUserList", {})
			.then((response) => {
				console.log("response messenger: ", response.data.data);
                setChat(response.data.data?.slice(0, 10))
                setLoader(false)
			})
			.catch((error) => {
				console.log("error", error);
                setChat([])


			});
	};

    const showActionModal = (modalId) => {
		console.log("showActionModal", modalId);
		
        setmodal(modalId)
        setmodalMessageId(modalId)

        
	};



    const notificationopens=(e)=>{


        setshowpopupmsg(e?.msg)
        setshowpopupstatus(e?.status)
        setshowpopup(true)

        setTimeout(() => {
            setshowpopup(false)
        }, 3000);
    }



    const getaction=(e)=>{
        console.log('action',selecteditem)
        if(e.type === 'edit'){
            GetSimForUpdate(selecteditem)


                

        }else if(e.type === 'delete'){
            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText('Yes, Delete')
            setAlertButtonTextSecond('Cancel')
            setactiontype(false)
        }

    }

    useEffect(() => {
        getMessangerData();

		getBatchProcessData();
		getCountOfUnmarkedConversation()
		getCountOfUnmarkedIndividualConversation();
		getPreviousLeadInfo();
        getMessengerConfigDetails()
		getLast4Years()
     
    }, []); // Empty dependency array ensures it only runs once on mount



  return (
    <div  className="flex justify-center h-full w-full items-center md:items-start  rounded-[3px]" style={{backgroundColor:global_css.mainPageFrontColor
    }}>

    {loader &&  <LoadingSoS  /> }
          {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 


  

    <div   style={{width:"100%",height:"100%",backgroundColor:global_css.mainPageFrontColor,color:global_css.primary_txt_color}} className=" rounded-[3px]">	
								<div className="main__chatbody"   style={{width:"100%",height:"100%",display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
									<div className="main__chatlist" style={{height:"100%",borderRight:`1px solid ${global_css.secondary_txt_color}`,flex:2}}> 
													<div  style={{display:"flex",width:'100%',justifyContent:'flex-start',alignItems:'center'}}>
														<span style={{fontSize:'18px',fontWeight:'600'}}>Chat App</span>
                                                        <span>   
                                                             <img src={messengericon} style={{ height: "18px", width: "18px", position: "relative", top: "0px", marginLeft: "8px", marginBottom: "0px", }}/></span>
													</div>
										<div style={{display:'flex' ,flexDirection:'column' ,paddingLeft:'' ,backgroundColor:'' ,marginTop:"4px" ,gap:'14px',fontSize:'12px'}}>
														<div style={{display:'flex' ,justifyContent:'flex-start' ,alignItems:'center' }}>
															<span style={{color:global_css.secondary_txt_color}}>Api token expire date : <span style={{color:'#FF5555' ,fontSize:'13px'}}>{tokenexpirydate && moment(tokenexpirydate).format('DD-MMM-YYYY')} </span></span>
														</div>


														<div style={{display:'flex' ,justifyContent:'flex-start' ,alignItems:'center' }}>
															<span style={{color:global_css.secondary_txt_color}}>Syncronized : <span >{lastUpdatedEmployee && moment(lastUpdate).add(6,'hours').format("YYYY/MM/DD h:mma")} </span></span>
														</div>

														<div>
															<p style={{ fontSize: "14px" ,display:'flex',justifyContent:'space-between',color:global_css.secondary_txt_color}}>
																Conversations 
																	121
																	

													<FontAwesomeIcon 
                                                    onClick={() => getMessengerConfig()}
                                                     title="Click to Refresh" icon={faRetweet} style={{ width: "25px", color: global_css.primary_txt_color, cursor: "pointer" }} /> 

																</p>


														</div>

														<div style={{display:"flex" ,flexDirection:"column" }}>
															
														

															<div style={{display:'flex' ,fontSize:'12px' ,justifyContent:'center' ,alignItems:'center' ,width:"100%"}}>
															<div style={{width:'5%' ,backgroundColor:'grey' ,height:'1px'}}></div>
																
															<div style={{width:'33.33%'}}>Search by</div>
															<div style={{width:'10%' ,backgroundColor:'grey' ,height:'1px'}}></div>
																	<div style={{display:"flex",gap:'2px' ,justifyContent:'center' ,alignItems:'center' ,textAlign:'center' ,width:'33.33%' ,height:'100%'}}>
																	<input type="radio" id="Name" name="filteroption" value="Name"  style={{width:'13px',color:global_css.primary_txt_color}} onChange={handleOptionChange}/>
																	 <label for="html" style={{paddingBottom:'8px'}}>Name</label>
																	 </div>
 


																	 <div style={{display:"flex",gap:'2px' ,justifyContent:'center' ,alignItems:'center' ,textAlign:'center' ,width:'33.33%' ,height:'100%'}}>
																	<input type="radio" id="Month" name="filteroption" value="Month"   style={{width:'13px',color:global_css.primary_txt_color}} onChange={handleOptionChange} checked={filterByMonth === true}/>
																	 <label for="html" style={{paddingBottom:'8px'}}>Month</label>
																	 </div>

																	
															</div>
														</div>
												</div>

												
										

										{filterByName === true ? 
										<div className="chatList__search" style={{display:'flex' ,justifyContent:'center' ,alignItems:'center',gap:'4px'}}>
											<div  style={{flex:'100%'}}>
												<input type="text"  
                                                // value={filterByName}
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
                                                        filterData();
													}
												  }}
												// onChange={(e)=> setFilterByName(e.target.value)}
												placeholder="Search Here"   style={{height:'1.5rem',color:'black',width:'100%',paddingLeft:'3px'}} />

											</div>
											<div style={{flex:'2%' ,cursor:'pointer'}} onClick={()=>filterData()}>
											<FontAwesomeIcon
											className="search-btn"
													style={{ height: "12px" }}
													title="Search"
													icon={faSearch}
												/>
												</div>
										</div> : null}

{/* -----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------- */}
										{/* here all new functiollatuies and ui is starting , changes by saimum */}

										<div className="chatList__search" style={{marginTop:'4px' ,display:'flex' ,flexDirection:'column' ,gap:'4px'}}>
											
											
											{filterByMonth === true ?  

										
												<div style={{display:"flex" ,width:"100%",color:'black',fontSize:'12px',gap:'4px' }}>
												   <select
														style={{ width: '100%', height: '1.3rem', borderRadius: '5px',color:yearTextColor }}
														value={selectedYear}
														onChange={(event) => handleEventChange(event.target.value, 'year')}>
                                                            
														{lastYearList?.map((year) => (
															<option key={year} value={year}>
															{year} 
															</option>
														))}
														</select>

													<select
														style={{ width: '100%', height: '1.3rem', margin:'0px 2px',borderRadius: '5px',color:monthTextColor }}
														value={selectedMonth}
														onChange={(event) =>handleEventChange(event.target.value, 'month')}
														>
														{monthList?.map((month) => (
															<option key={month} value={month}>
															{month}
															</option>
														))}
														</select>

														<div style={{cursor:'pointer'}}>
											{/* <FontAwesomeIcon
											className="search-btn"
													style={{ height: "12px" }}
													onClick={() => getspecificdatedata()}
													title="Search"
													icon={faSearch}
												/> */}
                                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:global_css.primary_txt_color}} onClick={() => getspecificdatedata()}/>
												</div> 

													</div>: null

															}
										</div>



			


                                        <div className="chatlist__items"  style={{width:'100%'}}>
											
                                            {chat?.map((item, key) => (
                                                <div style={{borderBottom:`1px solid ${global_css.secondary_txt_color}` ,width:'100%'}}
                                                    onClick={() => openUserMessages(item.from_id,item.from_name,)}
                                                    value={item.from_id}
                                                    // style={{
                                                    //     animationDelay: `0.${this.props.animationDelay}s`,
                                                    // }}
                                                    className={`chatlist__item  ${
                                                        selectedId==item.from_id ? "active" : ""
                                                    } `}	
                                                >
                                                    <div className="userMeta" value={item.from_id} >
                                                        <p style={{display:'flex',color:global_css.primary_txt_color}} >
                                                        {previousLeadInfo.map((i) => {
                                                            if (i.from_id == item.from_id) {
                                                            return(
                                                                <span title={'Phone:' + i.mobile_country_code + i.phone + ', Employee Name:' + i.employee_name }  style={{float:'left'}}>
                                                                    <UseAvatar cycle={i.cycle_type_name } />
                                                                </span>
                                                            )}})}	
                                                            {item.from_name}{individualConversationsCount.map((i) => {
                                                            if (i.from_id == item.from_id) {
                                                            return(
                                                                <p style={{position:'relative',color:global_css.primary_txt_color}} >({i.count})</p>
                                                            )}})}
                                                        </p>
                                                        <span className="activeTime" style={{color:global_css.secondary_txt_color}}>
                                                            {moment(item.updated_time).format( "YYYY/MM/DD h:mma", )}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))} 
                                        </div>



  




								



									</div>

                                    <div style={{flex:9,height:'100%'}}>
									{mainChatDiv == false? 
									<>
										{/* Chat Content Area */}
									<div className="main__chatcontent" >
									<div className="content__header">
										<div className="blocks">
											<>
												<div className="current-chatting-user">
													<p style={{color:global_css.primary_txt_color}}>
														<strong>{userName}</strong>
													</p>
												</div>
											</>
										</div>

										<div className="blocks">
											<div className="settings">
											<input
												style={{height: "20px", width: '20px'}}
												title="Click to select all messages"
												// name={item.from_name!=='Sheraspace'?item.from_name:item.employee_name}
												// disabled={item.is_service_request==true?true:item.is_on_hold_service_request==true?true:item.is_curious==true?true:item.is_problem==true?true:item.is_incident==true?true:item.is_junk==true?true:null}
												type="checkbox"
												id={selectedId}
												// id={item.message_id}
												// checked={this.state.MessageIdList.find((ch) => ch === item.message_id)}
												// value={(JSON.parse(item.message_data))}
												// message={JSON.parse(item.message_data)}
												onChange={(e) => allSelectFunction(e)} 
												/>
											</div>
										</div>
									</div>
									<div className="content__body">
										<div className="chat__items">
											<div
												style={{ animationDelay: `0.8s` ,paddingTop:'15px' }}
												className={`chat__item}`}
											>
												{textContents.map((item,index) => {
													if (item.from_name !== "Sheraspace") {
														return (
															<div item xs={12} style={{paddingTop:'12px'}}>
																<div className="chat__item other">
																<div item xs={10}>
																<div className="chat__item__content">
																		<div className="chat__msg" >
																			{item.is_service_request==true? <span style={{marginTop: '-3%', position: 'absolute', marginLeft: '74%'}} ><img src={''} className={card.actionIcon} title="Service Request"
																								style={{width: "14px", color: "#545353", marginRight: "8px", marginTop:"0px", cursor: "pointer"}}></img></span>:null}
																			{item.is_curious==true? <span style={{marginTop: '8%', position: 'absolute', marginLeft: '74%'}} ><img src={''} className={card.actionIcon} title="Curious"
																								style={{width: "14px", color: "#545353", marginRight: "8px", marginTop:"0px", cursor: "pointer"}}></img></span>:item.is_junk==true? <span style={{marginTop: '0%', position: 'absolute', marginLeft: '74%'}} ><FontAwesomeIcon className={card.actionIcon} title="Junk"
																								icon={faTrashAlt} style={{marginTop: "10px", width: "13px", color: "rgb(0 0 0)", marginRight: "8px", cursor: "pointer"}}></FontAwesomeIcon></span>:null}
																			{item.is_problem==true? <span style={{marginTop: '4%', position: 'absolute', marginLeft: '74%'}} ><img src={''} className={card.actionIcon} title="Problem"
																								style={{width: "14px", color: "#545353", marginRight: "8px", marginTop:"0px", cursor: "pointer"}}></img></span>:null}
																			{item.is_incident==true? <span style={{marginTop: '-1%', position: 'absolute', marginLeft: '74%'}} >
                                                                                {/* <FontAwesomeIcon className={card.actionIcon} title="Incident"
																									icon={faExclamationCircle} style={{marginTop: "10px", width: "13px", color: "rgb(0 0 0)", marginRight: "8px", cursor: "pointer"}}></FontAwesomeIcon> */}
                                                                                                    
                                                                                                    </span>:null}
																			{item.is_on_hold_service_request==true? <span style={{marginTop: '-1%', position: 'absolute', marginLeft: '74%'}} >
                                                                                {/* <FontAwesomeIcon className={card.actionIcon} title="On Hold Service Request"
																									icon={faPause} style={{marginTop: "0px", width: "13px", color: "rgb(0 0 0)", marginRight: "8px", cursor: "pointer"}}></FontAwesomeIcon> */}
                                                                                                    </span>:null}
																			
																			<p><span dangerouslySetInnerHTML={{__html: JSON.parse(item.message_data).replace(/(https?:\/\/[^\s]+)/g,"<a href='$1' target='_blank' style='text-decoration: underline; word-break:break-all; color: #ef5359;' >$1</a>")}}/></p>
																			{/* <p>{JSON.parse(item.message_data).replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>')}</p> */}
																			{item.attachment_url ? (<img style={{ height: "200px", width: "100%", objectFit:'contain'}} src={item.attachment_url}></img>) : null}
																			
																		</div>
																		<div className="chat__meta">
																			<span>
																				{moment(item.message_date).format( "YYYY/MM/DD h:mma ", )}
																			</span>
																		</div>
																	</div>
																</div>
																<div item xs={1}>
																<input
																	style={{height: "20px", width: '20px', marginBottom: "119%",margin:'0 .5rem'}}
																	name={item.from_name!=='Sheraspace'?item.from_name:item.employee_name}
																	disabled={item.is_service_request==true?true:item.is_on_hold_service_request==true?true:item.is_curious==true?true:item.is_problem==true?true:item.is_incident==true?true:item.is_junk==true?true:null}
																	// disabled={true}
																	type="checkbox"
																	id={item.message_id}
																	checked={MessageIdList?.find((ch) => ch === item.message_id)}
																	value={JSON.parse(item.message_data)}
																	message={JSON.parse(item.message_data)}
																	// checked={this.state.isGoing}
																	// {(e) => this.handleCheckboxForStyleSave(e, style)}
																	onChange={(e) =>handleInputChange(e)} />
																</div>
																	
																</div>
															</div>
														);
													} else {
														return (
															<div item xs={12} style={{paddingTop:'2%'}}>
															<div className="chat__item me">
																<div item xs={1}>
																	<input
																		style={{height: "20px", width: '20px', marginBottom: "104%", marginLeft:"-16%"}}
																		name={item.from_name!=='Sheraspace'?item.from_name:item.employee_name}
																		disabled={item.is_service_request==true?true:item.is_on_hold_service_request==true?true:item.is_curious==true?true:item.is_problem==true?true:item.is_incident==true?true:item.is_junk==true?true:null}
																		type="checkbox"
																		id={item.message_id}
																		checked={MessageIdList?.find((ch) => ch === item.message_id)}
																		value={(JSON.parse(item.message_data))}
																		message={JSON.parse(item.message_data)}
																		// checked={this.state.isGoing}
																		onChange={(e) =>handleInputChange(e)} />
																</div>
																<div item xs={1} style={{marginBottom: "4%" ,marginRight:'2%',padding:'0 4px'}}>
																<div className="moreOptions" >
																		<span>
																		<div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                                                                {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                                                                    {/* <Editopstions
                                                                                        getdata={getaction} edittext={'Edit'}/> */}
                                                                                        <CustomEditors
                                                                                        getdata={getaction} selected={['edit']}/>

                                                                                </div>}
                                                                            </div>
																		</span>

																		<div className="chat__item__action"></div>
																	</div>
																</div>
																
															
																
																<div item xs={10}>
																<div className="chat__item__content">
																	<div className="chat__msg">
																	{item.is_service_request==true? <span style={{marginTop: '-3%', position: 'absolute', marginLeft: '-7%'}} ><img src={serviceRequestImg} className={card.actionIcon} title="Service Request"
																								style={{width: "14px", color: "#545353", marginRight: "8px", marginTop:"0px", cursor: "pointer"}}></img></span>:null}
																			{item.is_curious==true? <span style={{marginTop: '0%', position: 'absolute', marginLeft: '-7%'}} ><img src={curiousImg} className={card.actionIcon} title="Curious"
																								style={{width: "14px", color: "#545353", marginRight: "8px", marginTop:"0px", cursor: "pointer"}}></img></span>:item.is_junk==true? <span style={{marginTop: '0%', position: 'absolute', marginLeft: '-7%'}} ><FontAwesomeIcon className={card.actionIcon} title="Junk"
																								icon={faTrashAlt} style={{marginTop: "10px", width: "13px", color: "rgb(0 0 0)", cursor: "pointer"}}></FontAwesomeIcon></span>:null}
																			{item.is_problem==true? <span style={{marginTop: '4%', position: 'absolute', marginLeft: '-7%'}} ><img src={problemImg} className={card.actionIcon} title="Problem"
																								style={{width: "14px", color: "#545353", marginRight: "8px", marginTop:"0px", cursor: "pointer"}}></img></span>:null}
																			{item.is_incident==true? <span style={{marginTop: '-1%', position: 'absolute', marginLeft: '-7%'}} ><FontAwesomeIcon className={card.actionIcon} title="Incident"
																									icon={faExclamationCircle} style={{marginTop: "10px", width: "13px", color: "rgb(0 0 0)", marginRight: "8px", cursor: "pointer"}}></FontAwesomeIcon></span>:null}
																			{item.is_on_hold_service_request==true? <span style={{marginTop: '-3%', position: 'absolute', marginLeft: '-7%'}} ><FontAwesomeIcon className={card.actionIcon} title="On Hold Service Request"
																									icon={faPause} style={{marginTop: "0px", width: "13px", color: "rgb(0 0 0)", marginRight: "8px", cursor: "pointer"}}></FontAwesomeIcon></span>:null}
																			
																	<p><span dangerouslySetInnerHTML={{__html: JSON.parse(item.message_data).replace(/(https?:\/\/[^\s]+)/g,"<a href='$1' target='_blank' style='text-decoration: underline; word-break: break-all;' >$1</a>")}}/></p>
																		
																		<span>Replied by {item.employee_name}</span>
																		<span></span>
																	</div>
																	<div className="chat__meta">
																		<span>
																			{moment(item.message_date).format( "YYYY/MM/DD h:mma", )}
																		</span>
																		<span></span> 
																	</div>
																</div>
																</div> 
																
															</div>

															</div>
															
														);
													}
												})}
											</div>
											<br></br>

											<div ref={messagesEndRef} />
										</div>
									</div>
								    </div>
								</>:null }	
                                </div>				
									
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





        .main__chatlist {
            padding: 0 40px 0 0px;
            
           
        }
        .chatlist__heading {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0px;
        }
      
        .chatlist__items {
            transition:all 300ms;
            width:100%;
            margin-top: 9px;
            overflow: auto;
            height:70%;

        }

      
        .chat__item me .chat__item__content {
            z-index: -1;
        }

        .chatlist__item {
            display: flex;
            padding-bottom: 10px;
            margin-top: 10px;
            cursor: pointer;
            padding: 10px;
            transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
            transform: scale(0);
            animation-name: showIn;
            animation-duration: 0.2s; /* or: Xms */
            animation-iteration-count: 1;
            animation-direction: normal; /* or: normal */
            animation-timing-function: cubic-bezier(
                0.88,
                0.19,
                0.37,
                1.11
            ); /* or: ease, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) */
            animation-fill-mode: both; /* or: backwards, both, none */
            animation-delay: 0.1s; /* or: Xms */
        }
        @keyframes showIn {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }
        .chatlist__item:first-child {
            margin-top: 0;
        }

    

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;

            margin-right: 20px;
            position: relative;
        }
        .avatar img {
            max-width: 100%;
            object-fit: cover;
        }

        .chatlist__item .userMeta {
            margin-left: 5px;
        }

        .chatlist__item .userMeta p {
            margin: 0;
            padding: 0;
            color: #000;
            font-weight: 600;
            font-size: 14px;
        }
        .chatlist__item .userMeta span {
            margin: 0;
            padding: 0;
            color: #ceccd3;
            font-weight: 400;
            font-size: 12px;
            display: block;
        }


        .chatlist__item:hover,
        .chatlist__item.active {
            background: #2F423F;
            border-radius: 10px;
        }

        .isOnline {
            position: absolute;
            width: 10px;
            height: 10px;
            position: absolute;
            bottom: 0;
            right: 0;
            background-color: #ddd;
            border-radius: 50%;
            border: 2px solid #fff;
        }
        .isOnline.active {
            background-color: tomato;
        }
        .avatar-img {
            overflow: hidden;
            border-radius: 50%;
            width: 100%;
            height: 100%;
        }

        i.fa.fa-check-circle-o {
            margin-right: 10px;
        }

        .main__chatcontent {
           
            padding: 20px 40px;
            width: 100%;
            border-right: 1px solid ${global_css.secondary_txt_color};
            position: relative;
        }
        .content__header {
            padding-bottom: 15px;
            border-bottom: 1px solid  ${global_css.secondary_txt_color};
        }
        .current-chatting-user {
            display: flex;
            align-items: center;
        }
        .current-chatting-user p {
            margin: 0;
            font-weight: 600;
        }
        .content__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .settings .btn-nobg {
            color: #000;
        }
        .content__body {
            max-height: calc(100vh - calc(70vh / 2));
            overflow: auto;
        }
        .chat__item {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            margin-bottom: 15px;
            transition: all 0.3s ease;
            transform: scale(0);
            transform-origin: right;
            animation-name: showIn;
            animation-duration: 0.2s; /* or: Xms */
            animation-iteration-count: 1;
            animation-direction: normal; /* or: normal */
            animation-timing-function: cubic-bezier(
                0.88,
                0.19,
                0.37,
                1.11
            ); /* or: ease, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) */
            animation-fill-mode: both; /* or: backwards, both, none */
            animation-delay: 0.2s; /* or: Xms */
        }
        @keyframes showIn {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .chat__item__content {
            background-color: #4462ff;
            color: #fff;
            padding: 10px;
            border-radius: 10px 10px 0 10px;
            width:100%;
            font-size: 12px;
        }

        .chat__item other {
            top: 20px;
            right: 20px;
        }

        .chat__item__content .chat__meta {
            justify-content: space-between;
            display: flex;
            margin-top: 10px;
        }
        .chat__item__content .chat__meta span {
            font-size: 14px;
            color: #8693d3;
            user-select: none;
        }

        .chat__item.me .chat__item__content .chat__msg p {
            // overflow-wrap: break-word;
            font-size: 14px;
            color: #fff;
        }

        .chat__item.other .chat__item__content .chat__msg p {
            overflow-wrap: break-word;
            font-size: 14px;
            color: #000000;
        }

        .chat__item.other {
            transform-origin: left;
        }
        .chat__item.other .chat__item__content {
            background-color: #fff;
            color: #000;
            border-radius: 10px 10px 10px 0;
          
        }
        .chat__item.other .avatar {
            margin-right: 20px;
            margin-left: 0px;
        }
        .chat__item.other .chat__item__content .chat__meta span {
            color: #d1d1d1;
        }
        .content__footer {
            padding-top: 285px;
        }
        .sendNewMessage {
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-radius: 8px;
        }
        .sendNewMessage button {
            width: 36px;
            height: 36px;
            background-color: #ecefff;
            border: none;
            box-shadow: none;
            outline: none;
            cursor: pointer;
            font-size: 16px;
            color: #4665ff;
            padding: 0;
            border-radius: 5px;
            line-height: 36px;
            transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
        }
        .sendNewMessage button:hover {
            transform: scale(1.2);
        }
        .sendNewMessage button i {
            display: block;
        }
        .sendNewMessage input {
            flex-grow: 1;
            padding: 0 15px;
            background-color: transparent;
            border: none;
            outline: none;
        }
        #sendMsgBtn {
            background-color: #3b5bfe;
            color: #fff;
        }

        .main__chatbody {
            // background-color: #f4f3f8;
            border-radius: 10px;
            padding: 15px 22px;
            display: flex;
            // font-color: #f4f3f8;
        }

      

        `}
    </style>
</div>
  )
}

export default MessengerChatApp