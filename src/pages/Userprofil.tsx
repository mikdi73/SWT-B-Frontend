import {useNavigate} from "react-router";
import {useUser} from "../hooks/UserProvider.tsx";
import LoggedInUser from "./LoggedInUser.tsx";

export default function Userprofil() {

    const navigate = useNavigate();
    const {user} = useUser();

    return (
        <>

            {!user ?

                    <section className="w-[90%] md:w-1/2 mx-auto bg-white p-12 rounded-lg shadow-2xl mt-8">
                        <h3 className="lg:text-3xl font-semibold text-green-600 text-center mb-2 text-lg">
                            Noch nicht angemeldet?
                        </h3>
                        <p className="text-gray-700 text-sm text-center mb-6 lg:text-lg">
                            Bitte melde dich an oder registriere dich, um alle Funktionen nutzen zu können.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => navigate('/anmelden')}
                                className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg lg:px-8 lg:py-4 hover:bg-green-700 transition"
                            >
                                Anmelden
                            </button>
                            <button
                                onClick={() => navigate('/registrieren')}
                                className="w-full sm:w-auto px-4 py-2 border border-green-600 text-green-600 rounded-lg lg:px-8 lg:py-4 hover:bg-green-100 transition"
                            >
                                Registrieren
                            </button>
                        </div>
                    </section>
                 :
                <LoggedInUser/>
            }
        </>
    )
}