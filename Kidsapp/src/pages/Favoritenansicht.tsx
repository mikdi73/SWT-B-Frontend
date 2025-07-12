import ActivityCard from "../components/ActivityCard";
import {useFavorites} from "../components/FavoritenContext";

export default function Favoritenansicht(){
    const {favorites} = useFavorites();

    return(
        <>
           <h1 className="flex lg:justify-center font-bold text-2xl" style={{ color: "#1B171B" }}>
                Favoriten
           </h1>

            <hr className="h-px w-[90%] bg-[#d3d3d3] border-0 justify-self-center my-5 mb-2.5" />

            {favorites.length === 0 ? (
                <p>Noch keine Favoriten gespeichert. Klicke auf das Herz, um Angebote zu merken.</p>
            ) : (
                <div className="flex columns-auto lg:row-auto lg:items-center lg:justify-center w-full gap-10 flex-wrap h-fit pb-30 p-5">
                    {favorites.map(offer => (
                        <ActivityCard key={offer.offerId} offer={offer} />
                    ))}
                </div>
                
            )}
        </>
    )
}