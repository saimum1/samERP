import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment/moment.js";
import LoadingSoS from '../../../../Components/LoadingScreen/LoadingSoS';
import { global_css } from '../../../../GlobalCss/GlobalCSS';
import UseAvatar from './UseAvatar';
import messengericon from '../../../../assets/static/messenger.svg';
import Popnotification from '../../../../Components/PopNotification/Popnotification';
import config from "../../../../config.jsx";
import aiimage from '../../../../assets/static/aiani.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../../../Context/AuthInfo.jsx';
import { faPaperPlane, faUserTie } from '@fortawesome/free-solid-svg-icons';

const MessengerChatApp = () => {
    const {user} = useAuth();
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupStatus, setPopupStatus] = useState('success');
    const [popupMsg, setPopupMsg] = useState('');
    const [lastUpdate, setLastUpdate] = useState(null);
    const [lastUpdatedEmployee, setLastUpdatedEmployee] = useState(null);
    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [leads, setLeads] = useState([]);
    const [token] = useState('YOUR_AUTH_TOKEN');
    const messagesEndRef = useRef(null);
    const ws = useRef(null);
    const [replyText, setReplyText] = useState("");

    // LocalStorage utility functions
    const loadFromLocalStorage = useCallback((key, defaultValue) => {

            const savedData = localStorage.getItem(key);
            return savedData ? JSON.parse(savedData) : defaultValue;
     
    }, []);

    const saveToLocalStorage = useCallback((key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    }, []);

    useEffect(() => {
     const chatmessages=loadFromLocalStorage('messenger_chat_messages', []);
     console.log("ininesage",chatmessages)
      const initialChats = loadFromLocalStorage('messenger_chat', []);
      setChatList(initialChats);
      setMessages(chatmessages);
    }, [])
   
    const savechatlist=(data)=>{
        saveToLocalStorage('messenger_chat', data);
    }

    const savechatmessages=(data)=>{
        saveToLocalStorage('messenger_chat_messages', data);

    }

   
    const connectWebSocket = useCallback(() => {
        ws.current = new WebSocket(`${config.apiUrlWEBScoket}/api/ws/agent`)
        // ws.current = new WebSocket("ws://127.0.0.1:8000/ws/agent");
 
        ws.current.onopen = () => {
            console.log("✅ Agent connected to server");
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("websocket data recieve", data);

 if (data.type === "message") {
        const newMessage = {
            attachment_url: null,
            employee_name: "Team",
            from_id: data.client_id,
            from_name: data.username,
            message_data: JSON.stringify(data.message),
            message_date: new Date().toISOString(),
            message_id: data.messageid ,
            fromType:data.from_type  
        };

        console.log("newupdated message", newMessage);

        setMessages((prev) => {
            const exists = prev.some(msg => msg.message_id === newMessage.message_id);
            if (!exists) {
                const updated = [...prev, newMessage];
                savechatmessages(updated); 
                return updated;
            }
            return prev;
        });

        // Update chat list
        setChatList((prev) => {
            const existingChat = prev.find((c) => c.from_id === data.client_id);
            let updated;
            if (!existingChat) {
                updated = [
                    ...prev,
                    {
                        conversation_id: data.client_id,
                        from_id: data.client_id,
                        from_name: data.username,
                        updated_time: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
                        cycle_type_name: '',
                        avatarUrl:data?.image
                    },
                ];
            } else {
                updated = prev.map((chat) =>
                    chat.from_id === data.client_id
                        ? { ...chat,fromType:data?.from_type ,avatarUrl:data?.image, updated_time: moment().format("YYYY-MM-DDTHH:mm:ssZ") }
                        : chat
                );
            }
            savechatlist(updated);
            return updated;
        });
    }
           if(data.type ==='history'){
            console.log("hostory messsages",data)
            const newMessages = data.messages
                .map((msg, index) => ({
                    attachment_url:  null,
                    employee_name: "Support Team",
                    from_id: msg.client_id,
                    from_name: msg.username,
                    message_data: JSON.stringify(msg.message),
                    message_date: new Date().toISOString(),
                    message_id:msg.messageid, 
                    fromType:msg?.from_type  
                }))

                setMessages((prev) => {
                  const uniqueNewMessages = newMessages?.filter(
                    (newMsg) => !prev.some((msg) => msg.message_id === newMsg.message_id)
                  );

                  if (uniqueNewMessages.length > 0) {
                    const updated = [...prev, ...uniqueNewMessages];
                    savechatmessages(updated);
                    return updated;
                  }

                  return prev;
                });


               setChatList((prev) => {
                        let updated = [...prev];

                        newMessages.forEach((msg) => {
                        const existingChat = updated.find((c) => c.from_id === msg.from_id);

                        if (!existingChat) {
                            updated.push({
                            conversation_id: msg.from_id,
                            from_id: msg.from_id,
                            from_name: msg.from_name,
                            updated_time: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
                            cycle_type_name: "",
                            avatarUrl: msg?.image || '',
                            fromType: msg?.fromType,

                            });
                        } else {
                            updated = updated.map((chat) =>
                            chat.from_id === msg.from_id
                                ? {
                                    ...chat,
                                    fromType: msg?.fromType,
                                    avatarUrl: msg?.image || chat.avatarUrl,
                                    updated_time: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
                                }
                                : chat
                            );
                        }
                        });

                        savechatlist(updated);
                        return updated;
                    });

            console.log("newmessages",newMessages)    
          
          }   
        };

        ws.current.onclose = () => {
            console.log("WebSocket disconnected, attempting to reconnect...");
            setTimeout(connectWebSocket, 3000);
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }, []);


    useEffect(() => {
        connectWebSocket();
        return () => {
            ws.current?.close();
        };
    }, [connectWebSocket]);

    // Scroll to bottom when messages change
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (selectedChat) {
            scrollToBottom();
        }
    }, [messages, selectedChat, scrollToBottom]);

    // Handle chat selection
    const openUserMessages = useCallback((from_id, from_name) => {
        setSelectedChat({ from_id, from_name });
    }, []);

    // Send reply
    const sendReply = useCallback((client_id, text) => {
        if (!text.trim()) return;

        const newMessage = {
            attachment_url: null,
            employee_name: 'saimum',
            from_id: client_id,
            from_name: "saimum",
            message_data: JSON.stringify(text),
            message_date: new Date().toISOString(),
            message_id: `m_${client_id}_agent_${Date.now()}`,
            fromType: "agent",

        };

        setMessages((prev) => [...prev, newMessage]);
        ws.current?.send(
            JSON.stringify({
                type: "reply",
                client_id,
                message: text,
                newMessage
                
            })
        );
    }, []);

    // Lead analysis
    const checkForLeads = useCallback(async () => {
        setIsGenerating(true);
        try {
            const chatsToAnalyze = chatList.map((chat) => ({
                from_id: chat.from_id,
                from_name: chat.from_name,
                messages: messages
                    .filter((m) => m.from_id === chat.from_id)
                    .map((m) => ({
                        text: JSON.parse(m.message_data),
                        date: m.message_date,
                    })),
            }));

            if (!chatsToAnalyze.length) {
                toast.error("No chats to analyze");
                return;
            }

            const { data } = await axios.post(
                `${config.apiUrl}/api/product/leadanalysis`,
                { chats: JSON.stringify(chatsToAnalyze) },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const analyzed = data.generated_content || [];
            if (!Array.isArray(analyzed)) {
                throw new Error("Invalid response format: expected array");
            }

            const newLeads = analyzed.filter((a) => a.is_lead).map((a) => a.from_id);
            console.log("checkingloead",newLeads)
            setLeads((prev) => [...new Set([...prev, ...newLeads])]);
            toast.success(`${newLeads.length} leads found and marked!`);
        } catch (error) {
            console.error("API error:", error);
            toast.error("Failed to analyze chats");
        } finally {
            setIsGenerating(false);
        }
    }, [chatList, messages, token]);

    // Memoized filtered messages
    const filteredMessages = useMemo(() => {
        return selectedChat
            ? messages.filter((message) => message.from_id === selectedChat.from_id)
            : [];
    }, [messages, selectedChat]);

    // Render UI (unchanged)
    return (
        <div className="flex justify-center h-full w-full items-center md:items-start rounded-[3px]" style={{ backgroundColor: global_css.mainPageFrontColor }}>
            {loader && <LoadingSoS />}
            {showPopup && <Popnotification msg={popupMsg} showpopoup={showPopup} status={popupStatus} />}
            <div style={{ width: "100%", height: "100%", backgroundColor: global_css.mainPageFrontColor, color: global_css.primary_txt_color }} className="rounded-[3px]">
                <div className="main__chatbody" style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div 
                        className={`main__chatlist ${isGenerating && 'container'}`} 
                        style={{ padding: isGenerating && '1rem', height: "100%", borderRight: `1px solid ${global_css.secondary_txt_color}`, flex: 2 }}
                    >
                        <div style={{ display: "flex", width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <span style={{ fontSize: '18px', fontWeight: '600' }}>Chat App</span>
                            <span>
                                <img src={messengericon} style={{ height: "18px", width: "18px", position: "relative", top: "0px", marginLeft: "8px", marginBottom: "0px" }} />
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: "4px", gap: '14px', fontSize: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <span style={{ color: global_css.secondary_txt_color }}>Synchronized: <span>{lastUpdatedEmployee && moment(lastUpdate).add(6, 'hours').format("YYYY/MM/DD h:mma")}</span></span>
                            </div>
                            <div style={{ marginTop: '10px', display: 'flex', gap: "1rem" }}>
                                <button
                                    onClick={checkForLeads}
                                    style={{
                                        padding: '5px 10px',
                                        background: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    generate leads
                                </button>
                                <img src={aiimage} alt="AI Generation" width="35" style={{ display: isGenerating ? 'block' : 'none', cursor: 'pointer' }} />
                            </div>
                        </div>
                        <div style={{ width: "100%", height: '1px', backgroundColor: global_css.secondary_txt_color, margin: '10px 0px' }}></div>
                        <div className="chatlist__items" style={{ width: '100%' }}>
                            {chatList?.map((item, key) => (
                                <div
                                    key={key}
                                    style={{ borderBottom: `1px solid ${global_css.secondary_txt_color}`, width: '100%' }}
                                    onClick={() => openUserMessages(item.from_id, item.from_name)}
                                    className={`chatlist__item ${selectedChat?.from_id === item.from_id ? "active" : ""}`}
                                >
                                    <div className="userMeta" style={{display:"flex",flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',width:'100%'}}>
                                        <div style={{ display: 'flex', color: global_css.primary_txt_color, alignItems: 'center',justifyContent:'flex-start',width:'100%' }}>
                                            
                                            <span style={{ float: 'left', marginRight: '5px' }}>
                                                {/* {item.cycle_type_name !== 'MQL' && <UseAvatar cycle={item.cycle_type_name} />} */}
                                                <img src={item?.avatarUrl} style={{width:'2rem',height:'1.8rem',borderRadius:'50%'}}/>
                                            </span>

                                            <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',gap:'0.2rem',}}>
                                              <span style={{fontWeight:'700'}}>
                                                {item.from_name}
                                              </span>
                                              
                                              <span className="activeTime" style={{ color: global_css.secondary_txt_color,fontSize:'8px' }}>
                                              {moment(item.updated_time).format('YYYY/MM/DD h:mma')}
                                              </span>
                                            </div>

                                            <div style={{paddingLeft:'2rem'}}>
                                                {leads?.includes(item.from_id) && (
                                                    <span className="activeTime" style={{ color: global_css.secondary_txt_color,fontSize:'20px' }}>
                                                        <FontAwesomeIcon title="lead" width={"100%"} icon={faUserTie} color='#007bff'/>
                                                    </span>
                                                )}
                                                        
                                                
                                            </div>
                                      </div>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: 9, height: '100%' }}>
                        {selectedChat && (
                            <div className="main__chatcontent">
                                <div className="content__header">
                                    <div className="blocks">
                                        <div className="current-chatting-user">
                                            <p style={{ color: global_css.primary_txt_color }}>
                                                <strong>{selectedChat.from_name}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="content__body" style={{height:'100vh'}}>
                                    <div className="chat__items">
                                        <div style={{ animationDelay:  `0.4s`, paddingTop: '15px', display: 'flex', flexDirection: 'column' }} className="chat__item">
                                            {filteredMessages?.map((item, index) => {
                              
                                             
                                                return (
                                                    <div key={index} style={{ paddingTop: '12px', display: 'flex', justifyContent: item?.fromType==='agent'  ? 'flex-end' : 'flex-start' }}>
                                                        <div className={`chat__item ${item?.fromType==='agent' ? 'me' : 'other'}`} style={{ maxWidth: '80%' }}>
                                                            <div className="chat__item__content" style={{ backgroundColor: item?.fromType==='agent' ? '#4462ff' : '#fff', color: item?.fromType==='agent'  ? '#fff' : '#000' }}>
                                                                <div className="chat__msg">
                                                                    <p><span dangerouslySetInnerHTML={{ __html: JSON.parse(item.message_data).replace(/(https?:\/\/[^\s]+)/g, "<a href='$1' target='_blank' style='text-decoration: underline; word-break:break-all; color: #ef5359;' >$1</a>") }} /></p>
                                                                    {item.attachment_url && (
                                                                        <img style={{ height: "200px", width: "100%", objectFit: 'contain' }} src={item.attachment_url} />
                                                                    )}
                                                                </div>
                                                                <div className="chat__meta">
                                                                    <span>{moment(item.message_date).format("YYYY/MM/DD h:mma")}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            <div ref={messagesEndRef} />
                                        </div>
                                    </div>

                                   
                                </div>
                            </div>
                        )}
                        
                        

                                          
                            {selectedChat && 
                                <div style={{width:"100%",backgroundColor:"",paddingLeft:"2rem",display:'flex',justifyContent:'flex-start',gap:'1rem',height:'2.5rem'}}>
                          
                                    <textarea
                                    style={{width:"90%",height:'100%',color:"black",padding:"3px 4px"}}
                                    type="text"
                                    placeholder="Type a reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                        sendReply(selectedChat.from_id, replyText);
                                        setReplyText("");
                                        }
                                    }}
                                    />
                                    <button
                                    style={{width:'3rem'}}
                                    id="sendMsgBtn"
                                    onClick={() => {
                                        sendReply(selectedChat.from_id, replyText);
                                        setReplyText("");
                                    }}
                                    >
                                      r
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                    </button>
                             
                            </div>}

                    </div>

                    
                </div>
            </div>
            <style jsx>{`
                body::-webkit-scrollbar {
                    display: none;
                }
                body {
                    -ms-overflow-style: none;
                    scrollbar-width: thin;
                    scrollbar-color: transparent transparent;
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
                    transition: all 300ms;
                    width: 100%;
                    margin-top: 9px;
                    overflow: auto;
                    height: 70%;
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
                    animation-duration: 0.2s;
                    animation-iteration-count: 1;
                    animation-direction: normal;
                    animation-timing-function: cubic-bezier(0.88, 0.19, 0.37, 1.11);
                    animation-fill-mode: both;
                    animation-delay: 0.1s;
                }
                @keyframes showIn {
                    0% { transform: scale(0); }
                    100% { transform: scale(1); }
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
                    border-bottom: 1px solid ${global_css.secondary_txt_color};
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
                    margin-bottom: 15px;
                    transition: all 0.3s ease;
                    transform: scale(0);
                    animation-name: showIn;
                    animation-duration: 0.2s;
                    animation-iteration-count: 1;
                    animation-direction: normal;
                    animation-timing-function: cubic-bezier(0.88, 0.19, 0.37, 1.11);
                    animation-fill-mode: both;
                    animation-delay: 0.2s;
                }
                @keyframes showIn {
                    0% { transform: scale(0); }
                    100% { transform: scale(1); }
                }
                .chat__item__content {
                    padding: 10px;
                    border-radius: 10px 10px 0 10px;
                    width: 100%;
                    font-size: 12px;
                }
                .chat__item.me .chat__item__content {
                    border-radius: 10px 10px 0 10px;
                }
                .chat__item.other .chat__item__content {
                    border-radius: 10px 10px 10px 0;
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
                    font-size: 14px;
                    color: #fff;
                }
                .chat__item.other .chat__item__content .chat__msg p {
                    font-size: 14px;
                    color: #000000;
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
                    border-radius: 10px;
                    padding: 15px 22px;
                    display: flex;
                }
                .container {
                    position: relative;
                    width: 300px;
                    height: 200px;
                    overflow: hidden;
                    border-radius: 10px;
                }
                .container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 10px;
                    padding: 3px;
                    background: conic-gradient(from var(--angle, 0deg), #00f7ff, #ff007bff, #007bff, #00f7ff, #ff6027ff);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
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
                    border-radius: 10px;
                    padding: 15px 22px;
                    display: flex;
                }
                .container {
                    position: relative;
                    width: 300px;
                    height: 200px;
                    overflow: hidden;
                    border-radius: 10px;
                }
                .container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 10px;
                    padding: 3px;
                    background: conic-gradient(from var(--angle, 0deg), #00f7ff, #ff007bff, #007bff, #00f7ff, #ff6027ff);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    animation: rotateBorder 4s linear infinite;
                }
                .content-box {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #333;
                    color: white;
                    border-radius: 8px;
                }
                @keyframes rotateBorder {
                    to { --angle: 360deg; }
                }
                @property --angle {
                    syntax: '<angle>';
                    initial-value: 0deg;
                    inherits: false;
                }
            `}</style>
        </div>
    );
};

export default MessengerChatApp;
