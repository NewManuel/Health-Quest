// Function to get the ordinal suffix for a given day
export function getOrdinalSuffix(day) {
    let suffix = '';
    if (day >= 11 && day <= 13) {
        suffix = 'th';
    } else {
        switch (day % 10) {
            case 1:
                suffix = 'st';
                break;
            case 2:
                suffix = 'nd';
                break;
            case 3:
                suffix = 'rd';
                break;
            default:
                suffix = 'th';
        }
    }
    return suffix; // Return only the suffix without HTML tags
}

// Function to get the formatted date string
export function getFormattedDateString() {
    const today = new Date();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = weekdays[today.getDay()];
    const month = months[today.getMonth()];
    const dayOfMonth = today.getDate();
    const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
    const year = getYear();

    const dateString = `${dayOfWeek}, ${month} ${dayOfMonth}${ordinalSuffix}, ${year}`;
    return dateString;
}

// Function to get the current year
function getYear() {
    return new Date().getFullYear();
}
