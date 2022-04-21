import React from 'react'
import { Paper, Typography } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import { Widget, styled, useTableIcons } from '@psoftcs'

const ItemsContainer = styled('div')(({ theme, isDraggingOver }) => ({
    padding: theme.spacing(1),
    background: isDraggingOver ? '#ccc' : 'white',
    flexGrow: 1,
    height: '54vh', overflowY: 'auto'
}))
const Placeholder = styled('div')(({ isDropDisabled }) => ({
    display: isDropDisabled ? 'none' : 'block'
}))
const Column = ({
    columnId,
    title,
    widgets,
    isDropDisabled,
    index,
    onEditClick,
    onDeleteClick,
    onSave,
    onCancel
}) => {
    const { tableIcons } = useTableIcons()
    return (
        <Paper variant="outlined" sx={{ m: 1, height: '60vh' }}>
            <Typography component='h3' sx={{ p: 1 }}>{title}</Typography>
            <Droppable droppableId={columnId} isDropDisabled={isDropDisabled}>
                {

                    (provided, snapshot) => (
                        <ItemsContainer
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {
                                widgets.map((widget, i) => (
                                    <Widget
                                        key={widget.id}
                                        widget={widget}
                                        index={i}
                                        colIndex={index}
                                        onEditClick={onEditClick}
                                        onDeleteClick={onDeleteClick}
                                        actions={[
                                            {
                                                label: "Save",
                                                icon: tableIcons.DoneAction,
                                                isSubmit: true,
                                                color: 'success',
                                                size: 'small',
                                                sx: { marginRight: 1 },
                                                action: (data) => onSave(i, data)
                                            },
                                            {
                                                label: "Cancel",
                                                icon: tableIcons.CancelAction,
                                                color: 'error',
                                                size: 'small',
                                                sx: { marginRight: 1 },
                                                action: onCancel
                                            }
                                        ]} />
                                ))
                            }
                            <Placeholder isDropDisabled={isDropDisabled}>{provided.placeholder}</Placeholder>
                        </ItemsContainer>
                    )
                }
            </Droppable>
        </Paper>
    )
}

export default Column