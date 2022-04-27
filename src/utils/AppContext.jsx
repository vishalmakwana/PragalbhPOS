import React, { createContext, useEffect } from "react"
import { configure } from 'axios-hooks'
import axios from 'axios'
import { appSettings } from './appSettings'

const AppContext = createContext()

function AppContextProvider(props) {
    const { axiosConfig } = appSettings
    debugger
    // configuring Axios using base settings from utils/appSettings.js
    configure({
        axios: axios.create({
            ...axiosConfig
        })
    })

    return (
        <AppContext.Provider value={{}}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContextProvider, AppContext }