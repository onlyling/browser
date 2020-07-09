import { buildMatchAndKeys } from '../helper';

/** 平台和系统配置 */
const configs = [
  ['Windows'],
  ['Linux', ['Linux', 'X11']],
  ['Mac OS', ['Macintosh']],
  ['Android', ['Android', 'Adr']],
  ['Ubuntu'],
  ['FreeBSD'],
  ['Debian'],
  ['Windows Phone', ['IEMobile', 'Windows Phone']],
  ['BlackBerry', ['BlackBerry', 'RIM']],
  ['MeeGo'],
  ['Symbian'],
  ['iOS', ['like Mac OS X']],
  ['Chrome OS', ['CrOS']],
  ['WebOS', ['hpwOS']]
];

const MatchAndKeys = buildMatchAndKeys(configs);

/** 浏览器内核匹配集合 */
export const OSMatchMap = MatchAndKeys[0];

/** 浏览器内核类型集合 */
export const OSkeys = MatchAndKeys[1];

/**
 * 系统版本查询集合
 * @type {Record<string, (u:string)=>string;>}
 */
const OSVersionMap = {
  Windows: function (u) {
    const v = u.replace(/^Mozilla\/\d.0 \(Windows NT ([\d.]+);.*$/, '$1');
    const hash = {
      '10': '10',
      '6.4': '10',
      '6.3': '8.1',
      '6.2': '8',
      '6.1': '7',
      '6.0': 'Vista',
      '5.2': 'XP',
      '5.1': 'XP',
      '5.0': '2000',
    };
    return hash[v] || v;
  },
  Android: function (u) {
    return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
  },
  iOS: function (u) {
    return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
  },
  Debian: function (u) {
    return u.replace(/^.*Debian\/([\d.]+).*$/, '$1');
  },
  'Windows Phone': function (u) {
    return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2');
  },
  'Mac OS': function (u) {
    return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
  },
  WebOS: function (u) {
    return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1');
  },
};

/**
 * 获取系统版本
 * @param {string} userAgent userAgent
 * @param {string} OSStr 系统
 */
export const getOSVersion = (userAgent, OSStr) => {
  let osVersion = '';
  const check = OSVersionMap[OSStr];

  if (check) {
    osVersion = check(userAgent);
    if (userAgent === osVersion) {
      osVersion = '';
    }
  }

  return osVersion;
};
