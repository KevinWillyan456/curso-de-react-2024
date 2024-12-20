import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import Title from './components/Title'

function App() {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem('tasks')) || []
    )

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/todos?_limit=10',
                {
                    method: 'GET',
                }
            )
            const data = await response.json()

            setTasks(data)
        }
        // Se quiser, você pode descomentar a linha abaixo para buscar as tarefas da API
        // fetchTasks()
    }, [])

    function onTaskClick(taskId) {
        const newTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    isCompleted: !task.isCompleted,
                }
            }

            return task
        })

        setTasks(newTasks)
    }

    function onDeleteTaskClick(taskId) {
        const newTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(newTasks)
    }

    function onAddTaskSubmit(title, description) {
        const newTask = {
            id: uuid(),
            title,
            description,
            isCompleted: false,
        }

        setTasks([...tasks, newTask])
    }

    function onEditTaskClick(updatedTask) {
        const newTasks = tasks.map((task) => {
            if (task.id === updatedTask.id) {
                return updatedTask
            }

            return task
        })

        setTasks(newTasks)
    }

    return (
        <div className="w-screen min-h-screen bg-slate-500 flex justify-center p-6">
            <div className="w-[500px] space-y-4 menu-transition">
                <Title>Gerenciador de Tarefas</Title>
                <AddTask onAddTaskSubmit={onAddTaskSubmit} />
                <Tasks
                    tasks={tasks}
                    onTaskClick={onTaskClick}
                    onDeleteTaskClick={onDeleteTaskClick}
                    onEditTaskClick={onEditTaskClick}
                />
            </div>
        </div>
    )
}

export default App
