import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {Offer} from "../models/AngebotType";
import ScheduleSection from "../components/ScheduleSection.tsx";
import FeedbackSection from "../components/FeedbackSection.tsx";
import {ArrowLeft} from "lucide-react";

export default function Detailansicht() {
    const {offerId} = useParams<{ offerId: string }>()
    const navigate = useNavigate()
    const [offer, setOffer] = useState<Offer | null>(null)

    useEffect(() => {
        if (!offerId) return

        const exampleOffer: Offer = {
            offerId: 1,
            name: "Kinder-Fußballcamp",
            street: "Musterstraße 12",
            city: "Fantasiestadt",
            postalCode: 12345,
            offerTypes: ["EVENT"],
            targetGroups: ["KIDS"],
            recurring: false,
            startDate: "2025-07-28",
            endDate: "2025-08-08",
            eventSchedule: {
                MONDAY: {startTime: "09:00:00", endTime: "16:00:00"},
                TUESDAY: {startTime: "09:00:00", endTime: "16:00:00"},
                WEDNESDAY: {startTime: "09:00:00", endTime: "16:00:00"},
                THURSDAY: {startTime: "09:00:00", endTime: "16:00:00"},
                FRIDAY: {startTime: "09:00:00", endTime: "16:00:00"},
                SATURDAY: {startTime: "10:00:00", endTime: "14:00:00"},
                // SUNDAY bleibt weg, wenn keine Termine stattfinden
            },
            registrationRequired: true,
            additionalInformation: "Inklusive Mittagessen, Trikot und qualifizierter Betreuung.",
            cost: 150,
            filters: ["HOLIDAY_OFFERS", "PLAY_LEARN_AND_EXPERIENCE"],
            status: "ACCEPTED",
            minAge: 6,
            maxAge: 12,
            languages: ["Deutsch"],
            providerName: "Jugendamt Fantasiestadt"
        };
        setOffer(exampleOffer);
    }, [])

    if (!offer) return <p>Lade Angebot…</p>

    return (
        <div className={"h-fit pb-32 flex-col flex items-center w-screen"}>
            <div className="max-w-2xl mx-auto p-4 flex flex-col gap-2 w-full pb-12">
                <button
                    className="cursor-pointer font-medium"
                    onClick={() => navigate("/homepage")}
                >
                    <ArrowLeft size={26}/>
                </button>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h1 className="text-2xl font-bold text-green-600">{offer.name}</h1>
                    <h4 className="text-lg font-medium">{offer.offerTypes} | {offer.street}, {offer.postalCode} {offer.city}</h4>
                    <p className="mt-2 text-gray-700">{offer.additionalInformation}</p>
                </div>

                <section className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
                        {/* Kosten-Info */}
                        <span className="text-gray-700 font-medium">
               {offer.cost === 0
                   ? "Kostenlose Anmeldung"
                   : `${offer.cost.toFixed(2)} € pro Anmeldung`}
                      </span>

                        {/* CTA-Button */}
                        <button
                            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-600 transition">
                            Jetzt anmelden
                        </button>
                    </div>
                </section>

                {/*Section für die einzelnen Tage */}
                <div>

                    <ScheduleSection eventSchedule={offer.eventSchedule} endDate={offer.endDate}
                                     startDate={offer.startDate}/>
                </div>

                <section className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-600 mb-4">
                        Weitere Informationen
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Zielgruppen */}
                        <div className="flex flex-col">
                            <span className="font-medium text-green-600">Zielgruppen</span>
                            <span className="text-gray-700">
            {offer.targetGroups.join(", ")}
          </span>
                        </div>

                        {/* Filter */}
                        <div className="flex flex-col">
                            <span className="font-medium text-green-600">Filter</span>
                            <span className="text-gray-700">
            {offer.filters.map(f => f.replaceAll('_', ' ').toLowerCase()).join(', ')}
          </span>
                        </div>

                        {/* Altersbereich */}
                        <div className="flex flex-col">
                            <span className="font-medium text-green-600">Alter</span>
                            <span className="text-gray-700">
            {offer.minAge} – {offer.maxAge} Jahre
          </span>
                        </div>

                        {/* Sprachen */}
                        <div className="flex flex-col">
                            <span className="font-medium text-green-600">Sprachen</span>
                            <span className="text-gray-700">
            {offer.languages.join(", ")}
          </span>
                        </div>

                        {/* Anbieter */}
                        <div className="flex flex-col sm:col-span-2">
                            <span className="font-medium text-green-600">Anbieter</span>
                            <span className="text-gray-700">
            {offer.providerName}
          </span>
                        </div>
                    </div>
                </section>

            </div>
            <FeedbackSection/>
        </div>
    )

}