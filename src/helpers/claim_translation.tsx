/* 
This file is dedicated to translating the strength of a claim.

| Strength | Interpretation |
 0 - Reserved
 1 - Begrudgingly - "I guess I'll do it if nobody else will"
 2 - Claimed - "I'll do it, no problem"
 3 - Locked Down - "Please let me do this. I want to do this."
 4 - Marked Completed - "I already did this. It's pending in AREDL."
*/

// Responsible for translating a strength number to its corresponding color
export function getStrengthVerb(level: number): string {
    switch (level) {
        case 0 : return "AHHHHHHHHHHHHHHHH IDIOT STUPID DIE DIE DIE";
        case 1: return "Begrudgingly earmarked";
        case 2: return "Claimed";
        case 3: return "Locked down";
        case 4: return "Marked as completed";
        default: return "stupid POST request writer. Tricks are for kids!";
    }
}

// Responsible for correctly coloring a claim level
export function getStrengthColor(level: number): string {
    switch(level) {
        case 1: return "text-gray-400";
        case 2: return "text-yellow-400";
        case 3: return "text-red-400";
        case 4: return "text-blue-400";
        default: return "text-black";
    }
}