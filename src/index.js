import { buildMatch, HashKey } from './match/index';
import { getOSVersion } from './match/os';
import { getLanguage } from './language';
import { getVersion } from './version';

const Browser = (ua = '') => {
  /**
   * @type Window
   */
  const win = window || {};
  /**
   * @type Navigator
   */
  const nav = win.navigator || {};

  /**
   * userAgent
   */
  const userAgent = ua || nav.userAgent || '';

  /** 获取到的设备信息 */
  const info = {
    browser: '',
    version: '',
    engine: '',
    os: '',
    osVersion: '',
    device: 'PC',
    language: getLanguage(nav),
  };

  /** match 对象 */
  const Match = buildMatch(userAgent, win, nav);

  // 基础信息
  Object.keys(HashKey).forEach((tp) => {
    /**
     * @type string[]
     */
    const keys = HashKey[tp];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = Match[key];

      if (value) {
        info[tp] = key;
      }
    }
  });

  info.osVersion = getOSVersion(userAgent, info.os);
  info.version = getVersion(userAgent, info.browser);

  // 数据修正
  if (info.browser === 'Chrome' && userAgent.match(/\S+Browser/)) {
    info.browser = userAgent.match(/\S+Browser/)[0];
    info.version = userAgent.replace(/^.*Browser\/([\d.]+).*$/, '$1');
  }

  if (info.browser === 'Edge') {
    if (info.version > '75') {
      info.engine = 'Blink';
    } else {
      info.engine = 'EdgeHTML';
    }
  } else if (
    Match['Chrome'] &&
    info.engine === 'WebKit' &&
    parseInt(getVersion(userAgent, 'Chrome')) > 27
  ) {
    info.engine = 'Blink';
  } else if (info.browser == 'Opera' && parseInt(info.version) > 12) {
    info.engine = 'Blink';
  } else if (info.browser == 'Yandex') {
    info.engine = 'Blink';
  }

  return info;
};

export default Browser;
