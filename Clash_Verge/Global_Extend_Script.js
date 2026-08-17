const secureNameservers = [
  "https://1.1.1.1/dns-query#節點選擇",
  "https://8.8.8.8/dns-query#節點選擇",
  "https://208.67.222.222/dns-query#節點選擇"
];

const bootstrapNameservers = [
  "223.5.5.5",
  "120.53.53.53"
];

const dnsConfig = {
  "enable": true,
  "listen": "127.0.0.1:1053",
  "ipv6": false,
  "prefer-h3": false,
  "respect-rules": true,
  "use-hosts": false,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter-mode": "blacklist",
  "fake-ip-filter": [
    "+.lan",
    "+.local",
    "+.arpa",
    "localhost",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    "www.msftconnecttest.com",
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    "localhost.work.weixin.qq.com",
    "time.*.com",
    "time.*.gov",
    "ntp.*.com",
    "pool.ntp.org",
    "+.market.xiaomi.com",
    "internal.corp",
    "connectivitycheck.gstatic.com",
    "connectivitycheck.android.com",
    "captive.apple.com",
    "www.apple.com"
  ],
  "default-nameserver": bootstrapNameservers,
  "nameserver": secureNameservers,
  "proxy-server-nameserver": bootstrapNameservers,
  "direct-nameserver": secureNameservers,
  "direct-nameserver-follow-policy": false
};

const tunConfig = {
  "enable": true,
  "stack": "mixed",
  "auto-route": true,
  "auto-detect-interface": true,
  "strict-route": true,
  "dns-hijack": [
    "any:53",
    "tcp://any:53"
  ],
  "mtu": 1500,
  "ipv6": false
};

const snifferConfig = {
  "enable": true,
  "sniff": {
    "TLS": {
      "ports": [
        443,
        8443
      ]
    },
    "HTTP": {
      "ports": [
        80,
        "8080-8880"
      ]
    },
    "QUIC": {
      "ports": [
        443,
        8443
      ]
    }
  },
  "force-dns-mapping": true,
  "parse-pure-ip": true
};

const geoxUrlConfig = {
  "geoip": "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",
  "geosite": "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
  "mmdb": "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"
};

const ruleProviderCommonText = {
  "type": "http",
  "format": "text",
  "interval": 86400,
  "proxy": "節點選擇"
};

const ruleProviderCommonYaml = {
  "type": "http",
  "format": "yaml",
  "interval": 86400,
  "proxy": "節點選擇"
};

const ruleProviders = {
  "reject": {
    ...ruleProviderCommonText,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.txt"
  },

  "icloud": {
    ...ruleProviderCommonText,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.txt"
  },

  "apple": {
    ...ruleProviderCommonText,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.txt"
  },

  "google": {
    ...ruleProviderCommonText,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/loyalsoldier/google.txt"
  },

  "proxy": {
    ...ruleProviderCommonText,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.txt"
  },

  "direct": {
    ...ruleProviderCommonText,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.txt"
  },

  "private": {
    ...ruleProviderCommonText,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.txt"
  },

  "gfw": {
    ...ruleProviderCommonText,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.txt"
  },

  "tld-not-cn": {
    ...ruleProviderCommonText,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.txt"
  },

  "telegramcidr": {
    ...ruleProviderCommonText,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.txt"
  },

  "cncidr": {
    ...ruleProviderCommonText,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.txt"
  },

  "lancidr": {
    ...ruleProviderCommonText,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.txt"
  },

  "applications": {
    ...ruleProviderCommonText,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.txt"
  },

  "bahamut": {
    ...ruleProviderCommonText,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Bahamut.txt",
    "path": "./ruleset/xiaolin-007/bahamut.txt"
  },

  "YouTube": {
    ...ruleProviderCommonText,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/YouTube.txt",
    "path": "./ruleset/xiaolin-007/youtube.txt"
  },

  "Netflix": {
    ...ruleProviderCommonText,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Netflix.txt",
    "path": "./ruleset/xiaolin-007/netflix.txt"
  },

  "Spotify": {
    ...ruleProviderCommonText,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Spotify.txt",
    "path": "./ruleset/xiaolin-007/spotify.txt"
  },

  "BilibiliHMT": {
    ...ruleProviderCommonText,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/BilibiliHMT.txt",
    "path": "./ruleset/xiaolin-007/bilibili-hmt.txt"
  },

  "AI": {
    ...ruleProviderCommonText,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/AI.txt",
    "path": "./ruleset/xiaolin-007/ai.txt"
  },

  "TikTok": {
    ...ruleProviderCommonText,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/TikTok.txt",
    "path": "./ruleset/xiaolin-007/tiktok.txt"
  },

  "Steam": {
    ...ruleProviderCommonYaml,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Steam/Steam.yaml",
    "path": "./ruleset/blackmatrix7/steam.yaml"
  },

  "Microsoft": {
    ...ruleProviderCommonYaml,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml",
    "path": "./ruleset/blackmatrix7/microsoft.yaml"
  },

  "Blizzard": {
    ...ruleProviderCommonYaml,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Blizzard/Blizzard.yaml",
    "path": "./ruleset/blackmatrix7/blizzard.yaml"
  }
};

const rules = [
  "DOMAIN-KEYWORD,adobe,REJECT",

  "PROCESS-NAME,steam.exe,Steam遊戲",
  "PROCESS-NAME,steamwebhelper.exe,Steam遊戲",
  "PROCESS-NAME,cs2.exe,Steam遊戲",
  "PROCESS-NAME,dota2.exe,Steam遊戲",

  "PROCESS-NAME,Wow.exe,魔獸世界",
  "PROCESS-NAME,WowClassic.exe,魔獸世界",
  "PROCESS-NAME,WowClassicT.exe,魔獸世界",
  "PROCESS-NAME,WowT.exe,魔獸世界",

  "DOMAIN-SUFFIX,googleapis.cn,節點選擇",
  "DOMAIN-SUFFIX,gstatic.com,節點選擇",
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,節點選擇",
  "DOMAIN-SUFFIX,github.io,節點選擇",
  "DOMAIN,v2rayse.com,節點選擇",

  "RULE-SET,Steam,Steam遊戲",
  "RULE-SET,Blizzard,魔獸世界",

  "RULE-SET,applications,全局直連",
  "RULE-SET,private,全局直連",

  "RULE-SET,reject,廣告過濾",

  "RULE-SET,icloud,蘋果服務",
  "RULE-SET,apple,蘋果服務",
  "RULE-SET,Microsoft,微软服務",

  "RULE-SET,YouTube,YouTube",
  "RULE-SET,Netflix,Netflix",
  "RULE-SET,bahamut,動畫瘋",
  "RULE-SET,Spotify,Spotify",
  "RULE-SET,BilibiliHMT,哔哩哔哩港澳台",
  "RULE-SET,AI,AI",
  "RULE-SET,TikTok,TikTok",

  "RULE-SET,google,谷歌服務",
  "RULE-SET,proxy,節點選擇",
  "RULE-SET,gfw,節點選擇",
  "RULE-SET,tld-not-cn,節點選擇",

  "RULE-SET,direct,全局直連",

  "RULE-SET,lancidr,全局直連,no-resolve",
  "RULE-SET,cncidr,全局直連,no-resolve",
  "RULE-SET,telegramcidr,電報消息,no-resolve",

  "GEOSITE,CN,全局直連",
  "GEOIP,LAN,全局直連,no-resolve",
  "GEOIP,CN,全局直連,no-resolve",

  "MATCH,漏網之魚"
];

const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

function main(config) {
  const proxyCount = Array.isArray(config?.proxies)
    ? config.proxies.length
    : 0;

  const proxyProviderCount =
    config?.["proxy-providers"] &&
    typeof config["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("No proxy or proxy-provider found in configuration");
  }

  config["mode"] = "rule";
  config["ipv6"] = false;
  config["allow-lan"] = false;
  config["bind-address"] = "127.0.0.1";
  config["log-level"] = "silent";

  config["dns"] = dnsConfig;
  config["tun"] = tunConfig;
  config["sniffer"] = snifferConfig;

  config["enable-process"] = true;
  config["find-process-mode"] = "strict";

  config["geodata-mode"] = true;
  config["geodata-loader"] = "standard";
  config["geo-auto-update"] = false;
  config["geo-update-interval"] = 24;
  config["geox-url"] = geoxUrlConfig;

  config["profile"] = {
    ...(config["profile"] || {}),
    "store-selected": true,
    "store-fake-ip": false
  };

  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "節點選擇",
      "type": "select",
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },

    {
      ...groupBaseOption,
      "name": "Steam遊戲",
      "type": "select",
      "proxies": [
        "節點選擇",
        "全局直連"
      ],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/steam.svg"
    },

    {
      ...groupBaseOption,
      "name": "魔獸世界",
      "type": "select",
      "proxies": [
        "節點選擇",
        "全局直連"
      ],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://upload.wikimedia.org/wikipedia/commons/e/eb/WoW_icon.svg"
    },

    {
      ...groupBaseOption,
      "name": "谷歌服務",
      "type": "select",
      "proxies": [
        "節點選擇"
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },

    {
      ...groupBaseOption,
      "name": "YouTube",
      "type": "select",
      "proxies": [
        "節點選擇"
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },

    {
      ...groupBaseOption,
      "name": "Netflix",
      "type": "select",
      "proxies": [
        "節點選擇"
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/netflix.svg"
    },

    {
      ...groupBaseOption,
      "name": "電報消息",
      "type": "select",
      "proxies": [
        "節點選擇"
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },

    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": [
        "節點選擇"
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },

    {
      ...groupBaseOption,
      "name": "TikTok",
      "type": "select",
      "proxies": [
        "節點選擇"
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/tiktok.svg"
    },

    {
      ...groupBaseOption,
      "name": "微软服務",
      "type": "select",
      "proxies": [
        "節點選擇",
        "全局直連"
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },

    {
      ...groupBaseOption,
      "name": "蘋果服務",
      "type": "select",
      "proxies": [
        "節點選擇",
        "全局直連"
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },

    {
      ...groupBaseOption,
      "name": "動畫瘋",
      "type": "select",
      "proxies": [
        "節點選擇"
      ],
      "include-all": true,
      "filter": "(?i)台|tw|TW",
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/Bahamut.svg"
    },

    {
      ...groupBaseOption,
      "name": "哔哩哔哩港澳台",
      "type": "select",
      "proxies": [
        "節點選擇",
        "全局直連"
      ],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/bilibili.svg"
    },

    {
      ...groupBaseOption,
      "name": "Spotify",
      "type": "select",
      "proxies": [
        "節點選擇"
      ],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/spotify.svg"
    },

    {
      ...groupBaseOption,
      "name": "廣告過濾",
      "type": "select",
      "proxies": [
        "REJECT",
        "DIRECT"
      ],
      "hidden": true
    },

    {
      ...groupBaseOption,
      "name": "全局直連",
      "type": "select",
      "proxies": [
        "DIRECT"
      ]
    },

    {
      ...groupBaseOption,
      "name": "漏網之魚",
      "type": "select",
      "proxies": [
        "節點選擇"
      ],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  if (Array.isArray(config["proxies"])) {
    config["proxies"].forEach(proxy => {
      proxy["udp"] = true;
    });
  }

  if (
    config["proxy-providers"] &&
    typeof config["proxy-providers"] === "object"
  ) {
    Object.values(config["proxy-providers"]).forEach(provider => {
      provider["override"] = {
        ...(provider["override"] || {}),
        "udp": true
      };
    });
  }

  return config;
}
