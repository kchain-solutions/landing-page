import { Typography, Select, MenuItem, menuItemClasses } from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import { Events } from "../Events";

export default function TokenSelector({tokenList}){
    
    const {event, setEvent} = useContext(Events);
    const [menuItems, setMenuItems] = useState('');
    const [valueS, setValueS] = useState('');

    const handleChange = (e) => {
        const { name, value } =  e.target;
        setValueS(value);
        setEvent({type: 'tokenIdSelected', value});
        console.log('tokenList', tokenList);
    };

    useEffect(() => {
        console.log('token list updated', tokenList);
        let items = tokenList.map((num) => {return (<MenuItem key={num} name="token-selector-item" value={num.toString()}>{num.toString()}</MenuItem>)});
        setMenuItems(items);
    }, [tokenList]);
    
    return (<> 
         <Select
            value={valueS}
            label="nft"
            onChange={handleChange}
            sx={{width:'100%', mt:'1rem'}}
        >
          <MenuItem value=''> None </MenuItem>
            {menuItems}
  </Select>
    </>);
}