import {FC} from "react"
import {Heart} from "lucide-react"
import {useNavigate} from "react-router";
import {useFavorites} from "../hooks/FavoritenContext.tsx";
import { AngebotFormValues } from "../models/AngebotType";
import babysitter from "../assets/babysitter.jpg";
import codingClub from "../assets/codingClub.jpg";
import elternKind from "../assets/elternKind.jpg";
import fussball from "../assets/fussball.jpg";
import gitarre from "../assets/gitarre.jpg";
import graffiti from "../assets/graffiti.jpg";
import krabbelgruppe from "../assets/krabbelgruppe.jpg";
import medizinischeHotline from "../assets/medizinischeHotline.jpg";
import seniorSport from "../assets/seniorSport.jpg";
import sommerferien from "../assets/sommerferien.png";
import sprechstundeJugendliche from "../assets/sprechstundeJugendliche.png";
import toepfern from "../assets/toepfern.png";
import wald from "../assets/wald.jpg";


const ActivityCardPictures: Record<string, string> = {
  "1": sommerferien,
  "2": fussball,
  "3": toepfern,
  "4": elternKind,
  "5": sprechstundeJugendliche,
  "6": gitarre,
  "7": codingClub,
  "8": wald,
  "9": babysitter,
  "10": seniorSport,
  "11": graffiti,
  "12": krabbelgruppe,
  "13": medizinischeHotline,
}

type CardProps = {
    offer: AngebotFormValues;
}

const ActivityCard: FC<CardProps> = ({offer}: CardProps) => {
    const navigate = useNavigate();
    const {toggleFavorite, isFavorite} = useFavorites();
    const fav = offer.offerId !== undefined ? isFavorite(offer.offerId) : false;

    const imgSrc = offer.offerId ? ActivityCardPictures[String(offer.offerId)] : undefined;

    return (
        <div
            className="lg:w-[40%] w-full rounded-lg border shadow-sm overflow-hidden bg-white hover:shadow-xl transition" style={{ borderColor: "#d3d3d3" }}>
            <img src={imgSrc} className="mx-auto h-48 object-cover p-3 w-full"/>
            
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
                <button className="p-3 rounded-lg cursor-pointer border hover:bg-gray-200 transition"
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
