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