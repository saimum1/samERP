import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import ScrollbarContent from "../SimList/SellSimComponents/ScrollbarContent.jsx";

const ViewClientInfo = ({isOpen, onClose, saveOpen, oid, setstatusx, type}) => {


    const [data, setData] = useState({})

    const SaveOperator = async () => {

    };


    useEffect(() => {
        let locaStoragedatax=JSON.parse(localStorage.getItem('saleId'))
        let locaStoragedataxy=locaStoragedatax?.filter(n=>n.id === oid)
        let locaStoragedata=locaStoragedataxy[0]?.data
        setData(locaStoragedata)
        // console.log("localdatauc122", oid,locaStoragedata)
       console.log("dsfsdf",oid,locaStoragedata)
    }, [oid,isOpen]);





    return (


        <div>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >


                <ModalOverlay/>
                <ModalContent  bg={global_css.modal_bg} style={{color: 'white', maxHeight : '50rem'}} maxW="50%">
                    <ModalHeader>Client Name </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6} >

                        <ScrollbarContent>
                        <FormControl>
                            <FormLabel style={{
                                fontWeight: 'bold',
                                display: "flex",
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px'
                            }}>{data?.firstName} {data?.lastName}</FormLabel>
                        </FormControl>


                        <FormControl>
                            <div style={{
                                width: '100%',
                                height: '1px',
                                margin: '2rem 0px',
                                backgroundColor: '#404040'
                            }}></div>
                        </FormControl>


                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>

                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Operator</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>${data?.operator_name}</span>
                                    </div>


                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>ICCID</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>${data?.iccid}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Sim Number</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>${data?.sim_number}</span>
                                    </div>
                                </div>


                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Price</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>${data?.buyingPrice}</span>
                                    </div>


                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Status</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>${data?.oldOperator?.status}</span>
                                    </div>
                                </div>


                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{
                                width: '100%',
                                height: '1px',
                                margin: '2rem 0px',
                                backgroundColor: '#404040'
                            }}></div>
                        </FormControl>


                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>

                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>First Name</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.firstName}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Last Name</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.lastName}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Gender</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.gender}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Date of birth</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.dateOfBirth}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>TaxId</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.taxIdCode}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Nationality</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.nationality}</span>
                                    </div>

<div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Email</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.email}</span>
                                    </div>


                                </div>


                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        flexDirection: 'column'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Date & Time</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}>{data?.oldOperator?.dateTime}</span>
                                    </div>
     <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            flexDirection: 'column'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Document Number</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}>{data?.documentNumber}</span>
                                    </div> <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            flexDirection: 'column'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Place of issue</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}></span>
                                    </div>
<div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            flexDirection: 'column'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Document issue date</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}>{data?.documentIssueDate}</span>
                                    </div><div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            flexDirection: 'column'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Document expiration date</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}>{data?.documentExpirationDate}</span>
                                    </div>

                                </div>


                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{
                                width: '100%',
                                height: '1px',
                                margin: '2rem 0px',
                                backgroundColor: '#404040'
                            }}></div>
                        </FormControl>


                        <FormControl>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    flexDirection : 'column',
                                    marginBottom : '2rem'
                                }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Full Address</span>
                                    <span style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '10rem'
                                    }}>{data?.postalcode}</span>
                                </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>

                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Location</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.postalcode}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>City</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.city}</span>
                                    </div>
                                </div>


                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Post Code</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.postalCode}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>TelePhone</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.telephone}</span>
                                    </div>
                                </div>


                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{
                                width: '100%',
                                height: '1px',
                                margin: '2rem 0px',
                                backgroundColor: '#404040'
                            }}></div>
                        </FormControl>




                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>

                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Top up</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.topUp}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Old operator</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.oldOperator?.name}</span>
                                    </div>
                                </div>


                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Old ICCID numbe</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.oldICCIDNumber}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Old Sim number</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.oldSIMNumber}</span>
                                    </div>
                                </div>


                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{
                                width: '100%',
                                height: '1px',
                                margin: '2rem 0px',
                                backgroundColor: '#404040'
                            }}></div>
                        </FormControl>
                        {/*222*/}
                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>

                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Old sim photo</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.oldSIMFileURL}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Original & photocopy tax code</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.originalAndPhotocopyTaxCodeFileURL}</span>
                                    </div>
                                </div>


                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Mandatory tax code?</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.copyOfMandatoryTaxCodeFileURL}</span>
                                    </div>

                                </div>


                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{
                                width: '100%',
                                height: '1px',
                                margin: '2rem 0px',
                                backgroundColor: '#404040'
                            }}></div>
                        </FormControl>
                 
                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>

                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Document 1</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.documentFileURLs?.file1}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Document 2</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.documentFileURLs?.file2}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Document 3</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.documentFileURLs?.file3}</span>
                                    </div>
                                </div>


                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Document 4</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.documentFileURLs?.file4}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Document 5</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.documentFileURLs?.file5}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Document 6</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.documentFileURLs?.file6}</span>
                                    </div>
                                </div>


                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{
                                width: '100%',
                                height: '1px',
                                margin: '2rem 0px',
                                backgroundColor: '#404040'
                            }}></div>
                        </FormControl>


                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>

                                <div style={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        flexDirection: 'column'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Note</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '100%'
                                        }}>{data?.note}</span>
                                    </div>


                                </div>


                            </div>
                        </FormControl>
                        </ScrollbarContent>

                    </ModalBody>

                    <ModalFooter>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            {type === 'activation'?<Button onMouseDown={(e) => {
                                e.target.style.backgroundColor = 'red';
                            }}
                                                           onMouseUp={(e) => {
                                                               e.target.style.backgroundColor = 'red';
                                                           }} onClick={SaveOperator} style={{background: "red", color: 'white'}}
                                                           ml={3}>
                                Reject
                            </Button> : <Button style={{color: '#27CF7A'}} onMouseDown={(e) => {
                                e.target.style.backgroundColor = '#999999';
                            }}
                                    onMouseUp={(e) => {
                                        e.target.style.backgroundColor = '';
                                    }} colorScheme='#27CF7A' variant='outline' onClick={() => {
                                onClose();
                                saveOpen();
                                setstatusx(0)
                            }}>Edit</Button>}
                            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Button style={{color: '#999999'}} onMouseDown={(e) => {
                                    e.target.style.backgroundColor = '#999999';
                                }}
                                        onMouseUp={(e) => {
                                            e.target.style.backgroundColor = '';
                                        }} colorScheme='white' variant='outline' onClick={() => {
                                    onClose();
                                    setstatusx(0)
                                }}>Cancel</Button>

                                <Button onMouseDown={(e) => {
                                    e.target.style.backgroundColor = '#1EAB5E';
                                }}
                                        onMouseUp={(e) => {
                                            e.target.style.backgroundColor = '#27CF7A';
                                        }} onClick={SaveOperator} style={{background: "#27CF7A", color: 'white'}}
                                        ml={3}>
                                    Submit
                                </Button>
                            </div>
                        </div>
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

                      input:focus {
                        outline: none;
                      }


                    `
                }

            </style>
        </div>
    );
};


export default ViewClientInfo;