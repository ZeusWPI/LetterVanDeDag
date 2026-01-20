import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';
import type { LetterVanDeDag, Declarer } from '$lib/types';

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

export default db;

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
		letterVanDeDag.created_at.toISOString().substring(0, 10),
		letterVanDeDag.letter,
		letterVanDeDag.added_by.id,
		letterVanDeDag.imageUrl,
		letterVanDeDag.letter,
		letterVanDeDag.added_by.id,
		letterVanDeDag.imageUrl
	);
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
				created_at: new Date(o.dag),
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
