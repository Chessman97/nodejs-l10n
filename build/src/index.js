"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L10n = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const fs = tslib_1.__importStar(require("fs"));
class L10n {
    // TODO add file name
    // TODO spec char (now ${})
    constructor(locales, directory) {
        this.localesFiles = {};
        console.log(locales);
        console.log(directory);
        // TODO verify locales
        this.locales = locales;
        this.directory = directory;
        for (const locale of this.locales) {
            try {
                const file = fs.readFileSync(path.resolve(this.directory + locale + '.json'), 'utf8');
                if (!file) {
                    throw new Error('No found file');
                }
                this.localesFiles[locale] = JSON.parse(file);
            }
            catch (error) {
                throw new Error(error.error);
            }
        }
    }
    searchNotification(notification, language) {
        const checkedLanguage = this.resetDefaultChecking(language);
        if (this.localesFiles[checkedLanguage].hasOwnProperty(notification)) {
            return this.localesFiles[checkedLanguage][notification];
        }
        else {
            throw new Error('No found notification');
        }
    }
    searchNotificationWithParams(notification, params, language) {
        const str = this.searchNotification(notification, language);
        let part = str;
        let text = '';
        for (const param of params) {
            if (part.indexOf('${}') !== -1) {
                text += part.slice(0, part.indexOf('${}')) + param;
                part = part.slice(part.indexOf('${}')).slice(3);
            }
        }
        if (part.length > 0) {
            text += part;
        }
        return text;
    }
    resetDefaultChecking(language) {
        if (this.locales.indexOf(language) === -1) {
            return 'en';
        }
        else {
            return language;
        }
    }
}
exports.L10n = L10n;
//# sourceMappingURL=index.js.map