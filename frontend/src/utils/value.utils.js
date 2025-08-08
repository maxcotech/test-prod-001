let timeoutHandler = null;
export const debounced = (val, actionFunc, timeoutDuration = 1000) => {
    if (timeoutHandler !== null) {
        clearTimeout(timeoutHandler);
        timeoutHandler = null;
    }
    timeoutHandler = setTimeout(() => {
        actionFunc(val);
    }, timeoutDuration)
}