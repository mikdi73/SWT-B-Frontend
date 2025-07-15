import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import {useUser} from '../hooks/UserProvider';
import AngebotFormular from "../components/AngebotFormular.tsx";
import {AngebotFormValues} from "../models/AngebotType.ts";
import {url} from "../models/url.ts";

export default function UpdateAngebot() {
    const {offerId} = useParams<{ offerId: string }>();
    const {user} = useUser();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState<AngebotFormValues | null>(null);

    useEffect(() => {
        if (!offerId) return
        fetch(`${url}/api/offer/${offerId}`)
            .then(res => res.json())
            .then(data => setInitialValues(data))
            .catch(err => console.error("Fehler beim Laden des Angebots:", err))
    }, [offerId])

    const handleUpdate = async (data: AngebotFormValues) => {
        const payload = {...data, offerId: offerId};
        fetch(`${url}/api/offer?jwt=${user?.jwt}`, {
            method: 'POST',
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

    if (!initialValues) return <div>Lädt…</div>;

    return (<AngebotFormular initialValues={initialValues} onSubmit={handleUpdate} updateOffer={true}/>);
}
