import ActivityCard from "../components/ActivityCard.tsx";
import FilterBar from "../components/FilterBar";
import {useEffect, useState} from "react";
import {Offer} from "../models/AngebotType.ts";
import {useNavigate} from "react-router";

export default function Homepage() {

    const navigate = useNavigate();
    const [offers, setOffers] = useState<Offer[]>([])

    useEffect(() => {
        fetch("http://localhost:8090/api/offer").then((res) => {
            if (!res) {
                console.error("Angebote konnten nicht geladen werden.");
                return
            }
            return res.json();
        }).then((data) => {
            setOffers(Object.values(data));
        }).catch((err) => console.error(err))
    }, []);

    return (
        <>
            <div>
                <FilterBar/>
            </div>
            <main
                className="flex columns-auto lg:row-auto lg:items-center lg:justify-center w-full gap-20 flex-wrap h-fit pb-30 p-5">
                {offers.map(offer => (
                    <ActivityCard key={offer.offerId} offer={offer}/>
                ))}
                <button onClick={() => navigate("/details/1")}>Details</button>
            </main>
        </>
    )
}