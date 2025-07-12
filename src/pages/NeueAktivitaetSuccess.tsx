import { FC } from 'react'
import { useNavigate } from 'react-router'

const SuccessPage: FC = () => {
    const navigate = useNavigate()

    return (
        <div className="h-full flex items-center justify-center p-6">
            <section className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-semibold text-green-600 mb-4">
                    Antrag erfolgreich abgeschickt!
                </h1>
                <p className="text-gray-700 mb-6">
                    Vielen Dank für deine Einsendung. Die Stadt Herne kümmert sich nun um dein Angebot und wird sich bald bei dir melden.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Zur Startseite
                </button>
            </section>
        </div>
    )
}

export default SuccessPage
