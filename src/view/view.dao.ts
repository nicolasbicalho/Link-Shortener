import { v4 as uuidV4 } from 'uuid';

import { View } from './view.interface';

const views: View[] = [];

async function insert(view: Omit<View, 'id' | 'createdAt'>) {
	const newView = {
		id: uuidV4(),
		...view,
		createdAt: new Date(),
	}

	views.push(newView);
	return newView;
}

async function getLinkViews({ linkId }: { linkId: string }) {
	return views.filter(el => el.linkId === linkId);
}

async function getUserViews({ userId }: { userId: string }) {
	return views.filter(el => el.userId === userId);
}

export default {
	insert,
	getLinkViews,
	getUserViews,
}