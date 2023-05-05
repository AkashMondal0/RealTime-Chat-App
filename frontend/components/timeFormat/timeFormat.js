let Time = (time) => {
    time = new Date(time).toLocaleTimeString("en-US",
        {
            hour: "2-digit",
            minute: "2-digit"
        })
    return time
}

const Format = {
    Time
}
export default Format;