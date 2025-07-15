import {FC, useEffect, useState} from 'react'
import {useUser} from '../hooks/UserProvider'
import {useNavigate} from "react-router";
import OfferSummary from "../components/OfferSummary.tsx";
import {AngebotFormValues} from "../models/AngebotType.ts";
import {url} from "../models/url.ts";
import AngemeldetesAngebotSummary from "../components/AngemeldetesAngebotSummary.tsx";

const LoggedInUser: FC = () => {
    const {user, setUser} = useUser()
    const navigate = useNavigate();

    const [offers, setOffers] = useState<AngebotFormValues[]>([]);
    const [angemeldeteId, setAngemeldeteId] = useState<number[]>([])

    const abmelden = () => {
        setUser(null);
        navigate("/");
    }

    const handleAbmeldenAngebot = (id: number) => {
        setOffers(prev => prev.filter(o => o.offerId !== id));
    };

    useEffect(() => {
        if(user?.role === "AUTHOR") {
            fetch(`${url}/api/author/offer?jwt=${user?.jwt}`).then((res) => {
                if (!res) {
                    console.error("Fehler beim Request von allen Offers für " + user?.providerName)
                    return
                }
                return res.json();
            }).then((data) => {
                setOffers(Object.values(data))
            })
        } else{
            fetch(`${url}/api/offer/register?jwt=${user?.jwt}`).then((res) => {
                if(!res) return;
                return res.json();
            }).then(({ ACCEPTED }: { ACCEPTED: number[] }) => {
                //nur das Accepted Array aus der Reponse lesen und auf den state setzen
                setAngemeldeteId(ACCEPTED);
            }).catch((err) => {
                console.error(err);
            })
        }
    }, []);

    useEffect(() => {
// Wenn sich acceptedIds ändert, lade alle neuen Offers
        if(angemeldeteId){
            angemeldeteId.forEach(id => {
                fetch(`${url}/api/offer/${id}`)
                    .then(res => {
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        return res.json();
                    })
                    .then(fetchedOffer => {
                        // hänge jedes Offer an das bestehende Array an
                        setOffers(prev => {
                            if (prev.some(o => o.offerId === fetchedOffer.offerId)) {
                                return prev;
                            }
                            return [...prev, fetchedOffer];
                        });
                    })
                    .catch(err => console.error("Fehler beim Laden eines Offers:", err));
            });
        }
    }, [angemeldeteId]);

    return (
        <div className="p-6 flex flex-col gap-8 justify-center pb-32">
            <section className="w-full bg-white rounded-lg shadow-2xl p-6">
                <div className="flex flex-col md:flex-row justify-between mb-3">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4 ">
                        Benutzerprofil
                    </h2>
                    <div className={"flex flex-col md:flex-row gap-4"}>
                        {user?.role === "AUTHOR" ?
                            <button
                                className={"p-4 bg-green-600 text-white font-medium shadow-md rounded-lg hover:bg-green-700 transition"}
                                onClick={() => navigate("/neue-aktivitaet/")}>Neue Aktivität erstellen</button>
                            : < button
                                className={"p-4 bg-green-600 text-white font-medium shadow-md rounded-lg hover:bg-green-700 transition"}
                                onClick={() => navigate("/autor-bewerben")}>Als Autor bewerben</button>
                        }
                        <button
                            className={"p-4 bg-green-600 text-white font-medium shadow-md rounded-lg transition hover:bg-green-700"}
                            onClick={() => abmelden()}>Abmelden
                        </button>
                    </div>
                </div>
                <div className="flex flex-row justify-left gap-12">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Name</span>
                            <span className="text-lg font-medium text-gray-800">{user?.name || '—'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">E-Mail</span>
                            <span className="text-lg font-medium text-gray-800">{user?.email || '—'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Rolle</span>
                            <span className="text-lg font-medium text-gray-800 capitalize">{user?.role || '—'}</span>
                        </div>
                    </div>
                    {user?.role === "AUTHOR" &&
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Inistitut</span>
                                <span className="text-lg font-medium text-gray-800">{user?.providerName || '—'}</span>
                            </div>
                        </div>
                    }
                </div>
            </section>
            {user?.role === "AUTHOR" ?
                <section className="w-full bg-white rounded-lg shadow-2xl p-6">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4 ">Ihre Angebote</h2>
                    {Array.isArray(offers) ? (
                        offers.map(offer => (
                            <OfferSummary offer={offer} key={offer.offerId}/>
                        ))
                    ) : (
                        <p className="text-red-600">Fehler: Angebote konnten nicht geladen werden.</p>
                    )}
                </section>
            :
                <section className="w-full bg-white rounded-lg shadow-2xl p-6">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4 ">Angemeldete Angebote</h2>
                    {(offers.length <= 0) && <p className="text-md font-medium text-gray-800">Die Angebote warten auf dich!</p>}
                    <div className="flex flex-col gap-2">
                    {Array.isArray(offers) ? (
                        offers.map(offer => (
                            <AngemeldetesAngebotSummary offer={offer} key={offer.offerId} abmeldenAngebot={handleAbmeldenAngebot}/>
                        ))
                    ) : (
                        <p className="text-red-600">Fehler: Angebote konnten nicht geladen werden.</p>
                    )}
                    </div>
                </section>
            }
            <section className="w-full bg-white rounded-lg shadow-2xl p-6">
                <h2 className="text-2xl font-semibold text-green-600 mb-4 ">
                    Profil verwalten
                </h2>
                <div className={"flex flex-row gap-4"}>
                    <button className={"p-4 bg-green-600 text-white font-medium shadow-md rounded-lg "}
                    >Profil bearbeiten
                    </button>
                    <button className={"p-4 bg-red-600 text-white font-medium shadow-md rounded-lg"}>
                        Profil löschen
                    </button>

                </div>
            </section>
        </div>
    )
}

export default LoggedInUser
