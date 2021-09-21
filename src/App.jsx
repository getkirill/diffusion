import { Button, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import DiffusionCanvas from './DiffusionCanvas'

function App() {
    const [paused, setPaused] = useState(true)
    const [step, setStep] = useState(false)
    const [resetState, setResetState] = useState(false)
    const invertPause = () => {
        setPaused(!paused)
    }
    return (
        <div>
            <div>
                <Typography variant="h6">Симуляция диффузии</Typography>
                <Typography variant="caption">Красильников Кирилл 7А</Typography>
            </div>

            <DiffusionCanvas paused={paused} step={step} setStep={setStep} resetState={resetState} setReset={setResetState} />
            <Box sx={{ display: 'flex' }}>
                <Button variant="outlined" onClick={invertPause}>
                    {paused ? 'Resume' : 'Pause'}
                </Button>
                <Button variant="outlined" onClick={() => setStep(true)}>
                    Step
                </Button>
                <Button variant="outlined" onClick={() => setResetState(true)}>
                    Reset
                </Button>
            </Box>
        </div>
    )
}

export default App
