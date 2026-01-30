import { useEffect, useState } from 'react';
import { getLevels } from '../api/getLevels';
import { getStrengthVerb, getStrengthColor } from '../helpers/claim_translation';
import type { FullLevelInfo } from '../types/Level';
import { getUser } from '../api/auth';

export function LevelList() {
    // Create a space for the levels to go
    const [levels, setLevels] = useState<FullLevelInfo[]>([]);

    // Create a search query to limit results
    const [searchQuery, setSearchQuery] = useState("");

    // Track whether it's loading
    const [loading, setLoading] = useState(true);

    // Const to see if checkbox is checked
    const [showUncompletedOnly, setShowUncompletedOnly] = useState(false);

    // This is where we actually get the levels
    useEffect(() => {
        // This getLevels() call is inside /api
        getLevels().then((data) => {
            setLevels(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-center">Loading levels...</p>;

    // Filter the levels based on... well... filters...
    const filteredLevels = levels.filter((full) => {
        const matchesSearch = searchQuery.trim() === "" || full.allLevelInfo.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCompletion = !showUncompletedOnly || full.completedBy === null;
        const isLegacy = full.allLevelInfo.legacy;
        return matchesSearch && matchesCompletion && !isLegacy;
    });


    return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-[#1b1d1e] border border-gray-500 rounded-md bg-linear-to-r from-gray-800 to-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-center text-white-900">
			Extreme Demons
			<br></br>
			({filteredLevels.length} shown)
        </h1>

        {/* Search Bar */}
        <div className="sticky top-0 z-10 mb-4 flex-shrink-0 py-2 border-b border-gray-300 from-gray-800 to-gray-900 bg-linear-to-r" >
            <input
                type="text"
                placeholder="Search levels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-96 block mx-auto p-2 px-4 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="flex items-center justify-center gap-2 text-sm text-white mt-2">
                <input
                    type="checkbox"
                    checked={showUncompletedOnly}
                    onChange={(e) => setShowUncompletedOnly(e.target.checked)}
                    className="accent-blue-500"
                />
                Only show uncompleted
            </label>

        </div>

        {/* No results message */}
        {searchQuery.trim() !== "" && filteredLevels.length === 0 && (
        <p className="text-center text-white italic">
            No levels found matching "<strong>{searchQuery}</strong>"
        </p>
        )}

        {/* List stacked vertically */}
        <div>
            <ul className="flex flex-col gap-4">
            {filteredLevels.map((full) => (
                <li
                key={full.allLevelInfo._id}
                className={("rounded-lg border border-white-500 p-4 shadow-sm hover:shadow-md transition-shadow max-w-full bg-linear-to-r "+((full.completedBy === null) ? "from-gray-700 to-gray-800" : ""))}
                >
        {/* Row 1: Position + Title + Claim Dropdown */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
        {/* Left: Position + Name */}
        <div className="flex-1">
            <span className="text-sm font-mono text-white">#{full.allLevelInfo.position}</span>{" "}
            <span className="font-semibold text-white truncate">
            {full.allLevelInfo.name}
            {full.allLevelInfo.legacy && (
                <span className="text-yellow-400"> (Legacy)</span>
            )}
            </span>
        </div>

        {/* Right: Claim dropdown and submit */}
        <form
            className="flex items-center gap-2"
            onSubmit={async (e) => {
            e.preventDefault();

            const form = e.currentTarget;
            const formData = new FormData(form);
            const strength = Number(formData.get("strength"));
            const levelId = full.allLevelInfo._id;

            try {
                // Get needed info to format POST request to endpoint
                const user = await getUser();
                const username = user?.username;
                const discord_user_id = user?.discordId;

                // Send POST form to create/update claim
                const res = await fetch("https://zelfmonco.xyz:2087/api/sendClaim", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({  "_id": levelId, "discord_id": discord_user_id, "discord_username": username, "strength": strength }),
                credentials: "include",
                });

                if (!res.ok) {
                    console.log(`Server responded with ${res.status}`);
                    if(res.status === 401) {
                        alert("You need to log in first.");
                    }
                    if(res.status === 403) {
                        alert("Request rejected. Are you trying to steal someone else's claim?");  
                    }
                    
                } else {
                    alert("Claim sent successfully!");
                    getLevels().then((data) => {
                        setLevels(data);
                        setLoading(false);
                    });
                }
            } catch (err) {
                console.error("Failed to send claim:", err);
                alert("That was bad...");
            }
            }}
        >
            <select
            name="strength"
            defaultValue="0"
            className="text-sm bg-zinc-800 text-white border border-gray-600 rounded-md px-2 py-1"
            >
            <option value="0">No Selection</option>
            <option value="1">Begrudgingly Earmark</option>
            <option value="2">Claim</option>
            <option value="3">Lock Down</option>
            <option value="4">Mark as Completed</option>
            </select>

            <button
            type="submit"
            className="text-green-400 hover:text-green-300 text-xl"
            title="Submit Claim"
            >
            ✓
            </button>
        </form>
        </div>

                {/* Row 2: Points + Completed By */}
                <div className="flex justify-between items-center mb-2">
                    {/* Points */}
                    <span><span className="text-sm text-white">Points: </span><span className="text-sm font-medium text-white">{full.allLevelInfo.points / 10}</span></span>
                    {/* Completed By */}
                    <span><span className={
                        `text-sm ${full.completedBy !== null ? (full.claimInfo === null ? "text-white" : "text-green-400") : (full.claimInfo !== null ? getStrengthColor(full.claimInfo.strength) : "text-white")}`
                    }>{
                        // If the level has been claimed but not completed
                        (full.claimInfo === null || full.completedBy !== null)
                            ? ("Completed by: ")
                            : (getStrengthVerb(full.claimInfo.strength)+" by: ")
                        }</span><span className="text-sm font-medium text-white">{
                        // If the level has not been beaten by somebody
                        (full.completedBy === null)
                            // If the level has not been claimed by anybody
                            ? ((full.claimInfo === null) 
                                ? ("Nobody yet!")
                                : (full.claimInfo.discord_username)) 
                            : (full.completedBy.username)
                    }</span></span>
                </div>

                {/* Row 3: Tags */}
                <div className="flex flex-wrap gap-1 text-xs text-white">
                    {
                    
                    full.allLevelInfo.tags && Array.isArray(full.allLevelInfo.tags) && full.allLevelInfo.tags.filter(Boolean).length > 0 ? (
                    full.allLevelInfo.tags.filter(Boolean).map((tag, i) => (
                        <span
                        key={i}
                        className="bg-#1e2022 border border-gray-300 px-2 py-0.5 rounded-full whitespace-nowrap"
                        >
                        {tag}
                        </span>
                    ))
                    ) : (
                    <span className="italic text-white">No tags</span>
                    )}
                </div>
                </li>
            ))}
            </ul>
        </div>
    </div>
    );




}