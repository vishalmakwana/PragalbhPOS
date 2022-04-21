import React, { useEffect, useState } from 'react'
import propTypes from "prop-types"
import { Strings } from "@psoftcs"
import { Autocomplete, Checkbox, TextField } from '@mui/material'
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'


function SearchBox(props) {
    const { name, defaultValue, fullWidth, variant, label, type, isSelect, menuItems, isMaskedInput, onChange, size, isDisable, minDate, titleProp } = props
    const [value, setValue] = useState(defaultValue ?? '')
    const [selectedOption, setselectedOption] = useState(defaultValue)
    useEffect(() => {
        if (menuItems && menuItems.length <= 1)
            setselectedOption(defaultValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuItems])

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    const handleOnChange = (event, data) => {
        const { value } = event.target
        setselectedOption(value)
        onChange(name, data)
    }
    return (
        <>

            <Autocomplete
                name={name}
                multiple
                fullWidth
                freeSolo
                value={value}
                options={[]}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={<CheckBoxOutlineBlank fontSize="small" />}
                            checkedIcon={<CheckBox fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option}
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

                        variant="outlined"
                        label="Search"
                    />
                )}
                disabled={isDisable}
                onChange={(e, data) => handleOnChange(e, data)}
            />
        </>
    )
}

SearchBox.defaultProps = {
    name: "",
    defaultValue: '',
    size: 'small',
    fullWidth: true,
    variant: "outlined",
    label: Strings.SEARCH,
    menuItems: [],
    type: "",
    isSelect: false,
    isDisable: false,
    isMaskedInput: false,
    minDate: null,
    onChange: function () { },
    titleProp: ""
}
SearchBox.propTypes = {
    name: propTypes.string,
    defaultValue: propTypes.any,
    fullWidth: propTypes.bool,
    variant: propTypes.oneOf(["standard", "outlined", "filled"]),
    label: propTypes.string,
    menuItems: propTypes.array,
    type: propTypes.oneOf(['']),
    isSelect: propTypes.bool,
    isDisable: propTypes.bool,
    isMaskedInput: propTypes.bool,
    minDate: propTypes.any,
    onChange: propTypes.func,
}

export { SearchBox }