export interface Country {
  name: string;
  slug: string;
  flag: string;
  code: string;
  group: string;
}

export const COUNTRIES: Country[] = [
  { name: "Brazil", slug: "brazil", flag: "🇧🇷", code: "BRA", group: "A" },
  { name: "Argentina", slug: "argentina", flag: "🇦🇷", code: "ARG", group: "A" },
  { name: "France", slug: "france", flag: "🇫🇷", code: "FRA", group: "A" },
  { name: "England", slug: "england", flag: "🏴", code: "ENG", group: "A" },
  { name: "Germany", slug: "germany", flag: "🇩🇪", code: "GER", group: "B" },
  { name: "Spain", slug: "spain", flag: "🇪🇸", code: "ESP", group: "B" },
  { name: "Portugal", slug: "portugal", flag: "🇵🇹", code: "POR", group: "B" },
  { name: "Morocco", slug: "morocco", flag: "🇲🇦", code: "MAR", group: "B" },
  { name: "USA", slug: "usa", flag: "🇺🇸", code: "USA", group: "C" },
  { name: "Mexico", slug: "mexico", flag: "🇲🇽", code: "MEX", group: "C" },
  { name: "Japan", slug: "japan", flag: "🇯🇵", code: "JPN", group: "C" },
  { name: "South Korea", slug: "south-korea", flag: "🇰🇷", code: "KOR", group: "C" },
  { name: "Netherlands", slug: "netherlands", flag: "🇳🇱", code: "NED", group: "D" },
  { name: "Canada", slug: "canada", flag: "🇨🇦", code: "CAN", group: "D" },
  { name: "Senegal", slug: "senegal", flag: "🇸🇳", code: "SEN", group: "D" },
  { name: "Uruguay", slug: "uruguay", flag: "🇺🇾", code: "URU", group: "D" },
  { name: "Colombia", slug: "colombia", flag: "🇨🇴", code: "COL", group: "E" },
  { name: "Australia", slug: "australia", flag: "🇦🇺", code: "AUS", group: "E" },
  { name: "Nigeria", slug: "nigeria", flag: "🇳🇬", code: "NGA", group: "E" },
  { name: "Cameroon", slug: "cameroon", flag: "🇨🇲", code: "CMR", group: "E" },
  { name: "South Africa", slug: "south-africa", flag: "🇿🇦", code: "RSA", group: "F" },
  { name: "Belgium", slug: "belgium", flag: "🇧🇪", code: "BEL", group: "F" },
  { name: "Ecuador", slug: "ecuador", flag: "🇪🇨", code: "ECU", group: "F" },
  { name: "Switzerland", slug: "switzerland", flag: "🇨🇭", code: "SUI", group: "F" },
  { name: "Croatia", slug: "croatia", flag: "🇭🇷", code: "CRO", group: "G" },
  { name: "Serbia", slug: "serbia", flag: "🇷🇸", code: "SRB", group: "G" },
  { name: "Poland", slug: "poland", flag: "🇵🇱", code: "POL", group: "G" },
  { name: "Iran", slug: "iran", flag: "🇮🇷", code: "IRN", group: "G" },
  { name: "Saudi Arabia", slug: "saudi-arabia", flag: "🇸🇦", code: "KSA", group: "H" },
  { name: "Tunisia", slug: "tunisia", flag: "🇹🇳", code: "TUN", group: "H" },
  { name: "Mali", slug: "mali", flag: "🇲🇱", code: "MLI", group: "H" },
  { name: "Peru", slug: "peru", flag: "🇵🇪", code: "PER", group: "H" },
  { name: "Venezuela", slug: "venezuela", flag: "🇻🇪", code: "VEN", group: "I" },
  { name: "Honduras", slug: "honduras", flag: "🇭🇳", code: "HON", group: "I" },
  { name: "Costa Rica", slug: "costa-rica", flag: "🇨🇷", code: "CRC", group: "I" },
  { name: "Panama", slug: "panama", flag: "🇵🇦", code: "PAN", group: "I" },
  { name: "Jamaica", slug: "jamaica", flag: "🇯🇲", code: "JAM", group: "J" },
  { name: "Bolivia", slug: "bolivia", flag: "🇧🇴", code: "BOL", group: "J" },
  { name: "Paraguay", slug: "paraguay", flag: "🇵🇾", code: "PAR", group: "J" },
  { name: "Bosnia", slug: "bosnia", flag: "🇧🇦", code: "BIH", group: "J" },
  { name: "New Zealand", slug: "new-zealand", flag: "🇳🇿", code: "NZL", group: "K" },
  { name: "Slovenia", slug: "slovenia", flag: "🇸🇮", code: "SVN", group: "K" },
  { name: "Chile", slug: "chile", flag: "🇨🇱", code: "CHI", group: "K" },
  { name: "Albania", slug: "albania", flag: "🇦🇱", code: "ALB", group: "K" },
  { name: "Ukraine", slug: "ukraine", flag: "🇺🇦", code: "UKR", group: "L" },
  { name: "Curaçao", slug: "curacao", flag: "🏳️", code: "CUW", group: "L" },
  { name: "Suriname", slug: "suriname", flag: "🇸🇷", code: "SUR", group: "L" },
  { name: "New Caledonia", slug: "new-caledonia", flag: "🏳️", code: "NCL", group: "L" }
];

// Deduplicate and fix compile issues (e.g. double slug keys)
const cleanedCountries: Country[] = [];
const seenSlugs = new Set<string>();
for (const c of COUNTRIES) {
  if (!seenSlugs.has(c.slug)) {
    seenSlugs.add(c.slug);
    cleanedCountries.push(c);
  }
}
export { cleanedCountries as countries };

export const isWorldCupActive = (): boolean => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("wcTest") === "true") return true;
  }
  const now = new Date();
  const year = now.getFullYear();
  if (year !== 2026) return false;
  // June is month 5, July is month 6 (0-indexed)
  // June 7 to July 19
  const start = new Date(2026, 5, 7, 0, 0, 0);
  const end = new Date(2026, 6, 19, 23, 59, 59);
  return now >= start && now <= end;
};

export interface MatchInfo {
  homeTeam: Country;
  awayTeam: Country;
  kickoffTime: Date;
  status: "live" | "upcoming" | "none";
}

/**
 * Deterministically get a match for a team based on the date.
 * Every team has 1 match every day during the tournament.
 * Kickoff is scheduled at 20:00 (8:00 PM) daily.
 */
export const getMatchForTeam = (teamSlug: string, dateInput?: Date): MatchInfo => {
  const date = dateInput || new Date();
  const team = cleanedCountries.find((c) => c.slug === teamSlug);
  if (!team) {
    throw new Error(`Country not found for slug: ${teamSlug}`);
  }

  // Find other teams in the same group
  const groupTeams = cleanedCountries.filter((c) => c.group === team.group);
  const myIndex = groupTeams.findIndex((c) => c.slug === teamSlug);

  // Group size is 4. Let's find our opponent deterministically based on the day of the year
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Determine opponent based on dayOfYear rotation
  // cycle: 0 -> 0 vs 1, 2 vs 3
  // cycle: 1 -> 0 vs 2, 1 vs 3
  // cycle: 2 -> 0 vs 3, 1 vs 2
  const cycle = dayOfYear % 3;
  let opponentIndex = 0;
  if (cycle === 0) {
    opponentIndex = myIndex % 2 === 0 ? myIndex + 1 : myIndex - 1;
  } else if (cycle === 1) {
    opponentIndex = myIndex < 2 ? myIndex + 2 : myIndex - 2;
  } else {
    opponentIndex = myIndex === 0 ? 3 : myIndex === 3 ? 0 : myIndex === 1 ? 2 : 1;
  }

  const opponent = groupTeams[opponentIndex] || groupTeams[(myIndex + 1) % groupTeams.length];

  // Set kickoff time for today at 20:00 (8:00 PM) local time
  const kickoffToday = new Date(date);
  kickoffToday.setHours(20, 0, 0, 0);

  const kickoffTomorrow = new Date(kickoffToday);
  kickoffTomorrow.setDate(kickoffTomorrow.getDate() + 1);

  const kickoffYesterday = new Date(kickoffToday);
  kickoffYesterday.setDate(kickoffYesterday.getDate() - 1);

  // Decide which match is closest.
  // If the user visits before today's match ends (e.g. before 22:30 today):
  // today's match is either upcoming or live.
  // Otherwise, the next match is tomorrow's.
  let kickoffTime = kickoffToday;
  const matchDurationMs = 2.5 * 60 * 60 * 1000; // 2.5 hours
  if (date.getTime() > kickoffToday.getTime() + matchDurationMs) {
    kickoffTime = kickoffTomorrow;
  } else if (date.getTime() < kickoffYesterday.getTime() + matchDurationMs) {
    // Edge case if current time is very early morning and yesterday's match was recent,
    // but usually we just look forward.
  }

  // Calculate status
  const timeDiffMs = kickoffTime.getTime() - date.getTime();
  let status: "live" | "upcoming" | "none" = "none";

  // Live window: from kickoff until 2.5 hours later
  const isCurrentlyLive = date.getTime() >= kickoffTime.getTime() && date.getTime() <= kickoffTime.getTime() + matchDurationMs;

  if (isCurrentlyLive) {
    status = "live";
  } else if (timeDiffMs > 0 && timeDiffMs <= 24 * 60 * 60 * 1000) {
    status = "upcoming";
  }

  // Decide Home and Away (arbitrary based on index)
  const isHome = myIndex < opponentIndex;

  return {
    homeTeam: isHome ? team : opponent,
    awayTeam: isHome ? opponent : team,
    kickoffTime,
    status
  };
};

export const getFlagUrl = (code: string): string => {
  const codeLower = code.toLowerCase();
  const mapping: Record<string, string> = {
    bra: "br",
    arg: "ar",
    fra: "fr",
    eng: "gb-eng", // England
    ger: "de",
    esp: "es",
    por: "pt",
    mar: "ma",
    usa: "us",
    mex: "mx",
    jpn: "jp",
    kor: "kr",
    ned: "nl",
    can: "ca",
    sen: "sn",
    uru: "uy",
    col: "co",
    aus: "au",
    nga: "ng",
    cmr: "cm",
    rsa: "za",
    bel: "be",
    ecu: "ec",
    sui: "ch",
    cro: "hr",
    srb: "rs",
    pol: "pl",
    irn: "ir",
    ksa: "sa",
    tun: "tn",
    mli: "ml",
    per: "pe",
    ven: "ve",
    hon: "hn",
    crc: "cr",
    pan: "pa",
    jam: "jm",
    bol: "bo",
    par: "py",
    bih: "ba",
    nzl: "nz",
    svn: "si",
    chi: "cl",
    alb: "al",
    ukr: "ua",
    cuw: "cw",
    sur: "sr",
    ncl: "nc"
  };
  const flag2Letter = mapping[codeLower] || "un";
  return `https://flagcdn.com/w160/${flag2Letter}.png`;
};

export interface TeamTheme {
  gradient: string;
  glow: string;
  borderColor: string;
  chants: string[];
}

export const getTeamTheme = (slug: string): TeamTheme => {
  const defaultTheme: TeamTheme = {
    gradient: "from-primary/10 to-transparent",
    glow: "rgba(124, 58, 237, 0.1)",
    borderColor: "border-primary/20",
    chants: [
      "Let's go guys! ⚽",
      "We can win this!",
      "VAMOS!",
      "Defense, stay tight!",
      "Next goal wins it all!"
    ]
  };

  const themes: Record<string, Partial<TeamTheme>> = {
    brazil: {
      gradient: "from-green-600/15 via-yellow-600/5 to-transparent",
      glow: "rgba(34, 197, 94, 0.15)",
      borderColor: "border-green-500/30",
      chants: [
        "VAMOS BRASIL! 🇧🇷💚💛",
        "Joga bonito is alive!",
        "Hexa is coming this year!",
        "Goal of the tournament incoming!",
        "VAI BRASIL!"
      ]
    },
    argentina: {
      gradient: "from-cyan-500/15 via-white/5 to-transparent",
      glow: "rgba(6, 182, 212, 0.15)",
      borderColor: "border-cyan-400/30",
      chants: [
        "VAMOS ARGENTINA! 🇦🇷💙",
        "Muchachooos, ahora nos volvimos a ilusionar!",
        "Messi the absolute GOAT 🐐⚽",
        "VAMOS ALBICLESTE!",
        "Que partidazo por favor!"
      ]
    },
    usa: {
      gradient: "from-blue-600/15 via-red-600/5 to-transparent",
      glow: "rgba(59, 130, 246, 0.15)",
      borderColor: "border-blue-500/30",
      chants: [
        "USA! USA! 🇺🇸❤️💙",
        "I believe that we will win! 🗣️",
        "Let's go Yanks!",
        "Pulisic with the masterclass!",
        "We are playing soccer now boys!"
      ]
    },
    england: {
      gradient: "from-red-600/15 via-white/5 to-transparent",
      glow: "rgba(239, 68, 68, 0.12)",
      borderColor: "border-red-500/30",
      chants: [
        "ITS COMING HOME! 🏴🦁🦁🦁",
        "Come on England!",
        "Three Lions on our chest!",
        "What a tackle, solid defense!",
        "Football is coming home!"
      ]
    },
    france: {
      gradient: "from-blue-700/15 via-red-600/5 to-transparent",
      glow: "rgba(29, 78, 216, 0.15)",
      borderColor: "border-blue-600/30",
      chants: [
        "ALLEZ LES BLEUS! 🇫🇷💪",
        "Mbappe is unstoppable today!",
        "Vive la France!",
        "Magnifique goal, absolute class!",
        "Allez, on lâche rien!"
      ]
    },
    germany: {
      gradient: "from-yellow-600/15 via-red-600/5 to-transparent",
      glow: "rgba(234, 179, 8, 0.12)",
      borderColor: "border-yellow-500/30",
      chants: [
        "AUF GEHT'S DEUTSCHLAND! 🇩🇪🇩🇪",
        "Tor! Tor! Tor!",
        "Classic German structure!",
        "So efficient today!",
        "Weiter so!"
      ]
    },
    spain: {
      gradient: "from-red-600/15 via-yellow-500/5 to-transparent",
      glow: "rgba(220, 38, 38, 0.15)",
      borderColor: "border-red-500/30",
      chants: [
        "VAMOS ESPAÑA! 🇪🇸❤️💛",
        "Tiki Taka is in full effect!",
        "Que golazo madre mía!",
        "A por ellos, oé!",
        "Fútbol champagne!"
      ]
    },
    portugal: {
      gradient: "from-red-600/15 via-green-600/5 to-transparent",
      glow: "rgba(220, 38, 38, 0.15)",
      borderColor: "border-red-500/30",
      chants: [
        "FORÇA PORTUGAL! 🇵🇹❤️💚",
        "SIUUUUUU! 🐐",
        "Bora lá rapazes!",
        "What a strike, world-class!",
        "PORTUGAL! PORTUGAL!"
      ]
    },
    mexico: {
      gradient: "from-green-600/15 via-red-600/5 to-transparent",
      glow: "rgba(22, 163, 74, 0.15)",
      borderColor: "border-green-600/30",
      chants: [
        "VIVA MÉXICO! 🇲🇽💚❤️",
        "Canta y no llores!",
        "El Chucky Lozanooo!",
        "Sí se puede, sí se puede!",
        "Puro fútbol mexicano!"
      ]
    },
    japan: {
      gradient: "from-blue-600/15 via-white/5 to-transparent",
      glow: "rgba(37, 99, 235, 0.15)",
      borderColor: "border-blue-500/30",
      chants: [
        "NIPPON GANBARE! 🇯🇵⚽",
        "Samurai Blue is cooking!",
        "Such a polite and tactical game!",
        "Let's win this!",
        "NIPPON! NIPPON!"
      ]
    }
  };

  const selectedTheme = themes[slug] || {};
  return {
    gradient: selectedTheme.gradient || defaultTheme.gradient,
    glow: selectedTheme.glow || defaultTheme.glow,
    borderColor: selectedTheme.borderColor || defaultTheme.borderColor,
    chants: selectedTheme.chants || defaultTheme.chants
  };
};
