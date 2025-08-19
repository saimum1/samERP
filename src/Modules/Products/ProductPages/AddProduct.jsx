import React, { useEffect, useState } from "react";
import {
  Button, FormControl, FormLabel, Input, Modal,
  ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react";
import { global_css } from "../../../GlobalCss/GlobalCSS.js";
import axios from "axios";
import config from "../../../config.jsx";
import { Toaster } from "react-hot-toast";
import Popnotification from "../../../Components/PopNotification/Popnotification.jsx";
import TickForm from "../../../Components/TickForm/TickForm.jsx";
import VideoUploader from "../../../Components/PopNotification/VideoUploader.jsx";
import { useAuth } from "../../../Context/AuthInfo.jsx";
import OperatorDropDown from "../../../Components/CustomDropDown/OperatorDropDown.jsx";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const AddProduct = ({ isOpen, onClose, GetProducts, actionType, productForEdit }) => {
  const { token } = useAuth();
  const [product, setProduct] = useState({});
  const [popup, setPopup] = useState({});
  const [categories, setCategories] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
 const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [productStatus,setProductStatus]=useState(false)

  useEffect(() => {
    axios.get(`${config.apiUrl}/api/product`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
    console.log("sepPe",productForEdit)
    if(actionType){
      setSelectedCategory(productForEdit.operator)
    }
    setProduct(actionType ? {
      name: productForEdit?.name || "",
      code: productForEdit?.code || "",
      quantity: productForEdit?.quantity || null,
      lotNo: productForEdit?.lotNo || null,
      logo: productForEdit?.logo || "",
      status: productForEdit?.status,
      description: productForEdit?.description || "",
      
    //   categoryId:  selectedCategory
    } : { name: "", code: "", quantity: "", lotNo: "", logo: "", status: 'not_available', description: "", categoryId: null });
  }, [actionType, productForEdit, token]);

  const update = (k, v) => setProduct(p => ({ ...p, [k]: v }));
  const notify = (msg, status) => { setPopup({ msg, status }); setTimeout(() => setPopup({}), 1500); };


const updateProduct = async (id) => {
        try {
            const data = {...product,'categoryId':parseInt(selectedCategory?.id), "status": productStatus ? 'available' : 'not_available'}
            console.log("adadadata_update",data)

            const response = await axios.put(`${config.apiUrl}/api/product/${productForEdit?.id}`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:operator', response);

                await GetProducts();
                onClose();
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


    const saveProduct = async () => {
        try {
            const data = {...product,'categoryId':parseInt(selectedCategory?.id),"status": productStatus ? 'available' : 'not_available'}
            console.log("adadadata",data)

            const response = await axios.post(`${config.apiUrl}/api/product`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:operator', response);

                await GetProducts();
                onClose();
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


  return (
    <div >
      <Toaster position="top-right" />
      {/* {popup.msg && <Popnotification msg={popup.msg} status={popup.status} />} */}

      {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
      <VideoUploader filex={product.logo} geturl={(e) => update("logo", e?.data?.fileUrl)} />

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg={global_css.modal_bg} color="white"  maxW="70vw" >
          <ModalHeader>{actionType ? "Edit Product" : "Add New Product"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Select Category</FormLabel>
              <OperatorDropDown
                setclicked={setClicked}
                clicked={clicked}
                selectedOperator={selectedCategory}
                SetselectedOperator={setSelectedCategory}
              />
            </FormControl>

            <FormControl mt={4}><FormLabel>Item Name</FormLabel>
              <Input value={product.name} onChange={e => update("name", e.target.value)} />
            </FormControl>

            <FormControl mt={4}><FormLabel>Item Quantity</FormLabel>
              <Input type="number" value={product.quantity} onChange={e => update("quantity", e.target.value)} />
            </FormControl>

            <FormControl mt={4}><FormLabel>Lot No</FormLabel>
              <Input value={product.lotNo} onChange={e => update("lotNo", e.target.value)} />
            </FormControl>

            {/* <FormControl mt={4}><FormLabel>Status</FormLabel>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={product.status} onChange={e => update("status", e.target.checked)} hidden />
                <TickForm status={product.status} /> <span>Available</span>
              </label>
            </FormControl> */}

             <FormControl className="mt-5">
                            <FormLabel style={{fontWeight :'bold'}}>status <span style={{color:'red'}}>*</span></FormLabel>

                        <label style={{border : '1px solid #595959',transition:'all 300ms'}} className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex gap-2 items-center">
                            <input 
                                type="checkbox"
                                checked={productStatus}
                                onChange={(e) => setProductStatus(e.target.checked)}
                                style={{ display: 'none' }} 
                            />
                            <div style={{width:'18px',height:'18px'}}>
                                <TickForm  status={productStatus}/> 
                            </div>
                            <span>Available</span>
                            </label>
                        </FormControl>

            <FormControl mt={14}><FormLabel>Description</FormLabel>
              <SunEditor height="200px" setContents={product.description}
                onChange={content => update("description", content)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='white' variant='outline' onClick={onClose}>Cancel</Button>
            <Button ml={3} bg="#27CF7A" color="white" onClick={actionType ? updateProduct : saveProduct}>
              {actionType ? "Update" : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddProduct;
