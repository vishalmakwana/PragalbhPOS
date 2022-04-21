import React from 'react'
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
    StyledEngineProvider
} from '@mui/material/styles'
import { appSettings } from '@psoftcs'
import { amber, indigo, lightBlue, red } from '@mui/material/colors'

const Themeify = (props) => {
    const { colors } = appSettings.calendarConfig
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                dark: '#0d783d',
                main: "#0bb202",
                contrastText: '#fff',
            },
            secondary: {
                dark: '#265773',
                main: '#6394a6',
                light: '#bad1d9',
                contrastText: '#fff'
            },
            text: {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.87)',
            }
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    colorDefault: {
                        backgroundColor: '#fff'
                    }
                }
            },
            MuiTextField: {
                defaultProps: {
                    size: "small"
                }
            },
            MuiSelect: {
                defaultProps: {
                    size: "small"
                }
            },
            MuiCssBaseline: {
                styleOverrides: `
                  .calendar{
                    height: 100% !important;
                    overflow:hidden;
                  }
                  .calendar table.month td.day.disabled .day-content{
                    background: ${colors.Weekend};
                    color: black;
                    border-radius: 0px;
                    
                  }
                  .calendar table.month td.disabled .day-content:hover{
                    background: ${colors.Weekend} !important;
                  }
                  .calendar .months-container .month-container {
                    margin-bottom: 28px;
                  }
                `,
            },
        },

    })
    const responsiveTheme = responsiveFontSizes(theme)
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={responsiveTheme}>
                {props.children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
export default Themeify