import { Box, Card, Grid, Paper } from '@mui/material'
import { SmartContent, useLogin } from '@psoftcs'
import React from 'react'

const Login = () => {
    const {
        formHeader,
        formContent,
        formActions,
        formResetKeys,
        formTaskRunning,
        freeAction,
    } = useLogin()
    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >

            <Grid item xs={6}   >
                <SmartContent
                    formHeader={formHeader}
                    formContent={formContent}
                    formActions={formActions}
                    formResetKeys={formResetKeys}
                    formTaskRunning={formTaskRunning}
                    freeAction={freeAction}

                />
            </Grid>

        </Grid>
    )
}

export default Login