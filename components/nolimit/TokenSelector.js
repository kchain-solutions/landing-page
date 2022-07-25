import { Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { width } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Events } from "../Events";

export default function TokenSelector({ tokenList, dispatcher }) {

    const { event, setEvent } = useContext(Events);
    const [menuItems, setMenuItems] = useState('');
    const [valueS, setValueS] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatcher({ type: 'TOKEN_SELECTED', tokenSelected: value });
        setValueS(value);
        setEvent({ type: 'tokenIdSelected', value });
        console.log('tokenList', tokenList);
    };

    useEffect(() => {
        console.log('token list updated', tokenList);
        let items = tokenList.map((num) => { return (<MenuItem key={num} name="token-selector-item" value={num.toString()}>{num.toString()}</MenuItem>) });
        setMenuItems(items);
    }, [tokenList]);

    return (<>
    <FormControl sx={{width: '100%'}}>
    <InputLabel id="select-label" sx={{mt:'1rem'}}> Select token ID</InputLabel>
        <Select
            value={valueS}
            onChange={(handleChange)}
            labelId="select-label"
            label="Select token ID"
            sx={{ width: '100%', mt: '1rem' }}
        >   
        
            {menuItems}
        </Select>
        </FormControl>
    </>);
}