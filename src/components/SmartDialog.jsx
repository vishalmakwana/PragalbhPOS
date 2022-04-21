import React, { Fragment, useEffect } from "react"
import {
    Box, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Button, MenuItem, TextField, Chip, Checkbox, ListItemText, InputAdornment, FormControlLabel,
    Switch as MUSwitch, Icon, Autocomplete, Typography, Stack, Radio, RadioGroup, FormLabel, FormControl
} from "@mui/material"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useForm, Controller } from "react-hook-form"
import { Clear, CheckBoxOutlineBlank, CheckBox, CalendarToday } from "@mui/icons-material"
import { Counter, Switch, MaterialTable, useStyles, useTableIcons, LoadingButton, appSettings, AdapterMoment, MobileDateRangePicker } from "@psoftcs"
import { DatePicker, DateRangePicker, LocalizationProvider, StaticDateRangePicker } from "@mui/lab"

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-textmate";
const SmartDialog = ({
    open,
    handleClose,
    modalHeader,
    modalContent,
    modalActions,
    modalFormResetKeys,
    modalTaskRunning,
}) => {
    const { isForm, title, header, modalWidth, isReadOnly } = modalHeader
    const {
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
        reset,
        getValues,
    } = useForm()
    const classes = useStyles()
    const stylingOptions = classes.materialTableStyle
    const { tableIcons } = useTableIcons()
    const { fieldTypes, fieldGroupTypes } = appSettings

    const arrayFieldTypes = Object.entries(fieldTypes)
        .filter(([key, item]) => item.group === fieldGroupTypes.array)
        .map((item) => item[1].type)

    const nullableFieldTypes = Object.entries(fieldTypes)
        .filter(([key, item]) => item.group === fieldGroupTypes.nullable)
        .map((item) => item[1].type)
    const booleanFieldTypes = Object.entries(fieldTypes)
        .filter(([key, item]) => item.group === fieldGroupTypes.boolean)
        .map((item) => item[1].type)

    const clearData = (keepDefaultValues = false) => {
        if (modalContent) {
            const formObj = Object.assign(
                {},
                ...Object.entries(modalContent).map(([key, item]) =>
                ({
                    [key]: keepDefaultValues
                        ? item.value
                        : arrayFieldTypes.includes(item.type ?? fieldTypes.text.type)
                            ? []
                            : nullableFieldTypes.includes(item.type ?? fieldTypes.text.type)
                                ? null
                                : booleanFieldTypes.includes(item.type ?? fieldTypes.text.type)
                                    ? false
                                    : "",
                })
                )
            )
            reset(formObj)
        }
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    useEffect(() => {
        if (modalFormResetKeys && modalFormResetKeys.length > 0) {
            if (modalContent) {
                const formObj = Object.assign(
                    {},
                    ...Object.entries(modalContent).map(([key, item]) => {
                        if (modalFormResetKeys && modalFormResetKeys.includes(key))
                            return { [key]: item.value }
                        return { [key]: getValues(`${key}`) }
                    })
                )
                reset(formObj, { keepErrors: true })
            }
        } else clearData(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalContent, modalFormResetKeys])

    const handleModalClose = () => {
        clearErrors()
        clearData()
        handleClose()
    }
    return (
        <Dialog
            open={open}
            aria-labelledby="form-dialog-title"
            scroll="paper"
            maxWidth={modalWidth ?? 'md'}
            fullWidth
            disableEscapeKeyDown
            onClose={(event, reason) => {
                if (reason === 'backdropClick') return false
                handleModalClose()
            }}
        >
            <DialogTitle sx={classes.ModalTitle}>{title}</DialogTitle>
            <DialogContent dividers>
                {isForm === true ? (
                    <Grid container spacing={2}>
                        {modalContent &&
                            Object.entries(modalContent).map(([key, item]) =>
                                item.type === fieldTypes.table.type ? (
                                    <Grid key={key} item xs={12} md={item.col}>
                                        <MaterialTable
                                            title={item.label}
                                            icons={tableIcons}
                                            columns={item.columns}
                                            data={item.data}
                                            editable={item.editable}
                                            detailPanel={item.detailPanel}
                                            components={item.components}
                                            localization={item.localization}
                                            options={{
                                                ...stylingOptions,
                                                pageSize: 3,
                                                pageSizeOptions: [3, 5, 10, 20],
                                                search: true,
                                                padding: "dense",
                                                ...item.tableOptions,
                                            }}
                                        />
                                    </Grid>
                                ) : (
                                    <Grid
                                        container
                                        key={key}
                                        item
                                        xs={12}
                                        md={item.col}
                                        justify={item.justify ?? "flex-start"}
                                        sx={item.display ?? classes.shown}
                                    >
                                        {
                                            <Switch on={item.type ?? fieldTypes.text.type}>
                                                <Typography case={fieldTypes.label.type} variant={item.variant} sx={item.sx}>{item.value}</Typography>
                                                <Controller
                                                    case={fieldTypes.select.type}
                                                    control={control}
                                                    rules={item.validator}
                                                    name={`${key}`}
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <>
                                                            <TextField
                                                                {...field}
                                                                fullWidth
                                                                size={item.size}
                                                                variant={item.variant}
                                                                label={item.label}
                                                                select
                                                                SelectProps={item.selectProps}
                                                                disabled={
                                                                    (item.disabled && true) ||
                                                                    (isReadOnly ?? false)
                                                                }
                                                                onChange={(e) => {
                                                                    field.onChange(e)
                                                                    item.onSelectionChange &&
                                                                        item.onSelectionChange(e)
                                                                }}
                                                                error={!!errors[`${key}`]}
                                                            >
                                                                {item.menuItems.map((item) => (
                                                                    <MenuItem
                                                                        key={`${item.val}_${item.text}`}
                                                                        value={item.val}
                                                                    >
                                                                        {item.text}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                            {errors[`${key}`] && (
                                                                <Typography variant="subtitle1" sx={classes.invalid}>
                                                                    {errors[`${key}`].message}
                                                                </Typography>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.multiSelect.type}
                                                    control={control}
                                                    rules={item.validator}
                                                    name={`${key}`}
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <>
                                                            <TextField
                                                                {...field}
                                                                fullWidth
                                                                size={item.size}
                                                                variant={item.variant}
                                                                label={item.label}
                                                                select
                                                                SelectProps={{
                                                                    multiple: true,
                                                                    renderValue: (selected) => (
                                                                        <Box component="div"
                                                                            sx={{
                                                                                display: "flex",
                                                                                flexWrap: "wrap",
                                                                            }}
                                                                        >
                                                                            {selected.map((value) => (
                                                                                <Chip
                                                                                    sx={{ margin: 2 }}
                                                                                    variant="outlined"
                                                                                    key={value}
                                                                                    label={
                                                                                        item.menuItems.find(
                                                                                            (item) => item.id === value
                                                                                        )?.name
                                                                                    }
                                                                                />
                                                                            ))}
                                                                        </Box>
                                                                    ),
                                                                }}
                                                                disabled={
                                                                    (item.disabled && true) ||
                                                                    (isReadOnly ?? false)
                                                                }
                                                                onChange={(e) => {
                                                                    field.onChange(e)
                                                                    item.onSelectionChange &&
                                                                        item.onSelectionChange(e)
                                                                }}
                                                                error={!!errors[`${key}`]}
                                                            >
                                                                {item.menuItems.map((mitem) => (
                                                                    <MenuItem key={mitem.id} value={mitem.id}>
                                                                        <Checkbox
                                                                            color="primary"
                                                                            checked={
                                                                                field.value.indexOf(mitem.id) > -1
                                                                            }
                                                                        />
                                                                        <ListItemText primary={mitem.name} />
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                            {errors[`${key}`] && (
                                                                <Typography variant="subtitle1" sx={classes.invalid}>
                                                                    {errors[`${key}`].message}
                                                                </Typography>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.text.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    rules={item.validator}
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <>
                                                            <TextField
                                                                {...field}
                                                                fullWidth
                                                                size={item.size}
                                                                variant={item.variant}
                                                                label={item.label}
                                                                type={item.type ? item.type : "text"}
                                                                disabled={
                                                                    (item.disabled && true) ||
                                                                    (isReadOnly ?? false)
                                                                }
                                                                error={!!errors[`${key}`]}
                                                            />
                                                            {errors[`${key}`] && (
                                                                <Typography variant="subtitle1" sx={classes.invalid}>
                                                                    {errors[`${key}`].message}
                                                                </Typography>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.password.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    rules={
                                                        item.match
                                                            ? {
                                                                validate: (value) =>
                                                                    getValues(`${item.match.field}`) === value,
                                                            }
                                                            : item.validator
                                                    }
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <>
                                                            <TextField
                                                                {...field}
                                                                fullWidth
                                                                size={item.size}
                                                                variant={item.variant}
                                                                label={item.label}
                                                                type={item.showPassword ? "text" : "password"}
                                                                disabled={
                                                                    (item.disabled && true) ||
                                                                    (isReadOnly ?? false)
                                                                }
                                                                error={!!errors[`${key}`]}
                                                                onChange={(e) => {
                                                                    field.onChange(e)
                                                                    item.onTextChange && item.onTextChange(e)
                                                                }}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                aria-label="toggle password visibility"
                                                                                sx={classes.no_pading}
                                                                                onMouseDown={handleMouseDownPassword}
                                                                                onClick={() =>
                                                                                    item.setShowPassword(getValues(`${key}`)
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Icon fontSize="small">{`visibility${!!!item.showPassword && "_off"}`}</Icon>
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            ></TextField>
                                                            {errors[`${key}`] && (
                                                                <Typography variant="subtitle1" sx={classes.invalid}>
                                                                    {errors[`${key}`].type === "validate"
                                                                        ? `${item.match.errorMsg}`
                                                                        : errors[`${key}`].message}
                                                                </Typography>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.textArea.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    rules={item.validator}
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <>
                                                            <TextField
                                                                {...field}
                                                                fullWidth
                                                                size={item.size}
                                                                variant={item.variant}
                                                                label={item.label}
                                                                multiline
                                                                minRows={item.minRows ? item.minRows : 4}
                                                                disabled={
                                                                    (item.disabled && true) ||
                                                                    (isReadOnly ?? false)
                                                                }
                                                                error={!!errors[`${key}`]}
                                                            />
                                                            {errors[`${key}`] && (
                                                                <Typography variant="subtitle1" sx={classes.invalid}>
                                                                    {errors[`${key}`].message}
                                                                </Typography>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.switch.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    rules={item.validator}
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <FormControlLabel
                                                            control={
                                                                <MUSwitch
                                                                    {...field}
                                                                    color="primary"
                                                                    onChange={(e) => {
                                                                        field.onChange(e)
                                                                        item.onSwitchChange &&
                                                                            item.onSwitchChange(e)
                                                                    }}
                                                                // sx={item.display ?? classes.shown}
                                                                />
                                                            }
                                                            label={item.label}
                                                            labelPlacement="end"
                                                        // sx={item.display ?? classes.shown}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.checkbox.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    rules={item.validator}
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    {...field}
                                                                    checked={field.value}
                                                                    color="primary"
                                                                    disabled={
                                                                        (item.disabled && true) ||
                                                                        (isReadOnly ?? false)
                                                                    }
                                                                // sx={item.display ?? classes.shown}
                                                                />
                                                            }
                                                            label={item.label}
                                                            labelPlacement="end"
                                                        // sx={item.display ?? classes.shown}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.radio.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    rules={item.validator}
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <FormControlLabel
                                                            control={
                                                                <Radio
                                                                    {...field}
                                                                    checked={field.value === item.selectedValue}
                                                                    color="primary"
                                                                    disabled={
                                                                        (item.disabled && true) ||
                                                                        (isReadOnly ?? false)
                                                                    }
                                                                    onChange={(e) => {
                                                                        field.onChange(e)
                                                                        item.onCheckedChange && item.onCheckedChange(e.target.value)
                                                                    }}
                                                                // sx={item.display ?? classes.shown}
                                                                />
                                                            }
                                                            label={item.label}
                                                            labelPlacement="end"
                                                        // sx={item.display ?? classes.shown}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.radioGroup.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    rules={item.validator}
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <FormControl>
                                                            <FormLabel>{item.label}</FormLabel>
                                                            <RadioGroup
                                                                {...field}
                                                                row={item.row ?? false}
                                                                onChange={(e) => {
                                                                    field.onChange(e)
                                                                    item.onChange && item.onChange(e)
                                                                }}
                                                            >
                                                                {
                                                                    item.options.map(o => (
                                                                        <FormControlLabel key={o.val} value={o.val} control={<Radio />} label={o.text} />
                                                                    ))
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.autoComplete.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    rules={item.validator}
                                                    defaultValue={item.value}
                                                    onChange={([, data]) => data}
                                                    render={({ field }) => (
                                                        <>
                                                            <Autocomplete
                                                                {...field}
                                                                size={item.size}
                                                                options={item.menuItems}
                                                                disableCloseOnSelect={item.disableCloseOnSelect ?? true}
                                                                disableClearable={item.disableClearable ?? true}
                                                                getOptionLabel={(option) => option[item.titleProp]}
                                                                isOptionEqualToValue={item.equalityComparer}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        fullWidth
                                                                        inputProps={{
                                                                            ...params.inputProps,
                                                                            autoComplete: "disabled"
                                                                        }}

                                                                        variant={item.variant}
                                                                        label={item.label}
                                                                        error={!!errors[`${key}`]} />
                                                                )}
                                                                disabled={
                                                                    (item.disabled && true) ||
                                                                    (isReadOnly ?? false)
                                                                }
                                                                onChange={(e, data) => field.onChange(data)}
                                                            />
                                                            {errors[`${key}`] && (
                                                                <Typography variant="subtitle1" sx={classes.invalid}>
                                                                    {errors[`${key}`].message}
                                                                </Typography>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.autoCompleteMultiple.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    rules={item.validator}
                                                    defaultValue={item.value}
                                                    onChange={([, data]) => data}
                                                    render={({ field }) => (
                                                        <>
                                                            <Autocomplete
                                                                {...field}
                                                                multiple
                                                                limitTags={isReadOnly || item.disabled ? -1 : (item.limitTags ?? 5)}
                                                                fullWidth
                                                                size={item.size}
                                                                options={item.menuItems}
                                                                disableCloseOnSelect={item.disableCloseOnSelect ?? true}
                                                                disableClearable={item.disableClearable ?? true}
                                                                getOptionLabel={(option) => option[item.titleProp]}
                                                                isOptionEqualToValue={item.equalityComparer}
                                                                renderOption={(props, option, { selected }) => (
                                                                    <li {...props}>
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlank fontSize="small" />}
                                                                            checkedIcon={<CheckBox fontSize="small" />}
                                                                            style={{ marginRight: 8 }}
                                                                            checked={selected}
                                                                        />
                                                                        {option[item.titleProp]}
                                                                    </li>
                                                                )}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        fullWidth
                                                                        inputProps={{
                                                                            ...params.inputProps,
                                                                            autoComplete: "disabled"
                                                                        }}

                                                                        variant={item.variant}
                                                                        label={item.label}
                                                                        error={!!errors[`${key}`]} />
                                                                )}
                                                                disabled={
                                                                    (item.disabled && true) ||
                                                                    (isReadOnly ?? false)
                                                                }
                                                                onChange={(e, data) => field.onChange(data)}
                                                            />
                                                            {errors[`${key}`] && (
                                                                <Typography variant="subtitle1" sx={classes.invalid}>
                                                                    {errors[`${key}`].message}
                                                                </Typography>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.counter.type}
                                                    control={control}
                                                    rules={item.validator}
                                                    name={`${key}`}
                                                    defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <>
                                                            <Counter
                                                                {...field}
                                                                sx={item.sx}
                                                                size={item.size}
                                                                fullWidth
                                                                disabled={
                                                                    (item.disabled && true) ||
                                                                    (isReadOnly ?? false)
                                                                } />
                                                            {errors[`${key}`] && (
                                                                <Typography variant="subtitle1" sx={classes.invalid}>
                                                                    {errors[`${key}`].message}
                                                                </Typography>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                <Controller
                                                    case={fieldTypes.aceEditor.type}
                                                    name={`${key}`}
                                                    control={control}
                                                    defaultValue={item.value}
                                                    value={item.value}
                                                    render={({ field }) => (
                                                        <>
                                                            <AceEditor
                                                                {...field}
                                                                mode="csharp"
                                                                theme="textmate"
                                                                onChange={(e) => {
                                                                    field.onChange(e)
                                                                }}
                                                                editorProps={{ $blockScrolling: true }}
                                                            />
                                                        </>
                                                    )}
                                                />
                                                <Controller case={fieldTypes.date.type} name={`${key}`} control={control} rules={item.validator} defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>

                                                                <DatePicker
                                                                    {...field} fullWidth size={item.size} inputVariant={item.variant}
                                                                    label={item.label} clearable format="MM/dd/yyyy"
                                                                    disabled={item.disabled && true || (isReadOnly ?? false)} error={!!errors[`${key}`]}
                                                                    minDate={item.minDate}
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <IconButton size="small">
                                                                                    <CalendarToday fontSize="small" />
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        )
                                                                    }}
                                                                    onChange={(e) => {
                                                                        field.onChange(e)
                                                                        item.onChange && item.onChange(key, e)
                                                                    }}
                                                                    renderInput={(params) => <TextField {...params} />}
                                                                />
                                                            </LocalizationProvider>
                                                            {
                                                                errors[`${key}`] &&
                                                                <span className={classes.invalid}>
                                                                    {errors[`${key}`].message}
                                                                </span>
                                                            }
                                                        </>
                                                    )}
                                                />

                                                <Controller case={fieldTypes.dateRange.type} name={`${key}`} control={control} rules={item.validator} defaultValue={item.value}
                                                    render={({ field }) => (
                                                        <>
                                                            <LocalizationProvider dateAdapter={AdapterMoment} >
                                                                <MobileDateRangePicker
                                                                    {...field} fullWidth size={item.size} inputVariant={item.variant}
                                                                    label={item.label} clearable
                                                                    format="MM/dd/yyyy"
                                                                    disabled={item.disabled && true || (isReadOnly ?? false)} error={!!errors[`${key}`]}
                                                                    onChange={(e) => {
                                                                        field.onChange(e)
                                                                        item.onChange && item.onChange(key, e)
                                                                    }}
                                                                    minDate={item.minDate}
                                                                    maxDate={item.maxDate}
                                                                    renderInput={(startProps, endProps) => (
                                                                        <React.Fragment>
                                                                            <Stack spacing={2} direction="row">
                                                                                <TextField {...startProps} />
                                                                                <TextField {...endProps} />
                                                                            </Stack>
                                                                        </React.Fragment>
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                            {
                                                                errors[`${key}`] &&
                                                                <span className={classes.invalid}>
                                                                    {errors[`${key}`].message}
                                                                </span>
                                                            }
                                                        </>
                                                    )}
                                                />
                                            </Switch>
                                        }
                                    </Grid>
                                )
                            )}
                    </Grid>
                ) : (
                    <>{modalContent}</>
                )}
            </DialogContent>
            <DialogActions>
                {isForm === true &&
                    modalActions &&
                    modalActions.map((item) => (
                        <Fragment key={item.label}>
                            {item.isSubmit === true ?
                                item.isTable ?
                                    (
                                        <LoadingButton
                                            onClick={item.action}
                                            startIcon={<item.icon color="default" />}
                                            color="secondary"
                                            variant="contained"
                                            disableElevation
                                            loading={modalTaskRunning}
                                            loadingPosition="start"
                                        >
                                            {item.label}
                                        </LoadingButton>
                                    ) :
                                    (
                                        <LoadingButton
                                            onClick={handleSubmit(item.action)}
                                            startIcon={<item.icon color="default" />}
                                            color="secondary"
                                            variant="contained"
                                            disableElevation
                                            loading={modalTaskRunning}
                                            loadingPosition="start"
                                        >
                                            {item.label}
                                        </LoadingButton>
                                    )
                                : (
                                    <Button
                                        onClick={item.action}
                                        startIcon={<item.icon color="default" />}
                                        color="secondary"
                                        variant="contained"
                                        disableElevation
                                    >
                                        {item.label}
                                    </Button>
                                )}
                        </Fragment>
                    ))}
                <Button
                    onClick={handleModalClose}
                    startIcon={<Clear />}
                    color="secondary"
                    variant="outlined"
                    disabled={modalTaskRunning}
                >
                    {(isReadOnly === true && "Close") || "Cancel"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SmartDialog