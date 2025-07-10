import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Offer } from "../models/AngebotType"
import ScheduleSection from "../components/ScheduleSection"
import FeedbackSection from "../components/FeedbackSection"
import { ArrowLeft } from "lucide-react"
import {TARGET_GROUP_OPTIONS, OFFER_TYPE_OPTIONS, FILTER_OPTIONS} from "../models/AngebotType.ts";
import {AdresseMap} from "../components/AdresseMap.tsx";


// Helfer: Label finden
const getLabel = (
    value: string,
    options: { value: string; label: string }[]
): string => {
    const opt = options.find(o => o.value === value)
    return opt ? opt.label : value
}

export default function Detailansicht() {
    const { offerId } = useParams<{ offerId: string }>()
    const navigate = useNavigate()
    const [offer, setOffer] = useState<Offer | null>(null)

    useEffect(() => {
        if (!offerId) return
        fetch(`http://localhost:8090/api/offer/${offerId}`)
            .then(res => res.json())
            .then(data => setOffer(data))
            .catch(err => console.error("Fehler beim Laden des Angebots:", err))
    }, [offerId])

    if (!offer) return <p>Lade Angebot…</p>

    return (
        <div className="h-fit pb-32 flex flex-col items-center w-screen">
            <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4 w-full">
                <button
                    className="self-start cursor-pointer font-medium"
                    onClick={() => navigate("/homepage")}
                >
                    <ArrowLeft size={26}/>
                </button>

                {/* Titel und Adresse */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h1 className="text-2xl font-bold text-green-600">{offer.name}</h1>
                    <h4 className="text-lg font-medium text-gray-800">
                        {offer.offerTypes.map(t => getLabel(t, OFFER_TYPE_OPTIONS)).join(', ')}{' '}
                        | {offer.street ?? '—'},{' '}
                        {offer.postalCode ?? '—'} {' '}
                        {offer.city}
                    </h4>
                    <p className="mt-2 text-gray-700">{offer.additionalInformation}</p>
                </div>

                {/* Anmeldung */}
                <section className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
            <span className="text-gray-700 font-medium">
              {offer.cost === 0 ? 'Kostenlose Anmeldung' : `${offer.cost.toFixed(2)} € pro Anmeldung`}
            </span>
                        <button
                            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                            Jetzt anmelden
                        </button>
                    </div>
                </section>

                {/* Zeitplan */}
                <ScheduleSection eventSchedule={offer.eventSchedule} startDate={offer.startDate}
                                 endDate={offer.endDate}/>

                {/* Weitere Infos */}
                <section className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-600 mb-4">Weitere Informationen</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex flex-col">
                            <span className="font-medium text-green-600">Zielgruppen</span>
                            <span className="text-gray-700">
                {offer.targetGroups.map(g => getLabel(g, TARGET_GROUP_OPTIONS)).join(', ')}
              </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-green-600">Filter</span>
                            <span className="text-gray-700">
                {offer.filters.map(f => getLabel(f, FILTER_OPTIONS)).join(', ')}
              </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-green-600">Alter</span>
                            <span className="text-gray-700">{offer.minAge} – {offer.maxAge} Jahre</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-green-600">Sprachen</span>
                            <span className="text-gray-700">{offer.languages.join(', ')}</span>
                        </div>
                        <div className="flex flex-col sm:col-span-2">
                            <span className="font-medium text-green-600">Anbieter</span>
                            <span className="text-gray-700">{offer.providerName}</span>
                        </div>
                    </div>
                </section>
                <section className="p-4 bg-gray-50 rounded-lg">
                    <AdresseMap address={"Herne"}/>
                </section>
            </div>
            <FeedbackSection/>
        </div>
    )
}
