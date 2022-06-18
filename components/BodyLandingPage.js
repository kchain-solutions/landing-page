import { Container } from "@mui/material";
import React from "react";
import Mission from "./Mission";
import Services from "./Services";

export default function Body() {
    return(<>
        <Container maxWidth="xl">
            <Mission/>
            <Services />
        </Container>
    </>)
}