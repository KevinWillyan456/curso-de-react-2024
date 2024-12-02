import { ChevronLeftIcon } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Title from '../components/Title'

function TaskPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const title = searchParams.get('title')
    const description = searchParams.get('description')
    const isCompleted = searchParams.get('isCompleted')

    return (
        <div className="w-screen min-h-screen bg-slate-500 p-6 flex">
            <div className="w-[500px] mx-auto space-y-4">
                <div className="flex justify-center relative mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 top-0 bottom-0 text-slate-100"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <Title>Detalhes da Tarefa</Title>
                </div>

                <div className="bg-slate-200 p-4 rounded-md">
                    <h2 className="text-xl font-bold text-slate-600">
                        {title}
                    </h2>
                    <p className="text-slate-600">{description}</p>
                    <p
                        className={`mt-3 font-bold ${
                            isCompleted === 'true'
                                ? 'text-lime-600'
                                : 'text-red-600'
                        }`}
                    >
                        {isCompleted === 'true' ? 'Concluída' : 'Pendente'}
                    </p>

                    <div className="mt-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-slate-400 text-white px-4 py-2 rounded-md"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskPage
