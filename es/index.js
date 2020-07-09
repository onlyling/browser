function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * 是否是对应数据类型
 * @param {'Array'|'String'|'Object'|'Number'|'Boolean'} ty 数据类型
 * @returns {(v:any)=>boolean}
 */
/**
 * 匹配对象
 * @typedef {Record<string, (u:string)=>boolean>} MatchMap
 */

/**
 * 构建 match
 * @param {[string, string[]?]} configs match 配置数组
 * @returns {[MatchMap, string[]]}
 */

var buildMatchAndKeys = function buildMatchAndKeys() {
  var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var mth = {};
  var keys = [];
  configs.forEach(function (item) {
    var key = item[0];
    var match = item[1] || [key];
    keys.push(key);
    /**
     * 匹配函数
     * @param {string} u userAgent
     */

    mth[key] = function (u) {
      return match.some(function (kk) {
        return u.indexOf(kk) > -1;
      });
    };
  });
  return [mth, keys];
};

/** 浏览器内核配置 */

var configs = [['Trident', ['Trident', 'NET CLR']], ['Presto'], ['WebKit', ['AppleWebKit']], ['Gecko', ['Gecko/']], ['KHTML', ['KHTML/']]];
var MatchAndKeys = buildMatchAndKeys(configs);
/** 浏览器内核匹配集合 */

var EngineMatchMap = MatchAndKeys[0];
/** 浏览器内核类型集合 */

var Enginekeys = MatchAndKeys[1];

/** 平台和系统配置 */

var configs$1 = [['Windows'], ['Linux', ['Linux', 'X11']], ['Mac OS', ['Macintosh']], ['Android', ['Android', 'Adr']], ['Ubuntu'], ['FreeBSD'], ['Debian'], ['Windows Phone', ['IEMobile', 'Windows Phone']], ['BlackBerry', ['BlackBerry', 'RIM']], ['MeeGo'], ['Symbian'], ['iOS', ['like Mac OS X']], ['Chrome OS', ['CrOS']], ['WebOS', ['hpwOS']]];
var MatchAndKeys$1 = buildMatchAndKeys(configs$1);
/** 浏览器内核匹配集合 */

var OSMatchMap = MatchAndKeys$1[0];
/** 浏览器内核类型集合 */

var OSkeys = MatchAndKeys$1[1];
/**
 * 系统版本查询集合
 * @type {Record<string, (u:string)=>string;>}
 */

var OSVersionMap = {
  Windows: function Windows(u) {
    var v = u.replace(/^Mozilla\/\d.0 \(Windows NT ([\d.]+);.*$/, '$1');
    var hash = {
      '10': '10',
      '6.4': '10',
      '6.3': '8.1',
      '6.2': '8',
      '6.1': '7',
      '6.0': 'Vista',
      '5.2': 'XP',
      '5.1': 'XP',
      '5.0': '2000'
    };
    return hash[v] || v;
  },
  Android: function Android(u) {
    return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
  },
  iOS: function iOS(u) {
    return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
  },
  Debian: function Debian(u) {
    return u.replace(/^.*Debian\/([\d.]+).*$/, '$1');
  },
  'Windows Phone': function WindowsPhone(u) {
    return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2');
  },
  'Mac OS': function MacOS(u) {
    return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
  },
  WebOS: function WebOS(u) {
    return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1');
  }
};
/**
 * 获取系统版本
 * @param {string} userAgent userAgent
 * @param {string} OSStr 系统
 */

var getOSVersion = function getOSVersion(userAgent, OSStr) {
  var osVersion = '';
  var check = OSVersionMap[OSStr];

  if (check) {
    osVersion = check(userAgent);

    if (userAgent === osVersion) {
      osVersion = '';
    }
  }

  return osVersion;
};

/** 浏览器内核配置 */

var configs$2 = [['Mobile', ['Mobi', 'iPh', '480']], ['Tablet', ['Tablet', 'Pad', 'Nexus 7']]];
var MatchAndKeys$2 = buildMatchAndKeys(configs$2);
/** 浏览器内核匹配集合 */

var DeviceMatchMap = MatchAndKeys$2[0];
/** 浏览器内核类型集合 */

var Devicekeys = MatchAndKeys$2[1];

/** 浏览器内核配置 */

var configs$3 = [['Safari'], ['Chrome', ['Chrome', 'CriOS']], ['IE', ['MSIE', 'Trident']], ['Edge', ['Edge', 'Edg/']], ['Firefox', ['Firefox', 'FxiOS']], ['Firefox Focus', ['Focus']], ['Chromium'], ['Opera', ['Opera', 'OPR']], ['Vivaldi'], ['Yandex', ['YaBrowser']], ['Arora'], ['Lunascape'], ['QupZilla'], ['Coc Coc', ['coc_coc_browser']], ['Kindle', ['Kindle', 'Silk/']], ['Iceweasel'], ['Konqueror'], ['Iceape'], ['SeaMonkey'], ['Epiphany'], ['360', ['QihooBrowser', 'QHBrowser']], ['360EE'], ['360SE'], ['UC', ['UC', ' UBrowser']], ['QQBrowser'], ['QQ', ['QQ/']], ['Baidu', ['Baidu', 'BIDUBrowser', 'baiduboxapp']], ['Maxthon'], ['Sogou', ['Sogou', 'MetaSr']], ['LBBROWSER'], ['2345Explorer', ['2345Explorer', 'Mb2345Browser']], ['115Browser'], ['TheWorld'], ['XiaoMi', ['MiuiBrowser']], ['Quark'], ['Qiyu'], ['WeChat', ['MicroMessenger']], ['Taobao', ['AliApp(TB']], ['Alipay', ['AliApp(AP']], ['Weibo'], ['Douban', ['com.douban.frodo']], ['Suning', ['SNEBUY-APP']], ['iQiYi', ['IqiyiApp']], ['DingTalk'], ['Huawei', ['HuaweiBrowser', 'HUAWEI']], ['Vivo', ['VivoBrowser']]];
var MatchAndKeys$3 = buildMatchAndKeys(configs$3);
/** 浏览器内核匹配集合 */

var BrowserMatchMap = MatchAndKeys$3[0];
/** 浏览器内核类型集合 */

var Browserkeys = MatchAndKeys$3[1];

var HashKey = {
  engine: Enginekeys,
  browser: Browserkeys,
  os: OSkeys,
  device: Devicekeys
};

var MatchMap = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, EngineMatchMap), OSMatchMap), DeviceMatchMap), BrowserMatchMap);
/**
 * 构建 match 对象
 * @param {string} ua userAgent
 * @param {Window} win window
 * @param {Navigator} nav navigator
 * @returns {Record<string, boolean>}
 */


var buildMatch = function buildMatch(ua, win, nav) {
  var Match = {};
  Object.keys(MatchMap).forEach(function (key) {
    var matchFN = MatchMap[key];
    Match[key] = matchFN(ua);
  });

  var mime = function mime(option, value) {
    var mimeTypes = nav.mimeTypes;

    for (var mt in mimeTypes) {
      if (mimeTypes[mt][option] == value) {
        return true;
      }
    }

    return false;
  }; // 修正数据


  var is360 = false;

  if (win.chrome) {
    var chrome_vision = ua.replace(/^.*Chrome\/([\d]+).*$/, '$1');

    if (win.chrome.adblock2345 || win.chrome.common2345) {
      Match['2345Explorer'] = true;
    } else if (mime('type', 'application/360softmgrplugin') || mime('type', 'application/mozilla-npqihooquicklogin') || chrome_vision > 36 && win.showModalDialog) {
      is360 = true;
    } else if (chrome_vision > 45) {
      is360 = mime('type', 'application/vnd.chromium.remoting-viewer');

      if (!is360 && chrome_vision >= 69) {
        is360 = mime('type', 'application/hwepass2001.installepass2001') || mime('type', 'application/asx');
      }
    }
  }

  if (Match['Mobile']) {
    Match['Mobile'] = !(ua.indexOf('iPad') > -1);
  } else if (is360) {
    if (mime('type', 'application/gameplugin')) {
      Match['360SE'] = true;
    } else if (nav && typeof nav['connection'] !== 'undefined' && typeof nav['connection']['saveData'] == 'undefined') {
      Match['360SE'] = true;
    } else {
      Match['360EE'] = true;
    }
  }

  if (Match['IE'] || Match['Edge']) {
    var navigator_top = win.screenTop - win.screenY;

    switch (navigator_top) {
      case 71: //无收藏栏,贴边

      case 99: //有收藏栏,贴边

      case 102:
        //有收藏栏,非贴边
        Match['360EE'] = true;
        break;

      case 75: //无收藏栏,贴边

      case 105: //有收藏栏,贴边

      case 104:
        //有收藏栏,非贴边
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

/**
 * 获取语言
 * @param {Navigator} nav Navigator
 */
var getLanguage = function getLanguage(nav) {
  var language = nav.browserLanguage || nav.language;
  var languages = language.split('-');

  if (languages[1]) {
    languages[1] = languages[1].toUpperCase();
  }

  return languages.join('_');
};

/**
 * 获取浏览器版本
 * @param {string} u userAgent
 * @param {string} browser 浏览器名称
 */
var getVersion = function getVersion(u, browser) {
  /**
   * 浏览器版本集合
   * @type {Record<string, ()=>string>}
   */
  var VersionMap = {
    Safari: function Safari() {
      return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
    },
    Chrome: function Chrome() {
      return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1');
    },
    IE: function IE() {
      return u.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1');
    },
    Edge: function Edge() {
      return u.replace(/^.*Edge\/([\d.]+).*$/, '$1').replace(/^.*Edg\/([\d.]+).*$/, '$1');
    },
    Firefox: function Firefox() {
      return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1');
    },
    'Firefox Focus': function FirefoxFocus() {
      return u.replace(/^.*Focus\/([\d.]+).*$/, '$1');
    },
    Chromium: function Chromium() {
      return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1');
    },
    Opera: function Opera() {
      return u.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1');
    },
    Vivaldi: function Vivaldi() {
      return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1');
    },
    Yandex: function Yandex() {
      return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1');
    },
    Arora: function Arora() {
      return u.replace(/^.*Arora\/([\d.]+).*$/, '$1');
    },
    Lunascape: function Lunascape() {
      return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1');
    },
    QupZilla: function QupZilla() {
      return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1');
    },
    'Coc Coc': function CocCoc() {
      return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1');
    },
    Kindle: function Kindle() {
      return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
    },
    Iceweasel: function Iceweasel() {
      return u.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1');
    },
    Konqueror: function Konqueror() {
      return u.replace(/^.*Konqueror\/([\d.]+).*$/, '$1');
    },
    Iceape: function Iceape() {
      return u.replace(/^.*Iceape\/([\d.]+).*$/, '$1');
    },
    SeaMonkey: function SeaMonkey() {
      return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1');
    },
    Epiphany: function Epiphany() {
      return u.replace(/^.*Epiphany\/([\d.]+).*$/, '$1');
    },
    '360': function _() {
      return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1');
    },
    '360SE': function SE() {
      var hash = {
        '78': '12.1',
        '69': '11.1',
        '63': '10.0',
        '55': '9.1',
        '45': '8.1',
        '42': '8.0',
        '31': '7.0',
        '21': '6.3'
      };
      var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
      return hash[chrome_vision] || '';
    },
    '360EE': function EE() {
      var hash = {
        '78': '12.0',
        '69': '11.0',
        '63': '9.5',
        '55': '9.0',
        '50': '8.7',
        '30': '7.5'
      };
      var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
      return hash[chrome_vision] || '';
    },
    Maxthon: function Maxthon() {
      return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1');
    },
    QQBrowser: function QQBrowser() {
      return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1');
    },
    QQ: function QQ() {
      return u.replace(/^.*QQ\/([\d.]+).*$/, '$1');
    },
    Baidu: function Baidu() {
      return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1').replace(/^.*baiduboxapp\/([\d.]+).*$/, '$1');
    },
    UC: function UC() {
      return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1');
    },
    Sogou: function Sogou() {
      return u.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1');
    },
    LBBROWSER: function LBBROWSER() {
      var hash = {
        '57': '6.5',
        '49': '6.0',
        '46': '5.9',
        '42': '5.3',
        '39': '5.2',
        '34': '5.0',
        '29': '4.5',
        '21': '4.0'
      };
      var chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1');
      return hash[chrome_vision] || '';
    },
    '2345Explorer': function Explorer() {
      var hash = {
        '69': '10.0',
        '55': '9.9'
      };
      var chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1');
      return hash[chrome_vision] || u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1').replace(/^.*Mb2345Browser\/([\d.]+).*$/, '$1');
    },
    '115Browser': function Browser() {
      return u.replace(/^.*115Browser\/([\d.]+).*$/, '$1');
    },
    TheWorld: function TheWorld() {
      return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1');
    },
    XiaoMi: function XiaoMi() {
      return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1');
    },
    Vivo: function Vivo() {
      return u.replace(/^.*VivoBrowser\/([\d.]+).*$/, '$1');
    },
    Quark: function Quark() {
      return u.replace(/^.*Quark\/([\d.]+).*$/, '$1');
    },
    Qiyu: function Qiyu() {
      return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1');
    },
    WeChat: function WeChat() {
      return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1');
    },
    Taobao: function Taobao() {
      return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1');
    },
    Alipay: function Alipay() {
      return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1');
    },
    Weibo: function Weibo() {
      return u.replace(/^.*weibo__([\d.]+).*$/, '$1');
    },
    Douban: function Douban() {
      return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1');
    },
    Suning: function Suning() {
      return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1');
    },
    iQiYi: function iQiYi() {
      return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1');
    },
    DingTalk: function DingTalk() {
      return u.replace(/^.*DingTalk\/([\d.]+).*$/, '$1');
    },
    Huawei: function Huawei() {
      return u.replace(/^.*Version\/([\d.]+).*$/, '$1').replace(/^.*HuaweiBrowser\/([\d.]+).*$/, '$1');
    }
  };
  var version = '';
  var check = VersionMap[browser];

  if (check) {
    version = check();

    if (u === version) {
      version = '';
    }
  }

  return version;
};

var Browser = function Browser() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  /**
   * @type Window
   */
  var win = window || {};
  /**
   * @type Navigator
   */

  var nav = win.navigator || {};
  /**
   * userAgent
   */

  var userAgent = ua || nav.userAgent || '';
  /** 获取到的设备信息 */

  var info = {
    browser: '',
    version: '',
    engine: '',
    os: '',
    osVersion: '',
    device: 'PC',
    language: getLanguage(nav)
  };
  /** match 对象 */

  var Match = buildMatch(userAgent, win, nav); // 基础信息

  Object.keys(HashKey).forEach(function (tp) {
    /**
     * @type string[]
     */
    var keys = HashKey[tp];

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Match[key];

      if (value) {
        info[tp] = key;
      }
    }
  });
  info.osVersion = getOSVersion(userAgent, info.os);
  info.version = getVersion(userAgent, info.browser); // 数据修正

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
  } else if (Match['Chrome'] && info.engine === 'WebKit' && parseInt(getVersion(userAgent, 'Chrome')) > 27) {
    info.engine = 'Blink';
  } else if (info.browser == 'Opera' && parseInt(info.version) > 12) {
    info.engine = 'Blink';
  } else if (info.browser == 'Yandex') {
    info.engine = 'Blink';
  }

  return info;
};

export default Browser;
