import { buildMatchAndKeys } from '../helper';

/** 浏览器内核配置 */
const configs = [
  ['Mobile', ['Mobi', 'iPh', '480']],
  ['Tablet', ['Tablet', 'Pad', 'Nexus 7']],
];

const MatchAndKeys = buildMatchAndKeys(configs);

/** 浏览器内核匹配集合 */
export const DeviceMatchMap = MatchAndKeys[0];

/** 浏览器内核类型集合 */
export const Devicekeys = MatchAndKeys[1];
