import { CheckIcon, ChevronRightIcon, EditIcon, TrashIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { useState } from 'react'
import ModalEdit from './ModalEdit'

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onEditTaskClick }) {
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentTask, setCurrentTask] = useState(null)

    function onSeeDatailsClick(task) {
        const query = new URLSearchParams()
        query.set('title', task.title)
        query.set('description', task.description)
        query.set('isCompleted', task.isCompleted)
        navigate(`/task?${query.toString()}`)
    }

    function handleEditTaskClick(task) {
        setCurrentTask(task)
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
        setCurrentTask(null)
    }

    function handleSaveTask(updatedTask) {
        onEditTaskClick(updatedTask)
        handleCloseModal()
    }

    return (
        <ul className="flex flex-col gap-2 p-6 bg-slate-200 rounded-md shadow">
            {tasks.map((task) => (
                <li key={task.id} className="flex gap-2">
                    <button
                        onClick={() => onTaskClick(task.id)}
                        className={`bg-slate-400 text-left w-full flex items-center gap-2 text-white p-2 rounded-md ${
                            task.isCompleted && 'line-through'
                        }`}
                    >
                        {task.isCompleted && <CheckIcon />}
                        {task.title}
                    </button>
                    <Button onClick={() => onSeeDatailsClick(task)}>
                        <ChevronRightIcon />
                    </Button>
                    <Button onClick={() => handleEditTaskClick(task)}>
                        <EditIcon />
                    </Button>
                    <Button onClick={() => onDeleteTaskClick(task.id)}>
                        <TrashIcon />
                    </Button>
                </li>
            ))}

            {isModalOpen && (
                <ModalEdit
                    task={currentTask}
                    handleCloseModal={handleCloseModal}
                    handleSaveTask={handleSaveTask}
                />
            )}

            {tasks.length === 0 && (
                <p className="text-center text-slate-600">
                    Nenhuma tarefa cadastrada.
                </p>
            )}
        </ul>
    )
}
export default Tasks
