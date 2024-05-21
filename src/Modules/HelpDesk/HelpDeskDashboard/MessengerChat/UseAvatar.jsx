import { useState, useEffect } from "react";
import Avatar from "react-avatar";

const UseAvatar = (props) => {

  return <Avatar style={{marginRight: '5px',}} size="21"
  color={props.cycle=== 'Referral'?'#189595':props.cycle=== 'Lead'?'#E51400':props.cycle=== 'Prospect'?
        '#F0A30A':props.cycle=== 'Opportunity'?'#60A917':props.cycle=== 'Client'?'#007000':props.cycle==='MQL'?'blue':'blue'}
  round="33px"
  name={props.cycle}
  />;
};

export default UseAvatar;