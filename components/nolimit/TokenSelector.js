import { Typography, Select, MenuItem, menuItemClasses } from "@mui/material";
import React, {useEffect, useState} from "react";

export default function TokenSelector({tokenList, tokenSelected, setTokenSelected}){
    

    const [menuItems, setMenuItems] = useState(undefined);

    const handleChange = (e) => {
        const { name, value } =  e.target;
        setTokenSelected(value);
    };

    useEffect(() => {
        let items = tokenList.map((num) => {return (<><MenuItem value={num}>{num}</MenuItem></>)});
        setMenuItems(items);
    }, [tokenList]);
    
    return (<> 
         <Select
            labelId="token-selector"
            id="demo-simple-select"
            value={tokenSelected}
            label="NFT ids"
            onChange={handleChange}
        >
            {menuItems}
  </Select>
    </>);
}