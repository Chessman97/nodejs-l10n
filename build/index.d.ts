export declare class L10n {
    constructor(locales: string[], directory: string);
    searchNotification(notification: string, language: string): string;
    searchNotificationWithParams(notification: string, params: string[], language: string): string;
}
