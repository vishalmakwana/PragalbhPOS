import { Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SmartContent, useHome, MaterialTable, HomeProductsDataColumns, useStyles, Strings } from '@psoftcs'

const Home = (itemName) => {

    const { columns } = HomeProductsDataColumns()

    const {
        getItem,
        formHeader,
        formContent,
        formActions,
        formResetKeys,
        formTaskRunning,
        freeAction,
        AllProducts,
        allProductsRunning,
        actions
    } = useHome()

    const { materialTableStyle: tableStyle } = useStyles()
    return (
        <Grid container spacing={2}>

            <Grid item xs={7}>
                <MaterialTable
                    columns={columns}
                    data={AllProducts}
                    title={Strings.MENU_PRODUCTS_TITLE}
                    options={{
                        ...tableStyle,
                        selection: false
                    }}
                    actions={actions}
                    isLoading={allProductsRunning}
                />
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

export default Home