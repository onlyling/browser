import { getChromeVision } from './helper';

/**
 * 获取浏览器版本
 * @param u userAgent
 * @param browser 浏览器名称
 */
export const getVersion = (u: string, browser: string) => {
  /**
   * 浏览器版本集合
   * @type {Record<string, ()=>string>}
   */
  const VersionMap: Record<string, () => string> = {
    Safari: function () {
      return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
    },
    Chrome: function () {
      return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1');
    },
    IE: function () {
      return u.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1');
    },
    Edge: function () {
      return u.replace(/^.*Edge\/([\d.]+).*$/, '$1').replace(/^.*Edg\/([\d.]+).*$/, '$1');
    },
    Firefox: function () {
      return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1');
    },
    'Firefox Focus': function () {
      return u.replace(/^.*Focus\/([\d.]+).*$/, '$1');
    },
    Chromium: function () {
      return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1');
    },
    Opera: function () {
      return u.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1');
    },
    Vivaldi: function () {
      return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1');
    },
    Yandex: function () {
      return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1');
    },
    Arora: function () {
      return u.replace(/^.*Arora\/([\d.]+).*$/, '$1');
    },
    Lunascape: function () {
      return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1');
    },
    QupZilla: function () {
      return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1');
    },
    'Coc Coc': function () {
      return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1');
    },
    Kindle: function () {
      return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
    },
    Iceweasel: function () {
      return u.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1');
    },
    Konqueror: function () {
      return u.replace(/^.*Konqueror\/([\d.]+).*$/, '$1');
    },
    Iceape: function () {
      return u.replace(/^.*Iceape\/([\d.]+).*$/, '$1');
    },
    SeaMonkey: function () {
      return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1');
    },
    Epiphany: function () {
      return u.replace(/^.*Epiphany\/([\d.]+).*$/, '$1');
    },
    '360': function () {
      return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1');
    },
    '360SE': function () {
      const hash: Record<string, string> = {
        '78': '12.1',
        '69': '11.1',
        '63': '10.0',
        '55': '9.1',
        '45': '8.1',
        '42': '8.0',
        '31': '7.0',
        '21': '6.3',
      };
      const chrome_vision = getChromeVision(u);
      return hash[chrome_vision] || '';
    },
    '360EE': function () {
      const hash: Record<string, string> = {
        '78': '12.0',
        '69': '11.0',
        '63': '9.5',
        '55': '9.0',
        '50': '8.7',
        '30': '7.5',
      };
      const chrome_vision = getChromeVision(u);
      return hash[chrome_vision] || '';
    },
    Maxthon: function () {
      return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1');
    },
    QQBrowser: function () {
      return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1');
    },
    QQ: function () {
      return u.replace(/^.*QQ\/([\d.]+).*$/, '$1');
    },
    Baidu: function () {
      return u
        .replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1')
        .replace(/^.*baiduboxapp\/([\d.]+).*$/, '$1');
    },
    UC: function () {
      return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1');
    },
    Sogou: function () {
      return u
        .replace(/^.*SE ([\d.X]+).*$/, '$1')
        .replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1');
    },
    LBBROWSER: function () {
      const hash: Record<string, string> = {
        '57': '6.5',
        '49': '6.0',
        '46': '5.9',
        '42': '5.3',
        '39': '5.2',
        '34': '5.0',
        '29': '4.5',
        '21': '4.0',
      };
      // TODO 核实是否直接使用 `navigator`，Node.js 并不能直接用
      // const chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1');
      const chrome_vision = getChromeVision(u);
      return hash[chrome_vision] || '';
    },
    '2345Explorer': function () {
      const hash: Record<string, string> = { '69': '10.0', '55': '9.9' };
      // TODO 核实是否直接使用 `navigator`，Node.js 并不能直接用
      // const chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1');
      const chrome_vision = getChromeVision(u);
      return (
        hash[chrome_vision] ||
        u
          .replace(/^.*2345Explorer\/([\d.]+).*$/, '$1')
          .replace(/^.*Mb2345Browser\/([\d.]+).*$/, '$1')
      );
    },
    '115Browser': function () {
      return u.replace(/^.*115Browser\/([\d.]+).*$/, '$1');
    },
    TheWorld: function () {
      return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1');
    },
    XiaoMi: function () {
      return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1');
    },
    Vivo: function () {
      return u.replace(/^.*VivoBrowser\/([\d.]+).*$/, '$1');
    },
    Quark: function () {
      return u.replace(/^.*Quark\/([\d.]+).*$/, '$1');
    },
    Qiyu: function () {
      return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1');
    },
    WeChat: function () {
      return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1');
    },
    Taobao: function () {
      return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1');
    },
    Alipay: function () {
      return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1');
    },
    Weibo: function () {
      return u.replace(/^.*weibo__([\d.]+).*$/, '$1');
    },
    Douban: function () {
      return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1');
    },
    Suning: function () {
      return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1');
    },
    iQiYi: function () {
      return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1');
    },
    DingTalk: function () {
      return u.replace(/^.*DingTalk\/([\d.]+).*$/, '$1');
    },
    Huawei: function () {
      return u
        .replace(/^.*Version\/([\d.]+).*$/, '$1')
        .replace(/^.*HuaweiBrowser\/([\d.]+).*$/, '$1');
    },
  };

  let version = '';
  const check = VersionMap[browser];

  if (check) {
    version = check();
    if (u === version) {
      version = '';
    }
  }

  return version;
};
