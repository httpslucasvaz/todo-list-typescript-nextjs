import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Divider,
} from '@mui/material'

import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import UndoIcon from '@mui/icons-material/Undo'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useState } from 'react'

export default function Home() {
  // const [task, setTask] = useState()
  const [value, setValue] = useState('1')

  const handleChange = (e: any, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        backgroundColor: '#e0e0de',
        width: '100%',
        height: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            color: '#40403F',
            fontWeight: 800,
          }}
        >
          MY TODO
        </Typography>
        <Box display="flex" sx={{ mb: 4 }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="digite sua tarefa"
            variant="filled"
            color="warning"
            focused
          />
          <Button variant="contained" sx={{ ml: 1 }} color="warning">
            <AddCircleIcon />
          </Button>
        </Box>
        <Divider />

        {/* //////// HEADER */}

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>

        <Box display="flex" sx={{ mt: 4 }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              minHeight: '4rem',
              borderRadius: '10px',
              backgroundColor: '#cfcfcf',
              borderLeft: '10px solid red',
              alignItems: 'center',
            }}
          >
            <Box
              display="flex"
              sx={{
                width: '100%',
                p: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.1rem',
                  color: '#40403F',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}
              >
                jogar bola
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Button color="success">
            <CheckCircleIcon />
          </Button>
          <Button color="warning" disabled>
            <UndoIcon />
          </Button>
          <Button color="error">
            <DeleteForeverIcon />
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
