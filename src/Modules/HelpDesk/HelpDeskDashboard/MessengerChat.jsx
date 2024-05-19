import React from "react";
// import UseAvatar from "../../../common/hook/useAvatar";
// import div from "@material-ui/core/div";
import Moment from "moment";
// import {Helmet} from "react-helmet";
// import popUpStyle from "../../../Components/styles/style.css";
// import {closePopUp, openPopUpDynamic} from "../../../setting/services/popupOpenFunction/popUpOpen";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faAngleDoubleLeft, faAngleRight, faPencilAlt, faTrashAlt, faBars, faExclamationTriangle, faCheckCircle, faEllipsisH, faFilter, faPlus, faRetweet, faSearch, faStroopwafel, faTimes, faDuotone, faHandshake, faExclamationCircle, faSpinner, faLink, faPause, faAngleDoubleDown, } from "@fortawesome/free-solid-svg-icons";
// import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import CustomNotifier, { openCustomNotifierSnackbar } from "../../../Components/CustomNotifier";
// import PhoneInput from "react-phone-number-input";
// import flags from "react-phone-number-input/flags";
// import "react-phone-number-input/style.css";
// import Avatar from "react-avatar";
// import { getData, hasRoleComponent } from '../../../setting/services/fetchData';
// import getConfig from "next/config";
// import "../../../../pages/style.css";

// import "react-google-places-autocomplete/dist/index.min.css";
import axios from "axios";
// import dynamic from "next/dynamic";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import card from "../../../Components/styles/settingCard.css";
// import popUpStyle from '../../../Components/styles/style.css';
// import SunEditor from "../../EditorComponents/sunEditor";
// import Curious from'../curious/curious';
// import EditAgent from'../editAgent/editAgent';
// import ProblemIncident from'../problemIncident/problemIncident';
// import ServiceRequest from'../serviceRequest/serviceRequest';
// import OnHoldServiceRequest from "../onHoldServiceRequest/onHoldServiceRequest";

// import curiousImg from '../../../images/curious.png'
// import problemImg from '../../../images/problem.png'
// import serviceRequestImg from '../../../images/serviceRequest.png'
// import moreOptions from '../../../images/moreOptions.png'


// import moreOptions from '../../../../../admin_palette_ui/pages/images/moreOptions'

import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faChessBoard, faRetweet, faSearch } from "@fortawesome/free-solid-svg-icons";
// const config = getConfig();
// library.add(faTimes, fab, faStroopwafel, faPlus, faAngleRight);
class Messenger extends React.Component {

	

	constructor() {
		super();
		this.state = {
			companyId: 'cd8f6048-cb91-4017-b210-595e98c1d97d',
			employeeId: '23424',
			disabled: true,
			serviceReq: [],
			accessToken: "",
			selectedId:'',
			lastUpdate: "",
			chat: [],
			textContents: [],
			data: [],
			newDataList: [],
			messageIdList: [],
			generationGotList: [],
			duplicateList: [],
			assignListForSave: [],
			callPurposeList: [],
			teamList: [],
			messageList: [],
			ioRegCorespondentPhone: "",
			listChecked: false,
			followUp: false,
			todayDate: new Date(),
			showValue: false,
			clickDivKYC: false,
			// apiUrl: config.publicRuntimeConfig.publicRuntimeConfigValue.apiUrl,
            apiUrl:'http://0.0.0.0:5000',
			followupDate: null,
			cycleTypeName: null,
			followupTime: null,
			leadGenerationId: "",
			loadingRef: false,
			OnHoldOpen: false,
			serviceRequestPopup: false,
			socialMediaId: '',
			messageId:'', 
			userId:'3ef4418f-3e60-4f81-998f-8f8d5dcaa6df', 
			assignTo: null,
			content: "",
			discussionDate: null,
			discussionTIme: null,
			discussionMedia: "",
			CountryCodes: [
				{ name: "Afghanistan", dial_code: "+93", code: "AF" },
				{ name: "Aland Islands", dial_code: "+358", code: "AX" },
				{ name: "Albania", dial_code: "+355", code: "AL" },
				{ name: "Algeria", dial_code: "+213", code: "DZ" },
				{ name: "AmericanSamoa", dial_code: "+1684", code: "AS" },
				{ name: "Andorra", dial_code: "+376", code: "AD" },
				{ name: "Angola", dial_code: "+244", code: "AO" },
				{ name: "Anguilla", dial_code: "+1264", code: "AI" },
				{ name: "Antarctica", dial_code: "+672", code: "AQ" },
				{ name: "Antigua and Barbuda", dial_code: "+1268", code: "AG" },
				{ name: "Argentina", dial_code: "+54", code: "AR" },
				{ name: "Armenia", dial_code: "+374", code: "AM" },
				{ name: "Aruba", dial_code: "+297", code: "AW" },
				{ name: "Australia", dial_code: "+61", code: "AU" },
				{ name: "Austria", dial_code: "+43", code: "AT" },
				{ name: "Azerbaijan", dial_code: "+994", code: "AZ" },
				{ name: "Bahamas", dial_code: "+1242", code: "BS" },
				{ name: "Bahrain", dial_code: "+973", code: "BH" },
				{ name: "Bangladesh", dial_code: "+880", code: "BD" },
				{ name: "Barbados", dial_code: "+1246", code: "BB" },
				{ name: "Belarus", dial_code: "+375", code: "BY" },
				{ name: "Belgium", dial_code: "+32", code: "BE" },
				{ name: "Belize", dial_code: "+501", code: "BZ" },
				{ name: "Benin", dial_code: "+229", code: "BJ" },
				{ name: "Bermuda", dial_code: "+1441", code: "BM" },
				{ name: "Bhutan", dial_code: "+975", code: "BT" },
				{
					name: "Bolivia, Plurinational State of",
					dial_code: "+591",
					code: "BO",
				},
				{ name: "Bosnia and Herzegovina", dial_code: "+387", code: "BA" },
				{ name: "Botswana", dial_code: "+267", code: "BW" },
				{ name: "Brazil", dial_code: "+55", code: "BR" },
				{
					name: "British Indian Ocean Territory",
					dial_code: "+246",
					code: "IO",
				},
				{ name: "Brunei Darussalam", dial_code: "+673", code: "BN" },
				{ name: "Bulgaria", dial_code: "+359", code: "BG" },
				{ name: "Burkina Faso", dial_code: "+226", code: "BF" },
				{ name: "Burundi", dial_code: "+257", code: "BI" },
				{ name: "Cambodia", dial_code: "+855", code: "KH" },
				{ name: "Cameroon", dial_code: "+237", code: "CM" },
				{ name: "Canada", dial_code: "+1", code: "CA" },
				{ name: "Cape Verde", dial_code: "+238", code: "CV" },
				{ name: "Cayman Islands", dial_code: "+ 345", code: "KY" },
				{ name: "Central African Republic", dial_code: "+236", code: "CF" },
				{ name: "Chad", dial_code: "+235", code: "TD" },
				{ name: "Chile", dial_code: "+56", code: "CL" },
				{ name: "China", dial_code: "+86", code: "CN" },
				{ name: "Christmas Island", dial_code: "+61", code: "CX" },
				{ name: "Cocos (Keeling) Islands", dial_code: "+61", code: "CC" },
				{ name: "Colombia", dial_code: "+57", code: "CO" },
				{ name: "Comoros", dial_code: "+269", code: "KM" },
				{ name: "Congo", dial_code: "+242", code: "CG" },
				{
					name: "Congo, The Democratic Republic of the Congo",
					dial_code: "+243",
					code: "CD",
				},
				{ name: "Cook Islands", dial_code: "+682", code: "CK" },
				{ name: "Costa Rica", dial_code: "+506", code: "CR" },
				{ name: "Cote d'Ivoire", dial_code: "+225", code: "CI" },
				{ name: "Croatia", dial_code: "+385", code: "HR" },
				{ name: "Cuba", dial_code: "+53", code: "CU" },
				{ name: "Cyprus", dial_code: "+357", code: "CY" },
				{ name: "Czech Republic", dial_code: "+420", code: "CZ" },
				{ name: "Denmark", dial_code: "+45", code: "DK" },
				{ name: "Djibouti", dial_code: "+253", code: "DJ" },
				{ name: "Dominica", dial_code: "+1767", code: "DM" },
				{ name: "Dominican Republic", dial_code: "+1849", code: "DO" },
				{ name: "Ecuador", dial_code: "+593", code: "EC" },
				{ name: "Egypt", dial_code: "+20", code: "EG" },
				{ name: "El Salvador", dial_code: "+503", code: "SV" },
				{ name: "Equatorial Guinea", dial_code: "+240", code: "GQ" },
				{ name: "Eritrea", dial_code: "+291", code: "ER" },
				{ name: "Estonia", dial_code: "+372", code: "EE" },
				{ name: "Ethiopia", dial_code: "+251", code: "ET" },
				{ name: "Falkland Islands (Malvinas)", dial_code: "+500", code: "FK" },
				{ name: "Faroe Islands", dial_code: "+298", code: "FO" },
				{ name: "Fiji", dial_code: "+679", code: "FJ" },
				{ name: "Finland", dial_code: "+358", code: "FI" },
				{ name: "France", dial_code: "+33", code: "FR" },
				{ name: "French Guiana", dial_code: "+594", code: "GF" },
				{ name: "French Polynesia", dial_code: "+689", code: "PF" },
				{ name: "Gabon", dial_code: "+241", code: "GA" },
				{ name: "Gambia", dial_code: "+220", code: "GM" },
				{ name: "Georgia", dial_code: "+995", code: "GE" },
				{ name: "Germany", dial_code: "+49", code: "DE" },
				{ name: "Ghana", dial_code: "+233", code: "GH" },
				{ name: "Gibraltar", dial_code: "+350", code: "GI" },
				{ name: "Greece", dial_code: "+30", code: "GR" },
				{ name: "Greenland", dial_code: "+299", code: "GL" },
				{ name: "Grenada", dial_code: "+1473", code: "GD" },
				{ name: "Guadeloupe", dial_code: "+590", code: "GP" },
				{ name: "Guam", dial_code: "+1671", code: "GU" },
				{ name: "Guatemala", dial_code: "+502", code: "GT" },
				{ name: "Guernsey", dial_code: "+44", code: "GG" },
				{ name: "Guinea", dial_code: "+224", code: "GN" },
				{ name: "Guinea-Bissau", dial_code: "+245", code: "GW" },
				{ name: "Guyana", dial_code: "+595", code: "GY" },
				{ name: "Haiti", dial_code: "+509", code: "HT" },
				{
					name: "Holy See (Vatican City State)",
					dial_code: "+379",
					code: "VA",
				},
				{ name: "Honduras", dial_code: "+504", code: "HN" },
				{ name: "Hong Kong", dial_code: "+852", code: "HK" },
				{ name: "Hungary", dial_code: "+36", code: "HU" },
				{ name: "Iceland", dial_code: "+354", code: "IS" },
				{ name: "India", dial_code: "+91", code: "IN" },
				{ name: "Indonesia", dial_code: "+62", code: "ID" },
				{
					name: "Iran, Islamic Republic of Persian Gulf",
					dial_code: "+98",
					code: "IR",
				},
				{ name: "Iraq", dial_code: "+964", code: "IQ" },
				{ name: "Ireland", dial_code: "+353", code: "IE" },
				{ name: "Isle of Man", dial_code: "+44", code: "IM" },
				{ name: "Israel", dial_code: "+972", code: "IL" },
				{ name: "Italy", dial_code: "+39", code: "IT" },
				{ name: "Jamaica", dial_code: "+1876", code: "JM" },
				{ name: "Japan", dial_code: "+81", code: "JP" },
				{ name: "Jersey", dial_code: "+44", code: "JE" },
				{ name: "Jordan", dial_code: "+962", code: "JO" },
				{ name: "Kazakhstan", dial_code: "+77", code: "KZ" },
				{ name: "Kenya", dial_code: "+254", code: "KE" },
				{ name: "Kiribati", dial_code: "+686", code: "KI" },
				{
					name: "Korea, Democratic People's Republic of Korea",
					dial_code: "+850",
					code: "KP",
				},
				{
					name: "Korea, Republic of South Korea",
					dial_code: "+82",
					code: "KR",
				},
				{ name: "Kuwait", dial_code: "+965", code: "KW" },
				{ name: "Kyrgyzstan", dial_code: "+996", code: "KG" },
				{ name: "Laos", dial_code: "+856", code: "LA" },
				{ name: "Latvia", dial_code: "+371", code: "LV" },
				{ name: "Lebanon", dial_code: "+961", code: "LB" },
				{ name: "Lesotho", dial_code: "+266", code: "LS" },
				{ name: "Liberia", dial_code: "+231", code: "LR" },
				{ name: "Libyan Arab Jamahiriya", dial_code: "+218", code: "LY" },
				{ name: "Liechtenstein", dial_code: "+423", code: "LI" },
				{ name: "Lithuania", dial_code: "+370", code: "LT" },
				{ name: "Luxembourg", dial_code: "+352", code: "LU" },
				{ name: "Macao", dial_code: "+853", code: "MO" },
				{ name: "Macedonia", dial_code: "+389", code: "MK" },
				{ name: "Madagascar", dial_code: "+261", code: "MG" },
				{ name: "Malawi", dial_code: "+265", code: "MW" },
				{ name: "Malaysia", dial_code: "+60", code: "MY" },
				{ name: "Maldives", dial_code: "+960", code: "MV" },
				{ name: "Mali", dial_code: "+223", code: "ML" },
				{ name: "Malta", dial_code: "+356", code: "MT" },
				{ name: "Marshall Islands", dial_code: "+692", code: "MH" },
				{ name: "Martinique", dial_code: "+596", code: "MQ" },
				{ name: "Mauritania", dial_code: "+222", code: "MR" },
				{ name: "Mauritius", dial_code: "+230", code: "MU" },
				{ name: "Mayotte", dial_code: "+262", code: "YT" },
				{ name: "Mexico", dial_code: "+52", code: "MX" },
				{
					name: "Micronesia, Federated States of Micronesia",
					dial_code: "+691",
					code: "FM",
				},
				{ name: "Moldova", dial_code: "+373", code: "MD" },
				{ name: "Monaco", dial_code: "+377", code: "MC" },
				{ name: "Mongolia", dial_code: "+976", code: "MN" },
				{ name: "Montenegro", dial_code: "+382", code: "ME" },
				{ name: "Montserrat", dial_code: "+1664", code: "MS" },
				{ name: "Morocco", dial_code: "+212", code: "MA" },
				{ name: "Mozambique", dial_code: "+258", code: "MZ" },
				{ name: "Myanmar", dial_code: "+95", code: "MM" },
				{ name: "Namibia", dial_code: "+264", code: "NA" },
				{ name: "Nauru", dial_code: "+674", code: "NR" },
				{ name: "Nepal", dial_code: "+977", code: "NP" },
				{ name: "Netherlands", dial_code: "+31", code: "NL" },
				{ name: "Netherlands Antilles", dial_code: "+599", code: "AN" },
				{ name: "New Caledonia", dial_code: "+687", code: "NC" },
				{ name: "New Zealand", dial_code: "+64", code: "NZ" },
				{ name: "Nicaragua", dial_code: "+505", code: "NI" },
				{ name: "Niger", dial_code: "+227", code: "NE" },
				{ name: "Nigeria", dial_code: "+234", code: "NG" },
				{ name: "Niue", dial_code: "+683", code: "NU" },
				{ name: "Norfolk Island", dial_code: "+672", code: "NF" },
				{ name: "Northern Mariana Islands", dial_code: "+1670", code: "MP" },
				{ name: "Norway", dial_code: "+47", code: "NO" },
				{ name: "Oman", dial_code: "+968", code: "OM" },
				{ name: "Pakistan", dial_code: "+92", code: "PK" },
				{ name: "Palau", dial_code: "+680", code: "PW" },
				{
					name: "Palestinian Territory, Occupied",
					dial_code: "+970",
					code: "PS",
				},
				{ name: "Panama", dial_code: "+507", code: "PA" },
				{ name: "Papua New Guinea", dial_code: "+675", code: "PG" },
				{ name: "Paraguay", dial_code: "+595", code: "PY" },
				{ name: "Peru", dial_code: "+51", code: "PE" },
				{ name: "Philippines", dial_code: "+63", code: "PH" },
				{ name: "Pitcairn", dial_code: "+872", code: "PN" },
				{ name: "Poland", dial_code: "+48", code: "PL" },
				{ name: "Portugal", dial_code: "+351", code: "PT" },
				{ name: "Puerto Rico", dial_code: "+1939", code: "PR" },
				{ name: "Qatar", dial_code: "+974", code: "QA" },
				{ name: "Romania", dial_code: "+40", code: "RO" },
				{ name: "Russia", dial_code: "+7", code: "RU" },
				{ name: "Rwanda", dial_code: "+250", code: "RW" },
				{ name: "Reunion", dial_code: "+262", code: "RE" },
				{ name: "Saint Barthelemy", dial_code: "+590", code: "BL" },
				{
					name: "Saint Helena, Ascension and Tristan Da Cunha",
					dial_code: "+290",
					code: "SH",
				},
				{ name: "Saint Kitts and Nevis", dial_code: "+1869", code: "KN" },
				{ name: "Saint Lucia", dial_code: "+1758", code: "LC" },
				{ name: "Saint Martin", dial_code: "+590", code: "MF" },
				{ name: "Saint Pierre and Miquelon", dial_code: "+508", code: "PM" },
				{
					name: "Saint Vincent and the Grenadines",
					dial_code: "+1784",
					code: "VC",
				},
				{ name: "Samoa", dial_code: "+685", code: "WS" },
				{ name: "San Marino", dial_code: "+378", code: "SM" },
				{ name: "Sao Tome and Principe", dial_code: "+239", code: "ST" },
				{ name: "Saudi Arabia", dial_code: "+966", code: "SA" },
				{ name: "Senegal", dial_code: "+221", code: "SN" },
				{ name: "Serbia", dial_code: "+381", code: "RS" },
				{ name: "Seychelles", dial_code: "+248", code: "SC" },
				{ name: "Sierra Leone", dial_code: "+232", code: "SL" },
				{ name: "Singapore", dial_code: "+65", code: "SG" },
				{ name: "Slovakia", dial_code: "+421", code: "SK" },
				{ name: "Slovenia", dial_code: "+386", code: "SI" },
				{ name: "Solomon Islands", dial_code: "+677", code: "SB" },
				{ name: "Somalia", dial_code: "+252", code: "SO" },
				{ name: "South Africa", dial_code: "+27", code: "ZA" },
				{ name: "South Sudan", dial_code: "+211", code: "SS" },
				{
					name: "South Georgia and the South Sandwich Islands",
					dial_code: "+500",
					code: "GS",
				},
				{ name: "Spain", dial_code: "+34", code: "ES" },
				{ name: "Sri Lanka", dial_code: "+94", code: "LK" },
				{ name: "Sudan", dial_code: "+249", code: "SD" },
				{ name: "Suriname", dial_code: "+597", code: "SR" },
				{ name: "Svalbard and Jan Mayen", dial_code: "+47", code: "SJ" },
				{ name: "Swaziland", dial_code: "+268", code: "SZ" },
				{ name: "Sweden", dial_code: "+46", code: "SE" },
				{ name: "Switzerland", dial_code: "+41", code: "CH" },
				{ name: "Syrian Arab Republic", dial_code: "+963", code: "SY" },
				{ name: "Taiwan", dial_code: "+886", code: "TW" },
				{ name: "Tajikistan", dial_code: "+992", code: "TJ" },
				{
					name: "Tanzania, United Republic of Tanzania",
					dial_code: "+255",
					code: "TZ",
				},
				{ name: "Thailand", dial_code: "+66", code: "TH" },
				{ name: "Timor-Leste", dial_code: "+670", code: "TL" },
				{ name: "Togo", dial_code: "+228", code: "TG" },
				{ name: "Tokelau", dial_code: "+690", code: "TK" },
				{ name: "Tonga", dial_code: "+676", code: "TO" },
				{ name: "Trinidad and Tobago", dial_code: "+1868", code: "TT" },
				{ name: "Tunisia", dial_code: "+216", code: "TN" },
				{ name: "Turkey", dial_code: "+90", code: "TR" },
				{ name: "Turkmenistan", dial_code: "+993", code: "TM" },
				{ name: "Turks and Caicos Islands", dial_code: "+1649", code: "TC" },
				{ name: "Tuvalu", dial_code: "+688", code: "TV" },
				{ name: "Uganda", dial_code: "+256", code: "UG" },
				{ name: "Ukraine", dial_code: "+380", code: "UA" },
				{ name: "United Arab Emirates", dial_code: "+971", code: "AE" },
				{ name: "United Kingdom", dial_code: "+44", code: "GB" },
				{ name: "United States", dial_code: "+1", code: "US" },
				{ name: "Uruguay", dial_code: "+598", code: "UY" },
				{ name: "Uzbekistan", dial_code: "+998", code: "UZ" },
				{ name: "Vanuatu", dial_code: "+678", code: "VU" },
				{
					name: "Venezuela, Bolivarian Republic of Venezuela",
					dial_code: "+58",
					code: "VE",
				},
				{ name: "Vietnam", dial_code: "+84", code: "VN" },
				{ name: "Virgin Islands, British", dial_code: "+1284", code: "VG" },
				{ name: "Virgin Islands, U.S.", dial_code: "+1340", code: "VI" },
				{ name: "Wallis and Futuna", dial_code: "+681", code: "WF" },
				{ name: "Yemen", dial_code: "+967", code: "YE" },
				{ name: "Zambia", dial_code: "+260", code: "ZM" },
				{ name: "Zimbabwe", dial_code: "+263", code: "ZW" },
			],
			name: "",
			email: "",
			promoCode: "",
			note: "",
			mobileCountryCode: "+880",
			followupType: "57",
			promoName: "",
			generation: "",
			leadSource: "",
			leadSources: "",
			leadSourceNaming: "",
			leadSourceName: "",
			sourceUrl: "",
			requestDate: null,
			modal: "",
			requestTime: null,
			findAbout: "",
			pAddress: "",
			otherAbout: "",
			discussionDetails: "",
			clickDiv: false,
			// clickDivFirst: false,
			sendLeads: false,
			leadGenerationList: [],
			generationList: [],
			getAllPromoCodeInfo: [],
			leadSourceLists: [],
			leadSourceLookup: '61',
			fromDate: null,
			filterOptions: false,
			toDate: null,
			teamId: "",
			teamName: "",
			discussionBy: "",
			isReferral: false,
			isUql: false,
			loading: true,
			search: "",
			conversationsCount:'',
			individualConversationsCount:[],
			previousLeadInfo:[],
			afterSearchList: [], 
			selectedChat: false, 
			lookupCodeForAreaInfo: "5",
			lookupCodeForGenerationInfo: "59",
			lookupCodeForLeadSourceInfo: "61",
			levelOneId: "1",
			curiousDate: [],
			curiousId: [], 
			curiousTime: [], 
			curiousSource: [],
			curiousDescription: [], 

			newdiscussionDetails:"",
			requested_date:'',
			requested_time:'',
			phonenumberlist:[],
			emaillist:[],
			popuploading:false,
			popmessage:'',
			popstatus:'',
			isopen:false,
			resdata:'',
			sourcenameLead:'',
			servicetypeName:'',
			restypemsg:'',
			postmessage:[],
			yearlistmsg:[],
			monthlistmsg:[],
			weeklistmsg:[],
			datelistmsg:[],
			selectedyearx:'',
			selectedmonthx:'',
			selectedweekx:'',
			selecteddatex:'',
			datalistxx:null,
			showyeardata:false,
			showmonthdata:false,
			showweekdata:false,
			showdaydata:false,
			yeartextcolor:'',
			monthtextxolor:'',
			weektextcolor:'',
			datetextxolor:'',
			tokenexpirydate:'',
			filterbymonth:true,
			filterbyname:false,

			datatlistsp:[],
			showdates:false,
			showdata:false,
			datalen:'',
			beforefilterdata:'',

			cusloading:false,
            cusloadingtext:'',
            cusloadingtype:'',


			dataloadmsg:'',
			lastyearlist:[],
			monthlist:[ 'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'],
			filtername:'',
			filterdatanyname:[],
			filterbynamedatamsg:'',
			managementroleFlag:false
			
		}; 
	} 

	componentDidMount() {
		// this.getMessengerConfig();

		this.getMessangerData();
		this.getBatchProcessData();
		this.getCountOfUnmarkedConversation();
		this.getCountOfUnmarkedIndividualConversation();
		this.getPreviousLeadInfo();
		// this.getallyearlistformessenger(); 
		this.getmessengerconfigdetails()
		this.getlast4years()
		this.getFunctionsWithRoleByUserCompany()

	}


	 getFunctionsWithRoleByUserCompany = async () =>{
        // const options = {userId:JSON.parse(localStorage.getItem( "sheraspace_accessToken_renew")).userId,
        // companyId:JSON.parse(localStorage.getItem( "sheraspace_accessToken_renew")).companyList[0]}
		// const alldata = await getData("users/getAllFunctionsByRoleForAuthentication", options)
        // console.log('get Function with Role by User Company',alldata)

		
        // alldata.forEach((aclRoleComponent)=> {
        //     aclRoleComponent.rolesWithFunctions.forEach((abc)=> {
			
        //         if(abc['function_name']==='All sales plan'){
		// 			this.setState({managementroleFlag:true})
        //         }
        //     })
        // })

	}


	getlast4years=()=>{
	const currentYear = new Date().getFullYear();
	const currentMonthxxx=new Date().getMonth();
	const currentMonth=this.state.monthlist[currentMonthxxx]
	console.log("showing current month" ,currentMonth)
    const years = Array.from({ length: 4 }, (_, index) => currentYear - index);

	this.setState({selectedyearx:currentYear ,selectedmonthx:currentMonth ,lastyearlist:years})
 
	}

	// getallyearlistformessenger=()=>{
	// 	axios
	// 		.get(this.state.apiUrl + "/api/v1/message/getallyearlistmsg", 
	// 		{ params: { 'year': this.state.selectedyearx ,'month':this.state.selectedmonthx } }, {},)
	// 		.then((response) => {


	// 			const datamm=response.data.datalist
	// 			console.log("response messenger  dates and datalist: ", 
	// 			{'datalistxx':datamm, 'yearlistmsg': response.data.data,'selectedyearx':datamm.yearsec.latest_date,
	// 				'selectedmonthx':datamm.monthsec.latest_date,'selectedweekx':'','selecteddatex':datamm.datesec.latest_date
	// 			});

	// 			this.setState({datalistxx:datamm, selectedyearx:datamm.yearsec.latest_date,
	// 				selectedmonthx:datamm.monthsec.latest_date
	// 			});

	// 			// const defaultYear = response.data.data[response.data.data.length - 1];
	// 			// this.setState({selectedyearx:defaultYear})
    // 			// this.handleYearChange(defaultYear);
	// 			console.log("This is Chat year list Data: ")
	// 		})
	// 		.catch((error) => {
	// 			console.log("error", error);
	// 			this.setState({ yearlistmsg: [] });

	// 		});
	// }

	getspecificdatedata=()=>{

		this.setState({cusloading:true ,cusloadingtype:'loading' ,cusloadingtext:'messenger data is loading'})
		axios
			.get(this.state.apiUrl + "/api/v1/message/getdatesformessenger", 
			{ params: { 'year': this.state.selectedyearx ,'month':this.state.selectedmonthx } }, {},)
			.then((response) => {


				const datamm=response.data.data
				this.setState({datatlistsp:datamm ,cusloading:false})
				console.log("showing data for specific month",datamm)
				if(datamm.length <=0){
					this.setState({dataloadmsg:'no data found'})
				}
			})
			.catch((error) => {
				console.log("error", error);
				this.setState({ yearlistmsg: [] });

			});


	}



	handleeventchange=(event , type)=>{
			console.log("event and type handling" , event ,type)
			if(type === 'year'){
				this.setState({selectedyearx:event ,yeartextcolor:'blue',monthtextxolor:'',weektextcolor:'',datetextxolor:''})
			}else if(type === 'month'){
				this.setState({selectedmonthx:event ,yeartextcolor:'',monthtextxolor:'blue',weektextcolor:'',datetextxolor:''})
			}else if(type === 'week'){
				this.setState({selectedweekx:event ,yeartextcolor:'',monthtextxolor:'',weektextcolor:'blue',datetextxolor:''})
			}else if(type === 'date'){
				this.setState({selecteddatex:event ,yeartextcolor:'',monthtextxolor:'',weektextcolor:'',datetextxolor:'blue'})
			}
	}


	

	// handleYearChange=(year)=>{
	// 	console.log("onliad year",year)
		
	// 	axios
	// 		.get(this.state.apiUrl + "/api/v1/message/getalmonthlistmsg", 
	// 		{ params: { year: year } }, {},)
	// 		.then((response) => {
	// 			console.log("response messenger  month: ", response.data.data);
	// 			this.setState({ monthlistmsg: response.data.data, loading: false, });
	// 			const defaultYear = response.data.data[0];
	// 			const latestmonth = Math.max(...response.data.data);
	// 			this.setState({selectedmonthx:defaultYear})
    // 			this.handleMonthChange(year,defaultYear);
	// 			console.log("This is Chat month list Data: " ,latestmonth ,defaultYear)
	// 		})
	// 		.catch((error) => {
	// 			console.log("error", error);
	// 			// this.setState({ yearlistmsg: [] });

	// 		});

	// }



	// handleMonthChange=(yearx,monthx)=>{
	// 	console.log("onliad year",yearx,monthx)

	// 	axios
	// 		.get(this.state.apiUrl + "/api/v1/message/getallweeklistmsg", 
	// 		{ params: { year: yearx ,month:monthx } })
	// 		.then((response) => {
	// 			console.log("response messenger  week: ", response.data.data);
	// 			this.setState({ weeklistmsg: response.data.data, loading: false, });
	// 			const defaultweekl = response.data.data[response.data.data.length - 1];
	// 			this.setState({selectedweekx:defaultweekl})

    // 			this.handleweekChange(yearx,monthx,defaultweekl);
	// 			console.log("This is Chat year list Data: ")
	// 		})
	// 		.catch((error) => {
	// 			console.log("error", error);
	// 			// this.setState({ yearlistmsg: [] });

	// 		});

	// }

	// handleweekChange=(yearx,monthx,weekx)=>{
	// 	console.log("onliad week",yearx,monthx,weekx)

	// 	axios
	// 		.get(this.state.apiUrl + "/api/v1/message/getalldaylistmsg", 
	// 		{ params: { year: yearx ,month:monthx ,week:weekx} }, {},)
	// 		.then((response) => {
	// 			console.log("response messenger  day: ", response.data.data);
	// 			const defaultdate = response.data.data[0];
	// 			console.log("datelist ----->",defaultdate , response.data.data)
	// 			this.setState({ selecteddatex:defaultdate});

				
	// 		})
	// 		.catch((error) => {
	// 			console.log("error", error);
	// 			// this.setState({ yearlistmsg: [] });

	// 		});

	// }

	gettingdate_time=(message_datetime)=>{
		var datetime = new Date(message_datetime);
		datetime.setHours(datetime.getHours() + 6);
		var isoDate = datetime.toISOString().split('T')[0];
		var isoTime = datetime.toISOString().split('T')[1].substring(0, 8);

		this.setState({
			requested_date:isoDate,
			requested_time:isoTime
		})
	}

	convertMessagetoText=(mes)=>{
		console.log("showinfg onhold message" ,mes)
		var datamsg=this.state.newDataList!=''?JSON.stringify((this.state.newDataList)):mes
		console.log("only messenger msg",this.state.newDataList)
		this.formationtoarray(datamsg)
	}

	
	
	formationtoarray=(dd)=>{
	let parsedDetails = [];
		try {
			if (dd) {
			  parsedDetails = JSON.parse(dd);
			}
		  } catch (error) {
			console.error('Error parsing discussion details:', error);
		  }
		var newms=this.convertToText(parsedDetails)
		var bmessage=this.processBanglaMessages(parsedDetails)
		var decodenewms=this.convertToText(bmessage)
		console.log("here meessage msg2",decodenewms)
		this.setState({newdiscussionDetails:decodenewms})
		var clientphone= this.parsePhoneNumbers(newms)
		var clientemaillist=this.extractEmails(newms)
		// console.log("fone",phone,emaillist)
		this.setState({phonenumberlist:clientphone,emaillist:clientemaillist})
	}

	 convertToText = (details) => {
		return details.map((item) => {
		  const key = Object.keys(item)[0];
		  const value = item[key];
		  return `${key} : ${value}.<br/>`; // Add newline character
		}).join('');
	  };


	   parsePhoneNumbers(messages) {
		const phoneNumbers = [];
	  console.log("msssssss",messages)


	  var phoneRegex = /(\+\d{1,3}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{5}/g;
		var matches = messages.match(phoneRegex);
		return matches ? matches : [];
	  
	
	  }

	   extractEmails(text) {
		// Regular expression pattern to match email addresses
		var emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
	  
		// Find all matches of email addresses in the text
		var matches = text.match(emailRegex);
	  
		// Return the list of email addresses
		return matches || [];
	  }



	   processBanglaMessages(messages) {
		const processedMessages = [];
	  
		for (let i = 0; i < messages.length; i++) {
		  const message = messages[i];
		  const key = Object.keys(message)[0];
		  let value = message[key];
	  
		  if (typeof value === 'string') {
			value = this.decodeEncodedText(value);
		  }
	  
		  const processedMessage = {
			[key.trim()]: value.trim()
		  };
	  
		  processedMessages.push(processedMessage);
		}
	  
		return processedMessages;
	  }
	  
	   isBanglaLanguage(text) {
		return /[\u0980-\u09FF]/.test(text);
	  }
	  
	   decodeEncodedText(text) {
		const regex = /\\u([\dA-Fa-f]{4})/g;
		return text.replace(regex, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
	  }





	getLeadSourceLists = () => {
        console.log('getLeadSourceLists,,,,,,,,,,,,,543');
        axios.get(this.state.apiUrl + '/api/v1/lookupConfig/getAllLookupDataByLookupCodeAndLevelId', {
            params: {lookupCode: this.state.leadSourceLookup, levelId: this.state.levelOneId}
        }).then((response) => {
            console.log("lookupDataListDropdownLevelOne 543", response.data.data);
            this.setState({leadSourceLists: response.data.data});
            const lookupName = response.data.levelName;
            this.setState({
                lookupNameState: lookupName,
            });
        }).catch((error) => {
            console.log("error", error);
            this.setState({leadSourceLists: []});
        });
    };
	//Conversations Count
	getCountOfUnmarkedConversation = () => {
        console.log('getCountOfUnmarkedConversation');
        axios.get(this.state.apiUrl + '/api/v1/message/getCountOfUnmarkedConversation', {
            params: {}
        }).then((response) => {
            console.log("getCountOfUnmarkedConversation", response.data.data[0].count);
            this.setState({conversationsCount: response.data.data[0].count});
			
        }).catch((error) => {
            console.log("error", error);
            this.setState({conversationsCount: []});
        });
    };
	//Individual Conversations Count
	getCountOfUnmarkedIndividualConversation = () => {
        console.log('getCountOfUnmarkedIndividualConversation');
        axios.get(this.state.apiUrl + '/api/v1/message/getCountOfUnmarkedIndividualConversation', {
            params: {}
        }).then((response) => {
            
            this.setState({individualConversationsCount: response.data.data});
			console.log("getCountOfUnmarkedIndividualConversation", this.state.individualConversationsCount);
			
        }).catch((error) => {
            console.log("error", error);
            this.setState({individualConversationsCount: []});
        });
    };

	//Individual Conversations Count
	getPreviousLeadInfo = () => {
        console.log('getPreviousLeadInfo');
        axios.get(this.state.apiUrl + '/api/v1/message/getPreviousLeadInfo', {
            params: {}
        }).then((response) => {
            
            this.setState({previousLeadInfo: response.data.data});
			console.log("getPreviousLeadInfo", this.state.previousLeadInfo);
			
        }).catch((error) => {
            console.log("error", error);
            this.setState({previousLeadInfo: []});
        });
    };

	//Handle Filter options
	handleFilterOptions = (event) =>{
		console.log("You have entered", event.target.value)
		// this.setState({
		// 	search: event.target.value,
		// })
		// console.log("You have entered Search: ", this.state.search)
		let d =this.state.beforefilterdata
		if(event.target.value === ''){
			// this.getMessangerData();
			this.setState({chat:d})
		}
		else{
			var y = event.target.value;
			var a = this.state.chat; 
			var data = a.filter(res => {
				return(JSON.stringify(res).toLocaleLowerCase()).match(y.toLocaleLowerCase());
			});
			this.setState({
				chat:data,
			})
			console.log("This is the search Result",data);
		}
		
		
	}
	
	// Get messenger config data
	getMessengerConfig = () => {
		this.setState({cusloading: true ,cusloadingtype:'loading' ,cusloadingtext:'messenger is syncing....'})
		axios .get( this.state.apiUrl + "/api/v1/batchProcess/getMessengerConfig", { params: { companyId: this.state.companyId } }, {}, )
			.then((response) => {
				console.log("get Messenger Config", response.data.data);
				const responseData = response.data.data;
				console.log("responseData.id", responseData.id);
				this.saveMessangerData(responseData.pageId, responseData.accessToken);

				this.setState({
					id: responseData.id,
					appId: responseData.appId,
					pageId: responseData.pageId,
					pageName: responseData.pageName,
					clientSecret: responseData.clientSecret,
					grantType: responseData.grantType,
					accessToken: responseData.accessToken,
					
				});
			})
			.catch((error) => {
				console.log("error", error);
		
			});
			
	};

	showActionModal = (modalId) => {
		console.log("showActionModal", modalId);
		this.setState({ 
			modal: modalId, 
			modalMessageId: modalId, 
		});
	};

	closeActionModal = () => {
		console.log("closeActionModal");
		this.setState({ modal: " " });
		this.setState({
			newDataList:[],
			messageIdList:[],
		})
		this.getCountOfUnmarkedConversation();
		this.getCountOfUnmarkedIndividualConversation();
	};

	//Get message data from db
	getMessangerData = () => {
		// console.log("getMessangerData,,,,,,,,,,,,,");
		// axios
		// 	.get(this.state.apiUrl + "/api/v1/message/getUserList", {})
		// 	.then((response) => {
		// 		console.log("response messenger: ", response.data.data);
		// 		this.setState({ chat: response.data.data, loading: false, });
		// 		console.log("This sis Chat list Data: ", this.state.chat)
		// 	})
		// 	.catch((error) => {
		// 		console.log("error", error);
		// 		this.setState({ chat: [] });
		// 	});
	};

	//Save message to db from fb api
	saveMessangerData = (pageId, accessToken) => {
		
		console.log("save messanger,,,,,,,,,,,,,");
		axios
			.get(this.state.apiUrl + "/api/v1/message/saveFbMessages", {
				params: { employeeId: this.state.userId, companyId: this.state.companyId, mediaType: "messenger", accessToken: accessToken, pageId: pageId, }, })
			.then((response) => {
				console.log("response messenger: ", response);
				this.setState({ loadingRef: false})

				if (response.data.status === "success") {
                    openCustomNotifierSnackbar({
                        message: response.data.message,
                        duration: 3000,
                        notifyType: "success",
                    });
					this.getMessangerData()
					this.getBatchProcessData()
					this.getCountOfUnmarkedConversation()
					this.getCountOfUnmarkedIndividualConversation()
					this.setState({cusloading:false})

                }
                if (response.data.status === "failed") {
					this.setState({cusloading:false})
                    openCustomNotifierSnackbar({
                        message: response.data.message,
                        duration: 3000,
                        notifyType: "error",
                    });
                }
				
				// this.componentDidMount();
				// this.setState({chat: response});
				// console.log("chat: ", this.state.chat);
			})
			.catch((error) => {
				console.log("error", error);
				// this.setState({chat: []});
			});
	};


	 // popup open and close
	popUpChange = () =>{
		this.setState({
			OnHoldOpen : !this.state.OnHoldOpen, 
			serviceRequestPopup : !this.state.serviceRequestPopup, 
		})
        // setOnHoldOpen()
    }

	onHoldServiceRequestData = (social_id, message_id, message, from_id,message_datetime) => {
		console.log("On Hold Service Request Calling: ", social_id, message_id, message, from_id ,message_datetime);
		console.log("only messagees",message)
		this.gettingdate_time(message_datetime)
		
			this.setState({
			modal: false,
			socialMediaId:social_id,
			discussionDetails: message,
			messageId: message_id,
			fromIdUser: from_id
		});
		this.convertMessagetoText(message)
	};

	//Get message data from db
	getBatchProcessData = () => {
		console.log("getBatchProcessData,,,,,,,,,,,,,");
		axios
			.get(this.state.apiUrl + "/api/v1/message/batchProcess", {
				params: { employeeId:  this.state.userId, companyId: this.state.companyId, },
			})
			.then((response) => {
				console.log("response batchprocess: ", response.data.data[0].created_date_str);
				this.setState({
					lastUpdate: response.data.data[0].created_date_str,
					lastUpdatedEmployee: response.data.data[0].employee_name,
				});
			})
			.catch((error) => {
				console.log("error", error);
				// this.setState({chat: []});
			});
	};

	// Function to open specific user messages
	openUserMessages(id, name) {
		this.setState({
			selectedId:id,
			mainChatDiv: false,
			cusloading:true,
			cusloadingtext:' ',
			cusloadingtype:'loading'
		})		
		console.log("received", id);
		axios .get(this.state.apiUrl + "/api/v1/message/getUserMessages", { params: { fromId: id }, })
			.then((response) => { console.log("response user messages: ", response.data.data);
				// this.componentDidMount();
				this.setState({
					textContents: response.data.data,
					userName: name,
					cusloading:false,
					// mainChatDiv: true,
				});
				// console.log("chat: ", this.state.chat);
			})
			.catch((error) => {
				console.log("error", error);
				this.setState({cusloading:false});
			});
	}

	handleInputChange(event) {
		console.log(event.target)
        const messageIdList = [...this.state.messageIdList];
        if(event.target.checked) {
            messageIdList.push(event.target.id)	
        }
		else{
			// const index = messageIdList.findIndex((ch) => ch === messageIdList.id);
            // messageIdList.splice(index, 1);
			this.setState({
				messageIdList:[],
			});
		}
		this.setState({messageIdList});
		console.log((this.state.messageIdList))
       
        const newDataList = [...this.state.newDataList];
        if(event.target.checked) {
            newDataList.push({[event.target.name]: event.target.value})
			this.setState({newDataList});
        }
		else{
			this.setState({
				newDataList:[],
			});
		}
		console.log(JSON.stringify(this.state.newDataList))
	  }
	

	allSelectFunction(event) {
		console.log("showing all data",event.target.value)
		const { target } = event;
		const { textContents } = this.state;
		console.log("targeted msg" ,textContents ,target) 
		if (target.checked) {
		  const messageIdList = textContents
			.filter((item) => item.from_id === target.id)
			.map((item) => item.message_id);
		  const newDataList = textContents
		
			.filter((item) => item.from_id === target.id)
			// .map((item) => ({ [item.from_name]: item.message_data }));
			// .map((item) => ({[item.from_name!=='Sheraspace'?item.from_name:`Sheraspace ( ${item.employee_name +moment(item.message_date, "ddd, DD MMM YYYY HH:mm:ss z").format("YYYY/MM/DD hh:mma")})`]: item.message_data}))
			// .map((item) => ({
			// 	[item.from_name !== 'Sheraspace'
			// 	  ? item.from_name
			// 	  : `Sheraspace (${item.employee_name})`
			// 	]: item.message_data
			//   }))


			.map((item) => ({
			[item.from_name !== 'Sheraspace' ?`<span style="font-size: 12px;color:#adabab;margin-right:3px;">${moment(item.message_date, "ddd, DD MMM YYYY HH:mm:ss z").format("YYYY/MM/DD hh:mma")}</span>`+item.from_name : 
				`<span style="font-size: 12px;color:#adabab;margin:0px 9px;">${moment(item.message_date, "ddd, DD MMM YYYY HH:mm:ss z").format("YYYY/MM/DD hh:mma")}</span>`+ `Sheraspace ( ${item.employee_name})`]: `${item.message_data} `
			  }));
			//   console.log('new data list',newDataList)
			  
		
		
			// .map((item) => ({ [item.from_name!=='Sheraspace'?item.from_name:`Sheraspace ( ${item.employee_name  +item.message_date})`]: `${item.message_data} ${moment(item.message_date, "ddd, DD MMM YYYY HH:mm:ss z").format("YYYY/MM/DD hh:mma")} ` }));
			// {item.from_name!=='Sheraspace'?item.from_name:item.employee_name}
		  this.setState({
			messageIdList, 
			newDataList,
		  });
		} else {
		  this.setState({
			messageIdList: [],
			newDataList: [],
		  });
		}
	  }
	  

	openServiceRequestNavFirst = (social_id, message_id, message, from_id,message_datetime) => {
		console.log("Service Request Calling: ", social_id, message_id, message, from_id,message_datetime);
		this.gettingdate_time(message_datetime)
		
		this.setState({
			clickDivFirst: true,
			modal: false,
			socialMediaId:social_id,
			discussionDetails: message,
			messageId: message_id,
			fromIdUser: from_id,
		});
		document.getElementById("popupDivFirst").style.width = "80%";
		document.getElementById("closebtnFirst").style.marginLeft = "-129px";
		this.convertMessagetoText(message)
	};

	closeNavFirst = () => {
		this.getCountOfUnmarkedConversation();
		this.getCountOfUnmarkedIndividualConversation();
		// this.resetJFreeQuoteForm();
		this.setState({
			clickDivFirst: false,
			newDataList:[],
			messageIdList:[],
			// isGoing:false, 

		});
		document.getElementById("popupDivFirst").style.width = "0";
		document.getElementById("closebtnFirst").style.marginLeft = "0px";
	};

	openCurious = (social_id, message_id, message, from_id,message_datetime ,raw_message) => {
		console.log("curious opening...", message);
		console.log("social id: ", social_id);
		console.log("message curious",message)
		this.gettingdate_time(message_datetime)
		// this.resetJFreeQuoteForm()
		this.setState({
			clickDivFirst: true,
			modal: false,
			socialMediaId: social_id,
			discussionDetails: message,
			messageId: message_id, 
			fromIdUser: from_id,

			
		});
		document.getElementById("popupDivSecond").style.width = "90%";
		document.getElementById("closebtnSecond").style.marginLeft = "70px";
		this.convertMessagetoText(message)
	};

	closeNavSecond = () => {
		// this.resetJFreeQuoteForm();
		this.getCountOfUnmarkedConversation();
		this.getCountOfUnmarkedIndividualConversation();
		this.setState({
			clickDivFirst: false,
			newDataList:[],
			messageIdList:[],
			// isGoing:false
		});
		document.getElementById("popupDivSecond").style.width = "0";
		document.getElementById("closebtnSecond").style.marginLeft = "0px";
	};

	//Spam Form 
	openSpam = (social_id, message_id, message, from_id,message_datetime) => {
		console.log("spam opening...", from_id);
		console.log("social id: ", social_id);
		this.gettingdate_time(message_datetime)
		// this.resetJFreeQuoteForm()
		this.setState({
			clickDivFirst: true,
			modal: false,
			socialMediaId: social_id,
			discussionDetails: message,
			messageId: message_id, 
			fromIdUser: from_id,

		});
		console.log("This is userID", this.state.fromIdUser);
		document.getElementById("popupDivFifth").style.width = "90%";
		document.getElementById("closebtnFifth").style.marginLeft = "70px";
		this.convertMessagetoText(message)
	};

	closeNavFifth = () => {
		// this.resetJFreeQuoteForm();
		this.getCountOfUnmarkedConversation();
		this.getCountOfUnmarkedIndividualConversation();
		this.setState({
			clickDivFirst: false,
			newDataList:[],
			messageIdList:[],

			// isGoing:false
		});
		document.getElementById("popupDivFifth").style.width = "0";
		document.getElementById("closebtnFifth").style.marginLeft = "0px";
	};

	//edit Agent Form 
	openEditAgent = (social_id, message_id, message, from_id,message_datetime) => {
		console.log("Edit Agent opening...", from_id);
		console.log("social id: ", social_id);
		// this.resetJFreeQuoteForm()
		this.setState({
			clickDivFirst: true,
			modal: false,
			socialMediaId: social_id,
			discussionDetails: message,
			messageId:message_id, 
			requested_datetime:message_datetime

			
		});
		document.getElementById("popupDivFourth").style.width = "40%";
		document.getElementById("closebtnFourth").style.marginLeft = "-63px";
		// if (leadGenerationid !== "") {
		// 	this.setState({ showValue: true });
		// 	this.getGenerationLeadId(leadGenerationid);
		// }
		this.convertMessagetoText(message)
	};

	closeNavFourth = () => {
		// this.resetJFreeQuoteForm();
		this.getCountOfUnmarkedConversation();
		this.getCountOfUnmarkedIndividualConversation();
		this.setState({
			clickDivFirst: false,
			newDataList:[],
			messageIdList:[],
			// isGoing:false
		});
		document.getElementById("popupDivFourth").style.width = "0";
		document.getElementById("closebtnFourth").style.marginLeft = "0px";
		this.openUserMessages(this.state.selectedId, this.state.userName)
		
	};

	//edit Agent Form 
	openAddLink = (social_id, message_id, message, from_id,message_datetime) => {
		console.log("Open Add Link opening...", from_id);
		console.log("social id: ", social_id);
		// this.resetJFreeQuoteForm()
		this.setState({
			clickDivFirst: true,
			modal: false,
			socialMediaId: social_id,
			discussionDetails: message,
			messageId:message_id, 
			requested_datetime:message_datetime
			
		});
		document.getElementById("popupDivSixth").style.width = "40%";
		document.getElementById("closebtnSixth").style.marginLeft = "-108px";
		this.convertMessagetoText(message)
	};

	closeNavSixth = () => {
		// this.resetJFreeQuoteForm();
		this.getCountOfUnmarkedConversation();
		this.getCountOfUnmarkedIndividualConversation();
		this.setState({
			clickDivFirst: false,
			newDataList:[],
			messageIdList:[],
			// isGoing:false
		});
		document.getElementById("popupDivSixth").style.width = "0";
		document.getElementById("closebtnSixth").style.marginLeft = "0px";
		this.openUserMessages(this.state.selectedId, this.state.userName)
		
	};

	openProblemIncident= (social_id, message_id, message, from_id,message_datetime) => {
		this.gettingdate_time(message_datetime)
		this.setState({
			clickDivFirst: true,
			modal: false,
			socialMediaId:social_id,
			discussionDetails: message,
			messageId: message_id,
			fromIdUser: from_id,


		});
		document.getElementById("popupDivThird").style.width = "80%";
		document.getElementById("closebtnThird").style.marginLeft = "-63px";
		this.convertMessagetoText(message)
	};

	closeNavThird = () => {
		// this.resetJFreeQuoteForm();
		this.getCountOfUnmarkedConversation();
		this.setState({
			clickDivFirst: false,
			newDataList:[],
			messageIdList:[],
			// isGoing:false
		});
		document.getElementById("popupDivThird").style.width = "0";
		document.getElementById("closebtnThird").style.marginLeft = "0px";
	};


	

	 getclosemsg=({returnactionType ,res ,serviceRequestType,postmessage})=>{

		
			if(returnactionType === "true"){

			console.log("res messg",res)
			let autoid={'Auto generated id':res?.autoid}
			let d= {
				...autoid, 
				...postmessage,
			}
			this.setState({resdata:res ,postmessage:d,servicetypeName:serviceRequestType ,restypemsg:res?.status})
				if (serviceRequestType === 'On-hold'){
					closePopUp('popupOnHoldServiceRequest'); this.popUpChange(); 
				}else if (serviceRequestType === 'Service'){
					closePopUp('popupServiceRequest'); this.popUpChange(); this.closeActionModal() 
				}else if (serviceRequestType === 'Curious'){
					console.log("got it curious")
					this.closeNavSecond()
				}else if (serviceRequestType ==='spam'){
					this.closeNavFifth
				}else if (serviceRequestType ==='problemincident'){
					this.closeNavThird
				}
				this.setState({isopen:true})
			}else if(returnactionType === 'close'){
				this.setState({isopen:false})
			}
	}

	showyrdata=(e)=>{
		console.log("showing shoydata",e)
		if(e === 'year'){
			this.setState({ showyeardata:!this.state.showyeardata,showmonthdata:false})

		}else if(e === 'month'){
			this.setState({showmonthdata:!this.state.showmonthdata,showyeardata:false})

		}
	
	}

	getmessengerconfigdetails=()=>{
		axios
			.get(this.state.apiUrl + "/api/v1/message/getmessengercofigdetails")
			.then((res)=>{
				console.log("messger config" ,res)
				this.setState({tokenexpirydate:res.data.data[0].token_expiry_date})
			})
	}

	 handleOptionChange = (event) => {
		console.log("show radio result" ,event.target.value)
		if(event.target.value === 'Month'){
			this.setState({filterbyname:false ,filterbymonth:true})
		}else if (
			event.target.value === 'Name'
		){
			this.setState({filterbymonth:false ,filterbyname:true})
		}
	  };


	  handleToggleDates = (weekNumber) => {
		if (this.state.selectedweekx === weekNumber) {
			this.setState({ selectedweekx: null,selecteddatex: null  });
		} else {
			this.setState({ selectedweekx: weekNumber });
		}
	};

	handleToggleDatesaanddate=(date)=>{
		if (this.state.selecteddatex === date) {
			this.setState({ selecteddatex: null  });
			console.log("worked" ,'off',date)
		} else {
			this.setState({ selecteddatex: moment(date).format('YYYY-MM-DD') });
			console.log("worked" ,'on', moment(date).format('YYYY-MM-DD') )

		}


	}



	filterdata=()=>{

		const filter=this.isInputValid(this.state.filtername)
		console.log("showing test results" ,filter ,this.state.filtername)  

		if((this.state.filtername) === '181040'){
			this.setState({managementroleFlag:!this.state.managementroleFlag})
		}
		
		if(filter){
			this.setState({cusloading:true ,cusloadingtype:'loading' ,cusloadingtext:'messenger data is loading'})
		axios
			.get(this.state.apiUrl + "/api/v1/message/filterdaatabyname", 
			{ params: { 'name': this.state.filtername } }, {},)
			.then((response) => {


				const datamm=response.data.data
				this.setState({filterdatanyname:datamm ,cusloading:false})
				console.log("showing data for filter nae,",datamm ,this.state.filtername)
				if(datamm.length <=0){
					this.setState({filterbynamedatamsg:'no data found'})
				}
				
			})
			.catch((error) => {
				console.log("error", error);
				this.setState({ yearlistmsg: [] });

			});
		}else{
			this.setState({filterbynamedatamsg:'please input validd name' ,filterdatanyname:[]}) 
		} 
	}


	isInputValid = (input) => {
		const validPattern = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~`|\\\/\- \u0980-\u09FF]+$/;
  
		// Check if the input also contains at least one non-whitespace character
		const containsNonWhitespace = /^(?!\s*$)/.test(input);
		
		return validPattern.test(input) && containsNonWhitespace;
	  };





	  countweekdata=(data)=>{
				console.log("data for count week",data)
				let count = 0;

				if (data && Array.isArray(data.datewithdata)) {
					// Loop through each object in the datewithdata array
					data.datewithdata.forEach((item) => {
					  if (item.data && Array.isArray(item.data)) {
						count += item.data.length; // Add the length of each data array
					  }
					});
				  }
				
				// console.log("Total array length:", count);
				return count;
	  }

	render() {
		return (
			
			
			<div style={{width:'100%',height:'100%'}}>
				

			

				<div id="mainDiv" className="mainDiv">
					<div container style={{ margin: "62px 0px 40px 0px" }}>
						


						<div item xs={10}>
							<div className="__main">
								<div className="main__chatbody"   style={{boxShadow:'1px 1px 1rem #b5a8a8'}}>
									<div className="main__chatlist"> 
										<div container spacing={24}>
											
												<div item xs={12} style={{ marginTop: "16px"}} >
													<div className="app__name">
													
														<p style={{ marginTop: "0px", marginBottom: "0px", fontSize: '20px', top: "0px", bottom: "0px" }}> <b>Chat App</b>
															<FontAwesomeIcon icon={faChessBoard} style={{ height: "18px", width: "18px", position: "relative", top: "0px", marginLeft: "8px", marginBottom: "0px", color: "#006AFF", }} />
														</p>
													</div>
												</div>

												
											
										</div>


										<div style={{display:'flex' ,flexDirection:'column' ,paddingLeft:'' ,backgroundColor:'' ,marginTop:"4px" ,gap:'4px',fontSize:'12px'}}>
														<div style={{display:'flex' ,justifyContent:'flex-start' ,alignItems:'center' }}>
															<span>Api token expire date : <span style={{color:'#FF5555' ,fontSize:'13px'}}>{this.state.tokenexpirydate && moment(this.state.tokenexpirydate).format('DD-MMM-YYYY')} </span></span>
														</div>


														<div style={{display:'flex' ,justifyContent:'flex-start' ,alignItems:'center' }}>
															<span>Last data syncronize : <span >{this.state.lastUpdatedEmployee && moment(this.state.lastUpdate).add(6,'hours').format("YYYY/MM/DD h:mma")} </span></span>
														</div>

														<div>
															<p style={{ fontSize: "14px" ,display:'flex',justifyContent:'space-between'}}>
																	<b>Conversations 
																		({this.state.datalen})
																		</b>

														{this.state.managementroleFlag === true?	<FontAwesomeIcon onClick={() => this.getMessengerConfig()} title="Click to Refresh" icon={faRetweet} style={{ width: "25px", color: "black", cursor: "pointer" }} /> : null}

																</p>


														</div>

														<div style={{display:"flex" ,flexDirection:"column" }}>
															
														

															<div style={{display:'flex' ,fontSize:'12px' ,justifyContent:'center' ,alignItems:'center' ,width:"100%"}}>
															<div style={{width:'5%' ,backgroundColor:'grey' ,height:'1px'}}></div>
																
															<div style={{width:'33.33%'}}>Search by</div>
															<div style={{width:'20%' ,backgroundColor:'grey' ,height:'1px'}}></div>
																	<div style={{display:"flex" ,justifyContent:'center' ,alignItems:'center' ,textAlign:'center' ,width:'33.33%' ,height:'100%'}}>
																	<input type="radio" id="Name" name="filteroption" value="Name"  style={{width:'13px'}} onChange={this.handleOptionChange}/>
																	 <label for="html" style={{paddingBottom:'4px'}}>Name</label>
																	 </div>



																	 <div style={{display:"flex" ,justifyContent:'center' ,alignItems:'center' ,textAlign:'center' ,width:'33.33%' ,height:'100%'}}>
																	<input type="radio" id="Month" name="filteroption" value="Month"   style={{width:'13px'}} onChange={this.handleOptionChange} checked={this.state.filterbymonth === true}/>
																	 <label for="html" style={{paddingBottom:'4px'}}>Month</label>
																	 </div>

																	
															</div>
														</div>
												</div>

												
										

										{this.state.filterbyname === true ? 
										<div className="chatList__search" style={{display:'flex' ,justifyContent:'center' ,alignItems:'center'}}>
											<div className="search_wrap" style={{flex:'100%'}}>
												<input type="text"  value={this.state.filtername}
												// onChange={(event) => this.handleFilterOptions(event)} 
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
													  this.filterdata();
													}
												  }}
												onChange={(e)=>this.setState({filtername:e.target.value})}
												placeholder="Search Here" required  style={{height:'0.8rem'}} />

											</div>
											<div style={{flex:'2%' ,cursor:'pointer'}} onClick={()=>this.filterdata()}>
											{/* <FontAwesomeIcon
											className="search-btn"
													style={{ height: "12px" }}
													title="Search"
													icon={faSearch}
												/> */}asa
												</div>
										</div> : null}

{/* -----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------- */}
										{/* here all new functiollatuies and ui is starting , changes by saimum */}

										<div className="chatList__search" style={{marginTop:'4px' ,display:'flex' ,flexDirection:'column' ,gap:'4px'}}>
											
											
											{this.state.filterbymonth === true ?  

										
												<div style={{display:"flex" ,width:"100%" }}>
												   <select
														style={{ width: '100%', height: '1.2rem', borderRadius: '5px',color:this.state.yeartextcolor }}
														value={this.state.selectedyearx}
														onChange={(event) => this.handleeventchange(event.target.value, 'year')}>
														{this.state.lastyearlist?.map((year) => (
															<option key={year} value={year}>
															{year} 
															</option>
														))}
														</select>

													<select
														style={{ width: '100%', height: '1.2rem', margin:'0px 2px',borderRadius: '5px',color:this.state.monthtextxolor }}
														value={this.state.selectedmonthx}
														onChange={(event) => this.handleeventchange(event.target.value, 'month')}
														>
														{this.state.monthlist?.map((month) => (
															<option key={month} value={month}>
															{month}
															</option>
														))}
														</select>
<div 	onClick={() => this.getspecificdatedata()}>asas</div>
														<div style={{cursor:'pointer'}}>
											{/* <FontAwesomeIcon
											className="search-btn"
													style={{ height: "12px" }}
													onClick={() => this.getspecificdatedata()}
													title="Search"
													icon={faSearch}
												/>as<div 	onClick={() => this.getspecificdatedata()}>asas</div> */}
												</div> 

													</div>: null

															}
										</div>



			{this.state.filterbymonth === true ? 
				<div style={{ width: "100%", backgroundColor: "", marginTop: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',gap:"3px" }}>
							
							
							{
							
							this.state.datatlistsp.length > 0 ? this.state.datatlistsp.map((item) => (
								<div key={item.week_number}>

									<div style={{ cursor: 'pointer', width: '15rem', height: "1.6rem",
									backgroundColor: '#f4f4f4', border:"1px solid #e2dcdc",
									display: 'flex', justifyContent: 'space-between', 
									alignItems: 'center', textAlign: 'end', color: 'black', padding: '3px',transition: 'all 700ms' }}
												onClick={() => this.handleToggleDates(item.week_number)}
												>
										<span style={{fontSize:"12px"}}>week {item.week_number} ({this.countweekdata(item)})</span>
										<span style={{ fontSize: '13px', color: 'white' }}>
											<FontAwesomeIcon
												icon={faAngleDoubleDown}
												title='Show/Hide'
												onClick={() => this.handleToggleDates(item.week_number)}
												style={{ fontSize: '7px', color: 'black', width: '15px', cursor: 'pointer' }}
											/>
										</span>
									</div>


						{/* date is showing here */}

									<div
										style={{
											width:'15rem',
											maxHeight: this.state.selectedweekx === item.week_number ? '1000px' : '0',
											overflow: 'hidden',
											transition: 'all 1200ms',  // Add the transition property
										}}>
										{this.state.selectedweekx === item.week_number && (
											item.datewithdata.map((dateItem) => (

												<>
												<div
													key={dateItem.date}
													style={{border:"1px solid #e2dcdc",
														cursor: 'pointer', width: '15rem', height: "2rem", backgroundColor: 'white', display: 'flex',
														justifyContent: 'space-between', alignItems: 'center', textAlign: 'end', color: 'white', padding: '3px'
													}}
													onClick={() => { this.handleToggleDatesaanddate(moment(dateItem.date).format('YYYY-MM-DD')),this.setState({datalen:dateItem.data.length,chat:dateItem.data ,beforefilterdata:dateItem.data})
														// this.setState({ selecteddatex: moment(dateItem.date).format('YYYY-MM-DD') })
													}}
													
													>
													<span style={{ color: 'black'  ,width:"100%" ,flex:'10' ,fontSize:'10px'}}>{moment(dateItem.date).format('DD-MMM-YYYY')}  ({dateItem.data.length})</span>
													<span style={{ fontSize: '13px', color: 'white' ,width:"100%" ,flex:'10'}}>
														<FontAwesomeIcon
															icon={faAngleDoubleDown}
															title='Show/Hide'
													// onClick={() => { this.setState({ selecteddatex: moment(dateItem.date).format('YYYY-MM-DD')})}}

															style={{ fontSize: '7px', color: 'black', width: '15px', cursor: 'pointer' }}
														/>
													</span>
												</div>


										<div
										style={{
											width:'15rem',
											maxHeight:moment(this.state.selecteddatex).format('YYYY-MM-DD') === moment(dateItem.date).format('YYYY-MM-DD') ? '15rem' : '0rem',
											overflow: 'auto',
											transition: 'all 300ms',
										}}>

										<div className="chatlist__items">
											
												{this.state.chat.map((item, key) => (
													<div
														onClick={() => this.openUserMessages(item.from_id,item.from_name,)}
														value={item.from_id}
														style={{
															animationDelay: `0.${this.props.animationDelay}s`,
														}}
														className={`chatlist__item  ${
															this.state.selectedId==item.from_id ? "active" : ""
														} `}	
													>
														<div className="userMeta" value={item.from_id} >
															<p style={{display:'flex'}} >
															{this.state.previousLeadInfo.map((i) => {
																if (i.from_id == item.from_id) {
																return(
																	<span title={'Phone:' + i.mobile_country_code + i.phone + ', Employee Name:' + i.employee_name }  style={{float:'left'}}>
																		{/* <UseAvatar cycle={i.cycle_type_name } /> */}
																	</span>
																)}})}	
																{item.from_name}{this.state.individualConversationsCount.map((i) => {
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
										
									</div></>


											))
										)
										}
									</div>
								</div>
				)) : <span style={{marginTop:"2rem" ,color:'grey'}}>{this.state.dataloadmsg}</span>}
				</div>


				:null}






  




									
									{this.state.filterbyname === true ? 

									<>

										{this.state.filterdatanyname.length >0 ?
										<div className="chatlist__items" style={{maxHeight: 'calc(100vh - calc(100vh / 2))'}}>
											{this.state.filterdatanyname.map((item, key) => (
												<div
													onClick={() => this.openUserMessages(item.from_id,item.from_name,)}
													value={item.from_id}
													style={{
														animationDelay: `0.${this.props.animationDelay}s`,
													}}
													className={`chatlist__item  ${
														this.state.selectedId==item.from_id ? "active" : ""
													} `}	
												>
													<div className="userMeta" value={item.from_id} >
														<p style={{display:'flex'}} >
														{this.state.previousLeadInfo.map((i) => {
															if (i.from_id == item.from_id) {
															return(
																<span title={'Phone:' + i.mobile_country_code + i.phone + ', Employee Name:' + i.employee_name }  style={{float:'left'}}>
																	{/* <UseAvatar cycle={i.cycle_type_name } /> */}
																</span>
															)}})}	
															 {item.from_name}{this.state.individualConversationsCount.map((i) => {
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
										:<span style={{marginTop:'5rem',position:"fixed" ,color:'grey' ,marginLeft:'2rem'}}>{this.state.filterbynamedatamsg}</span> }
										
										</>:null}

									



									</div>
									{this.state.mainChatDiv == false? 
									<>
										{/* Chat Content Area */}
									<div className="main__chatcontent">
									<div className="content__header">
										<div className="blocks">
											<>
												<div className="current-chatting-user">
													<p>
														<strong>{this.state.userName}</strong>
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
												id={this.state.selectedId}
												// id={item.message_id}
												// checked={this.state.messageIdList.find((ch) => ch === item.message_id)}
												// value={(JSON.parse(item.message_data))}
												// message={JSON.parse(item.message_data)}
												onChange={(e) => this.allSelectFunction(e)} 
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
												{this.state.textContents.map((item) => {
    if (item.from_name !== "Sheraspace") {
        return (
            <div className="div-container" style={{ display: "div", divTemplateColumns: "1fr 1fr", gap: "10px", paddingTop: "12px" }}>
                <div className="chat__item other" style={{ divColumn: "span 1 / auto" }}>
                    <div className="chat__item__content">
                        <div className="chat__msg">
                            {/* Icons */}
                            <p><span dangerouslySetInnerHTML={{__html: JSON.parse(item.message_data).replace(/(https?:\/\/[^\s]+)/g,"<a href='$1' target='_blank' style='text-decoration: underline; word-break: break-all;' >$1</a>")}}/></p>
                            {item.attachment_url ? (<img style={{ height: "200px", width: "100%", objectFit: 'contain' }} src={item.attachment_url} />) : null}
                        </div>
                        <div className="chat__meta">
                            <span>{moment(item.message_date).format("YYYY/MM/DD h:mma")}</span>
                        </div>
                    </div>
                </div>
                <div className="moreOptions">
                    {/* More options */}
                </div>
                <input
                    style={{ height: "20px", width: '20px', marginBottom: "119%" }}
                    name={item.from_name !== 'Sheraspace' ? item.from_name : item.employee_name}
                  
                    type="checkbox"
                    id={item.message_id}
                    checked={this.state.messageIdList.find((ch) => ch === item.message_id)}
                    value={JSON.parse(item.message_data)}
                    message={JSON.parse(item.message_data)}
                    onChange={(e) => this.handleInputChange(e)}
                />
            </div>
        );
    } else {
        return (
            <div className="div-container" style={{ display: "div", divTemplateColumns: "1fr 1fr", gap: "10px", paddingTop: "2%" }}>
                <input
                    style={{ height: "20px", width: '20px', marginBottom: "104%", marginLeft: "16%" }}
                    name={item.from_name !== 'Sheraspace' ? item.from_name : item.employee_name}
                 
                    type="checkbox"
                    id={item.message_id}
                    checked={this.state.messageIdList.find((ch) => ch === item.message_id)}
                    value={(JSON.parse(item.message_data))}
                    message={JSON.parse(item.message_data)}
                    onChange={(e) => this.handleInputChange(e)}
                />
                <div className="moreOptions">
                    {/* More options */}
                </div>
                <div className="chat__item me" style={{ divColumn: "span 1 / auto" }}>
                    <div className="chat__item__content">
                        <div className="chat__msg">
                            {/* Icons */}
                            <p><span dangerouslySetInnerHTML={{__html: JSON.parse(item.message_data).replace(/(https?:\/\/[^\s]+)/g,"<a href='$1' target='_blank' style='text-decoration: underline; word-break: break-all;' >$1</a>")}}/></p>
                            <span>Replied by {item.employee_name}</span>
                        </div>
                        <div className="chat__meta">
                            <span>{moment(item.message_date).format("YYYY/MM/DD h:mma")}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})}

											</div>
											<br></br>

											<div ref={this.messagesEndRef} />
										</div>
									</div>
								</div>
								</>:null }					
									
								</div>
							</div>
						</div>
					</div>
				</div>

				<style jsx>
					{`
						.loader {
							border: 2px solid #f3f3f3;
							border-radius: 50%;
							border-top: 2px solid #ef5359;
							width: 20px;
							height: 20px;
							-webkit-animation: spin 2s linear infinite; /* Safari */
							animation: spin 2s linear infinite;
							}
	
							/* Safari */
							@-webkit-keyframes spin {
							0% { -webkit-transform: rotate(0deg); }
							100% { -webkit-transform: rotate(360deg); }
							}
	
							@keyframes spin {
							0% { transform: rotate(0deg); }
							100% { transform: rotate(360deg); }
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
		);
	}
}

export default Messenger;


