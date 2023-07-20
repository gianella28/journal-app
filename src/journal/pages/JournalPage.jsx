import { useDispatch, useSelector } from 'react-redux'
import {IconButton, Typography} from '@mui/material'
import {AddOutlined, MailOutline} from '@mui/icons-material'
import { JournalLayout } from '../layout/JournalLayout'
import { Noteview, NothingSelectedView } from '../views'
import { startNewNot } from '../../store/journal/thunks'



export const JournalPage = () => {
  
  const dispatch = useDispatch();

  const {isSaving, active} = useSelector(state => state.journal);
  
  const onClicNewNote = () => {
    dispatch( startNewNot());
  }
  
  
  return (
    <JournalLayout>
  
      {
        (!!active)
        ? <Noteview />
        :<NothingSelectedView />
      }
      
      

      <IconButton
        onClick={onClicNewNote}
        sixe='large'
        disabled={isSaving}
        sx={{
          color:'white',
          backgroundColor:'error.main',
          ':hover':{backgroundColor: 'error.main', opacity:0.9},
          position:'fixed',
          right:50,
          bottom:50
      }}>
       <AddOutlined sx={{fontSize:30}}/>
      </IconButton>
    </JournalLayout>
  )
}

