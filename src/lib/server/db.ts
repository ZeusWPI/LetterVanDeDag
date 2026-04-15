import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';
import type { LetterVanDeDag, Declarer, LeaderboardUser, Streak } from '$lib/types';

const db = new Database(env.DB_LOCATION);

// Enable WAL for better performance
db.pragma('journal_mode = WAL');

// Run migrations / schema
db.exec(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		username TEXT UNIQUE NOT NULL
	);
`);

db.exec(`
	CREATE TABLE IF NOT EXISTS letters (
		dag DATE PRIMARY KEY,
		letter TEXT NOT NULL,
		added_by INTEGER NOT NULL,
		image_url TEXT,
	  FOREIGN KEY (added_by) REFERENCES users(id)
	);
`);
export function addLetter(letterVanDeDag: LetterVanDeDag) {
	const user = db
		.prepare(
			`
		SELECT * FROM users
		WHERE users.id == ?
	`
		)
		.get(letterVanDeDag.added_by.id);
	if (user == undefined) {
		db.prepare(
			`
			INSERT INTO users(id, username) VALUES (?, ?)
		`
		).run(letterVanDeDag.added_by.id, letterVanDeDag.added_by.username);
	}

	db.prepare(
		`
		INSERT INTO letters(dag, letter, added_by, image_url) VALUES (?, ?, ?, ?)
		ON CONFLICT DO UPDATE SET (letter, added_by, image_url) = (?, ?, ?)
	`
	).run(
		letterVanDeDag.created_at,
		letterVanDeDag.letter,
		letterVanDeDag.added_by.id,
		letterVanDeDag.imageUrl,
		letterVanDeDag.letter,
		letterVanDeDag.added_by.id,
		letterVanDeDag.imageUrl
	);
	console.log('added');
	console.log(letterVanDeDag);
}

export function addDeclarer(declarer: Declarer) {
	db.prepare(`INSERT INTO users(id, username) VALUES (?, ?)`).run(declarer.id, declarer.username);
}

export function getLetters(): LetterVanDeDag[] {
	return db
		.prepare(
			'SELECT dag, letter, image_url, users.id as userid, users.username as username FROM letters JOIN users ON letters.added_by = users.id;'
		)
		.all()
		.map((o: any) => {
			return {
				created_at: o.dag,
				letter: o.letter,
				added_by: {
					id: o.userid,
					username: o.username
				},
				imageUrl: o.image_url
			};
		});
}

export function getDeclarers(): Declarer[] {
	return db
		.prepare(
			`
		SELECT u.id, u.username, ll.latest_letter_at
		FROM users u
		LEFT JOIN (
			SELECT added_by, MAX(dag) AS latest_letter_at
			FROM letters
			GROUP BY added_by
		) ll on ll.added_by = u.id
		ORDER BY ll.latest_letter_at DESC NULLS LAST;
	`
		)
		.all()
		.map((o: any): Declarer => {
			return { id: o.id, username: o.username };
		});
}

export function getLeaderboard(): LeaderboardUser[] {
	return db
		.prepare(
			`
			SELECT RANK() OVER (ORDER BY COUNT(id) DESC) rank, id, username, COUNT(id) as count
			FROM letters INNER JOIN users ON letters.added_by = users.id
			GROUP BY id
			ORDER BY count DESC;
    `
		)
		.all()
		.map((o: any): LeaderboardUser => {
			return { rank: o.rank, id: o.id, username: o.username, count: o.count };
		});
}

type StreakRow = {
	dag: string;
	letter: string;
	added_by: number;
	image_url: string;
	id: number;
	username: string;
};

function nextDay(dateStr: string): Date {
	const d = new Date(dateStr);
	d.setUTCDate(d.getUTCDate() + 1);
	return d;
}

export function getStreaks(): Streak[] {
	const rows = db
		.prepare(
			`
      SELECT *
      FROM letters INNER JOIN users ON added_by = id
      ORDER BY dag ASC;
      `
		)
		.all() as StreakRow[];

	if (rows.length === 0) return [];

	const streaks: Streak[] = [];

	let currStart = rows[0].dag;
	let currEnd = rows[0].dag;
	let currUser: Declarer = { id: rows[0].id, username: rows[0].username };

	for (let i = 1; i < rows.length; i++) {
		const currRow = rows[i];
		const rowDay = currRow.dag;

		const prevDate = new Date(currEnd);
		const currDate = new Date(rowDay);
		// 86400000 is the diff between two consecutive days when they have the exact same time
		// javascript :(
		const diffInDays = Math.round((currDate.getTime() - prevDate.getTime()) / 86400000);

		const isSameUser = currRow.id === currUser.id;
		const isConsecutiveDay = diffInDays === 1;

		if (!isConsecutiveDay || !isSameUser) {
			// streak ended
			streaks.push({
				start: new Date(currStart),
				end: nextDay(currEnd),
				user: currUser
			});

			currStart = rowDay;
			currEnd = rowDay;
			currUser = { id: currRow.id, username: currRow.username };
		} else {
			currEnd = rowDay;
		}
	}

	// push the last day
	streaks.push({
		start: new Date(currStart),
		end: nextDay(currEnd),
		user: currUser
	});

	return streaks;
}
