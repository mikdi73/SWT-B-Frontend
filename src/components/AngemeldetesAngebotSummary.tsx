import {AngebotFormValues, getLabel, OFFER_TYPE_OPTIONS} from "../models/AngebotType.ts";
import {url} from "../models/url.ts";
import {useUser} from "../hooks/UserProvider.tsx";

type AngemeldetesAngebotProps = {
    offer: AngebotFormValues;
    abmeldenAngebot: (id: number) => void;
}

export default function AngemeldetesAngebotSummary({offer, abmeldenAngebot}: AngemeldetesAngebotProps) {

    const {user} = useUser();

    const handleAbmelden = () => {
        fetch(`${url}/api/offer/register?jwt=${user?.jwt}&offer=${offer.offerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (offer.offerId) {
            abmeldenAngebot(offer.offerId);
        }

    }
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-row justify-between">
            <div>
                <h1 className="text-2xl font-bold text-green-600">{offer.name}</h1>
                <h4 className="text-lg font-medium text-gray-800">
                    {offer.offerTypes
                        .map((t) => getLabel(t, OFFER_TYPE_OPTIONS))
                        .join(", ")}{" "}
                    | {offer.street ?? "—"}, {offer.postalCode ?? "—"} {offer.city}
                </h4>
                <p className="mt-2 text-gray-700">
                    {offer.additionalInformation}
                </p>
            </div>
            <div className="flex items-end">
                <button onClick={() => handleAbmelden()}
                        className="p-4 bg-green-600 text-white font-medium shadow-md rounded-lg transition hover:bg-green-700">Abmelden
                </button>
            </div>
        </div>
    )
}