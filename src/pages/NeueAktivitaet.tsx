import {useNavigate} from "react-router";
import {useUser} from "../hooks/UserProvider.tsx";
import AngebotFormular from "../components/AngebotFormular.tsx";
import {AngebotFormValues} from "../models/AngebotType.ts";
import {url} from "../models/url.ts";


export default function NeueAktivitaet() {

    const {user} = useUser();
    const navigate = useNavigate();

    const initialOffer: AngebotFormValues = {
        name: '', street: '', city: '', postalCode: 0,
        offerTypes: [], targetGroups: [], recurring: false,
        startDate: '', endDate: '',
        eventSchedule: {
            MONDAY: {startTime: '', endTime: ''},
            TUESDAY: {startTime: '', endTime: ''},
            WEDNESDAY: {startTime: '', endTime: ''},
            THURSDAY: {startTime: '', endTime: ''},
            FRIDAY: {startTime: '', endTime: ''},
            SATURDAY: {startTime: '', endTime: ''},
            SUNDAY: {startTime: '', endTime: ''},
        },
        registrationRequired: false, additionalInformation: '', cost: 0,
        filters: [], minAge: 0, maxAge: 0, languages: [],
    }


    const onSubmit = (data: AngebotFormValues) => {
        // Filter eventSchedule to include only days with both start and end times

        const filteredSchedule = Object.fromEntries(
            Object.entries(data.eventSchedule)
                .filter(([_, times]) => times.startTime && times.endTime)
        );

        const payload = {
            ...data,
            eventSchedule: filteredSchedule,
        };
        //TODO Fetch aufruf muss tatsächlich noch funktionieren später
        fetch(`${url}/api/offer?jwt=${user?.jwt}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then((res) => {
            if (!res) {
                console.error("Fehler beim Abschicken vom Antrag für neue Aktivität.");
                return
            }
            return res.json();
        }).then((data) => {
            if (data) {
                navigate("/neue-aktivitaet-success");
            }
        }).catch((err) => {
            console.error(err);
        })
    };

    return (
        <AngebotFormular initialValues={initialOffer} onSubmit={onSubmit} updateOffer={false}/>
    )
}