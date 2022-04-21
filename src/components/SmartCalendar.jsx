import React from 'react'
import { styled, Box, Typography, Stack, Button, Paper, Divider } from '@mui/material'
import Calendar from 'rc-year-calendar'
import 'rc-year-calendar/locales/rc-year-calendar.eu'
import { appSettings } from '@psoftcs'

const CalendarHeader = styled('div')(
    ({ theme }) =>
        `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing(2)};
    padding:${theme.spacing(1.5)}
`
)

const ColorBox = styled("div")(
    ({ theme, bg }) =>
        `
    width:${theme.spacing(2)};
    height:${theme.spacing(2)};
    background: ${bg};
    border-radius: 50%;
`
)

const Legend = ({ title, color }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: "center"
        }}
    >
        <Typography variant="caption" sx={{ mr: 0.5 }}>
            {title}
        </Typography>
        <ColorBox bg={color} />
    </Box>
)

const SmartCalendar = ({
    dataSource,
    options,
    onDayClick,
    CTAButtons,
}) => {
    const { colors } = appSettings.calendarConfig
    const { currentYear, title, ...other } = options
    const calendarActions = CTAButtons?.length > 0 &&
        CTAButtons.map(item => (
            <Button
                key={item.title}
                onClick={item.handleClick}
                variant="outlined"
                disableElevation
                color="info"
            >
                {item.title}
            </Button>))

    const legendItems = Object.entries(colors).map(([key, item]) => <Legend key={key} title={key} color={item} />)
    return (
        <Paper sx={{ padding: 0 }} elevation={6}>
            <Stack direction="row" spacing={2} sx={{ padding: 1.5 }}>{calendarActions}</Stack>
            <CalendarHeader>
                <Typography variant="h6">{title}</Typography>
                <Stack direction="row" spacing={2}>{legendItems}</Stack>
            </CalendarHeader>
            <Divider />
            <Calendar
                style="background"
                year={currentYear}
                dataSource={dataSource && dataSource}
                disabledWeekDays={[0, 6]}
                {...other}
                onDayClick={(d) => console.log(d)}
            />
        </Paper>
    )
}

export default SmartCalendar