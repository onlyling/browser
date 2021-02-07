const buildMatchAndKeys = (configs) => {
    const mth = {};
    const keys = [];
    configs.forEach((item) => {
        const key = item[0];
        const match = item[1] || [key];
        keys.push(key);
        mth[key] = (u) => match.some((kk) => u.indexOf(kk) > -1);
    });
    return [mth, keys];
};
const getChromeVision = (u) => u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
const getGlobalWindow = () => {
    let win;
    if (typeof window !== 'undefined') {
        win = window;
    }
    else if (typeof global !== 'undefined') {
        win = global;
    }
    else if (typeof self !== 'undefined') {
        win = self;
    }
    else {
        win = {};
    }
    return win;
};

const configs = [
    ['Trident', ['Trident', 'NET CLR']],
    ['Presto'],
    ['WebKit', ['AppleWebKit']],
    ['Gecko', ['Gecko/']],
    ['KHTML', ['KHTML/']],
];
const MatchAndKeys = buildMatchAndKeys(configs);
const EngineMatchMap = MatchAndKeys[0];
const Enginekeys = MatchAndKeys[1];

const configs$1 = [
    ['Windows'],
    ['Linux', ['Linux', 'X11']],
    ['Mac OS', ['Macintosh']],
    ['Android', ['Android', 'Adr']],
    ['Ubuntu'],
    ['FreeBSD'],
    ['Debian'],
    ['Windows Phone', ['IEMobile', 'Windows Phone']],
    ['BlackBerry', ['BlackBerry', 'RIM']],
    ['MeeGo'],
    ['Symbian'],
    ['iOS', ['like Mac OS X']],
    ['Chrome OS', ['CrOS']],
    ['WebOS', ['hpwOS']],
];
const MatchAndKeys$1 = buildMatchAndKeys(configs$1);
const OSMatchMap = MatchAndKeys$1[0];
const OSkeys = MatchAndKeys$1[1];
const OSVersionMap = {
    Windows: function (u) {
        const v = u.replace(/^Mozilla\/\d.0 \(Windows NT ([\d.]+);.*$/, '$1');
        const hash = {
            '10': '10',
            '6.4': '10',
            '6.3': '8.1',
            '6.2': '8',
            '6.1': '7',
            '6.0': 'Vista',
            '5.2': 'XP',
            '5.1': 'XP',
            '5.0': '2000',
        };
        return hash[v] || v;
    },
    Android: function (u) {
        return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
    },
    iOS: function (u) {
        return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
    },
    Debian: function (u) {
        return u.replace(/^.*Debian\/([\d.]+).*$/, '$1');
    },
    'Windows Phone': function (u) {
        return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2');
    },
    'Mac OS': function (u) {
        return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
    },
    WebOS: function (u) {
        return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1');
    },
};
const getOSVersion = (userAgent, OSStr) => {
    let osVersion = '';
    const check = OSVersionMap[OSStr];
    if (check) {
        osVersion = check(userAgent);
        if (userAgent === osVersion) {
            osVersion = '';
        }
    }
    return osVersion;
};

const configs$2 = [
    ['Mobile', ['Mobi', 'iPh', '480']],
    ['Tablet', ['Tablet', 'Pad', 'Nexus 7']],
];
const MatchAndKeys$2 = buildMatchAndKeys(configs$2);
const DeviceMatchMap = MatchAndKeys$2[0];
const Devicekeys = MatchAndKeys$2[1];

const configs$3 = [
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
const MatchAndKeys$3 = buildMatchAndKeys(configs$3);
const BrowserMatchMap = MatchAndKeys$3[0];
const Browserkeys = MatchAndKeys$3[1];

const HashKey = {
    engine: Enginekeys,
    browser: Browserkeys,
    os: OSkeys,
    device: Devicekeys,
};
const MatchMap = Object.assign(Object.assign(Object.assign(Object.assign({}, EngineMatchMap), OSMatchMap), DeviceMatchMap), BrowserMatchMap);
const buildMatch = (ua, win, nav) => {
    const Match = {};
    Object.keys(MatchMap).forEach((key) => {
        const matchFN = MatchMap[key];
        Match[key] = matchFN(ua);
    });
    const mime = function (option, value) {
        const { mimeTypes } = nav;
        for (const mt in mimeTypes) {
            const mimeType = mimeTypes[mt];
            if (mimeType && mimeType[option] === value) {
                return true;
            }
        }
        return false;
    };
    let is360 = false;
    if (win.chrome) {
        const chrome_vision = +getChromeVision(ua);
        if (win.chrome.adblock2345 || win.chrome.common2345) {
            Match['2345Explorer'] = true;
        }
        else if (mime('type', 'application/360softmgrplugin') ||
            mime('type', 'application/mozilla-npqihooquicklogin') ||
            (chrome_vision > 36 && win.showModalDialog)) {
            is360 = true;
        }
        else if (chrome_vision > 45) {
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
    }
    else if (is360) {
        if (mime('type', 'application/gameplugin')) {
            Match['360SE'] = true;
        }
        else if (nav &&
            typeof nav['connection'] !== 'undefined' &&
            typeof nav['connection']['saveData'] == 'undefined') {
            Match['360SE'] = true;
        }
        else {
            Match['360EE'] = true;
        }
    }
    if (Match['IE'] || Match['Edge']) {
        const navigator_top = win.screenTop - win.screenY;
        switch (navigator_top) {
            case 71:
            case 99:
            case 102:
                Match['360EE'] = true;
                break;
            case 75:
            case 105:
            case 104:
                Match['360SE'] = true;
                break;
        }
    }
    if (Match['Baidu'] && Match['Opera']) {
        Match['Baidu'] = false;
    }
    else if (Match['iOS']) {
        Match['Safari'] = true;
    }
    return Match;
};

const getLanguage = (nav) => {
    const language = nav.browserLanguage || nav.language || '';
    const languages = language.split('-');
    if (languages[1]) {
        languages[1] = languages[1].toUpperCase();
    }
    return languages.join('_');
};

const getVersion = (u, browser) => {
    const VersionMap = {
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
            const hash = {
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
            const hash = {
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
            const hash = {
                '57': '6.5',
                '49': '6.0',
                '46': '5.9',
                '42': '5.3',
                '39': '5.2',
                '34': '5.0',
                '29': '4.5',
                '21': '4.0',
            };
            const chrome_vision = getChromeVision(u);
            return hash[chrome_vision] || '';
        },
        '2345Explorer': function () {
            const hash = { '69': '10.0', '55': '9.9' };
            const chrome_vision = getChromeVision(u);
            return (hash[chrome_vision] ||
                u
                    .replace(/^.*2345Explorer\/([\d.]+).*$/, '$1')
                    .replace(/^.*Mb2345Browser\/([\d.]+).*$/, '$1'));
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

const Browser = (ua = '') => {
    const win = getGlobalWindow();
    const nav = win.navigator || {};
    const userAgent = ua || nav.userAgent || '';
    const info = {
        browser: '',
        version: '',
        engine: '',
        os: '',
        osVersion: '',
        device: 'PC',
        language: getLanguage(nav),
    };
    const Match = buildMatch(userAgent, win, nav);
    Object.keys(HashKey).forEach((tp) => {
        const keys = HashKey[tp];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = Match[key];
            if (value) {
                info[tp] = key;
            }
        }
    });
    info.osVersion = getOSVersion(userAgent, info.os);
    info.version = getVersion(userAgent, info.browser);
    if (info.browser === 'Chrome' && userAgent.match(/\S+Browser/)) {
        info.browser = (userAgent.match(/\S+Browser/) || [])[0] || '';
        info.version = userAgent.replace(/^.*Browser\/([\d.]+).*$/, '$1');
    }
    if (info.browser === 'Edge') {
        if (info.version > '75') {
            info.engine = 'Blink';
        }
        else {
            info.engine = 'EdgeHTML';
        }
    }
    else if (Match['Chrome'] &&
        info.engine === 'WebKit' &&
        parseInt(getVersion(userAgent, 'Chrome')) > 27) {
        info.engine = 'Blink';
    }
    else if (info.browser == 'Opera' && parseInt(info.version) > 12) {
        info.engine = 'Blink';
    }
    else if (info.browser == 'Yandex') {
        info.engine = 'Blink';
    }
    return info;
};

export default Browser;
