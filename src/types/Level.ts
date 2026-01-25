export interface FullLevelInfo {
    _id: placeholder,
    allLevelInfo: Level,
    completedBy: (CompletionInfo | null);
    claimInfo: (ClaimInfo | null);
}

// Level (from https://api.aredl.net/v2/docs#get-/api/aredl/levels)
export interface Level {
    _id: string;
    position: number;
    name: string;
    points: number;
    legacy: boolean;
    level_id: number;
    two_player: boolean;
    tags: (string[] | null);
    description: (string | null);
    song: (number | null);
    edel: (number | null);
    nlw_tier: (string | null);
}

export interface CompletionInfo {
    _id: string;
    discord_avatar: (string | null);
    username: string;
    video_url: string;
    created_at: Date;
}

export interface ClaimInfo {
    _id: string;
    discord_id: string;
    discord_username: string;
    strength: number;
}

export interface placeholder {
    timestamp: number,
    creationTime: Date
}