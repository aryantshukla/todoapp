"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKeyUndefined = exports.showAlert = void 0;
function showAlert(errMsg) {
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
exports.showAlert = showAlert;
function isKeyUndefined(key) {
    return key === undefined;
}
exports.isKeyUndefined = isKeyUndefined;
//# sourceMappingURL=alert.js.map