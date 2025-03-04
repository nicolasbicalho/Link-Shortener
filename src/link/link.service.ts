import ShortUniqueId  from 'short-unique-id';
import linkDao from './link.dao';

const { randomUUID } = new ShortUniqueId({ length: 10 });

function generateShortId() {
	return randomUUID();
}

async function generateShortLink({ originalUrl, userId }: { originalUrl: string, userId: string }) {
	const appUrl = process.env.APP_URL || 'http://localhost:3000';
	const shortId = generateShortId();
	const earningsPerClick = 0.05;

	const shortUrl = `${appUrl}/${shortId}`;

	return linkDao.insert({
		shortId,
		shortUrl,
		originalUrl,
		userId,
		earningsPerClick,
	});
}

async function getLinkByShortId({ shortId }: { shortId: string }) {
	return linkDao.getByShortId(shortId);
}

async function getUserLinks({ userId }: { userId: string }) {
	return linkDao.getByUserId(userId);
}

export default {
	generateShortLink,
	getLinkByShortId,
	getUserLinks,
};