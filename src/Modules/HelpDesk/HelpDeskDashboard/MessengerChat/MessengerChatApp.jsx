
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEllipsisVertical, faMagnifyingGlass, faRetweet, faSearch, faSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment/moment.js";
import LoadingSoS from '../../../../Components/LoadingScreen/LoadingSoS';
import { global_css } from '../../../../GlobalCss/GlobalCSS';
import UseAvatar from './UseAvatar';
import messengericon from '../../../../assets/static/messenger.svg';
import Popnotification from '../../../../Components/PopNotification/Popnotification';
import config from "../../../../config.jsx";
import { css } from '@emotion/react';
import aiimage from '../../../../assets/static/aiani.gif';

const MessengerChatApp = () => {
    const [loader, setLoader] = useState(false);
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const [lastUpdate, setlastUpdate] = useState(null);
    const [lastUpdatedEmployee, setlastUpdatedEmployee] = useState(null);
    const [chat, setChat] = useState([]);
    const [individualConversationsCount, setIndividualConversationsCount] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [mainChatDiv, setMainChatDiv] = useState(true);
    const [textContents, setTextContents] = useState([]);
    const [userName, setUserName] = useState('');
    const [conversationsCount, setConversationsCount] = useState(0);
    const [previousLeadInfo, setPreviousLeadInfo] = useState([]);
    const [cusloading, setCusloading] = useState(false);
    const [leads, setLeads] = useState([]);
    const [token, setToken] = useState('YOUR_AUTH_TOKEN');
    const messagesEndRef = useRef(null);
    const [MessageIdList, setMessageIdList] = useState([]);
    const [NewDataList, setNewDataList] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const dummyTextContents = [
      {
        attachment_url: "https://example.com/images/message1.jpg",
        employee_name: "James Smith",
        from_id: "8821647851294501",
        from_name: "company",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"Hello, how can I help you?"',
        message_date: "2025-01-04T19:01:33Z",
        message_id: "m_james_1",
      },
      {
        attachment_url: null,
        employee_name: "James Smith",
        from_id: "8821647851294501",
        from_name: "company",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"Can you send me the project details?"',
        message_date: "2025-01-04T19:02:33Z",
        message_id: "m_james_2",
      },
      {
        attachment_url: null,
        employee_name: "Emma Johnson",
        from_id: "8868136306627802",
        from_name: "Emma Johnson",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"What is the total cost for this client?"',
        message_date: "2025-01-04T19:01:45Z",
        message_id: "m_emma_1",
      },
      {
        attachment_url: null,
        employee_name: "Emma Johnson",
        from_id: "8868136306627802",
        from_name: "Sheraspace",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"I need a response by tomorrow."',
        message_date: "2025-01-04T19:02:45Z",
        message_id: "m_emma_2",
      },
      {
        attachment_url: null,
        employee_name: "Liam Brown",
        from_id: "8998578303532503",
        from_name: "Liam Brown",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"Please select an option to proceed."',
        message_date: "2025-01-04T19:01:46Z",
        message_id: "m_liam_1",
      },
      {
        attachment_url: "https://example.com/images/message5.jpg",
        employee_name: "Liam Brown",
        from_id: "8998578303532503",
        from_name: "Liam Brown",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"Here is the document."',
        message_date: "2025-01-04T19:02:46Z",
        message_id: "m_liam_2",
      },
      {
        attachment_url: "https://example.com/images/message4.jpg",
        employee_name: "Olivia Davis",
        from_id: "28077016128581004",
        from_name: "Olivia Davis",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"Can you confirm the meeting time?"',
        message_date: "2025-01-04T19:02:00Z",
        message_id: "m_olivia_1",
      },
      {
        attachment_url: null,
        employee_name: "Olivia Davis",
        from_id: "28077016128581004",
        from_name: "Olivia Davis",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"Looking forward to the update."',
        message_date: "2025-01-04T19:03:00Z",
        message_id: "m_olivia_2",
      },
      {
        attachment_url: null,
        employee_name: "Support Team",
        from_id: "28077016128581004",
        from_name: "Sheraspace",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"Meeting confirmed for 2 PM."',
        message_date: "2025-01-04T19:04:00Z",
        message_id: "m_sheraspace_1",
      },
      {
        attachment_url: null,
        employee_name: "Support Team",
        from_id: "8821647851294501",
        from_name: "Sheraspace",
        is_curious: null,
        is_incident: null,
        is_junk: null,
        is_on_hold_service_request: null,
        is_problem: null,
        is_service_request: null,
        message_data: '"Details sent to your email."',
        message_date: "2025-01-04T19:03:33Z",
        message_id: "m_sheraspace_2",
      },
    ];

    const handleInputChange = (event) => {
      console.log(event.target);
      let updatedMessageIdList = [...MessageIdList];
      if (event.target.checked) {
        updatedMessageIdList.push(event.target.id);
      } else {
        updatedMessageIdList = [];
      }
      setMessageIdList(updatedMessageIdList);
      console.log(updatedMessageIdList);

      let updatedNewDataList = [...NewDataList];
      if (event.target.checked) {
        updatedNewDataList.push({ [event.target.name]: event.target.value });
      } else {
        updatedNewDataList = [];
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

    const openUserMessages = (id, name) => {
      setSelectedId(id);
      setMainChatDiv(false);
      console.log("Selected user:", id, name);
      const filteredMessages = dummyTextContents.filter(
        (message) => message.from_id === id
      );
      setTextContents(filteredMessages);
      setUserName(name);
      setCusloading(false);
      scrollToBottom();
    };

    const checkForLeads = async () => {
      setIsGenerating(true)
          try {
            const chatsToAnalyze = chat?.map(c => {
              const msgs = dummyTextContents
                .filter(m => m.from_id === c.from_id)
                .map(m => ({
                  text: JSON.parse(m.message_data),
                  date: m.message_date,
                }));

              return { from_id: c.from_id, from_name: c.from_name, messages: msgs };
            });

            if (chatsToAnalyze.length === 0) {
              toast.error("No chats to analyze");
              return;
            }
            const { data } = await axios.post(
              `${config.apiUrl}/api/product/leadanalysis`,
              { chats: JSON.stringify(chatsToAnalyze) },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Lead analysis response:", data);

            const analyzed = data.generated_content || [];
            if (!Array.isArray(analyzed)) {
              throw new Error("Invalid response format: expected array");
            }

            const newLeads = analyzed.filter(a => a.is_lead).map(a => a.from_id);

            setLeads(prev => [...new Set([...prev, ...newLeads])]);

            setPreviousLeadInfo(prev =>
              prev.map(info =>
                newLeads.includes(info.from_id)
                  ? { ...info, cycle_type_name: "Lead" }
                  : info
              )
            );

            toast.success(`${newLeads.length} leads found and marked!`);
          } catch (error) {
            console.error("API error:", error);
            toast.error("Failed to analyze chats");
          } finally {
              setIsGenerating(false)
          }
        };

    useEffect(() => {
      setChat([
        {
          conversation_id: "t_122169742628108701",
          from_id: "8821647851294501",
          from_name: "James Smith",
          updated_time: "2025-01-01T23:59:00Z",
        },
        {
          conversation_id: "t_122190117236241702",
          from_id: "8868136306627802",
          from_name: "Emma Johnson",
          updated_time: "2025-01-01T23:45:00Z",
        },
        {
          conversation_id: "t_10160610700016503",
          from_id: "8998578303532503",
          from_name: "Liam Brown",
          updated_time: "2025-01-01T23:30:00Z",
        },
        {
          conversation_id: "t_585072077458204",
          from_id: "28077016128581004",
          from_name: "company",
          updated_time: "2025-01-01T23:15:00Z",
        },
      ]);

      setConversationsCount(4);
      setIndividualConversationsCount([
        { from_id: "8821647851294501", count: 2 },
        { from_id: "8868136306627802", count: 2 },
        { from_id: "8998578303532503", count: 2 },
        { from_id: "28077016128581004", count: 2 },
      ]);
      setPreviousLeadInfo([
        {
          from_id: "8821647851294501",
          mobile_country_code: "+880",
          phone: "1234567890",
          employee_name: "James Smith",
          cycle_type_name: "MQL",
        },
        {
          from_id: "8868136306627802",
          mobile_country_code: "+880",
          phone: "0987654321",
          employee_name: "Emma Johnson",
          cycle_type_name: "MQL",
        },
        {
          from_id: "8998578303532503",
          mobile_country_code: "+880",
          phone: "1122334455",
          employee_name: "Liam Brown",
          cycle_type_name: "MQL",
        },
        {
          from_id: "28077016128581004",
          mobile_country_code: "+880",
          phone: "6677889900",
          employee_name: "Olivia Davis",
          cycle_type_name: "MQL",
        },
      ]);
      setlastUpdate("2025-01-01T23:59:00Z");
      setlastUpdatedEmployee("Admin");
    }, []);

    return (
      <div className="flex justify-center h-full w-full items-center md:items-start rounded-[3px]" style={{ backgroundColor: global_css.mainPageFrontColor }}>
        {loader && <LoadingSoS />}
        {showpopoup && <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} />}
        <div style={{ width: "100%", height: "100%", backgroundColor: global_css.mainPageFrontColor, color: global_css.primary_txt_color }} className="rounded-[3px]">
          <div className="main__chatbody" style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div 
              className={`main__chatlist ${isGenerating && 'container'}`} 
              style={{padding: isGenerating && '1rem', height: "100%", borderRight: `1px solid ${global_css.secondary_txt_color}`, flex: 2 }}
            >
              <div style={{ display: "flex", width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: '600' }}>Chat App</span>
                <span>
                  <img src={messengericon} style={{ height: "18px", width: "18px", position: "relative", top: "0px", marginLeft: "8px", marginBottom: "0px" }} />
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '', backgroundColor: '', marginTop: "4px", gap: '14px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <span style={{ color: global_css.secondary_txt_color }}>Syncronized : <span>{lastUpdatedEmployee && moment(lastUpdate).add(6, 'hours').format("YYYY/MM/DD h:mma")}</span></span>
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
                {chat?.map((item, key) => (
                  <div
                    key={key}
                    style={{ borderBottom: `1px solid ${global_css.secondary_txt_color}`, width: '100%' }}
                    onClick={() => openUserMessages(item.from_id, item.from_name)}
                    value={item.from_id}
                    className={`chatlist__item ${selectedId === item.from_id ? "active" : ""}`}
                  >
                    <div className="userMeta" value={item.from_id}>
                      <p style={{ display: 'flex', color: global_css.primary_txt_color, alignItems: 'center' }}>
                        {previousLeadInfo.map((i) => {
                          if (i.from_id === item.from_id) {
                            return (
                              <span
                                key={i.from_id}
                                title={`Phone: ${i.mobile_country_code}${i.phone}, Employee Name: ${i.employee_name}`}
                                style={{ float: 'left', marginRight: '5px' }}
                              >
                                {i.cycle_type_name !== 'MQL' && <UseAvatar cycle={i.cycle_type_name} />}
                              </span>
                            );
                          }
                          return null;
                        })}
                        {item.from_name}
                        {individualConversationsCount.map((i) => {
                          if (i.from_id === item.from_id) {
                            return (
                              <span key={i.from_id} style={{ marginLeft: '5px', color: global_css.primary_txt_color }}>
                                ({i.count})
                              </span>
                            );
                          }
                          return null;
                        })}
                      </p>
                      <span className="activeTime" style={{ color: global_css.secondary_txt_color }}>
                        {moment(item.updated_time).format('YYYY/MM/DD h:mma')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 9, height: '100%' }}>
              {mainChatDiv === false ?
                <>
                  <div className="main__chatcontent">
                    <div className="content__header">
                      <div className="blocks">
                        <div className="current-chatting-user">
                          <p style={{ color: global_css.primary_txt_color }}>
                            <strong>{userName}</strong>
                          </p>
                        </div>
                      </div>
                      <div className="blocks">
                        <div className="settings">
                          <input
                            style={{ height: "20px", width: '20px' }}
                            title="Click to select all messages"
                            type="checkbox"
                            id={selectedId}
                            onChange={(e) => allSelectFunction(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content__body">
                      <div className="chat__items">
                        <div style={{ animationDelay: `0.8s`, paddingTop: '15px',display:'flex',flexDirection:'column' }} className="chat__item" >
                          {textContents?.map((item, index) => {
                            const isCompany = item.from_name === "company" || item.from_name === "Sheraspace";
                            return (
                              <div key={index} style={{ paddingTop: '12px', display: 'flex', justifyContent: isCompany ? 'flex-end' : 'flex-start' }}>
                                <div className={`chat__item ${isCompany ? 'me' : 'other'}`} style={{ maxWidth: '80%' }}>
                                  {!isCompany && (
                                    <div item xs={1}>
                                      <input
                                        style={{ height: "20px", width: '20px', margin: '0 .5rem', marginBottom: "119%" }}
                                        name={item.from_name !== 'company' ? item.from_name : item.employee_name}
                                        disabled={item.is_service_request || item.is_on_hold_service_request || item.is_curious || item.is_problem || item.is_incident || item.is_junk}
                                        type="checkbox"
                                        id={item.message_id}
                                        checked={MessageIdList?.find((ch) => ch === item.message_id)}
                                        value={JSON.parse(item.message_data)}
                                        message={JSON.parse(item.message_data)}
                                        onChange={(e) => handleInputChange(e)}
                                      />
                                    </div>
                                  )}
                                  <div item xs={10}>
                                    <div className="chat__item__content" style={{ backgroundColor: isCompany ? '#4462ff' : '#fff', color: isCompany ? '#fff' : '#000' }}>
                                      <div className="chat__msg">
                                        {item.is_service_request && (
                                          <span style={{ marginTop: '-3%', position: 'absolute', marginLeft: '74%' }}>
                                            <img src={''} className={card.actionIcon} title="Service Request" style={{ width: "14px", color: "#545353", marginRight: "8px", marginTop: "0px", cursor: "pointer" }} />
                                          </span>
                                        )}
                                        {item.is_curious && (
                                          <span style={{ marginTop: '8%', position: 'absolute', marginLeft: '74%' }}>
                                            <img src={''} className={card.actionIcon} title="Curious" style={{ width: "14px", color: "#545353", marginRight: "8px", marginTop: "0px", cursor: "pointer" }} />
                                          </span>
                                        )}
                                        {item.is_junk && (
                                          <span style={{ marginTop: '0%', position: 'absolute', marginLeft: '74%' }}>
                                            <FontAwesomeIcon className={card.actionIcon} title="Junk" icon={faTrashAlt} style={{ marginTop: "10px", width: "13px", color: "rgb(0 0 0)", marginRight: "8px", cursor: "pointer" }} />
                                          </span>
                                        )}
                                        {item.is_problem && (
                                          <span style={{ marginTop: '4%', position: 'absolute', marginLeft: '74%' }}>
                                            <img src={''} className={card.actionIcon} title="Problem" style={{ width: "14px", color: "#545353", marginRight: "8px", marginTop: "0px", cursor: "pointer" }} />
                                          </span>
                                        )}
                                        {item.is_incident && <span style={{ marginTop: '-1%', position: 'absolute', marginLeft: '74%' }}></span>}
                                        {item.is_on_hold_service_request && <span style={{ marginTop: '-1%', position: 'absolute', marginLeft: '74%' }}></span>}
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
                                  {isCompany && (
                                    <div item xs={1}>
                                      <input
                                        style={{ height: "20px", width: '20px', margin: '0 .5rem', marginBottom: "104%" }}
                                        name={item.from_name !== 'company' ? item.from_name : item.employee_name}
                                        disabled={item.is_service_request || item.is_on_hold_service_request || item.is_curious || item.is_problem || item.is_incident || item.is_junk}
                                        type="checkbox"
                                        id={item.message_id}
                                        checked={MessageIdList?.find((ch) => ch === item.message_id)}
                                        value={JSON.parse(item.message_data)}
                                        message={JSON.parse(item.message_data)}
                                        onChange={(e) => handleInputChange(e)}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <br />
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                  </div>
                </>
                : null}
            </div>
          </div>
        </div>

        <style jsx>
        {`
          body::-webkit-scrollbar {
            display: none;
          }
          body {
            -ms-overflow-style: none;
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
            background-color: #4CAF50;
          }
          .checkbox-box {
            display: none;
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
        `}
        </style>
      </div>
    );
}

export default MessengerChatApp;





