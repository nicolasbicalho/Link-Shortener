import ShortUniqueId  from 'short-unique-id';
import linkDao from './link.dao';

const { randomUUID } = new ShortUniqueId({ length: 10 });

function generateShortId() {
	return randomUUID();
}

async function generateShortLink({ originalUrl, userId }: { originalUrl: string, userId: string }) {
	const appUrl = process.env.APP_URL || 'http://localhost:3000';
	const shortId = generateShortId();

	const shortUrl = `${appUrl}/${shortId}`;

	return linkDao.insert({
		shortId,
		shortUrl,
		originalUrl,
		userId,
	});
}

async function getOriginalUrl({ shortId }: { shortId: string }) {
	const link = await linkDao.getByShortId(shortId);
	return link?.originalUrl;
}

async function getUserLinks({ userId }: { userId: string }) {
	return linkDao.getByUserId(userId);
}

export default {
	generateShortLink,
	getOriginalUrl,
	getUserLinks,
};