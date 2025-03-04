import viewDao from './view.dao';
import { Link } from '../link/link.interface';

function getViewsByUser({ userId }: { userId: string }) {
	return viewDao.getUserViews({ userId });
}

function getViewsByLink({ linkId }: { linkId: string }) {
	return viewDao.getLinkViews({ linkId });
}

function registerView({ link }: { link: Link }) {
	return viewDao.insert({
		linkId: link.id,
		userId: link.userId,
	});
}

export default {
	getViewsByUser,
	getViewsByLink,
	registerView,
}