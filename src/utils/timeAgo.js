export const timeAgo = (timestamp) => {
    const now = Date.now();
    const timeStamp = new Date(timestamp).getTime();
    const secondsAgo = Math.floor((now - timeStamp) / 1000);
    const date = new Date(timestamp);

    if (secondsAgo > 604800) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } else {
        const day = date.getDay();
        switch (day) {
            case 0:
                return "sunday";
            case 1:
                return "monday";
            case 2:
                return "tuesday";
            case 3:
                return "wednesday";
            case 4:
                return "thursday";
            case 5:
                return "friday";
            case 6:
                return "saturday";
            default:
                console.log("invalid choice.");
                break;
        }
    }
}

export const getMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    if (hour >= 0 && hour <= 11) {
        return `${hour}:${minutes} AM`;
    } else if (hour === 12) {
        return `${hour}:${minutes} PM`;
    }
    else if (hour > 12 && hour <= 23) {
        return `${hour % 12}:${minutes} PM`;
    }
}