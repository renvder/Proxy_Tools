const domesticNameservers = [
  "https://223.5.5.5/dns-query",
  "https://120.53.53.53/dns-query",
  "https://doh.pub/dns-query"
];

const foreignNameservers = [
  "https://1.1.1.1/dns-query#節點選擇",
  "https://8.8.8.8/dns-query#節點選擇",
  "https://208.67.222.222/dns-query#節點選擇"
];

const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": false,
  "prefer-h3": true,
  "respect-rules": true,
  "use-system-hosts": false,
  "use-hosts": true,
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
    "internal.corp"
  ],
  "default-nameserver": [
    "223.5.5.5",
    "120.53.53.53",
    "8.8.8.8"
  ],
  "nameserver": [...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers],
  "direct-nameserver": [...domesticNameservers],
  "direct-nameserver-follow-policy": false,
  "nameserver-policy": {
    "geosite:private,cn": [...domesticNameservers],
    "geosite:geolocation-!cn": [...foreignNameservers]
  }
};

const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};

const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyzw/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/zw/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/zw/apple.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/zw/google.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/zw/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/zw/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/zw/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/zw/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/zw/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/zw/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/zw/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/zw/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/zw/applications.yaml"
  },
  "bahamut": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Bahamut.txt",
    "path": "./ruleset/xiaolin-007/bahamut.yaml"
  },
  "YouTube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/YouTube.txt",
    "path": "./ruleset/xiaolin-007/YouTube.yaml"
  },
  "Netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Netflix.txt",
    "path": "./ruleset/xiaolin-007/Netflix.yaml"
  },
  "Spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Spotify.txt",
    "path": "./ruleset/xiaolin-007/Spotify.yaml"
  },
  "BilibiliHMT": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/BilibiliHMT.txt",
    "path": "./ruleset/xiaolin-007/BilibiliHMT.yaml"
  },
  "AI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/AI.txt",
    "path": "./ruleset/xiaolin-007/AI.yaml"
  },
  "TikTok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/TikTok.txt",
    "path": "./ruleset/xiaolin-007/TikTok.yaml"
  },
  "Steam": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Steam/Steam.yaml",
    "path": "./ruleset/blackmatrix7/steam.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml",
    "path": "./ruleset/blackmatrix7/microsoft.yaml"
  },
  "Blizzard": {
    ...ruleProviderCommon,
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
  "RULE-SET,microsoft,微软服務",
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
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  config["dns"] = dnsConfig;

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
      "proxies": ["全局直連", "節點選擇"],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/steam.svg"
    },
    {
      ...groupBaseOption,
      "name": "魔獸世界",
      "type": "select",
      "proxies": ["節點選擇", "全局直連"],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://upload.wikimedia.org/wikipedia/commons/e/eb/WoW_icon.svg"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服務",
      "type": "select",
      "proxies": ["節點選擇", "全局直連"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "YouTube",
      "type": "select",
      "proxies": ["節點選擇", "全局直連"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "Netflix",
      "type": "select",
      "proxies": ["節點選擇", "全局直連"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/netflix.svg"
    },
    {
      ...groupBaseOption,
      "name": "電報消息",
      "type": "select",
      "proxies": ["節點選擇", "全局直連"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "include-all": true,
      "proxies": ["節點選擇"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },
    {
      ...groupBaseOption,
      "name": "TikTok",
      "type": "select",
      "include-all": true,
      "proxies": ["節點選擇"],
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/tiktok.svg"
    },
    {
      ...groupBaseOption,
      "name": "微软服務",
      "type": "select",
      "proxies": ["全局直連", "節點選擇"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "蘋果服務",
      "type": "select",
      "proxies": ["節點選擇", "全局直連"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "動畫瘋",
      "type": "select",
      "proxies": ["節點選擇"],
      "include-all": true,
      "filter": "(?i)台|tw|TW",
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/Bahamut.svg"
    },
    {
      ...groupBaseOption,
      "name": "哔哩哔哩港澳台",
      "type": "select",
      "proxies": ["全局直連", "節點選擇"],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/bilibili.svg"
    },
    {
      ...groupBaseOption,
      "name": "Spotify",
      "type": "select",
      "proxies": ["節點選擇", "全局直連"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/spotify.svg"
    },
    {
      ...groupBaseOption,
      "name": "廣告過濾",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局直連",
      "type": "select",
      "proxies": ["DIRECT", "節點選擇"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "漏網之魚",
      "type": "select",
      "proxies": ["節點選擇", "全局直連"],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  if (config["proxies"]) {
    config["proxies"].forEach(proxy => {
      proxy.udp = true;
    });
  }

  return config;
}
