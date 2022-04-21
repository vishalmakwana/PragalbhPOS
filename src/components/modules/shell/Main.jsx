import React, { useEffect } from "react"
import { Route, Routes, useNavigate, useLocation, matchPath } from "react-router-dom"
import { Box, Toolbar } from "@mui/material"
import {
  appSettings,
  NavTabs,
  Invoice
} from "@psoftcs"

function Main({ mainClassName }) {
  const { invoice } = appSettings.routeConfig
  const { pathname } = useLocation()
  const navigate = useNavigate()



  return (
    <Box component="div" sx={mainClassName}>
      <Toolbar />
      <Routes>
        <Route path={invoice} element={<Invoice />} />
      </Routes>
    </Box>
  )
}
export default Main
