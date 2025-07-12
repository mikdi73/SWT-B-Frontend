import ActivityCard from "../components/ActivityCard.tsx";
import FilterBar from "../components/FilterBar";
import {useEffect, useState} from "react";
import {Offer} from "../models/AngebotType.ts";

export default function Homepage() {

    const [offers, setOffers] = useState<Offer[]>([])
    const [userCity, setUserCity] = useState<string | null>(null);
    const [userCategory, setUserCategory] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        fetch("http://localhost:8090/api/offer")
        .then((res) => {
            if (!res) {
                console.error("Angebote konnten nicht geladen werden.");
                return
            }
            return res.json();
        }).then((data) => {setOffers(Object.values(data));
        }).catch((err) => console.error(err))
    }, []);

    const filteredOffers = offers.filter((offer) => {
    const matchesCity =
      !userCity || offer.city.toLowerCase() === userCity.toLowerCase();

    const matchesCategory =
      !userCategory || offer.offerTypes.includes(userCategory as any);

    const matchesSearch =
      !searchText ||
      offer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      offer.additionalInformation.toLowerCase().includes(searchText.toLowerCase());

    return matchesCity && matchesCategory && matchesSearch;
  });
    return (
        <>
            <div>
                <FilterBar
                offers={offers}
                userCity={userCity}
                setUserCity={setUserCity}
                userCategory={userCategory}
                setUserCategory={setUserCategory}
                searchText={searchText}
                setSearchText={setSearchText}/>
            </div>
            <main
                className="flex columns-auto lg:row-auto lg:items-center lg:justify-center w-full gap-20 flex-wrap h-fit pb-30 p-5">
                {filteredOffers.map(offer => (
                    <ActivityCard key={offer.offerId} offer={offer}/>
                ))}
            </main>
        </>
    )
}