import { Grid } from "@mui/material"
import { SmartContent, useRegister } from "@psoftcs"


const Register = () => {
    const {
        formHeader,
        formContent,
        formActions,
        formResetKeys,
        formTaskRunning,
        freeAction,
    } = useRegister()
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

export default Register