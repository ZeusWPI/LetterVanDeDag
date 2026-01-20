export type LetterVanDeDag = {
	letter: string;
	created_at: Date;
	added_by: Declarer;
	imageUrl?: string;
};

export type Declarer = {
	id: number;
	username?: string;
};

export type ZAuthUser = {
	id: string;
	zauthId: number;
	username: string;
	admin: boolean;
	picture: string;
};
