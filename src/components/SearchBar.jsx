import { Avatar, Button, Grid, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material"
import { SearchBox, useStyles, useTableIcons } from "@psoftcs"
import React from "react"

const SearchBar = ({ options, CTAButtons, CTAButton2 }) => {
    const { title, searchItems, handleSearch, spacing, variant } = options
    const classes = useStyles()
    const { tableIcons } = useTableIcons()

    const searchNodes = searchItems.map(sitem => (
        <Grid item xs={12} sm={6} md key={sitem.name}>
            <SearchBox variant={variant} {...sitem} />
        </Grid>
    ))
    const searchAction = CTAButtons?.length > 0 &&
        CTAButtons.map(item => (
            <Button
                key={item.title}
                onClick={item.handleClick}
                variant="contained"
                disableElevation
                color="info"
            >
                {item.title}
            </Button>))

    const favoriteAction = CTAButton2?.length > 0 &&
        CTAButton2.map(item => (
            <Button
                key={item.title}
                onClick={item.handleClick}
                variant="contained"
                disableElevation
                color="secondary"
            >
                {item.title}
            </Button>))

    return (
        <Paper elevation={4} sx={classes.searchContentRoot} >
            <Stack direction="row" justifyContent="end" spacing={2} sx={{ mb: 2 }}>{favoriteAction}</Stack>
            <Grid container spacing={spacing ?? 3} alignItems="center" sx={classes.mb2}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Grid>
                {searchNodes}
                <Grid item>
                    <Avatar sx={classes.primaryBgTheme}>
                        <Tooltip title={title}>
                            <IconButton onClick={handleSearch}>
                                <tableIcons.Search />
                            </IconButton>
                        </Tooltip>
                    </Avatar>
                </Grid>
            </Grid>
            <Stack direction="row" justifyContent="end" spacing={2} sx={{ mb: 2 }}>{searchAction}</Stack>
        </Paper>
    )

}

export { SearchBar }