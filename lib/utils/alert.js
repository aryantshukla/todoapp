export function showAlert(errMsg) {
    const div = document.createElement('div');
    div.classList.add('errMsg');
    div.textContent = `${errMsg}, Couldn't update!!!`;
    document.body.append(div);
    setTimeout(() => {
        if (div.parentNode === null) {
            return;
        }
        div.parentNode.removeChild(div);
    }, 6000);
}
export function isKeyUndefined(key) {
    return key === undefined;
}
//# sourceMappingURL=alert.js.map