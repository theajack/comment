import {buildRandomId} from './util';

export const AnonymousName = (() => {
    const ANONY_KEY = 'tj_comment_anonymous_id';
    let value = localStorage.getItem(ANONY_KEY);
    if (!value) {
        value = buildRandomId(6);
        localStorage.setItem(ANONY_KEY, value);
    }
    return value;
})();

export function readUserInfo () {
    return {
        name: localStorage.getItem('tj_comment_name') || '',
        contact: localStorage.getItem('tj_comment_contact') || '',
    };
}

export function writeUserInfo ({
    name,
    contact
}) {
    localStorage.setItem('tj_comment_name', name);
    localStorage.setItem('tj_comment_contact', contact);
}