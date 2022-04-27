import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { ExitToAppRounded } from '@mui/icons-material'
import { appSettings, Strings, useLocalStorage } from '@psoftcs'
import { useNavigate } from 'react-router-dom'
export default function NavProfile() {
    const navigate = useNavigate()
    const { clearAll } = useLocalStorage()
    const { routeConfig } = appSettings
    const logout = async (e) => {
        clearAll()
        navigate(routeConfig.login)
    };
    return (
        <Tooltip title={Strings.LOGOUT_TITLE}>
            <IconButton onClick={logout} edge="end" color="secondary">
                <ExitToAppRounded />
            </IconButton>
        </Tooltip>
    )
}
