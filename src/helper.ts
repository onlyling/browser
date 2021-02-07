/**
 * 是否是对应数据类型
 * @param ty 数据类型
 */
const isTypeFactory = (ty: 'Array' | 'String' | 'Object' | 'Number' | 'Boolean') => {
  return (v: unknown) => {
    return Object.prototype.toString.call(v) === `[object ${ty}]`;
  };
};

/**
 * 是否是数组
 */
export const isArray = isTypeFactory('Array');

export type BuildMatchAndKeysConfig = [string, string[]?];

type MatchMap = Record<string, (u: string) => boolean>;

/**
 * 构建 match
 * @param configs match 配置数组
 */
export const buildMatchAndKeys = (configs: BuildMatchAndKeysConfig[]): [MatchMap, string[]] => {
  const mth: MatchMap = {};
  const keys: string[] = [];

  configs.forEach((item) => {
    const key = item[0];
    const match = item[1] || [key];

    keys.push(key);

    mth[key] = (u: string) => match.some((kk) => u.indexOf(kk) > -1);
  });

  return [mth, keys];
};

/**
 * 获取 Chrome 版本号
 * @param u userAgent
 */
export const getChromeVision = (u: string) => u.replace(/^.*Chrome\/([\d]+).*$/, '$1');

/**
 * 获取 Window 对象
 */
export const getGlobalWindow = () => {
  let win;

  if (typeof window !== 'undefined') {
    win = window;
  } else if (typeof global !== 'undefined') {
    win = global;
  } else if (typeof self !== 'undefined') {
    win = self;
  } else {
    win = {};
  }

  return win as Window;
};
