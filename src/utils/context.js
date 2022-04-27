import React, { createContext, useState, useEffect } from "react"
import { configure, axios, appSettings } from '@psoftcs'

const Context = createContext()

function ContextProvider(props) {
    // const { authState, oktaAuth } = useOktaAuth()
    const { axiosConfig, defaultSnackContent } = appSettings
    const [snak_open, setSnackOpen] = useState(false)
    const [snackContent, setSnackContent] = useState(defaultSnackContent)
    const [jobName, setJobName] = useState('')

    // #region axios interceptors
    // axios.interceptors.request.use(
    //     async (config) => {
    //         config.headers = {
    //             Authorization: authState?.isAuthenticated === true && `${authState.accessToken.tokenType} ${authState.accessToken.accessToken}`
    //         };
    //     },
    //     (error) => Promise.reject(error)
    // );

    // response interceptor intercepting 401 responses, refreshing token and retrying the request
    axios.defaults.baseURL = `${axiosConfig.baseURL}`
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const config = error.config;

            if (error.response.status === 401 && !config._retry) {
                config._retry = true;
                // const res = await oktaAuth.tokenManager.renew('idToken')
                return axios(config);
            }

            return Promise.reject(error);
        }
    );
    //#endregion

    useEffect(() => {
        configure({
            axios: axios.create({
                ...axiosConfig,
                headers: {
                    // Authorization: authState?.isAuthenticated === true && `${authState.accessToken.tokenType} ${authState.accessToken.accessToken}`
                }
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (snak_open === false)
            setSnackContent(defaultSnackContent)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snak_open])

    const logMessage = ({ msg, severity, vertical, horizontal }) => {
        setSnackContent({ msg, severity, vertical, horizontal })
        setSnackOpen(msg && Object.keys(msg).length > 0 ? true : false)
    }
    return (
        <Context.Provider value={{
            snak_open,
            setSnackOpen,
            logMessage,
            snackContent,
            jobName,
            setJobName
        }}>
            {props.children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }