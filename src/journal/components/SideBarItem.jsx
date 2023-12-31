import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({title='',body,id,date,imageUrls=[]}) => {
    
    const dispatch = useDispatch();
    
    const onClicNote = () =>{
       dispatch (setActiveNote({title,body,id,date,imageUrls}));
    }

    const newTtitle = useMemo (()=>{
        return title.length >17
        ?title.substring(0,17) +'...'
        :title;
    },[title]);

    if(title !=='') 
    return (
    <ListItem disablePadding>
        <ListItemButton onClick={onClicNote}>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>

            <Grid container>
                <ListItemText primary={title} />
                <ListItemText secondary={body} />

            </Grid>
        </ListItemButton>

    </ListItem>
  )

  return (console.log('no hay titulo'));
  
}
