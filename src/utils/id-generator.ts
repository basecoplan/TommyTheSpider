import {Md5} from 'ts-md5';

const HASH_SALT = 'AlexILoveYou';

export function generateId(): string {
    const curentTime = new Date().getTime();

    return Md5.hashStr(`${curentTime}${HASH_SALT}`) as string;
}