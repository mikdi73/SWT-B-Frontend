import { FC } from "react"
import { Heart } from "lucide-react"
import {Offer} from "../models/AngebotType.ts";
import Testbild from "../assets/fussball.jpg";

type CardProps = {
   offer: Offer;
}

const ActivityCard: FC<CardProps> = ({offer }:CardProps) => {
    return (
        <div className="lg:w-[40%] w-full rounded-lg border shadow-sm overflow-hidden bg-white">
            <img src={Testbild} alt={"Testbild"} className="mx-auto h-48 object-cover p-3 w-full" />
            <div className="p-4 flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold">{offer.name}</h2>
                    <p className="text-sm text-gray-500">{offer.additionalInformation}</p>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition">
                    <Heart className="w-6 h-6" strokeWidth={1.5} />
                </button>
            </div>
            <div className="p-4 flex items-start justify-between">
                <button className={"p-2 rounded-lg border "}>Mehr lesen</button>
                <button className={"p-2 rounded-lg border bg-green-800 text-white"}>Anmelden</button>
            </div>
        </div>
    )
}

export default ActivityCard
