import React, { useEffect, useState } from "react";
import {
  Button, FormControl, FormLabel, Input, Modal,
  ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Box, Grid, GridItem, Image, IconButton
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
import aiimage from '../../../assets/static/aiani.gif'

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
  const [isAIGenerateOpen, setIsAIGenerateOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState(product?.name);
  const [aiFormatInstructions, setAiFormatInstructions] = useState("Write the article in a professional tone suitable for a product description. Structure it with an introduction (150 words), two main sections with H2 headings (300 words total, include 3 bullet points in each section summarizing key points), and a conclusion (150 words). Ensure the content highlights eco-friendly benefits and practical applications.");
  const [aiWordCount, setAiWordCount] = useState(600);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrls, setImageUrls] = useState(['', '', '', '']);

  console.log("dada",selectedCategory)
  useEffect(() => {
    axios.get(`${config.apiUrl}/api/product`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
    console.log("sepPe",productForEdit)
    if(actionType){
      setSelectedCategory(productForEdit.operator)
    }
    setProduct(actionType ? {
      id: productForEdit?.id,     
      name: productForEdit?.name || "",
      price: productForEdit?.price || 0,
      code: productForEdit?.code || "",
      quantity: productForEdit?.quantity || null,
      lotNo: productForEdit?.lotNo || null,
      logo: productForEdit?.logo || "",
      status: productForEdit?.status,
      description: productForEdit?.description || "",
      imageink1: productForEdit?.imageink1 || "",
      imageink2: productForEdit?.imageink2 || "",
      imageink3: productForEdit?.imageink3 || "",
      imageink4: productForEdit?.imageink4 || "",
      
    //   categoryId:  selectedCategory
    } : { name: "",price:0, code: "", quantity: "", lotNo: "", logo: "", status: 'not_available', description: "", categoryId: null, imageink1: "", imageink2: "", imageink3: "", imageink4: "" });
  }, [actionType, productForEdit, token]);

  const update = (k, v) => setProduct(p => ({ ...p, [k]: v }));
  const notify = (msg, status) => { setPopup({ msg, status }); setTimeout(() => setPopup({}), 1500); };



const generateArticle = async () => {
    if ( !aiFormatInstructions) {
      setshowpopupmsg("Please provide topic and format instructions");
      setshowpopupstatus("fail");
      setshowpopup(true);
      setTimeout(() => setshowpopup(false), 1500);
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/product/generative`,
        {
          topic: product?.name,
          format_instructions: aiFormatInstructions,
          word_count: aiWordCount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the description field with the generated article
      console.log("result of generative ai",response)
      update("description", response?.data?.generated_content);
      setIsAIGenerateOpen(false); // Close the AI modal
      setshowpopupmsg("Article generated successfully");
      setshowpopupstatus("success");
      setshowpopup(true);
      setTimeout(() => setshowpopup(false), 1500);
    } catch (error) {
      console.error("Error generating article:", error);
      setshowpopupmsg("Failed to generate article");
      setshowpopupstatus("fail");
      setshowpopup(true);
      setTimeout(() => setshowpopup(false), 1500);
    } finally {
      setIsGenerating(false);
    }
  };
  
  
const updateProduct = async (id) => {
        try {
            const data = {...product,'categoryId':selectedCategory?.id, "status": productStatus ? 'available' : 'not_available'}
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
            const data = {...product,'categoryId':selectedCategory?.id,"status": productStatus ? 'available' : 'not_available'}
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


            <FormControl mt={4}><FormLabel>Item price</FormLabel>
              <Input type="number" value={product.price} onChange={e => update("price", e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Images</FormLabel>
              <div style={{ display: 'grid',gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem',justifyItems: 'center',paddingTop:'1rem' }}>
                {['imageink1', 'imageink2', 'imageink3', 'imageink4'].map((key) => (
                  <div key={key} style={{ position: 'relative', width: '100px', height: '100px' }}>
                    {product?.[key] ? (
                      <>
                        <span
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            cursor: 'pointer',
                            background: '#ef4444',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onClick={() => update(key, '')}
                        >
                          ×
                        </span>
                        <img
                          src={product[key]}
                          style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      </>
                    ) : (
                      <Input
                        value={product[key] || ''}
                        onChange={(e) => update(key, e.target.value)}
                        placeholder="Image URL"
                        size="lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </FormControl>

            {/* <FormControl mt={4}><FormLabel>Product Images</FormLabel>
              <div style={{display:'flex'}}>
              
               {product?.imageink1 ? 
               <div >
                <span style={{cursor:'pointer'}} onClick={e => update("imageink1",'')}>x</span>
                <img src={product?.imageink1} style={{width:'100px',height:'100px'}} /> 
               </div>
               : <Input value={product.imageink1} onChange={e => update("imageink1", e.target.value)} />} 
             
              {product?.imageink2 ? 
               <div >
                <span style={{cursor:'pointer'}} onClick={e => update("imageink2",'')}>x</span>
                <img style={{width:"2rem"}} src={product?.imageink2} style={{width:'100px',height:'100px'}} /> 
               </div>
               : <Input value={product.imageink2} onChange={e => update("imageink2", e.target.value)} />} 

               {product?.imageink3 ? 
               <div >
                <span style={{cursor:'pointer'}} onClick={e => update("imageink3",'')}>x</span>
                <img src={product?.imageink3} style={{width:'100px',height:'100px'}} /> 
               </div>
               : <Input value={product.imageink3} onChange={e => update("imageink3", e.target.value)} />} 

               {product?.imageink4 ? 
               <div >
                <span style={{cursor:'pointer'}} onClick={e => update("imageink4",'')}>x</span>
                <img src={product?.imageink4} style={{width:'100px',height:'100px'}} /> 
               </div>
               : <Input value={product.imageink4} onChange={e => update("imageink4", e.target.value)} />} 
              


              </div>
            
            </FormControl> */}



            <FormControl mt={4}><FormLabel>Lot No</FormLabel>
              <Input value={product.lotNo} onChange={e => update("lotNo", e.target.value)} />
            </FormControl>

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


              
             <FormControl mt={20}>
              <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} padding={2}>
                 <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                     <FormLabel mb={0}>Description</FormLabel>
                     <img src={aiimage} alt="AI Generation" width="35" style={{ display:isGenerating ? 'block' :   'none' ,cursor:'pointer'}} />
                 </div>

                 <Button
                  height={7}
                    bg="#27CF7A"
                    color="white"
                    onClick={() => generateArticle()}
                    isLoading={isGenerating}
                    loadingText="Generating..."
                  >
                    Generate with AI
                  </Button>

              </Box>
              
               <Box
                    sx={{
                      position: 'relative',
                      borderRadius: 'md',
                      p: 2,
                      border: '2px solid',
                      borderColor: isGenerating ? 'transparent' : 'gray.600',
                      overflow: 'hidden',
                      '& .sun-editor': {
                        border: isGenerating ? '1px solid rgba(0, 247, 255, 0.5)' : '1px solid gray.600',
                        borderRadius: 'md',
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: isGenerating ? '0 0 10px rgba(0, 247, 255, 0.7)' : 'none',
                      },
                      '& .sun-editor-editable': {
                        position: 'relative',
                        '&:after': isGenerating
                          ? {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              width: '2px',
                              height: '1.2em',
                              backgroundColor: '#ff9900ff',
                              animation: 'blink 1s step-end infinite',
                            }
                          : {},
                      },
                      '&::before': isGenerating
                        ? {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: 'inherit',
                            padding: '2px',
                            background: 'linear-gradient(90deg, #00f7ff, #ff007bff, #007bff, #00f7ff, #ff6027ff)',
                            backgroundSize: '300% 300%',
                            animation: 'neonFlow 4s linear infinite',
                            WebkitMask:
                              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            pointerEvents: 'none',
                          }
                        : {},
                    }}
                    css={{
                      '@keyframes neonFlow': {
                        '0%': { backgroundPosition: '0% 50%' },
                        '50%': { backgroundPosition: '100% 50%' },
                        '100%': { backgroundPosition: '0% 50%' },
                      },
                      '@keyframes blink': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0 },
                      },
                    }}
                  >
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <SunEditor
                        readOnly={isGenerating}
                        height="200px"
                        setContents={product.description}
                        onChange={(content) => update('description', content)}
                      />
                    </div>
                  </Box>

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
