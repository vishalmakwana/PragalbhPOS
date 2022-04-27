import { async } from "@firebase/util"
import { appSettings, useTableIcons, useAxios, Context, useLocalStorage } from "@psoftcs"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function useLogin() {
    const { logMessage } = useContext(Context)
    const { fieldTypes, endpointConfig, statusType, routeConfig } = appSettings
    const { setAppItem, getAppItem, removeAppItem, clearAll } = useLocalStorage()
    const { tableIcons } = useTableIcons()
    const [formHeader, setFormHeader] = useState({})
    const [formContent, setFormContent] = useState({})
    const [formActions, setFormActions] = useState([])
    const [formResetKeys, setFormResetKeys] = useState([])
    const [formTaskRunning, setFormTaskRunning] = useState(false)
    const [freeAction, setFreeAction] = useState(null)

    const [{ data: AllUsers, loading: allUsersLoading, AllUsersErrors }, refetchAllUsers] = useAxios(endpointConfig.authUsers.getAll)

    const navigate = useNavigate()

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
                action: (data) => handleSubmit(data)
            }
        ])
    }

    const handleSubmit = async (data) => {
        if (AllUsers == undefined) {
            await refetchAllUsers().then((response) => {
                response.data.find(async (user) => {
                    if (user.email == data.email && user.password == data.password) {
                        await setAppItem("userData", JSON.stringify(data))
                        navigate(routeConfig.home)
                    } else {
                        alert("please provide valid details");
                    }
                })
            })

        } else {
            AllUsers.find((user) => {
                if (user.email == data.email && user.password == data.password) {
                    setAppItem("userData", JSON.stringify(data))
                    navigate(routeConfig.home)
                    return data
                } else {
                    alert("please provide valid details");
                }
            })
        }
    }
    console.log(AllUsers);


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

export default useLogin