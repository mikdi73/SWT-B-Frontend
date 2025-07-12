import park from "../assets/park.jpg"

const FeedbackSection = () => {
    return (
        <section className="w-3/4 p-6 bg-gray-100 rounded-lg mt-6 flex flex-col lg:flex-row justify-between">
            {/* Textbereich */}
            <div className="flex flex-col justify-between mb-4 lg:mb-0 lg:mr-4">
                <div>
                    <h3 className="text-xl font-semibold text-green-600 mb-2">
                        Dein Feedback
                    </h3>
                    <p className="text-gray-700 w-full lg:w-3/4">
                        Gib uns doch gerne eine Rückmeldung zu den Angeboten. Egal ob es Kritik oder eine Idee für etwas
                        Neues ist.
                    </p>
                </div>
                <button className="bg-green-600 p-4 rounded-xl text-white w-fit mt-4 lg:mt-0">
                    Gib uns Feedback
                </button>
            </div>

            {/* Bildbereich */}
            <div className="flex-shrink-0">
                <img
                    className="rounded-xl"
                    src={park}
                    alt="Foto von einem Park mit Menschen."
                    height={150}
                    width={400}
                />
            </div>
        </section>
    )
}

export default FeedbackSection
