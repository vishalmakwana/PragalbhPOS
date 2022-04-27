import React, { useEffect, useState } from "react"
import { Route, useNavigate, Routes, Navigate } from "react-router-dom"
import {
  useStartup,
  Security,
  LoginCallback,
  Provider,
  AppShell,
  appSettings,
  Login,
  Register,
  useLocalStorage
} from "@psoftcs"

const Startup = () => {
  const { login, register } = appSettings.routeConfig
  const { setAppItem, getAppItem, removeAppItem, clearAll } = useLocalStorage()
  const [userData, setUserData] = useState(getAppItem("userData"));
  useEffect(() => {
    setUserData(getAppItem("userData"))
  }, []);


  return (
    // <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
    <Provider>
      <Routes>
        <Route path={login} element={<Login />} />
        <Route path="*" element={<AppShell />} />
        {/* <Route path={register} element={<Register />} /> */}
      </Routes>
    </Provider>
    // </Security>
  )
}
export default Startup
