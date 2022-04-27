import { appSettings, useTableIcons } from "@psoftcs"
import { useEffect, useState } from "react"

function useRegister() {
    const { fieldTypes } = appSettings
    const { tableIcons } = useTableIcons()
    const [formHeader, setFormHeader] = useState({})
    const [formContent, setFormContent] = useState({})
    const [formActions, setFormActions] = useState([])
    const [formResetKeys, setFormResetKeys] = useState([])
    const [formTaskRunning, setFormTaskRunning] = useState(false)
    const [freeAction, setFreeAction] = useState(null)

    const setLoginContent = () => {
        setFormContent({
            email: {
                label: "Email",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                validator: {
                    required: { value: true, message: "email id is required" }
                }
            },
            password: {
                label: "Password",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.password.type,
                validator: {
                    required: { value: true, message: "password is required" }
                }
            },
        })
        setFormActions([
            {
                label: "Login",
                icon: tableIcons.Login,
                isSubmit: true,
                sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px auto'
                },
                action: (data) => handleSubmit()
            }
        ])
    }

    const handleSubmit = () => { }


    useEffect(() => {
        setLoginContent()
    }, []);
    return {
        formHeader,
        formContent,
        formActions,
        formResetKeys,
        formTaskRunning,
        freeAction
    }


}

export default useRegister