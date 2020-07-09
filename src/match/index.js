import { EngineMatchMap, Enginekeys } from './engine';
import { OSMatchMap, OSkeys } from './os';
import { DeviceMatchMap, Devicekeys } from './device';
import { BrowserMatchMap, Browserkeys } from './browser';

export const HashKey = {
  engine: Enginekeys,
  browser: Browserkeys,
  os: OSkeys,
  device: Devicekeys,
};

const MatchMap = {
  ...EngineMatchMap,
  ...OSMatchMap,
  ...DeviceMatchMap,
  ...BrowserMatchMap,
};

/**
 * 构建 match 对象
 * @param {string} ua userAgent
 * @param {Window} win window
 * @param {Navigator} nav navigator
 * @returns {Record<string, boolean>}
 */
export const buildMatch = (ua, win, nav) => {
  const Match = {};

  Object.keys(MatchMap).forEach((key) => {
    const matchFN = MatchMap[key];
    Match[key] = matchFN(ua);
  });

  const mime = function (option, value) {
    const mimeTypes = nav.mimeTypes;
    for (let mt in mimeTypes) {
      if (mimeTypes[mt][option] == value) {
        return true;
      }
    }
    return false;
  };

  // 修正数据
  let is360 = false;

  if (win.chrome) {
    const chrome_vision = ua.replace(/^.*Chrome\/([\d]+).*$/, '$1');
    if (win.chrome.adblock2345 || win.chrome.common2345) {
      Match['2345Explorer'] = true;
    } else if (
      mime('type', 'application/360softmgrplugin') ||
      mime('type', 'application/mozilla-npqihooquicklogin') ||
      (chrome_vision > 36 && win.showModalDialog)
    ) {
      is360 = true;
    } else if (chrome_vision > 45) {
      is360 = mime('type', 'application/vnd.chromium.remoting-viewer');
      if (!is360 && chrome_vision >= 69) {
        is360 =
          mime('type', 'application/hwepass2001.installepass2001') ||
          mime('type', 'application/asx');
      }
    }
  }

  if (Match['Mobile']) {
    Match['Mobile'] = !(ua.indexOf('iPad') > -1);
  } else if (is360) {
    if (mime('type', 'application/gameplugin')) {
      Match['360SE'] = true;
    } else if (
      nav &&
      typeof nav['connection'] !== 'undefined' &&
      typeof nav['connection']['saveData'] == 'undefined'
    ) {
      Match['360SE'] = true;
    } else {
      Match['360EE'] = true;
    }
  }

  if (Match['IE'] || Match['Edge']) {
    const navigator_top = win.screenTop - win.screenY;

    switch (navigator_top) {
      case 71: //无收藏栏,贴边
      case 99: //有收藏栏,贴边
      case 102: //有收藏栏,非贴边
        Match['360EE'] = true;
        break;
      case 75: //无收藏栏,贴边
      case 105: //有收藏栏,贴边
      case 104: //有收藏栏,非贴边
        Match['360SE'] = true;
        break;
    }
  }
  if (Match['Baidu'] && Match['Opera']) {
    Match['Baidu'] = false;
  } else if (Match['iOS']) {
    Match['Safari'] = true;
  }

  return Match;
};
