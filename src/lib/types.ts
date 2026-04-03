export type LetterVanDeDag = {
	letter: string;
	created_at: string;
	added_by: Declarer;
	imageUrl?: string;
};

export type Declarer = {
	id: number;
	username?: string;
};

export type LeaderboardUser = {
	rank: number;
	id: number;
	username?: string;
	count: number;
};

export type Streak = {
	start: Date;
	end: Date;
	user: Declarer;
};

export type ZAuthUser = {
	id: string;
	zauthId: number;
	username: string;
	admin: boolean;
	picture: string;
};
