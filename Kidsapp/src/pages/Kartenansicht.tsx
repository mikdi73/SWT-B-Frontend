import {AdresseMap} from "../components/AdresseMap.tsx";

export default function Kartenansicht(){
    return(
        <div className="h-fit pb-32 flex flex-col items-center w-screen p-4">
            <div className={"flex justify-center h-full w-full lg:w-3/4 p-12 shadow-2xl rounded-lg"}>
                <AdresseMap address={"Herne"}/>
            </div>
        </div>
    )
}