import { v4 as uuidv4 } from 'uuid';
import { Link } from './link.interface';

const links: Link[] = [];

async function insert(data: Omit<Link, 'id'>) {
	const link = {
		id: uuidv4(),
		...data,
	}
	links.push(link);
	return link;
}

async function getByShortId(shortId: string) {
	return links.find((el => el.shortId === shortId));
}

async function getByUserId(userId: string) {
	return links.filter((el => el.userId === userId));
}

export default {
	insert,
	getByShortId,
	getByUserId,
}