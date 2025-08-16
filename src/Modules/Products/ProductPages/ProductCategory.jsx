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
// import {useTranslation} from "react-i18next";
import { useAuth } from '../../../Context/AuthInfo.jsx';
import AddProduct from './AddProductCategory.jsx';

const ProductTable = () => {
          const { user , token ,profileInfo} = useAuth();
    

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ tableData, setTableData ] = useState([])
    const [ bulkIds, setBulkIds ] = useState([])
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [status, setStatus]=useState('')
    const [isOpenD, setIsOpenD] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [operatorForEdit, setOperatorForEdit] = useState({});
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
            GetOperatorForUpdate(selecteditem.id)


            onOpen()
        }else if(e.type === 'delete'){
            onAlertOpen();
            setAlertType('')
            setAlertText(t('areyousureDelOperators'));
            setAlertButtonText(t('yesDel'))
            setAlertButtonTextSecond(t('cancel'))
            setactiontype(false)
        }

    }

    const callbox =()=>{
        setactiontype(false)
        onOpen()
    }
    
  

  

    const GetOperators = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:=-=-=-=-=', response.data);
            setTableData(response?.data)
            setNodata(response?.data?.length <= 0)
            setLoader(false)
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };

    const GetOperatorForUpdate = async (id) => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('GetOperatorForUpdate:', response);
            setOperatorForEdit(response?.data)
            await setactiontype(true)
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    const deleteOperator = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/operator/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle successful deletion
            console.log('Operator deleted successfully');
            await GetOperators()
            await onAlertClose()
            setshowpopupmsg('Delete Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            // Update UI to reflect deletion, e.g., remove the operator from a list
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
            throw error;
        }
    };


    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setshoweditindex(null);
        }
      };




      useEffect(() => {
        setLoader(true)
        GetOperators()

   
       
    }, []);

    return (
       <div   style={{width:"100%",height:"100%",backgroundColor:global_css.mainPageFrontColor,color:global_css.primary_txt_color}} className=" rounded-[3px]">	
            <AddProduct isOpen={isOpen} onClose={onClose} actionType={actiontype} GetOperators={GetOperators} operatorForEdit={operatorForEdit} />
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={alertType==='warning'?UpdateBulk : deleteOperator}/>
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>
                <div className="flex justify-between items-center mb-14">
                <Title className="text-4xl">Product Category</Title>
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

                
                <Table onClick={() =>setFilterOpen(false)} className=" h-[60vh]">
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> serial</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>category</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>cat.code</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>status</TableHeaderCell>
                            <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{minHeight : '300px' , overflow : 'auto'}}>
                        {tableData?.map((item, index) => (
                            <TableRow key={index} style={{borderColor:'#595959'}} 
                                                     >
                                <TableCell>
                                    <input checked={selected.includes(item.id)}
                                           onChange={() => handleSelect(item.id)}
                                           type="checkbox"
                                           id={`my-checkbox-${index}`}/>
                                    <span className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                                </TableCell>
                                <TableCell>
                                    <Text className="flex gap-3"> {item.logoUrl && <img style={{height : '24px', width : '24px'}} src={`${config.apiUrl}${item.logoUrl}`}  alt=""/> }<span>{item.name}</span> </Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.code}</Text>
                                </TableCell>

                                <TableCell>
                                       <Text className={item.status==='not_available'? "!text-red-600" : "!text-white"}>{convertString(item.status)}</Text>
                                </TableCell>
                                <TableCell>
                                    <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}
                                     onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}
                                  
                                     >
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {(showeditindex !== null)? <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                      
                                            <CustomEditors
                                                getdata={getaction} selected={['edit', 'delete']}/>

                                        </div>:''}
                                    </div>
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

export default ProductTable;











// import React, { useEffect, useMemo, useRef, useState, useCallback, useReducer, useTransition } from "react";
// import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
// import {
//   Badge,
//   Card,
//   Icon,
//   Select,
//   SelectItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeaderCell,
//   TableRow,
//   Text,
//   TextInput,
//   Title,
// } from "@tremor/react";
// import { Button, useDisclosure } from "@chakra-ui/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown, faChevronUp, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
// import { global_css } from "../../../GlobalCss/GlobalCSS.js";
// import axios from "axios";
// import config from "../../../config.jsx";
// import toast from "react-hot-toast";
// import SearchDialouge from "../../../Components/SearchComponent/SearchDialouge.jsx";
// import AlertBox from "../../../Components/AlertBox/AlertBox.jsx";
// import Nodatafound from "../../../Components/NoDataFound/Nodatafound.jsx";
// import LoadingSoS from "../../../Components/LoadingScreen/LoadingSoS.jsx";
// import Popnotification from "../../../Components/PopNotification/Popnotification.jsx";
// import CustomEditors from "../../../Components/EditFunctionality/CustomEditors.jsx";
// import { convertString } from "../../../Components/commonFunctions/StringConversion.jsx";
// import { useAuth } from "../../../Context/AuthInfo.jsx";
// import AddProduct from "./AddProduct.jsx";

// // ---------- utilities ----------
// const noop = () => {};
// const toArray = (setLike) => Array.from(setLike);

// // Progressive render chunk size for huge lists (tune as needed)
// const INITIAL_RENDER_COUNT = 100;
// const CHUNK_SIZE = 200;
// const MAX_CHUNKS_PER_TICK = 3; // avoid UI jank on fast scrolls

// // ---------- main ----------
// const ProductTable = () => {
//   const { user, token, profileInfo } = useAuth();

//   // Chakra modals
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const {
//     isOpen: isAlertOpen,
//     onOpen: onAlertOpen,
//     onClose: onAlertClose,
//   } = useDisclosure();

//   // Core state
//   const [tableData, setTableData] = useState([]);          // full dataset
//   const [operatorForEdit, setOperatorForEdit] = useState({});

//   // UI state
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [nodata, setNodata] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [showpopoup, setshowpopup] = useState(false);
//   const [showpopoupstatus, setshowpopupstatus] = useState("success");
//   const [showpopoupmsg, setshowpopupmsg] = useState("");

//   // Dropdown state for row action menu
//   const [showeditindex, setshoweditindex] = useState(null);
//   const dropdownRef = useRef(null);

//   // Bulk action state
//   const [status, setStatus] = useState("");
//   const [alertType, setAlertType] = useState("");
//   const [alertText, setAlertText] = useState("");
//   const [alertButtonText, setAlertButtonText] = useState("");
//   const [alertButtonTextSecond, setAlertButtonTextSecond] = useState("");
//   const [selecteditem, setselecteditem] = useState(null);
//   const [actiontype, setactiontype] = useState(false); // false = add, true = edit

//   // Selection as a Set for O(1) membership
//   const [selectedSet, setSelectedSet] = useState(() => new Set());

//   // Derived: is all selected?
//   const isAllSelected = tableData.length > 0 && selectedSet.size === tableData.length;

//   // Progressive rendering: only render a sliding window of rows to reduce DOM work
//   const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);
//   const listSentinelRef = useRef(null);
//   const observerRef = useRef(null);
//   const containerRef = useRef(null);

//   // Transition for non-urgent updates (keeps UI snappy under load)
//   const [isPending, startTransition] = useTransition();

//   // Axios instance with auth header + cancellation
//   const axiosRef = useRef(null);
//   if (!axiosRef.current) {
//     const instance = axios.create({
//       baseURL: config.apiUrl,
//       timeout: 20000,
//     });
//     axiosRef.current = instance;
//   }
//   const api = axiosRef.current;

//   // Attach auth header (changes when token changes)
//   useEffect(() => {
//     if (!api) return;
//     const reqId = api.interceptors.request.use((cfg) => {
//       if (token) {
//         cfg.headers = { ...(cfg.headers || {}), Authorization: `Bearer ${token}` };
//       }
//       return cfg;
//     });
//     return () => {
//       api.interceptors.request.eject(reqId);
//     };
//   }, [api, token]);

//   // Helper: show popup (throttled auto-hide)
//   const pop = useCallback((msg, ok = true) => {
//     setshowpopupmsg(msg);
//     setshowpopupstatus(ok ? "success" : "failed");
//     setshowpopup(true);
//     const t = setTimeout(() => setshowpopup(false), 1500);
//     return () => clearTimeout(t);
//   }, []);

//   // Cancel control for in-flight requests
//   const inFlight = useRef({});

//   const cancelTag = useCallback((key) => {
//     const src = inFlight.current[key];
//     if (src) {
//       src.abort();
//       delete inFlight.current[key];
//     }
//   }, []);

//   const runWithCancel = useCallback(
//     async (key, fn) => {
//       cancelTag(key);
//       const controller = new AbortController();
//       inFlight.current[key] = controller;
//       try {
//         const res = await fn(controller.signal);
//         delete inFlight.current[key];
//         return res;
//       } catch (e) {
//         delete inFlight.current[key];
//         if (e.name === "CanceledError" || e.name === "AbortError") return null;
//         throw e;
//       }
//     },
//     [cancelTag]
//   );

//   // ---- API calls ----
//   const GetOperators = useCallback(async () => {
//     setLoader(true);
//     try {
//       const res = await runWithCancel("getOperators", (signal) =>
//         api.get("/api/operator", { signal })
//       );
//       if (!res) return; // canceled
//       const data = Array.isArray(res.data) ? res.data : [];
//       startTransition(() => {
//         setTableData(data);
//         setNodata(data.length <= 0);
//         setVisibleCount(Math.max(INITIAL_RENDER_COUNT, Math.min(data.length, INITIAL_RENDER_COUNT)));
//         setSelectedSet(new Set()); // reset selection on reload
//       });
//     } catch (err) {
//       console.error("GetOperators error:", err);
//       toast.error("Failed to load operators");
//     } finally {
//       setLoader(false);
//     }
//   }, [api, runWithCancel]);

//   const GetOperatorForUpdate = useCallback(
//     async (id) => {
//       try {
//         const res = await runWithCancel("getOperatorById", (signal) =>
//           api.get(`/api/operator/${id}`, { signal })
//         );
//         if (!res) return;
//         setOperatorForEdit(res.data || {});
//         setactiontype(true);
//       } catch (err) {
//         console.error("GetOperatorForUpdate error:", err);
//         toast.error("Failed to load operator");
//       }
//     },
//     [api, runWithCancel]
//   );

//   const deleteOperator = useCallback(
//     async (id) => {
//       if (!id) return;
//       try {
//         await api.delete(`/api/operator/${id}`);
//         pop("Delete Success", true);
//         GetOperators();
//         onAlertClose();
//       } catch (err) {
//         console.error("Delete error:", err);
//         pop("Delete Failed", false);
//       }
//     },
//     [api, GetOperators, onAlertClose, pop]
//   );

//   const UpdateBulk = useCallback(async () => {
//     const ids = toArray(selectedSet);
//     if (ids.length === 0 || !status) {
//       pop(ids.length === 0 ? "No items selected" : "Pick a status", false);
//       return;
//     }
//     try {
//       await api.put(`/api/operator/update/bulk`, { operatorIds: ids, status });
//       pop("Update Success", true);
//       onAlertClose();
//       GetOperators();
//     } catch (err) {
//       console.error("Bulk update error:", err);
//       pop("Update Failed", false);
//     }
//   }, [api, selectedSet, status, GetOperators, onAlertClose, pop]);

//   // ---- Selection ----
//   const handleSelect = useCallback((id) => {
//     startTransition(() => {
//       setSelectedSet((prev) => {
//         const next = new Set(prev);
//         if (next.has(id)) next.delete(id);
//         else next.add(id);
//         return next;
//       });
//     });
//   }, []);

//   const handleSelectAll = useCallback(() => {
//     startTransition(() => {
//       setSelectedSet((prev) => {
//         if (tableData.length === 0) return prev;
//         if (prev.size === tableData.length) return new Set(); // clear all
//         return new Set(tableData.map((x) => x.id));
//       });
//     });
//   }, [tableData]);

//   // ---- Row action dropdown + outside click guard ----
//   const handleRowActionToggle = useCallback(
//     (index, item) => {
//       setshoweditindex((curr) => (curr === index ? null : index));
//       setselecteditem(item);
//     },
//     []
//   );

//   useEffect(() => {
//     const onDocClick = (e) => {
//       if (!dropdownRef.current) return;
//       if (!dropdownRef.current.contains(e.target)) {
//         setshoweditindex(null);
//       }
//     };
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, []);

//   // ---- Progressive rendering via IntersectionObserver ----
//   useEffect(() => {
//     if (!listSentinelRef.current) return;
//     if (observerRef.current) observerRef.current.disconnect();

//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         const first = entries[0];
//         if (!first || !first.isIntersecting) return;
//         // load more in chunks, capped per tick for responsiveness
//         startTransition(() => {
//           setVisibleCount((prev) => {
//             if (prev >= tableData.length) return prev;
//             let next = prev + CHUNK_SIZE * MAX_CHUNKS_PER_TICK;
//             if (next > tableData.length) next = tableData.length;
//             return next;
//           });
//         });
//       },
//       { root: containerRef.current, rootMargin: "200px", threshold: 0 }
//     );
//     observerRef.current.observe(listSentinelRef.current);

//     return () => {
//       if (observerRef.current) observerRef.current.disconnect();
//     };
//   }, [tableData.length]);

//   // ---- Lifecycle: initial fetch + cleanup ----
//   useEffect(() => {
//     GetOperators();
//     return () => {
//       // cancel any in-flight requests on unmount
//       Object.values(inFlight.current).forEach((ctrl) => ctrl?.abort?.());
//       inFlight.current = {};
//     };
//   }, [GetOperators]);

//   // ---- Helpers for alert box / actions ----
//   const getaction = useCallback(
//     (e) => {
//       if (!e?.type || !selecteditem) return;
//       if (e.type === "edit") {
//         GetOperatorForUpdate(selecteditem.id);
//         onOpen();
//       } else if (e.type === "delete") {
//         setAlertType("");
//         setAlertText("Are you sure you want to delete this operator?");
//         setAlertButtonText("Yes, Delete");
//         setAlertButtonTextSecond("Cancel");
//         onAlertOpen();
//       }
//     },
//     [GetOperatorForUpdate, onAlertOpen, onOpen, selecteditem]
//   );

//   const callbox = useCallback(() => {
//     setactiontype(false);
//     onOpen();
//   }, [onOpen]);

//   // Slice rows to render now (progressive render)
//   const rowsToRender = useMemo(() => {
//     if (!Array.isArray(tableData)) return [];
//     return tableData.slice(0, Math.min(visibleCount, tableData.length));
//   }, [tableData, visibleCount]);

//   return (
//     <div className="border-none h-full w-full">
//       <AddProduct
//         isOpen={isOpen}
//         onClose={onClose}
//         actionType={actiontype}
//         GetOperators={GetOperators}
//         operatorForEdit={operatorForEdit}
//       />

//       <AlertBox
//         isOpen={isAlertOpen}
//         onOpen={onAlertOpen}
//         onClose={onAlertClose}
//         type={alertType}
//         deleteId={selecteditem}
//         text={alertText}
//         buttonText={alertButtonText}
//         seconDbuttonText={alertButtonTextSecond}
//         exFunc={alertType === "warning" ? UpdateBulk : () => deleteOperator(selecteditem?.id)}
//       />

//       {loader && <LoadingSoS />}
//       {showpopoup && (
//         <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} />
//       )}

//       {!nodata ? (
//         <Card
//           className="w-full h-full text-white mb-12"
//           style={{
//             borderRadius: global_css.card_border_radius,
//             backgroundColor: global_css.primary_card_bg,
//             boxShadow: "none",
//           }}
//         >
//           <div className="flex justify-between items-center mb-14">
//             <Title className="text-4xl">Product Category</Title>

//             <div className="flex justify-end items-center gap-3 w-4/12">
//               <label
//                 style={{
//                   border: "1px solid #595959",
//                   position: "relative",
//                   display: "inline-block",
//                   zIndex: 1,
//                 }}
//                 htmlFor="file-input"
//                 className="w-8/12 h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <span
//                   onClick={() => setFilterOpen((s) => !s)}
//                   className="flex items-center justify-between p-0"
//                 >
//                   <span className="flex items-center">
//                     <Icon size="sm" icon={SearchIcon} />
//                     search
//                   </span>
//                   <span>
//                     <FontAwesomeIcon icon={faChevronDown} />
//                   </span>
//                 </span>
//                 {filterOpen && (
//                   <SearchDialouge setFilterOpen={setFilterOpen} setTableData={setTableData} type={"operator"} />
//                 )}
//               </label>

//               <button
//                 onClick={() => {
//                   setactiontype(false);
//                   onOpen();
//                 }}
//                 className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-3/12"
//               >
//                 Add New
//               </button>
//             </div>
//           </div>

//           <Table onClick={() => setFilterOpen(false)} className="mt-8 h-[60vh]">
//             <TableHead>
//               <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
//                 <TableHeaderCell
//                   style={{
//                     borderTopLeftRadius: "5px",
//                     borderBottomLeftRadius: "5px",
//                     borderRight: "2px solid #303038",
//                   }}
//                 >
//                   <input
//                     checked={isAllSelected}
//                     onChange={handleSelectAll}
//                     type="checkbox"
//                     aria-label="Select all rows"
//                   />{" "}
//                   serial
//                 </TableHeaderCell>
//                 <TableHeaderCell style={{ borderRight: "2px solid #303038" }}>category</TableHeaderCell>
//                 <TableHeaderCell style={{ borderRight: "2px solid #303038" }}>cat.code</TableHeaderCell>
//                 <TableHeaderCell style={{ borderRight: "2px solid #303038" }}>status</TableHeaderCell>
//                 <TableHeaderCell
//                   style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
//                 >
//                   Action
//                 </TableHeaderCell>
//               </TableRow>
//             </TableHead>

//             {/* Scroll container to drive progressive rendering */}
//             <TableBody
//               ref={containerRef}
//               style={{ minHeight: "300px", overflow: "auto" }}
//             >
//               {rowsToRender.map((item, index) => {
//                 const isChecked = selectedSet.has(item.id);
//                 const serial = (index + 1).toString().padStart(2, "0");
//                 const isActionsOpen = showeditindex === index;
//                 return (
//                   <TableRow key={item.id ?? index} style={{ borderColor: "#595959" }}>
//                     <TableCell>
//                       <input
//                         checked={!!isChecked}
//                         onChange={() => handleSelect(item.id)}
//                         type="checkbox"
//                         id={`row-check-${item.id}`}
//                         aria-label={`Select row ${serial}`}
//                       />
//                       <span className="ml-5">{serial}</span>
//                     </TableCell>

//                     <TableCell>
//                       <Text className="flex gap-3">
//                         {item.logoUrl ? (
//                           <img
//                             style={{ height: "24px", width: "24px" }}
//                             src={`${config.apiUrl}${item.logoUrl}`}
//                             alt=""
//                             loading="lazy"
//                             decoding="async"
//                           />
//                         ) : null}
//                         <span>{item.name}</span>
//                       </Text>
//                     </TableCell>

//                     <TableCell>
//                       <Text>{item.code}</Text>
//                     </TableCell>

//                     <TableCell>
//                       <Text className={item.status === "not_available" ? "!text-red-600" : "!text-white"}>
//                         {convertString(item.status)}
//                       </Text>
//                     </TableCell>

//                     <TableCell>
//                       <div
//                         ref={isActionsOpen ? dropdownRef : null}
//                         style={{
//                           position: "relative",
//                           width: "100%",
//                           cursor: "pointer",
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           flexDirection: "column",
//                         }}
//                         onClick={() => handleRowActionToggle(index, item)}
//                       >
//                         <FontAwesomeIcon icon={faEllipsisVertical} />
//                         {isActionsOpen ? (
//                           <div
//                             style={{
//                               position: "absolute",
//                               width: "8rem",
//                               right: "50%",
//                               top: "1%",
//                               height: "fit-content",
//                               display: "flex",
//                             }}
//                           >
//                             <CustomEditors getdata={getaction} selected={["edit", "delete"]} />
//                           </div>
//                         ) : null}
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}

//               {/* sentinel for progressive loading */}
//               <tr>
//                 <td colSpan={5}>
//                   <div ref={listSentinelRef} style={{ height: 1 }} />
//                 </td>
//               </tr>
//             </TableBody>
//           </Table>

//           <div className="max-w-sm mt-5  flex items-center">
//             <select
//               style={{ border: "1px solid #595959" }}
//               className="w-full cursor-pointer bg-[#404040] h-10 hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               onChange={(e) => setStatus(e.target.value)}
//               value={status}
//             >
//               <option value="">selectStatus</option>
//               <option value="available">Available</option>
//               <option value="not_available">Not Available</option>
//             </select>

//             <Button
//               onClick={() => {
//                 setAlertType("warning");
//                 setAlertText("Are you sure you want to change the status?");
//                 setAlertButtonText("Yes, Update");
//                 setAlertButtonTextSecond("Cancel");
//                 onAlertOpen();
//               }}
//               variant="outline"
//               style={{ border: "1px solid #27CF7A", color: "#27CF7A", marginTop: "-0.1%" }}
//               ml={3}
//             >
//               Apply
//             </Button>
//           </div>
//         </Card>
//       ) : (
//         <Nodatafound
//           btn_text={"Add Operator"}
//           tittle_head={"No Operator List Found"}
//           title_des={"Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam"}
//           buttonclicked={onOpen}
//         />
//       )}

//       <style jsx>
//         {`
//           input[type="checkbox"] {
//             appearance: none;
//             width: 15px;
//             height: 15px;
//             border: 2px solid #ddd;
//             border-radius: 3px;
//             background-color: transparent;
//           }

//           input[type="checkbox"]:checked {
//             background-color: #4CAF50; /* Green background when checked */
//           }

//           .checkbox-box {
//             display: none; /* Not needed anymore */
//           }

//           ::-webkit-scrollbar {
//             width: 12px; /* Width of the scrollbar */
//             border: 1px solid #ddd; /* Border color of the scrollbar */
//             border-radius: 8px;
//           }

//           ::-webkit-scrollbar-thumb {
//             background-color: #999; /* Color of the thumb */
//             border-radius: 3px; /* Border radius of the thumb */
//           }

//           /* For Firefox */
//           scrollbar {
//             width: 12px; /* Width of the scrollbar */
//           }

//           scrollbar-thumb {
//             background-color: #999; /* Color of the thumb */
//             border-radius: 3px; /* Border radius of the thumb */
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default ProductTable;
