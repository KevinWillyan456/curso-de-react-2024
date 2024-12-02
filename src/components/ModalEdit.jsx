import { useState } from 'react'
import Input from './Input'

function ModalEdit({ task, handleCloseModal, handleSaveTask }) {
    const [title, setTitle] = useState(task.title || '')
    const [description, setDescription] = useState(task.description || '')

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
        >
            <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col menu-transition">
                <Input
                    type="text"
                    placeholder="Digite o título da tarefa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    type="text"
                    placeholder="Digite a descrição da tarefa"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button
                    onClick={() => {
                        if (!title.trim() || !description.trim()) {
                            return alert(
                                'Preencha o título e a descrição da tarefa.'
                            )
                        }

                        handleSaveTask({
                            ...task,
                            title,
                            description,
                        })

                        setTitle('')
                        setDescription('')
                    }}
                    className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
                >
                    Salvar
                </button>
            </div>
        </div>
    )
}
export default ModalEdit
