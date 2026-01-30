import type { FullLevelInfo } from "../types/Level";

 const backendBase = 'https://zelfmonco.xyz:2087'


// Get levels from backend (mocked for time being, turn into FullLevelInfo if need be)
export async function getLevels(): Promise<FullLevelInfo[]> {
    // This is mock and was used in the initial phase of building.
    // It will return Level[].
    // const res = await fetch('/mock/levels.json');
    // return res.json();

    // This is also mock, but I mocked a few completions as well (just to have them).
    // const res = await fetch('/mock/full_info_with_claim.json');
    // return res.json();


    // This is where real data is retrieved. Uncomment it when real data is available (from backend).
    
    const res = await fetch(backendBase+'/api/levels');
    if (!res.ok)
    {
        throw new Error("GUH!");
    }
        
     return res.json();
}