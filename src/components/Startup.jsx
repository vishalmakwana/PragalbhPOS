import React from "react"
import { Route, useNavigate, Routes } from "react-router-dom"
import {
  useStartup,
  Security,
  LoginCallback,
  Provider,
  AppShell,
  appSettings
} from "@psoftcs"

const Startup = () => {
  const navigate = useNavigate()
  const { routeConfig } = appSettings
  const { oktaAuth, restoreOriginalUri } = useStartup(navigate)
  return (
    // <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
    <Provider>
      <Routes>
        {/* <Route path={routeConfig.loginCallback} element={<LoginCallback />} /> */}
        <Route path="*" element={<AppShell />} />
      </Routes>
    </Provider>
    // </Security>
  )
}
export default Startup
