import React, { useRef, useEffect, useState } from 'react'
function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}
let paused_state = true
let step_state = false
let reset_state = false
export default function DiffusionCanvas({ paused, step, setStep, resetState, setReset }) {
    useEffect(() => {
        paused_state = paused
        step_state = step
        reset_state = resetState
    })
    const canvasRef = useRef(null)
    let atoms = []
    /* Summon 50 atoms, each has x, y and color */
    const reset = () => {
        for (let i = 0; i < 25; i++) {
            atoms.push({ x: Math.random() * 300, y: Math.random() * 150, vx: Math.random() * 5, vy: Math.random() * 5, c: '#ff0000' })
        }
        for (let i = 0; i < 25; i++) {
            atoms.push({ x: Math.random() * 300, y: Math.random() * 150 + 150, vx: Math.random() * 5, vy: Math.random() * 5, c: '#0000ff' })
        }
    }
    reset()
    const draw = ctx => {
        if(reset_state) {
            atoms = []
            reset()
            reset_state = false
            setReset(false)
        }
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, 350, 350)
        atoms.forEach((atom) => {
            ctx.fillStyle = atom.c
            ctx.fillRect(atom.x, atom.y, 5, 5)
            if (!paused_state || step_state) {
                atom.x = clamp(atom.x + atom.vx, 0, 300)
                atom.y = clamp(atom.y + atom.vy, 0, 300)
                if (atom.x == 300 || atom.x == 0) atom.vx = -atom.vx
                if (atom.y == 300 || atom.y == 0) atom.vy = -atom.vy
            }
        })
        step_state = false
        setStep(false)
    }
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        setInterval(() => draw(context), 1000 / 60)
    }, [])

    return <canvas ref={canvasRef} width={500} height={500} ></canvas>
}