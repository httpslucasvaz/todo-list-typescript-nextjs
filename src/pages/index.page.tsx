import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material'

import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ClearIcon from '@mui/icons-material/Clear'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import UndoIcon from '@mui/icons-material/Undo'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt'
import GradingIcon from '@mui/icons-material/Grading'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

interface ObjProps {
  id: number
  description: string
  taskValue: string
}

function Home() {
  const [task, setTask] = useState<ObjProps[]>(() => {
    const savedTask: any = localStorage.getItem('key')
    const parsedTask = JSON.parse(savedTask)
    return parsedTask || ''
  })
  const [input, setInput] = useState('')
  const [value, setValue] = useState('1')
  const [open, setOpen] = useState(false)

  const handleSnackClick = () => {
    setOpen(true)
  }

  const handleSnackClose = (
    // eslint-disable-next-line no-undef
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(task))
  }, [task])

  const handleChange = (e: any, newValue: string) => {
    setValue(newValue)
  }
  const handleAddTask = () => {
    if (!input || input.length <= 2) {
      alert('Por favor, insira uma tarefa! Mínimo de 3 caracteres')
    } else if (input.length >= 29) {
      alert('Máximo de 30 caracteres!')
    } else {
      const obj: ObjProps = {
        id: Date.now(),
        description: input,
        taskValue: '1',
      }
      setTask([...task, obj])
      setInput('')
    }
  }

  const handleTaksDone = (tasks: ObjProps) => {
    const currentTask: any = task.find((item) => {
      return item.id === tasks.id
    })
    currentTask.taskValue = '2'
    setTask([...task])
    handleSnackClick()
  }

  const handleTaksCancel = (tasks: ObjProps) => {
    const currentTask: any = task.find((item) => {
      return item.id === tasks.id
    })

    currentTask.taskValue = '3'
    setTask([...task])
  }

  const handleUndo = (tasks: ObjProps) => {
    const currentTask: any = task.find((item) => {
      return item.id === tasks.id
    })

    currentTask.taskValue = '1'
    setTask([...task])
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTask()
    }
  }

  const handleResetTask = () => {
    setTask([])
  }

  return (
    <Box
      sx={{
        backgroundColor: '#e0e0de',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: '#40403F',
              fontWeight: 800,
              cursor: 'default',
            }}
          >
            MY
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: '#40403F',
              fontWeight: 800,
              mt: '-20px',
              cursor: 'default',
            }}
          >
            {' '}
            TODO
          </Typography>
        </Box>
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
            onKeyPress={handleKeyPress}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleResetTask}
            >
              RESET
            </Button>
          </Box>
          <TabPanel value="1">
            {task?.every((item) => item.taskValue !== '1') ? (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#c7c7c7',
                  }}
                >
                  <AssignmentIcon
                    sx={{
                      fontSize: '10rem',
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#c7c7c7',
                      textAlign: 'center',
                      cursor: 'default',
                    }}
                  >
                    VOCÊ AINDA NÃO POSSUI NENHUMA TAREFA!
                  </Typography>
                </Box>
              </Box>
            ) : (
              task
                ?.filter((item) => item.taskValue === '1')
                .map((task) => {
                  return (
                    <Box key={task.id.toString()}>
                      <Box display="flex" key={task.id.toString()}>
                        <Box
                          sx={{
                            display: 'flex',
                            width: '100%',
                            minHeight: '4rem',
                            borderRadius: '10px',
                            backgroundColor: '#cfcfcf',
                            borderLeft: '10px solid #7B1EA2',
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
                            <Box>
                              <Typography
                                variant="h3"
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
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Box>
                          <Button
                            color="success"
                            onClick={() => handleTaksDone(task)}
                          >
                            <CheckCircleIcon />
                          </Button>

                          <Button
                            color="error"
                            onClick={() => handleTaksCancel(task)}
                          >
                            <ClearIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )
                })
            )}

            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={handleSnackClose}
            >
              <Alert
                onClose={handleSnackClose}
                severity="success"
                sx={{ width: '100%' }}
              >
                Parabéns tarefa finalizada!
              </Alert>
            </Snackbar>
          </TabPanel>

          {/* ///////// DONE */}

          <TabPanel value="2">
            {task?.every((item) => item.taskValue !== '2') ? (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#c7c7c7',
                  }}
                >
                  <GradingIcon
                    sx={{
                      fontSize: '10rem',
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#c7c7c7',
                      textAlign: 'center',
                      cursor: 'default',
                    }}
                  >
                    VOCÊ AINDA NÃO POSSUI NENHUMA TAREFA FINALIZADA!
                  </Typography>
                </Box>
              </Box>
            ) : (
              task
                ?.filter((item) => item.taskValue === '2')
                .map((task) => {
                  return (
                    <Box key={task.id.toString()}>
                      <Box display="flex">
                        <Box
                          sx={{
                            display: 'flex',
                            width: '100%',
                            minHeight: '4rem',
                            borderRadius: '10px',
                            backgroundColor: '#cfcfcf',
                            borderLeft: '10px solid #2F7D31',
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
                              variant="h3"
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
                        <Box>
                          <Button
                            color="success"
                            onClick={() => handleUndo(task)}
                          >
                            <UndoIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )
                })
            )}
          </TabPanel>

          {/* ///////// CANCEL */}

          <TabPanel value="3">
            {task?.every((item) => item.taskValue !== '3') ? (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#c7c7c7',
                  }}
                >
                  <DoDisturbAltIcon
                    sx={{
                      fontSize: '10rem',
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#c7c7c7',
                      textAlign: 'center',
                      cursor: 'default',
                    }}
                  >
                    VOCÊ AINDA NÃO POSSUI NENHUMA TAREFA CANCELADA!
                  </Typography>
                </Box>
              </Box>
            ) : (
              task
                ?.filter((item) => item.taskValue === '3')
                .map((task) => {
                  return (
                    <Box key={task.id.toString()}>
                      <Box display="flex" key={task.id.toString()}>
                        <Box
                          sx={{
                            display: 'flex',
                            width: '100%',
                            minHeight: '4rem',
                            borderRadius: '10px',
                            backgroundColor: '#cfcfcf',
                            borderLeft: '10px solid #D3302F',
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
                              variant="h3"
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
                        <Box>
                          <Button
                            color="error"
                            onClick={() => handleUndo(task)}
                          >
                            <UndoIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )
                })
            )}
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  )
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })
