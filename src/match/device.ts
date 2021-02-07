import { buildMatchAndKeys, BuildMatchAndKeysConfig } from '../helper';

/** 浏览器内核配置 */
const configs: BuildMatchAndKeysConfig[] = [
  ['Mobile', ['Mobi', 'iPh', '480']],
  ['Tablet', ['Tablet', 'Pad', 'Nexus 7']],
];

const MatchAndKeys = buildMatchAndKeys(configs);

/** 浏览器内核匹配集合 */
export const DeviceMatchMap = MatchAndKeys[0];

/** 浏览器内核类型集合 */
export const Devicekeys = MatchAndKeys[1];
