import React, { useEffect } from "react"
import { Route, Routes, useNavigate, useLocation, matchPath } from "react-router-dom"
import { Box, Toolbar } from "@mui/material"
import {
  appSettings,
  NavTabs,
  Categories,
  Invoices,
  Products,
  Home,
} from "@psoftcs"

function Main({ mainClassName }) {
  const { home, categories, products, invoices } = appSettings.routeConfig
  const { pathname } = useLocation()
  const navigate = useNavigate()



  return (
    <Box component="div" sx={mainClassName}>
      <Toolbar />
      <Routes>

        <Route path={home} element={<Home />} />
        <Route path={categories} element={<Categories />} />
        <Route path={products} element={<Products />} />
        <Route path={invoices} element={<Invoices />} />
      </Routes>
    </Box>
  )
}
export default Main
