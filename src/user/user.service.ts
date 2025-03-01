import AppError from "../utils/AppError";
import userDao from "./user.dao";

async function createUser({ username, password }: { username: string, password: string }) {
	const alreadyExists = await userDao.getByUsername(username);
	if (alreadyExists) throw new AppError('user already exists', 400);

	return userDao.insert({ username, password });
}

export default {
	createUser,
};