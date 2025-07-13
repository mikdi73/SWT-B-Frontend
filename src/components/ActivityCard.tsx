import {FC} from "react"
import {Heart} from "lucide-react"
import Testbild from "../assets/fussball.jpg";
import {useNavigate} from "react-router";
import {useFavorites} from "./FavoritenContext.tsx";
import { AngebotFormValues } from "../models/AngebotType";

type CardProps = {
    offer: AngebotFormValues;
}

const ActivityCard: FC<CardProps> = ({offer}: CardProps) => {
    const navigate = useNavigate();
    const {toggleFavorite, isFavorite} = useFavorites();
    const fav = offer.offerId !== undefined ? isFavorite(offer.offerId) : false;

    return (
        <div
            className="lg:w-[40%] w-full rounded-lg border shadow-sm overflow-hidden bg-white hover:shadow-xl transition" style={{ borderColor: "#d3d3d3" }}>
            <img src={Testbild} alt={"Testbild"} className="mx-auto h-48 object-cover p-3 w-full"/>
            
            <div className="p-4 flex items-start justify-between">
                <div>
                    <h2 onClick={() => navigate("/details/" + offer.offerId)}
                        className="text-lg cursor-pointer font-semibold">{offer.name}</h2>
                    <p onClick={() => navigate("/details/" + offer.offerId)}
                       className="text-sm cursor-pointer text-gray-500 max-h-8 min-h-8">{offer.additionalInformation}</p>
                </div>
                <button
                    className={`transition ${fav ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                    onClick={() => toggleFavorite(offer)}
                    aria-label={fav ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
                >
                    <Heart
                        className="w-6 h-6"
                        strokeWidth={fav ? 0 : 1.5}
                        fill={fav ? "currentColor" : "none"}
                    />
                </button>
            </div>

            <div className="p-4 flex items-start justify-between">
                <button className="p-3 rounded-lg cursor-pointer border hover:bg-gray-100 transition"
                        style={{ borderColor: "#d3d3d3" }}
                        onClick={() => navigate("/details/" + offer.offerId)}>Mehr lesen
                </button>
                <button
                    className="p-3 rounded-lg cursor-pointer border bg-green-600 text-white hover:bg-green-700 transition"
                    style={{ borderColor: "#1a8f4a" }}
                    onClick={() => navigate(`/details/${offer.offerId}/anmelden`)}>Anmelden
                </button>
            </div>
        </div>
    )
}

export default ActivityCard
