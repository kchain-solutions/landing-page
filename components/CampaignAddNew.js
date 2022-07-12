import React, { useState, useEffect, useContext } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";
import { GlobalContext } from "../components/GlobalContext";
import NewNoLimitCampaign from "./NewNoLimitCampaign";
import NewScarsityCampaign from "./NewScarsityCampaign";

export default function CampaignAddNew(props) {

    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [value, setValue] = useState(0);

    function handleTabs(e, val) {
        console.log(val);
        setValue(val);
    }

    useEffect(() => {
        console.log('CampaignAddNewComponent', globalState);
    }, [globalState]);

    return (<>
        <Container>
            <Tabs value={value} onChange={handleTabs} sx={{ width: "100%" }}>
                <Tab label="No Limit Campaign" />
                <Tab label="Scarsity Campaign" />
            </Tabs>
            <TabPanel value={value} index={0}>  <NewNoLimitCampaign wallet={globalState.wallet} CampaignNoLimitFactoryInstance={globalState.CampaignNoLimitFactoryInstance} /> </TabPanel>
            <TabPanel value={value} index={1}> <NewScarsityCampaign wallet={globalState.wallet} CampaignScarsityFactoryInstance={globalState.CampaignNoLimitFactoryInstance} /> </TabPanel>
        </Container>
    </>);
}

function TabPanel(props) {
    const { children, value, index } = props;
    if (value === index) {
        return (<Box>
            {children}
        </Box>);
    }
}