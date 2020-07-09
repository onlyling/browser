const Browser = require('../umd');

// Node.js 服务器端可以通过 http 请求头的 `User-Agent` 拿到一些信息

describe('Node.js 环境', () => {
  test('Mac Chrome ==> browser: Chrome; Device: PC; OS: Mac OS; osVersion: 10.15.5; version: 83.0.4103.116; engine: Blink;', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
    const info = Browser(userAgent);

    expect(info.browser).toBe('Chrome');
    expect(info.device).toBe('PC');
    expect(info.os).toBe('Mac OS');
    expect(info.osVersion).toBe('10.15.5');
    expect(info.version).toBe('83.0.4103.116');
    expect(info.engine).toBe('Blink');
  });

  test('Windows Chrome ==> browser: Chrome; Device: PC; OS: Windows; osVersion: 10.0; version: 78.0.3904.70; engine: Blink;', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36';
    const info = Browser(userAgent);

    expect(info.browser).toBe('Chrome');
    expect(info.device).toBe('PC');
    expect(info.os).toBe('Windows');
    expect(info.osVersion).toBe('10.0');
    expect(info.version).toBe('78.0.3904.70');
    expect(info.engine).toBe('Blink');
  });

  test('Mac Safari ==> browser: Safari; Device: PC; OS: Mac OS; osVersion: 10.15.5; version: 13.1.1; engine: WebKit;', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15';
    const info = Browser(userAgent);

    expect(info.browser).toBe('Safari');
    expect(info.device).toBe('PC');
    expect(info.os).toBe('Mac OS');
    expect(info.osVersion).toBe('10.15.5');
    expect(info.version).toBe('13.1.1');
    expect(info.engine).toBe('WebKit');
  });

  test('iPhone 8 Safari ==> browser: Safari; Device: Mobile; OS: iOS; osVersion: 13.1.3; version: 13.0.1; engine: WebKit;', () => {
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1';
    const info = Browser(userAgent);

    expect(info.browser).toBe('Safari');
    expect(info.device).toBe('Mobile');
    expect(info.os).toBe('iOS');
    expect(info.osVersion).toBe('13.1.3');
    expect(info.version).toBe('13.0.1');
    expect(info.engine).toBe('WebKit');
  });

  test('iPad mini Safari ==> browser: Safari; Device: Tablet; OS: iOS; osVersion: 13.1.3; version: 13.0.1; engine: WebKit;', () => {
    const userAgent =
      'Mozilla/5.0 (iPad; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1';
    const info = Browser(userAgent);

    expect(info.browser).toBe('Safari');
    expect(info.device).toBe('Tablet');
    expect(info.os).toBe('iOS');
    expect(info.osVersion).toBe('13.1.3');
    expect(info.version).toBe('13.0.1');
    expect(info.engine).toBe('WebKit');
  });

  test('Meizu 16th Flyme 8.1.0.0.A browser ==> browser: MZBrowser; Device: Mobile; OS: Android; osVersion: 8.1.0; version: 8.12.1; engine: Blink;', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-CN; MZ-16th Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.97 MZBrowser/8.12.1 Mobile Safari/537.36';
    const info = Browser(userAgent);

    expect(info.browser).toBe('MZBrowser');
    expect(info.device).toBe('Mobile');
    expect(info.os).toBe('Android');
    expect(info.osVersion).toBe('8.1.0');
    expect(info.version).toBe('8.12.1');
    expect(info.engine).toBe('Blink');
  });

  test('Meizu 16th Flyme 8.1.0.0.A UC ==> browser: UC; Device: Mobile; OS: Android; osVersion: 8.1.0; version: 13.0.4.1084; engine: Blink;', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-CN; 16th Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 UCBrowser/13.0.4.1084 Mobile Safari/537.36';
    const info = Browser(userAgent);

    expect(info.browser).toBe('UC');
    expect(info.device).toBe('Mobile');
    expect(info.os).toBe('Android');
    expect(info.osVersion).toBe('8.1.0');
    expect(info.version).toBe('13.0.4.1084');
    expect(info.engine).toBe('Blink');
  });

  test('Meizu 16th Flyme 8.1.0.0.A WeChat ==> browser: WeChat; Device: Mobile; OS: Android; osVersion: 8.1.0; version: 7.0.16.1700; engine: Blink;', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; Android 8.1.0; 16th Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36 MMWEBID/2754 MicroMessenger/7.0.16.1700(0x27001039) Process/tools WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64';
    const info = Browser(userAgent);

    expect(info.browser).toBe('WeChat');
    expect(info.device).toBe('Mobile');
    expect(info.os).toBe('Android');
    expect(info.osVersion).toBe('8.1.0');
    expect(info.version).toBe('7.0.16.1700');
    expect(info.engine).toBe('Blink');
  });
});
