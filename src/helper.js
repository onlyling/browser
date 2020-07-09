/**
 * 是否是对应数据类型
 * @param {'Array'|'String'|'Object'|'Number'|'Boolean'} ty 数据类型
 * @returns {(v:any)=>boolean}
 */
const isTypeFactory = (ty) => {
  return (v) => {
    return Object.prototype.toString.call(v) === `[object ${ty}]`;
  };
};

/**
 * 是否是数组
 */
export const isArray = isTypeFactory('Array');

/**
 * 匹配对象
 * @typedef {Record<string, (u:string)=>boolean>} MatchMap
 */

/**
 * 构建 match
 * @param {[string, string[]?]} configs match 配置数组
 * @returns {[MatchMap, string[]]}
 */
export const buildMatchAndKeys = (configs = []) => {
  const mth = {};
  const keys = [];

  configs.forEach((item) => {
    const key = item[0];
    const match = item[1] || [key];

    keys.push(key);
    /**
     * 匹配函数
     * @param {string} u userAgent
     */
    mth[key] = (u) => match.some((kk) => u.indexOf(kk) > -1);
  });

  return [mth, keys];
};
