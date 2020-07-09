import { buildMatchAndKeys } from '../helper';

/** 浏览器内核配置 */
const configs = [
  ['Trident', ['Trident', 'NET CLR']],
  ['Presto'],
  ['WebKit', ['AppleWebKit']],
  ['Gecko', ['Gecko/']],
  ['KHTML', ['KHTML/']],
];

const MatchAndKeys = buildMatchAndKeys(configs);

/** 浏览器内核匹配集合 */
export const EngineMatchMap = MatchAndKeys[0];

/** 浏览器内核类型集合 */
export const Enginekeys = MatchAndKeys[1];
