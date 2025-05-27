import ActivityCard from "../components/ActivityCard.tsx";
import Fussballimg from "../assets/fussball.jpg";
import FilterBar from "../components/FilterBar";

export default function Homepage() {
    return(
        <>
            <h1>Homepage</h1>
            <div>
                <FilterBar />
            </div>
            <main className="flex columns-auto lg:row-auto lg:items-center lg:justify-center w-full gap-20 flex-wrap h-fit pb-30 p-5">
                <ActivityCard imageUrl={Fussballimg} title={"Test"} description={"Das ist hier ein Test"}/>
                <ActivityCard imageUrl={Fussballimg} title={"Test"} description={"Das ist hier ein Test"}/>
                <ActivityCard imageUrl={Fussballimg} title={"Test"} description={"Das ist hier ein Test"}/>
                <ActivityCard imageUrl={Fussballimg} title={"Test"} description={"Das ist hier ein Test"}/>
                <ActivityCard imageUrl={Fussballimg} title={"Test"} description={"Das ist hier ein Test"}/>
                <ActivityCard imageUrl={Fussballimg} title={"Test"} description={"Das ist hier ein Test"}/>
            </main>
        </>
    )
}