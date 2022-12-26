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
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useState } from 'react'

interface ObjProps {
  id: string
  description: string
  done: boolean
}

export default function Home() {
  const [task, setTask] = useState([])
  const [input, setInput] = useState('')
  console.log(task)
  const [value, setValue] = useState('1')

  const handleChange = (e: any, newValue: string) => {
    setValue(newValue)
  }
  const handleAddTask = () => {
    if (!task) {
      alert('Por favor, insira uma tarefa!')
    } else {
      const obj: ObjProps = {
        id: Date.now(),
        description: input,
        done: false,
      }
      setTask([...task, obj])
      setInput('')
    }
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
            color="secondary"
            focused
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ ml: 1 }}
            color="secondary"
            onClick={handleAddTask}
          >
            <AddCircleIcon />
          </Button>
        </Box>
        <Divider />

        {/* //////// HEADER */}

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              variant="scrollable"
              scrollButtons="auto"
              textColor="secondary"
              indicatorColor="secondary"
              sx={{
                '.MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '1.1rem',
                },
              }}
              onChange={handleChange}
            >
              <Tab label="ATIVOS" value="1" />
              <Tab label="FINALIZADOS" value="2" />
              <Tab label="CANCELADOS" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {task?.map((task, index) => {
              return (
                <>
                  <Box display="flex">
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
                          key={index}
                          sx={{
                            width: '100%',
                            fontSize: '1.1rem',
                            color: '#40403F',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            wordBreak: 'break-all',
                          }}
                        >
                          {task.description}
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
                    <div>
                      <Button color="success">
                        <CheckCircleIcon />
                      </Button>

                      <Button color="error">
                        <DeleteForeverIcon />
                      </Button>
                    </div>
                  </Box>
                </>
              )
            })}
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Container>
    </Box>
  )
}
