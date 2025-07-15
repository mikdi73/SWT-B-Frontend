import { FC } from 'react'
import {useNavigate} from "react-router";
import {AngebotFormValues} from "../models/AngebotType.ts";

export type OfferSummaryProps = {
    offer: AngebotFormValues
}

//Formatierung vom Datum vom ISO Standard zu DD.MM.JJJJ
const formatDate = (iso?: string) => {
    if (!iso) return '—'
    try {
        return new Date(iso).toLocaleDateString('de-DE', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        })
    } catch {
        return iso
    }
}

const OfferSummary: FC<OfferSummaryProps> = ({ offer }: OfferSummaryProps) => {

    const navigate = useNavigate();
    const statusClass = offer.status === 'ACCEPTED'
        ? 'bg-green-100 text-green-800'
        : offer.status === 'PENDING'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
            {/* Titel und Status */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{offer.name}</h3>
                <div className="flex flex-row gap-4">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}
                >
          {offer?.status?.toLowerCase()}
        </span>
                    <button onClick={() => navigate("/update-angebot/"+ offer.offerId)} className="text-white bg-green-600 px-2 rounded-full text-xs font-medium cursor-pointer hover:bg-green-700 transition">
                        Bearbeiten
                    </button>
                </div>
            </div>

            {/* Zeitraum */}
            <div className="text-sm text-gray-600 mb-2">
                Zeitraum: {formatDate(offer.startDate)} – {formatDate(offer.endDate)}
            </div>

            {/* Kerninfos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                    <span className="font-medium text-gray-700">Kosten:</span>{' '}
                    {offer.cost > 0 ? `${offer.cost.toFixed(2)} €` : 'kostenlos'}
                </div>
                <div>
                    <span className="font-medium text-gray-700">Anmeldung:</span>{' '}
                    {offer.registrationRequired ? 'erforderlich' : 'frei'}
                </div>
                <div>
                    <span className="font-medium text-gray-700">Zielgruppe(n):</span>{' '}
                    {offer.targetGroups.join(', ') || '—'}
                </div>
                <div>
                    <span className="font-medium text-gray-700">Sprachen:</span>{' '}
                    {offer.languages.join(', ') || '—'}
                </div>
            </div>
        </div>
    )
}

export default OfferSummary
