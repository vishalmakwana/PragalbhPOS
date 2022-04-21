import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SmartContent, useInvoice, Counter } from '@psoftcs'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
const Invoice = (itemName) => {



    const {
        categoriesData,
        itemsData,
        getItem,
        selectedItemData,
        formHeader,
        formContent,
        formActions,
        formResetKeys,
        formTaskRunning,
        freeAction,
        addItemToInvoice,
        itemCounterValue,
    } = useInvoice()

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>

                <Paper elevation={3}>
                    <Typography sx={{ p: 2 }} variant="h5" component="div">
                        Categories
                    </Typography>

                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <nav aria-label="main mailbox folders">
                            <List>
                                {
                                    categoriesData && categoriesData.map((value) =>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText key={value} primary={value} onClick={() => { getItem(value) }} />
                                            </ListItemButton>
                                        </ListItem>
                                    )

                                }
                            </List>
                        </nav>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography sx={{ p: 2 }} variant="h5" component="div">
                        Items
                    </Typography>
                    <Divider />
                    <Grid container spacing={2}>

                        {

                            selectedItemData?.items ? selectedItemData.items.map((value) =>
                                <Grid item xs={3}>
                                    <Card sx={{ maxWidth: 345, mt: 3 }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={require('images/icecream1.jpg')}
                                            alt={value.itemName}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {value.itemName}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>

                                            <Button
                                                key={"addItem"}
                                                onClick={() => { addItemToInvoice(value, 1) }}
                                                variant="contained"
                                                disableElevation
                                                color="info"
                                                sx={{ m: 'auto' }}
                                            >
                                                Add Item
                                            </Button>

                                            {/* <Counter key={value.itemName} value={0} onChange={(items) => { addItemToInvoice(value, items) }} /> */}

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ) :
                                <Typography gutterBottom variant="h6" sx={{ m: 'auto', fontSize: "14px", mt: 4 }} component="div">
                                    No Items To Display
                                </Typography>
                        }
                    </Grid>

                </Paper>
            </Grid >
            <Grid item xs={5}>

                <Paper elevation={3}>
                    <SmartContent
                        formHeader={formHeader}
                        formContent={formContent}
                        formActions={formActions}
                        formResetKeys={formResetKeys}
                        formTaskRunning={formTaskRunning}
                        freeAction={freeAction}

                    />
                </Paper>
            </Grid>
        </Grid >
    )
}

export default Invoice