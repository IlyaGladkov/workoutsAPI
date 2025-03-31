const workoutServices = require('../services/workoutService')

const getAllWorkouts = (req, res) => {
    const allWorkouts = workoutServices.getAllWorkouts()
    res.send({ status: 'OK', data: allWorkouts })
}

const getOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req

    if (!workoutId) return

    const workout = workoutServices.getOneWorkout(workoutId)
    res.send({ status: "OK", data: workout})
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
      return
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
    }

    const createdWorkout = workoutServices.createNewWorkout(newWorkout)
    res.status(201).send({
        status: 'OK',
        data: createdWorkout
    })
}

const updateOneWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req

    if (!workoutId) return

    const updateWorkout = workoutServices.updateOneWorkout(workoutId, body)
    res.send({status: 'OK', data: updateWorkout})
}

const deleteOneWorkout = (req, res) => {
    const {
        params: { workoutId }
    } = req

    if (!workoutId) return 

    const deleteWorkout = workoutServices.deleteOneWorkout(workoutId)
    res.status(204).send({ status: 'OK' })
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
}