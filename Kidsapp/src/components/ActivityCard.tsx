import {FC} from "react"
import {Heart} from "lucide-react"
import {Offer} from "../models/AngebotType.ts";
import Testbild from "../assets/fussball.jpg";
import {useNavigate} from "react-router";

type CardProps = {
    offer: Offer;
}

const ActivityCard: FC<CardProps> = ({offer}: CardProps) => {

    const navigate = useNavigate();

    return (
        <div
            className="lg:w-[40%] w-full rounded-lg border shadow-sm overflow-hidden bg-white hover:shadow-xl transition">
            <img src={Testbild} alt={"Testbild"} className="mx-auto h-48 object-cover p-3 w-full"/>
            <div className="p-4 flex items-start justify-between">
                <div>
                    <h2 onClick={() => navigate("/details/" + offer.offerId)}
                        className="text-lg cursor-pointer font-semibold">{offer.name}</h2>
                    <p onClick={() => navigate("/details/" + offer.offerId)}
                       className="text-sm cursor-pointer text-gray-500">{offer.additionalInformation}</p>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition">
                    <Heart className="w-6 h-6 cursor-pointer" strokeWidth={1.5}/>
                </button>
            </div>
            <div className="p-4 flex items-start justify-between">
                <button className={"p-3 rounded-lg cursor-pointer border hover:bg-gray-100 transition"}
                        onClick={() => navigate("/details/" + offer.offerId)}>Mehr lesen
                </button>
                <button
                    className={"p-3 rounded-lg cursor-pointer border bg-green-600 text-white hover:bg-green-700 transition"}
                    onClick={() => navigate("/details/" + offer.offerId)}>Anmelden
                </button>
            </div>
        </div>
    )
}

export default ActivityCard
