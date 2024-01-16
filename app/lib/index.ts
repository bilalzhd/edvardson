export function isEmpty(value: any) {
    if (value == null) {
        return true;
    }
    if (typeof value === 'string' && value.trim() === '') {
        return true;
    }
    if (Array.isArray(value) || typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    return false;
}

