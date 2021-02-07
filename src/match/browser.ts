import { buildMatchAndKeys, BuildMatchAndKeysConfig } from '../helper';

/** 浏览器内核配置 */
const configs: BuildMatchAndKeysConfig[] = [
  ['Safari'],
  ['Chrome', ['Chrome', 'CriOS']],
  ['IE', ['MSIE', 'Trident']],
  ['Edge', ['Edge', 'Edg/']],
  ['Firefox', ['Firefox', 'FxiOS']],
  ['Firefox Focus', ['Focus']],
  ['Chromium'],
  ['Opera', ['Opera', 'OPR']],
  ['Vivaldi'],
  ['Yandex', ['YaBrowser']],
  ['Arora'],
  ['Lunascape'],
  ['QupZilla'],
  ['Coc Coc', ['coc_coc_browser']],
  ['Kindle', ['Kindle', 'Silk/']],
  ['Iceweasel'],
  ['Konqueror'],
  ['Iceape'],
  ['SeaMonkey'],
  ['Epiphany'],
  ['360', ['QihooBrowser', 'QHBrowser']],
  ['360EE'],
  ['360SE'],
  ['UC', ['UC', ' UBrowser']],
  ['QQBrowser'],
  ['QQ', ['QQ/']],
  ['Baidu', ['Baidu', 'BIDUBrowser', 'baiduboxapp']],
  ['Maxthon'],
  ['Sogou', ['Sogou', 'MetaSr']],
  ['LBBROWSER'],
  ['2345Explorer', ['2345Explorer', 'Mb2345Browser']],
  ['115Browser'],
  ['TheWorld'],
  ['XiaoMi', ['MiuiBrowser']],
  ['Quark'],
  ['Qiyu'],
  ['WeChat', ['MicroMessenger']],
  ['Taobao', ['AliApp(TB']],
  ['Alipay', ['AliApp(AP']],
  ['Weibo'],
  ['Douban', ['com.douban.frodo']],
  ['Suning', ['SNEBUY-APP']],
  ['iQiYi', ['IqiyiApp']],
  ['DingTalk'],
  ['Huawei', ['HuaweiBrowser', 'HUAWEI']],
  ['Vivo', ['VivoBrowser']],
];

const MatchAndKeys = buildMatchAndKeys(configs);

/** 浏览器内核匹配集合 */
export const BrowserMatchMap = MatchAndKeys[0];

/** 浏览器内核类型集合 */
export const Browserkeys = MatchAndKeys[1];
