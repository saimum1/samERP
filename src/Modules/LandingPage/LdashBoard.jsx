import React,{useState} from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS'
import { homelandingdataset } from './LandingDashboardData'
import { transition } from '@chakra-ui/react'

const LdashBoard = ({getRenderCode}) => {
    const styles = {
       
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative', 
            transition:'all 400ms'
          },
          shadow: {
            position: 'absolute',
            width: '35%', 
            height: '90%',
            borderRadius: '50%', 
            backgroundColor: 'rgba(255, 255, 255, 0.5)', 
            zIndex: 0, 
            filter: 'blur(10px)', 
            opacity:'15%',
            transition:'all 400ms'
          },
          image: {
            width: '55%', // Adjust the size of the image relative to the container
            height: '100%',
            opacity: 1,
            filter: 'contrast(2.5)', // Optional: Enhance contrast
            imageRendering: 'crisp-edges', // Optional: Improve sharpness
          },
       
      };




      const [loaded, setLoaded] = React.useState(false);

      const handleImageLoaded = () => {
        setLoaded(true);
      };


      const redirectTocomp=(e)=>{
        getRenderCode(e)

      }


  return (


    <div style={{height : '100%' ,width:'100%',backgroundColor:global_css.primary_bg,display:'flex',justifyContent:'center',alignItems:'center',transition:'all 400ms'}}>

        <div style={{height:'100%',width:'75%',display:'flex',justifyContent:'center',alignItems:'flex-start',textAlign:'center',overflowY:'auto',padding:'2rem 0rem',transition:'all 400ms'}}>
                <div className="grid-container" style={{transition:'all 400ms'}}>


                    {homelandingdataset?.map((e)=>{



                            return(

                                <div className="grid-item" 
                                 onClick={()=>redirectTocomp(e.code)}
                                >
             
                              
             
                                     <div style={styles.container} >
                                     <div style={styles.shadow}  ></div>
                                           {!loaded &&     <div style={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',width:'100%'}} className='textContainer'>
                                                             {e.name}
                                                          </div>}
                                                <img
                                                 src={e.img}
                                                 alt="Actual GIF"
                                                 style={{ width: '40%', height: '100%', opacity: loaded ? 1 : 0 , filter: 'contrast(1.5)', 
                                                 imageRendering: 'crisp-edges',transition:'all 400ms'}}
                                                 onLoad={handleImageLoaded}
             
                                                 onMouseEnter={(e)=>{e.currentTarget.style.transform = 'scale(1.2)'}}
                                                 onMouseLeave={(e)=>{e.currentTarget.style.transform = 'scale(1)'}}
                                             />
             
                                     </div>
             
             
                                     <div style={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',width:'100%'}} className='textContainer'>
             
                                         
                                             {e.name}
                                     
                                     </div>
             
             
             
                                 </div>
                            )
                    })}
               
                 



                   
                </div>
         </div>
           
            <style jsx>
                {
                    `
                    .grid-container {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr); /* Each row contains 4 items with equal width */
                        gap: 20px; /* Gap between items */
                        max-width: 1200px; /* Maximum width of the grid container */
                        width: 100%; /* Ensure the grid container takes up the available width */
                        justify-content: center; /* Center grid items horizontally */
                        transition:all 400ms;
                      }
                      
                      .grid-item {
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        width:100%;
                        flex-direction:column;
                        padding: 20px; /* Padding around items */
                        text-align: center; /* Center text */
                        height:10rem;
                        cursor:pointer;
                      }



                      .textContainer {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        width: 100%;
                        color: #E4E4E4;
                    
                        font-family: "Inter", system-ui, sans-serif;
                        font-size: 20px;
                        font-weight:bold; 
                      }
                      


                 
                    
                    `
                }
            </style>
        </div>
  )
}

export default LdashBoard