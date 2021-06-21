import * as path from 'path';
import * as fs from 'fs';

export class L10n {
    private locales: string[];
    private directory: string;
    private localesFiles: any = {};

    public constructor(locales: string[], directory: string) {
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
            } catch (error) {
                throw new Error(error.error);
            }
        }
    }

    public searchNotification(notification: string, language: string): string {
        const checkedLanguage = this.resetDefaultChecking(language);
        if (this.localesFiles[checkedLanguage].hasOwnProperty(notification)) {
            return this.localesFiles[checkedLanguage][notification];
        } else {
            throw new Error('No found notification');
        }
    }

    public searchNotificationWithParams(notification: string, params: string[], language: string): string {
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

    private resetDefaultChecking(language: string): string {
        if (this.locales.indexOf(language) === -1) {
            return 'en';
        } else {
            return language;
        }
    }

}
