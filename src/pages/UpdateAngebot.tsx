// BearbeiteAktivitaet.tsx
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import {useUser} from '../hooks/UserProvider';
import AngebotFormular from "../components/AngebotFormular.tsx";
import {AngebotFormValues} from "../models/AngebotType.ts";

export default function UpdateAngebot() {
    const {offerId} = useParams<{ offerId: string }>();
    const {user} = useUser();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState<AngebotFormValues | null>(null);

    useEffect(() => {
        if (!offerId) return
        fetch(`http://localhost:8090/api/offer/${offerId}`)
            .then(res => res.json())
            .then(data => setInitialValues(data))
            .catch(err => console.error("Fehler beim Laden des Angebots:", err))
    }, [offerId])

    const handleUpdate = async (data: AngebotFormValues) => {
        const payload = {...data, offerId: offerId};
        fetch(`http://localhost:8090/api/offer?jwt=${user?.jwt}`, {
            method: 'POST', // oder POST, je nach Backend
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
        }).then((res) => {
            if(!res) return
            return res.json();
        }).then((data) => {
            console.log(data);
            if(data) navigate('/neue-aktivitaet-success');
        }).catch((err) => {
            console.error("Fehler beim Updaten eines Angeobts: ", err);
        });

    };

    // Solange Daten laden, Spinner oder Platzhalter anzeigen:
    if (!initialValues) return <div>Lädt…</div>;

    return (<AngebotFormular initialValues={initialValues} onSubmit={handleUpdate} updateOffer={true}/>);
}
