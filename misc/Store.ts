import {Action, action, createStore, createTypedHooks} from "easy-peasy";
import {testData} from "./TestData";

/**
 * this interface represents a task
 */
export interface Task {
    id: string
    love: boolean
    weekdays: number[] // Sunday = 0, Monday = 1, ...
    title: string
    description: string
    completed_for: string[]
}

export interface TaskToggle {
    task: Task
    weekday: string
}

export interface TaskStore {
    tasks: Task[]
    addTask: Action<TaskStore, Task>
    toggleTask: Action<TaskStore, TaskToggle>
    toggleLoveTask: Action<TaskStore, Task>
    deleteTask: Action<TaskStore, Task>
}

export const store = createStore<TaskStore>({
    tasks: [...testData],
    addTask: action((state, payload: Task) => {
        state.tasks.push(payload);
    }),
    toggleTask: action((state, payload) => {
        const {weekday, task} = payload

        // remove the task to add it modified later
        state.tasks = state.tasks.filter(t => t.id !== task.id)

        // check if task is currently checked for that day
        if (task.completed_for.includes(weekday)) {
            // if yes remove check
            task.completed_for = task.completed_for.filter(d => d != weekday)
        } else {
            // else add check
            task.completed_for.push(weekday)
        }

        // add modified task again
        state.tasks.push(task)
    }),
    toggleLoveTask: action((state, task) => {
        // remove the task to add it modified later
        state.tasks = state.tasks.filter(t => t.id !== task.id)
        // toggle love
        task.love = !task.love
        // add modified task back
        state.tasks.push(task)
    }),
    deleteTask: action((state, task) => {
        // remove the task
        state.tasks = state.tasks.filter(t => t.id !== task.id)
    })
})

// type hooks
const typedHooks = createTypedHooks<TaskStore>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;

