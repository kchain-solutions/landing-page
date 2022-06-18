import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import { Stack, Box, Divider } from "@mui/material";

import service1 from "../images/wip.webp"
import service2 from "../images/wip.webp"
import service3 from "../images/wip.webp"

const style = {

    container: {
       
    },

    stackOrizontal:{

    },

    stackVertical:{

    },

    cardMedia: {
    },

    card:{
        p:2,
        maxWidth: 400,
        minWidth: 250
    }
};

export default function Services() {


    const content = <>
        <Card sx={style.card}>
            <CardMedia
                component="img"
                width={'100%'}
                image={service1.src}
                sx={style.cardMedia}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Service1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Decentralized app design
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>

        <Card sx={style.card}>
            <CardMedia
                component="img"
                width={'100%'}
                image={service2.src}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Service2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Smart comtract design
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>

        <Card sx={style.card}>
            <CardMedia
                component="img"
                width={'100%'}
                image={service3.src}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Service3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Web application design
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    </>

    return (<>
        <Container maxWidth="xl">
            <Typography variant="h3" sx={{ mb: 5, mt: 5 }}> Services </Typography>
            <Stack sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around' }}
                spacing={3}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}>
                {content}
            </Stack>

            <Stack sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-around' }}
                spacing={3}
                direction="column"
                justifyContent={'center'}
                divider={<Divider orientation="vertical" flexItem />}>
                {content}
            </Stack>

        </Container>
    </>)
}