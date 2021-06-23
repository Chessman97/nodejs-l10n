import L10n from '../build/index'
// import { L10n } from 'nodejs-l10n';

// const l10n = new L10n(['en', 'ko'], '/home/mikhail/Projects/nodejs-l10n/locales/');
// const str = l10n.searchNotification('BALANCE_UPDATED_BODY', 'en');
// const str1 = l10n.searchNotificationWithParams('BALANCE_UPDATED_BODY', ['1', '2'], 'en');
// console.log(l10n);
// console.log(str);
// console.log(str1);


const a = new L10n.L10n(['en', 'ko'], '/home/mikhail/Projects/nodejs-l10n/locales/');
console.log(a);