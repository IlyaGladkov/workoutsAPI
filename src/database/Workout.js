const DB = require('./db.json')
const { saveToDatabase } = require('./utils')

const getAllWorkouts = () => {
    try {
        return DB.workouts
    } catch (error) {
        throw { status: 500, message: error }
    }
}

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded =
        DB.workouts.findIndex(
            (workout) => workout.name === newWorkout.name
        ) > -1

    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Workout with the name '${newWorkout.name}' already exists`
        }
    }

    try {
        DB.workouts.push(newWorkout)
        saveToDatabase(DB)

        return newWorkout
    } catch (error) {
        throw {
            status: 500,
            message: error?.message || error
        }
    }
}

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find(
            (workout) => workoutId === workout.id
        )

        if (!workout) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`
            }
        }

        return workout
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try {
        const indexForUpdate = DB.workouts.findIndex(
            (workout) => workoutId === workout.id
        ) > -1

        if (indexForUpdate) {
            throw {
                status: 400,
                message: `Workout with the name '${changes.name}' already exists`
            }
        }

        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString('en-US', {
                timeZone: 'UTC',
            })
        }

        DB.workouts[indexForUpdate] = updatedWorkout
        saveToDatabase(DB)

        return updatedWorkout
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex(
            (workout) => workoutId === workout.id
        ) > -1

        if (indexForDeletion) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`
            }
        }

        DB.workouts.splice(indexForDeletion, 1)
        saveToDatabase(DB)
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout,
}