import { v4 as uuidv4 } from 'uuid';
import { User } from './user.interface';

const users: User[] = [];

async function insert(data: Omit<User, 'id'>) {
	const user = {
		id: uuidv4(),
		...data,
	}
	users.push(user);
	return user;
}

async function getById(id: string) {
	return users.find((el => el.id === id));
}

async function getByUsername(username: string) {
	return users.find((el => el.username === username));
}

export default {
	insert,
	getById,
	getByUsername,
}