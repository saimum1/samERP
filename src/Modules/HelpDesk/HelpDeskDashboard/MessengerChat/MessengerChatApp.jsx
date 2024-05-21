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
const MessengerChatApp = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loader, setLoader] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');


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
        setCusLoading(true);
        setCusLoadingType('loading');
        setCusLoadingText('Messenger is syncing...');

        axios.get(`${apiUrl}/api/v1/batchProcess/getMessengerConfig`, { params: { companyId } })
            .then((response) => {
                console.log("get Messenger Config", response.data.data);
                const responseData = response.data.data;
                console.log("responseData.id", responseData.id);
                saveMessangerData(responseData.pageId, responseData.accessToken);

                setId(responseData.id);
                setAppId(responseData.appId);
                setPageId(responseData.pageId);
                setPageName(responseData.pageName);
                setClientSecret(responseData.clientSecret);
                setGrantType(responseData.grantType);
                setAccessToken(responseData.accessToken);
            })
            .catch((error) => {
                console.log("error", error);
            });
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


  
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>


    <div id="mainDiv" className="mainDiv" style={{width:"100%",height:"100%"}}>
					<div container style={{ margin: "62px 0px 40px 0px" }}>
						

						<div item xs={10}>
							<div className="__main">
								<div className="main__chatbody"   style={{boxShadow:'1px 1px 1rem #b5a8a8'}}>
									<div className="main__chatlist"> 
										<div container spacing={24}>
											
												<div item xs={12} style={{ marginTop: "16px"}} >
													<div className="app__name" style={{display:"flex"}}>
													
														<p style={{ marginTop: "0px", marginBottom: "0px", fontSize: '20px', top: "0px", bottom: "0px" }}> <b>Chat App</b>
                                                        <img src={messengericon} style={{ height: "18px", width: "18px", position: "relative", top: "0px", marginLeft: "8px", marginBottom: "0px", color: "#006AFF", }}/>
                                                        
                                                            {/* <FontAwesomeIcon icon={faFacebookMessenger} style={{ height: "18px", width: "18px", position: "relative", top: "0px", marginLeft: "8px", marginBottom: "0px", color: "#006AFF", }} /> */}
														</p>
													</div>
												</div>

												
											
										</div>


										<div style={{display:'flex' ,flexDirection:'column' ,paddingLeft:'' ,backgroundColor:'' ,marginTop:"4px" ,gap:'4px',fontSize:'12px'}}>
														<div style={{display:'flex' ,justifyContent:'flex-start' ,alignItems:'center' }}>
															<span>Api token expire date : <span style={{color:'#FF5555' ,fontSize:'13px'}}>{tokenexpirydate && moment(tokenexpirydate).format('DD-MMM-YYYY')} </span></span>
														</div>


														<div style={{display:'flex' ,justifyContent:'flex-start' ,alignItems:'center' }}>
															<span>Last data syncronize : <span >{lastUpdatedEmployee && moment(lastUpdate).add(6,'hours').format("YYYY/MM/DD h:mma")} </span></span>
														</div>

														<div>
															<p style={{ fontSize: "14px" ,display:'flex',justifyContent:'space-between'}}>
																	<b>Conversations 
																	'll'
																		</b>

													<FontAwesomeIcon onClick={() => getMessengerConfig()} title="Click to Refresh" icon={faRetweet} style={{ width: "25px", color: "black", cursor: "pointer" }} /> 

																</p>


														</div>

														<div style={{display:"flex" ,flexDirection:"column" }}>
															
														

															<div style={{display:'flex' ,fontSize:'12px' ,justifyContent:'center' ,alignItems:'center' ,width:"100%"}}>
															<div style={{width:'5%' ,backgroundColor:'grey' ,height:'1px'}}></div>
																
															<div style={{width:'33.33%'}}>Search by</div>
															<div style={{width:'20%' ,backgroundColor:'grey' ,height:'1px'}}></div>
																	<div style={{display:"flex" ,justifyContent:'center' ,alignItems:'center' ,textAlign:'center' ,width:'33.33%' ,height:'100%'}}>
																	<input type="radio" id="Name" name="filteroption" value="Name"  style={{width:'13px'}} onChange={handleOptionChange}/>
																	 <label for="html" style={{paddingBottom:'4px'}}>Name</label>
																	 </div>



																	 <div style={{display:"flex" ,justifyContent:'center' ,alignItems:'center' ,textAlign:'center' ,width:'33.33%' ,height:'100%'}}>
																	<input type="radio" id="Month" name="filteroption" value="Month"   style={{width:'13px'}} onChange={handleOptionChange} checked={filterByMonth === true}/>
																	 <label for="html" style={{paddingBottom:'4px'}}>Month</label>
																	 </div>

																	
															</div>
														</div>
												</div>

												
										

										{filterByName === true ? 
										<div className="chatList__search" style={{display:'flex' ,justifyContent:'center' ,alignItems:'center'}}>
											<div className="search_wrap" style={{flex:'100%'}}>
												<input type="text"  value={filterByName}
												// onChange={(event) =>handleFilterOptions(event)} 
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
                                                        filterData();
													}
												  }}
												onChange={(e)=> setFilterByName(e.target.value)}
												placeholder="Search Here" required  style={{height:'0.8rem'}} />

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

										
												<div style={{display:"flex" ,width:"100%" }}>
												   <select
														style={{ width: '100%', height: '1.2rem', borderRadius: '5px',color:yearTextColor }}
														value={selectedYear}
														onChange={(event) => handleEventChange(event.target.value, 'year')}>
                                                            
														{lastYearList?.map((year) => (
															<option key={year} value={year}>
															{year} 
															</option>
														))}
														</select>

													<select
														style={{ width: '100%', height: '1.2rem', margin:'0px 2px',borderRadius: '5px',color:monthTextColor }}
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
                                                <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => getspecificdatedata()}/>
												</div> 

													</div>: null

															}
										</div>



			


                                        <div className="chatlist__items">
											
                                            {chat?.map((item, key) => (
                                                <div
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
                                                        <p style={{display:'flex'}} >
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
                                                                <p style={{position:'relative'}} >({i.count})</p>
                                                            )}})}
                                                        </p>
                                                        <span className="activeTime">
                                                            {moment(item.updated_time).format( "YYYY/MM/DD h:mma", )}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))} 
                                        </div>



  




								



									</div>
									{mainChatDiv == false? 
									<>
										{/* Chat Content Area */}
									<div className="main__chatcontent">
									<div className="content__header">
										<div className="blocks">
											<>
												<div className="current-chatting-user">
													<p>
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
												{textContents.map((item) => {
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
																<div item xs={1} style={{marginBottom: "8%"}}>
																<div className="moreOptions" >
																		<span>
																			<img src={'moreOptions'} onClick={() => showActionModal( item.message_id, ) } title="More options" style={{ cursor: "pointer", color: "#545353", height: '32px', }}></img>
																			{modal === item.message_id ? (
																				// <>
																				// 	<div
																				// 		onClick={() => this.closeActionModal() }
																				// 		style={{ position: "fixed", width: "100%", height: "100%", zIndex: "1", transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 153ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", transform: "scale(1, 1) translateZ(0px)", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", }}
																				// 	/>
																				// 	<div
																				// 		className={card.actionPopupCss}
																				// 		style={{ top: "-2rem", right: "75px", width: "fit-content",position:'fixed'}}
																				// 	>
																				// 		<p
																				// 			onClick={()=> {openPopUpDynamic('popupServiceRequest', 93); this.popUpChange(); this.onHoldServiceRequestData(item.from_name, item.message_id, JSON.parse(item.message_data), item.from_id ,item.message_date);}}
																				// 			className={card.actionIconHover}
																				// 			style={{ textAlign: "left", marginTop: "0px", marginBottom: "-2px", fontSize: "12px", }}
																				// 		>
																				// 			<span className={card.actionIcon} >
																				// 				<img src={serviceRequestImg} className={card.actionIcon} title="Service Request" style={{ width: "14px", color: "#545353", marginRight: "8px", marginTop:"0px", cursor: "pointer", }}></img>
																				// 				Service Request
																				// 			</span>
																				// 		</p>
																				// 		<p
																				// 			onClick={()=> {openPopUpDynamic('popupOnHoldServiceRequest', 93); this.popUpChange(); this.onHoldServiceRequestData(item.from_name, item.message_id, JSON.parse(item.message_data), item.from_id,item.message_date);}}
																				// 			className={card.actionIconHover}
																				// 			style={{ textAlign: "left", marginBottom: "2px", marginTop: "0", fontSize: "12px", }}
																				// 		>
																				// 			<span className={card.actionIcon} >
																				// 				<FontAwesomeIcon className={card.actionIcon} title="On-Hold Service Request" icon={faPause} style={{ marginTop: "10px", width: "13px", color: "#545353", marginRight: "8px", cursor: "pointer", }} />
																				// 				On-Hold Service Request
																				// 			</span>
																				// 		</p>
																				// 		<p
																				// 			onClick={() => { this.openProblemIncident(item.from_name, item.message_id, JSON.parse(item.message_data), item.from_id,item.message_date); }}
																				// 			className={card.actionIconHover}
																				// 			style={{ textAlign: "left", marginBottom: "2px", marginTop: "0", fontSize: "12px", }}
																				// 		>
																				// 			<span
																				// 				className={card.actionIcon}
																				// 			>
																				// 				<FontAwesomeIcon className={card.actionIcon} title="Incident" icon={faExclamationCircle} style={{ marginTop: "10px", width: "13px", color: "#545353", marginRight: "8px", cursor: "pointer", }} />
																				// 				Incident
																				// 			</span>
																				// 		</p>
																				// 		<p
																				// 			onClick={() => { this.openProblemIncident(item.from_name, item.message_id, JSON.parse(item.message_data), item.from_id,item.message_date); }}
																				// 			className={card.actionIconHover}
																				// 			style={{ textAlign: "left", marginBottom: "0px", marginTop: "0", fontSize: "12px", }}
																				// 		>
																				// 			<span className={card.actionIcon} >
																				// 				<FontAwesomeIcon
																				// 					className={card.actionIcon} title="Problem" icon={faExclamationTriangle} style={{ marginTop: "10px", width: "13px", color: "#545353", marginRight: "8px", cursor: "pointer",
																				// 					}}
																				// 				/>
																				// 				Problem
																				// 			</span>
																				// 		</p>
																				// 		<p
																				// 			onClick={() => {
																				// 				this.openCurious(item.from_name, item.message_id, JSON.parse(item.message_data), item.from_id,item.message_date ,item.message_data);
																				// 			}}
																				// 			className={card.actionIconHover}
																				// 			style={{ textAlign: "left", marginBottom: "0px", marginTop: "0", fontSize: "12px", }}
																				// 		>
																				// 			<span className={card.actionIcon} > <img src={curiousImg} className={card.actionIcon} title="Curious" style={{ marginTop: "5px", width: "13px", color: "#545353", marginRight: "8px", cursor: "pointer", }}></img>
																				// 				Curious
																				// 			</span>
																				// 		</p>
																				// 		<p onClick={() => { this.openSpam(item.from_name, item.message_id, JSON.parse(item.message_data), item.from_id,item.message_date); }} className={card.actionIconHover} style={{ textAlign: "left", marginBottom: "0px", marginTop: "0", fontSize: "12px", }} >
																				// 			<span className={card.actionIcon} >
																				// 				<FontAwesomeIcon className={card.actionIcon} title="Spam" icon={faTrashAlt} style={{ marginTop: "5px", width: "13px", color: "#545353", marginRight: "8px", cursor: "pointer", }} />
																				// 				Spam
																				// 			</span>
																				// 		</p>
																				// 	</div>
																				// </>

                                                                                ''
																			) : null}
																		</span>

																<div className="chat__item__action"></div>
																</div>
																</div>
																<div item xs={1}>
																<input
																	style={{height: "20px", width: '20px', marginBottom: "119%"}}
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
																		style={{height: "20px", width: '20px', marginBottom: "104%", marginLeft:"16%"}}
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
																<div item xs={1} style={{marginBottom: "3%" ,}}>
																<div className="moreOptions" >
																		<span>
																		<img src={'moreOptions'} onClick={() => showActionModal( item.message_id, ) } title="More options" style={{ cursor: "pointer", color: "#545353", height: '32px', }}></img>
																			
																			{modal ===
																			item.message_id ? (
																				<div >
																					<div
																						onClick={() => this.closeActionModal() }
																						style={{ position: "fixed", width: "100%", height: "100%", zIndex: "9999999999999999999999999999999", transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 153ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", transform: "scale(1, 1) translateZ(0px)", top: "10%", left: "0", right: "0", bottom: "0", margin: "auto", }}
																					/>
																					<div
																						className={card.actionPopupCss}
																						style={{ top: "-3%", left: "0%", minWidthwidth: "fit-content", position:'absolute',zIndex: "9999999999999999999999999999999", cursor: "pointer", }}
																					>
																						
																						<p 	onClick={() => {openEditAgent(item.from_name, item.message_id, JSON.parse(item.message_data), item.from_id); }} 
																							className={card.actionIconHover} style={{ textAlign: "left", marginBottom: "5px", fontSize: "12px", }} >
																							<span className={card.actionIcon}>
																							<FontAwesomeIcon className={card.actionIcon} title="Edit Agent" icon={faPencilAlt} style={{ width: "16px", color: "#545353", marginRight: "8px", cursor: "pointer", }} />
																								Edit Agent
																							</span>
																						</p>
																						<p 	onClick={() => { openAddLink(item.from_name, item.message_id, JSON.parse(item.message_data), item.from_id); }} 
																							className={card.actionIconHover} style={{ textAlign: "left", marginBottom: "5px", fontSize: "12px", }} >
																							<span className={card.actionIcon}>
																							<FontAwesomeIcon className={card.actionIcon} title="Add Link" icon={faLink} style={{ width: "16px", color: "#545353", marginRight: "8px", cursor: "pointer", }} />
																								Add Link
																							</span>
																						</p>
																					</div>
																				</div>
																			) : null}
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
        














        .nav {
            max-width: 100px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            padding: 0 25px;
            padding-top: 30px;
        }
        .nav img {
            display: block;
            max-width: 100%;
            cursor: pointer;
        }

        .main__chatlist {
            border-right: 1px solid #ebe7fb;
            padding: 0 40px 0 0px;
        }
        .chatlist__heading {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0px;
        }
        .btn-nobg {
            background-color: transparent;
            border: none;
            box-shadow: none;
            font-size: 18px;
            cursor: pointer;
            padding: 10px;
            color: #dad9dd;
            outline: none;
        }
        .search_wrap {
            background-color: #e6e5ea;
            border-radius: 5px;
        }
        .search_wrap input {
            background-color: transparent;
            border: none;
            padding:1px 8px;
            outline: none;
            width: 80%;
            padding-right: 0;
        }
        .search-btn {
            height: 46px;
            border: none;
            background-color: transparent;
            outline: none;
            width: 20%;
            cursor: pointer;
            font-size: 20px;
        }
        .chatlist__items {
            transition:all 300ms;
            max-width: calc(100vh - calc(100vh / 2));
            margin-top: 9px;
            overflow: auto;
            //  max-height: calc(100vh - calc(100vh / 2));
            height:100%

        }

        // .chatlist__items.expanded {
        // 	transition:all 300ms;
        // 	height: 20rem;

        // }

        .chat__item me .chat__item__content {
            z-index: -1;
        }

        .chatlist__item {
            display: flex;
            border-bottom: 1px solid #ebe7fb;
            padding-bottom: 10px;
            margin-top: 10px;
            cursor: pointer;
            padding: 10px 10px 10px 20px;
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

        .chatlist__item:hover {
            background-color: #f5f5f5;
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

        // .optionMenu{
        //   position: absolute;
        //   top: 0;
        //   right: 0;
        //   width: 40px;
        //   height: 40px;
        //   background-color: #fff;
        //   border-radius: 50%;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   cursor: pointer;
        // }

        .chatlist__item:hover,
        .chatlist__item.active {
            background: #fff;
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
            flex-grow: 1;
            padding: 20px 40px;
            max-width: 100%;
            border-right: 1px solid #ebe7fb;
            position: relative;
        }
        .content__header {
            padding-bottom: 15px;
            border-bottom: 1px solid #ebe7fb;
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
        .chat__item .avatar {
            margin-right: 0px;
            margin-left: 20px;
            background: #fff;
            padding: 1px;
        }
        .chat__item__content {
            background-color: #4462ff;
            color: #fff;
            padding: 15px;
            border-radius: 10px 10px 0 10px;
            // max-width: 75%;
            min-width: 215px;
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
            // flex-direction: row-reverse;
            transform-origin: left;
        }
        .chat__item.other .chat__item__content {
            background-color: #fff;
            color: #000;
            border-radius: 10px 10px 10px 0;
            max-width: 90%;
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
            flex-grow: 1;
            background-color: #f4f3f8;
            border-radius: 10px;
            padding: 15px 20px;
            display: flex;
        }

        .__main:hover {
            box-shadow:1px 1px 1.5rem  #97d8ef;
        }

        .__main {
            min-height: 80vh;
            width: 98%;
            border-radius: 10px;
            display: flex;
            margin-top:1rem;
        }

        .btn {
            background-color: #fff;
            border: none;
            outline: none;
            cursor: pointer;
            width: 230px;
            height: 47px;
            line-height: 47px;
            border-radius: 5px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.02);
            display: flex;
            padding: 0;
            transition: all 0.3s ease-in-out;
        }
        .btn:hover {
            background-color: #4664ff;
            color: #fff;
            transform: scale(1.02);
        }
        .btn i {
            flex: 0.2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 18px;
            border-right: 1px solid #ebe7fb;
        }
        .btn span {
            flex: 0.8;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* width */
        ::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #6c84ff;
            border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #3b5bfe;
        }

        input {
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 30px;
            padding: 0 10px;
            font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
            color: #000;
            font-size: 13px;
        }

        .square {
            height: 100px;
            width: 60px;
            background-color: #ffcc99;
            text-align: left;
            border-radius: 30px 30px 0px 0px;
            border: 1px solid black;
            text-align: center;
        }

        .circle {
            height: 40px;
            width: 40px;
            background-color: white;
            border-radius: 50%;
            margin: 10px auto 0px auto;
            border: 1px solid black;
        }

        .showMonthlyReport {
            width: 0;
            position: fixed;
            height: 250px;
            top: 0;
            right: 0;
            overflow-x: hidden;
            transition: 0.3s;
            z-index: 10000;
        }
        .showMonthlyReport .closeMonthlyReport:hover {
            color: #ffffff;
            cursor: pointer;
            background: #ff7370;
        }
        .showMonthlyReport .closeMonthlyReport {
            display: initial;
            background: #ef5350;
            padding: 6px 20px;
            border-radius: 14px 0 1px 14px;
            position: fixed;
            top: 13px;
            color: #fff;
            margin-left: -135px;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .mqlpanel {
            width: 0;
            position: fixed;
            height: 250px;
            top: 0;
            right: 0;
            overflow-x: hidden;
            transition: 0.3s;
            z-index: 10000;
        }
        .mqlpanel a {
            padding: 8px 8px 8px 32px;
            text-decoration: none;
            font-size: 18px;
            color: #818181;
            display: block;
            transition: 0.3s;
        }
        .mqlpanel a:hover {
            cursor: text;
        }
        .mqlpanel .closemql:hover {
            color: #ffffff;
            cursor: pointer;
            background: #ff7370;
        }
        .mqlpanel .closemql {
            display: initial;
            background: #ef5350;
            padding: 5px 13px;
            border-radius: 14px 0 1px 14px;
            position: fixed;
            top: 13px;
            color: #fff;
            margin-left: -135px;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .conversionpanel {
            width: 0;
            position: fixed;
            height: 250px;
            top: 0;
            right: 0;
            overflow-x: hidden;
            transition: 0.3s;
            z-index: 10000;
        }
        .conversionpanel a {
            padding: 8px 8px 8px 32px;
            text-decoration: none;
            font-size: 18px;
            color: #818181;
            display: block;
            transition: 0.3s;
        }
        .conversionpanel a:hover {
            cursor: text;
        }
        .conversionpanel .closeconversion:hover {
            color: #ffffff;
            cursor: pointer;
            background: #ff7370;
        }
        .conversionpanel .closeconversion {
            display: initial;
            background: #ef5350;
            padding: 5px 13px;
            border-radius: 14px 0 1px 14px;
            position: fixed;
            top: 13px;
            color: #fff;
            margin-left: -118px;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
            width: 100%;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
        }
        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }
        .container {
            padding: 2px 16px;
        }
        .buttonHover:hover {
            background-color: #ccc;
        }
        input[type="checkbox"]:checked {
            color: #ef5359 !important;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            background-position: right;
            background-size: 9px 9px;
            background-repeat: no-repeat;
            color: rgba(204, 204, 204, 0);
            padding-left: 0;
            margin-left: 0;
        }
        input[type="time"]::-webkit-calendar-picker-indicator {
            background-position: right;
            background-size: 9px 9px;
            background-repeat: no-repeat;
            color: rgba(204, 204, 204, 0);
            padding-left: 0;
            margin-left: 0;
        }
        .template:hover {
            background: #ccc;
        }
        .address {
            border: 0;
            border-bottom: 2px solid;
            background: transparent;
            width: 100%;
            color: #b5cded;
        }
        .suggestion:hover {
            background: #eeeeee !important;
        }
        .repectOn {
            width: 20px;
            float: left;
            text-align: center;
            border: 1px solid #dadce0;
            border-radius: 50%;
            background: #dadce0;
            font-size: 12px;
            height: 18px;
            margin-right: 7px;
        }
        .saveButton {
            padding: 5px;
            font-size: 14px;
            background: #ef5357;
            color: white;
            border: 1px solid #ef5357;
            border-radius: 3px;
            width: 80%;
            height: 30px;
        }
        .addButton {
            padding: 7px;
            font-size: 12px;
            background: white;
            color: #4f4545;
            border: 1px solid #9f9c9c;
            border-radius: 3px;
        }
        .addButton:hover {
            background: #dfdfdf;
        }

        /* popupdivFirst CSS*/
        .popupContent {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupDivFirst {
            width: 0;
            right: 0;
            margin: -12px;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            position: fixed;
            height: 100%;
            overflow-x: hidden;
            transition: 0.5s;
            margin-top: -63px;
            z-index: 999;
        }
        .popupCloseOptionFirst {
            flex-grow: 0;
            max-width: 12%;
            flex-basis: 12%;
            background: transparent;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .closebtnFirst {
            background: #ef5359;
            font-size: 14px;
            // margin-left: -31px;
            margin-top: 0;
            padding: 5px;
            color: white;
            border-radius: 20px;
            position: fixed;
            width: 100%;
            cursor: pointer;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
            z-index: -1; 
        }
        .popupContentFirst {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 9999;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }

        // popupDivSecond
        /* popupdivSecond CSS*/
        .popupContent {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupDivSecond {
            width: 0;
            right: 0;
            margin: -12px;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            position: fixed;
            height: 100%;
            overflow-x: hidden;
            transition: 0.5s;
            margin-top: -63px;
            z-index: 999;
        }
        .popupCloseOptionSecond {
            flex-grow: 0;
            max-width: 12%;
            flex-basis: 12%;
            background: transparent;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .closebtnSecond {
            background: #ef5359;
            font-size: 14px;
            // margin-left: -31px;
            margin-top: 0;
            padding: 5px;
            color: white;
            border-radius: 20px;
            position: fixed;
            width: 100%;
            cursor: pointer;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupContentSecond {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        // popupDivFifth
        /* popupdivFifth CSS*/
        .popupContent {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupDivFifth {
            width: 0;
            right: 0;
            margin: -12px;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            position: fixed;
            height: 100%;
            overflow-x: hidden;
            transition: 0.5s;
            margin-top: -63px;
            z-index: 999;
        }
        .popupCloseOptionFifth {
            flex-grow: 0;
            max-width: 12%;
            flex-basis: 12%;
            background: transparent;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .closebtnFifth {
            background: #ef5359;
            font-size: 14px;
            // margin-left: -31px;
            margin-top: 0;
            padding: 5px;
            color: white;
            border-radius: 20px;
            position: fixed;
            width: 100%;
            cursor: pointer;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupContentFifth {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }

        // popupDivThird
        /* popupdivThird CSS*/
        .popupContent {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupDivThird {
            width: 0;
            right: 0;
            margin: -12px;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            position: fixed;
            height: 100%;
            overflow-x: hidden;
            transition: 0.5s;
            margin-top: -63px;
            z-index: 999;
        }
        .popupCloseOptionThird {
            flex-grow: 0;
            max-width: 12%;
            flex-basis: 12%;
            background: transparent;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .closebtnThird {
            background: #ef5359;
            font-size: 14px;
            // margin-left: -31px;
            margin-top: 0;
            padding: 5px;
            color: white;
            border-radius: 20px;
            position: fixed;
            width: 100%;
            cursor: pointer;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
            z-index: -1; 
        }
        .popupContentThird {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 9999;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }


        // popupDivFourth
        /* popupdivFourth CSS*/
        .popupContent {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupDivFourth {
            width: 0;
            right: 0;
            margin: -12px;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            position: fixed;
            height: 30%;
            overflow-x: hidden;
            transition: 0.5s;
            margin-top: 136px;
            z-index: 999;
        }
        .popupCloseOptionFourth {
            flex-grow: 0;
            max-width: 12%;
            flex-basis: 12%;
            background: transparent;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .closebtnFourth {
            background: #ef5359;
            font-size: 14px;
            // margin-left: -31px;
            margin-top: 0;
            padding: 5px;
            color: white;
            border-radius: 20px;
            position: fixed;
            width: 100%;
            cursor: pointer;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupContentFourth {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        // popupDivSixth
        /* popupdivSixth CSS*/
        .popupContent {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupDivSixth {
            width: 0;
            right: 0;
            margin: -12px;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            position: fixed;
            height: fit-content;
            overflow-x: hidden;
            transition: 0.5s;
            margin-top: 136px;
            z-index: 999;
        }
        .popupCloseOptionSixth {
            flex-grow: 0;
            max-width: 12%;
            flex-basis: 12%;
            background: transparent;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .closebtnSixth {
            background: #ef5359;
            font-size: 14px;
            // margin-left: -31px;
            margin-top: 0;
            padding: 5px;
            color: white;
            border-radius: 20px;
            position: fixed;
            width: 100%;
            cursor: pointer;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }
        .popupContentSixth {
            flex-grow: 0;
            max-width: 88%;
            flex-basis: 88%;
            background: white;
            z-index: 100;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
        }

        /*
=====
LEVEL 1. RESET STYLES
=====
*/

        .field {
            --uiFieldPlaceholderColor: var(--fieldPlaceholderColor, #767676);
        }

        .field__input {
            background-color: transparent;
            border-radius: 0;
            border: none;

            -webkit-appearance: none;
            -moz-appearance: none;

            font-family: inherit;
            font-size: 1em;
        }

        .field__input:focus::-webkit-input-placeholder {
            color: var(--uiFieldPlaceholderColor);
        }

        .field__input:focus::-moz-placeholder {
            color: var(--uiFieldPlaceholderColor);
            opacity: 1;
        }

        /*
=====
LEVEL 2. CORE STYLES
=====
*/

        .a-field {
            display: inline-block;
        }

        .a-field__input {
            display: block;
            box-sizing: border-box;
            width: 100%;
        }

        .a-field__input:focus {
            outline: none;
        }

        /*
=====
LEVEL 3. PRESENTATION STYLES
=====
*/

        /* a-field */

        .a-field {
            --uiFieldHeight: var(--fieldHeight, 40px);
            --uiFieldBorderWidth: var(--fieldBorderWidth, 2px);
            --uiFieldBorderColor: var(--fieldBorderColor);

            --uiFieldFontSize: var(--fieldFontSize, 1em);
            --uiFieldHintFontSize: var(--fieldHintFontSize, 1em);

            --uiFieldPaddingRight: var(--fieldPaddingRight, 15px);
            --uiFieldPaddingBottom: var(--fieldPaddingBottom, 15px);
            --uiFieldPaddingLeft: var(--fieldPaddingLeft, 15px);

            position: relative;
            box-sizing: border-box;
            font-size: var(--uiFieldFontSize);
            padding-top: 1em;
        }

        .a-field__input {
            height: var(--uiFieldHeight);
            padding: 0 var(--uiFieldPaddingRight) 0 var(--uiFieldPaddingLeft);
            border-bottom: var(--uiFieldBorderWidth) solid
                var(--uiFieldBorderColor);
        }

        .a-field__input::-webkit-input-placeholder {
            opacity: 0;
            transition: opacity 0.2s ease-out;
        }

        .a-field__input::-moz-placeholder {
            opacity: 0;
            transition: opacity 0.2s ease-out;
        }

        .a-field__input:not(:placeholder-shown)
            ~ .a-field__label-wrap
            .a-field__label {
            opacity: 0;
            bottom: var(--uiFieldPaddingBottom);
        }

        .a-field__input:focus::-webkit-input-placeholder {
            opacity: 1;
            transition-delay: 0.2s;
        }

        .a-field__input:focus::-moz-placeholder {
            opacity: 1;
            transition-delay: 0.2s;
        }

        .a-field__label-wrap {
            box-sizing: border-box;
            width: 100%;
            height: var(--uiFieldHeight);

            pointer-events: none;
            cursor: text;

            position: absolute;
            bottom: 0;
            left: 0;
        }

        .a-field__label {
            position: absolute;
            bottom: calc(50% - 0.5em);

            line-height: 1;
            font-size: var(--uiFieldHintFontSize);

            pointer-events: none;
            transition: bottom 0.2s cubic-bezier(0.9, -0.15, 0.1, 1.15),
                opacity 0.2s ease-out;
            will-change: bottom, opacity;
        }

        .a-field__input:focus ~ .a-field__label-wrap .a-field__label {
            opacity: 1;
            bottom: var(--uiFieldHeight);
        }

        /* a-field_a1 */

        .a-field_a1 .a-field__input {
            transition: border-color 0.2s ease-out;
            will-change: border-color;
        }

        .a-field_a1 .a-field__input:focus {
            border-color: var(--fieldBorderColorActive);
        }

        /* a-field_a2 */

        .a-field_a2 .a-field__label-wrap::after {
            content: "";
            box-sizing: border-box;
            width: 0;
            height: var(--uiFieldBorderWidth);
            background-color: var(--fieldBorderColorActive);

            position: absolute;
            bottom: 0;
            left: 0;

            will-change: width;
            transition: width 0.285s ease-out;
        }

        .a-field_a2 .a-field__input:focus ~ .a-field__label-wrap::after {
            width: 100%;
        }

        /* a-field_a3 */

        .a-field_a3 {
            padding-top: 1.5em;
        }

        .a-field_a3 .a-field__label-wrap::after {
            content: "";
            box-sizing: border-box;
            width: 100%;
            height: 0;

            opacity: 0;
            border: var(--uiFieldBorderWidth) solid
                var(--fieldBorderColorActive);

            position: absolute;
            bottom: 0;
            left: 0;

            will-change: opacity, height;
            transition: height 0.2s ease-out, opacity 0.2s ease-out;
        }

        .a-field_a3 .a-field__input:focus ~ .a-field__label-wrap::after {
            height: 100%;
            opacity: 1;
        }

        .a-field_a3
            .a-field__input:focus
            ~ .a-field__label-wrap
            .a-field__label {
            bottom: calc(var(--uiFieldHeight) + 0.5em);
        }

        /*
=====
LEVEL 4. SETTINGS
=====
*/

        .field {
            --fieldBorderColor: #f5aeb1;
            --fieldBorderColorActive: #ef5359;
        }

        /*
=====
DEMO
=====
*/

        .page {
            box-sizing: border-box;
            width: 100%;
            max-width: 1000px;
            margin: auto;
            padding: 15px;

            display: div;
            div-gap: 20px;
            align-items: flex-end;
            order: 1;
        }
        .dateInputFirst {
            width: 75%;
            margin-left: 45px;
        }

        .dateInput {
            width: 75%;
        }
        .totalInput {
            margin-left: -45px;
        }

        @media screen and (max-width: 1300px) {
            .dateInput {
                width: 95%;
            }
            .dateInputFirst {
                width: 95%;
                margin-left: 2px;
            }
            .totalInput {
                margin-left: 3px;
            }

            .estimationId {
                font-size: 11px !important;
            }
        }

        @media (min-width: 481px) {
            .page {
                div-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
        }

        .popups {
            position: relative;
            display: contents;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .popups .popuptexts {
            visibility: hidden;
            width: 900px;
            height: 500px;
            background-color: #fff;
            color: #000;
            text-align: center;
            border-radius: 3px;
            padding: 8px 0;
            position: absolute;
            z-index: 9;
            top: 58px;
            left: 22%;
        }
        .popups .popuptextsBackground {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background-color: rgba(0, 0, 0, 0.5);
        }
        .popups .show {
            visibility: visible;
            -webkit-animation: fadeIn 1s;
            animation: fadeIn 1s;
        }
        .popups .hidden {
            visibility: hidden;
            -webkit-animation: fadeIn 1s;
            animation: fadeIn 1s;
        }
        .rbc-toolbar {
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .contentDiv {
            margin-top: 60px;
            padding: 60px 0;
        }

        .formDiv {
            // background-color: white;
            width: 100%;
            margin: auto;
            text-align: left;
            padding: 60px 15px;
            border-radius: 7px;
            margin-bottom: 30px;
            padding-top: 40px;
        }
        h1 {
            color: #ef5350;
            margin-bottom: 35px;
            font-weight: 300;
            font-size: 27px;
            font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
        }
        p {
            color: #020202;
            font-size: 20px;
            margin-bottom: 10px;
            margin-top: 10px;
            font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
        }
        input {
            width: 100%;
            border: 1px solid #9d9d9d;
            border-radius: 5px;
            height: 35px;
            padding: 0 10px;
            margin-bottom: 8px;
            font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
        }
        .buttonDiv {
            text-align: center;
            margin-top: 23px;
            margin-bottom: 35px;
        }
        button {
            margin: auto;
            background-color: #ef5350;
            color: white;
            border-radius: 5px;
            outline: 0;
            border: 0;
            padding: 12px 60px;
            font-size: 20px;
            font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
        }
        input:focus {
            outline: 0;
        }
        button:hover {
            cursor: pointer;
            background-color: #dc2723;
        }
        @media screen and (max-width: 600px) {
            .contentDiv {
                padding: 45px 30px;
            }
            .formDiv {
                width: 100%;
            }
            button {
                width: 100%;
                padding: 8px 60px;
            }
        }
        @media screen and (max-width: 430px) {
            .contentDiv {
                padding: 45px 20px;
            }
            .formDiv {
                width: 100%;
                padding: 25px 25px;
            }
        }
        @media screen and (max-width: 330px) {
            p {
                font-size: 17px;
            }
            h1 {
                font-size: 23px;
            }
        }


        `}
    </style>
</div>
  )
}

export default MessengerChatApp