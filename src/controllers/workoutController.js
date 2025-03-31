const workoutServices = require('../services/workoutService')

const getAllWorkouts = (req, res) => {
    try {
        const allWorkouts = workoutServices.getAllWorkouts()
        res.send({ status: 'OK', data: allWorkouts })
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error }
        })
    }
}

const getOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req

    if (!workoutId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error: "Parameter ':workoutId' can not be empty"
            }
        })
    }

    try {
        const workout = workoutServices.getOneWorkout(workoutId)
        res.send({ status: "OK", data: workout })
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error }
        })
    }
}

const createNewWorkout = (req, res) => {
    const { body } = req

    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        res.send({
            status: 'FAILED',
            data: {
                error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'"
            }
        })
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
    }

    try {
        const createdWorkout = workoutServices.createNewWorkout(newWorkout)
        res.status(201).send({
            status: 'OK',
            data: createdWorkout
        })
    } catch (error) {
        res.status(error?.message || 500).send({
            status: 'FAILED',
            data: {
                error: error?.message || error
            }
        })
    }
}

const updateOneWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req

    if (!workoutId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error: "Parameter ':workoutId' can not be empty"
            }
        })
    }

    try {
        const updateWorkout = workoutServices.updateOneWorkout(workoutId, body)
        res.send({ status: 'OK', data: updateWorkout })
    } catch (error) {
        res.status(error?.message || 500).send({
            status: 'FAILED',
            data: {
                error: error?.message || error
            }
        })
    }
}

const deleteOneWorkout = (req, res) => {
    const {
        params: { workoutId }
    } = req

    if (!workoutId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error: "Parameter ':workoutId' can not be empty"
            }
        })
    }

    try {
        const deleteWorkout = workoutServices.deleteOneWorkout(workoutId)
        res.status(204).send({ status: 'OK' })
    } catch (error) {
        res.status(error?.message || 500).send({
            status: 'FAILED',
            data: {
                error: error?.message || error
            }
        })
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
}