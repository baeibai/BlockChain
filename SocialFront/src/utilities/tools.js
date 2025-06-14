import { format, parseISO, isToday, isThisYear } from 'date-fns';

export function formatDate(dateString) {
    const date = parseISO(dateString);
    if (isToday(date)) {
        return format(date, 'HH:mm');
    } else if (isThisYear(date)) {
        return format(date, 'MM-dd HH:mm');
    } else {
        return format(date, 'yyyy-MM-dd HH:mm');
    }
}

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}