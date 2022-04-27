import React, { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Box, Snackbar, Slide, Alert } from "@mui/material"
import {
  useStyles,
  useMenuState,
  Header,
  Flyout,
  Main,
  appSettings,
  Context,
  useLocalStorage
} from "@psoftcs"

const AppShell = () => {
  const { snak_open, setSnackOpen, snackContent } = useContext(Context)
  const { mobileOpen, handleDrawerToggle, open } = useMenuState()
  const classes = useStyles()
  const { routeConfig, defaultDuration } = appSettings
  const { setAppItem, getAppItem, removeAppItem, clearAll } = useLocalStorage()
  const [userData, setUserData] = useState(getAppItem("userData"));
  useEffect(() => {
    setUserData(getAppItem("userData"))
  }, []);
  return (
    <>
      {
        userData ?
          <Box component="div" sx={classes.root}>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Flyout menuObj={{ mobileOpen, handleDrawerToggle, open }} />
            <Box component="div" sx={[classes.mainRoot, classes.smUp]}>
              <Main mainClassName={classes.content} />
            </Box>
            <Box component="div" sx={[classes.mainRoot, classes.smDown]}>
              <Main mainClassName={open === true ? classes.content : classes.contentShift} />
            </Box>
          </Box> : <Navigate to={routeConfig.login} replace />
      }
      <Snackbar
        open={snak_open}
        autoHideDuration={defaultDuration}
        onClose={() => setSnackOpen(false)}
        // TransitionComponent={(props) => (
        //   <Slide {...props} direction="right" />
        // )}

        anchorOrigin={{ vertical: snackContent.vertical || "bottom", horizontal: snackContent.horizontal || "left" }}
      >
        <Alert severity={snackContent.severity} variant="filled">
          {snackContent.msg}
        </Alert>
      </Snackbar>

    </>
  )
}
export default AppShell
