function timeAgo(postgresDatetime: string): string {
    const inputDate: Date = new Date(postgresDatetime);
    const now: Date = new Date();

    const diffInSeconds: number = Math.abs((now.getTime() - inputDate.getTime()) / 1000); // Convert milliseconds to seconds

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay; // Approximate
    const secondsInYear = 12 * secondsInMonth; // Approximate

    if (diffInSeconds < secondsInMinute) {
        return `${Math.floor(diffInSeconds)} seconds ago`;
    } else if (diffInSeconds < secondsInHour) {
        return `${Math.floor(diffInSeconds / secondsInMinute)} minutes ago`;
    } else if (diffInSeconds < secondsInDay) {
        return `${Math.floor(diffInSeconds / secondsInHour)} hours ago`;
    } else if (diffInSeconds < secondsInMonth) {
        return `${Math.floor(diffInSeconds / secondsInDay)} days ago`;
    } else if (diffInSeconds < secondsInYear) {
        return `${Math.floor(diffInSeconds / secondsInMonth)} months ago`;
    } else {
        return `${Math.floor(diffInSeconds / secondsInYear)} years ago`;
    }
}

export default timeAgo
