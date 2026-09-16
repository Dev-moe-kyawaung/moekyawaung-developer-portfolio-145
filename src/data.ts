export const profile = {
  name: "Moe Kyaw Aung",
  nameMM: "မိုးကျော်အောင်",
  code: "MKA.Q10",
  role: "Senior Android Architect",
  role2: "Technical Founder",
  location: "Tachileik, MM ↔ Bangkok, TH",
  email: "moekyawaung@programmer.net",
  phones: ["+95 9 889 000 889", "+95 9 666 000 050"],
  github: "https://github.com/Dev-moe-kyawaung",
  gravatar: "https://gravatar.com/moekyawaung2026",
  avatar: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
  portrait: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
  building: "MoekyawTranslator — on-device AI",
  mantra: "Code with culture. Build with purpose.",
};

export type Dim = { d: string; name: string; sub: string; color: string; target: string };

export const dims: Dim[] = [
  { d: "D1", name: "GENESIS", sub: "origin story", color: "#00f5ff", target: "d1" },
  { d: "D2", name: "CRAFT", sub: "skills & craft", color: "#c4a6ff", target: "d2" },
  { d: "D3", name: "SYSTEMS", sub: "42-module graph", color: "#a855f7", target: "d3" },
  { d: "D4", name: "PRODUCTS", sub: "43 shipped apps", color: "#ff2bd6", target: "d4" },
  { d: "D5", name: "IMPACT", sub: "10M+ measured users", color: "#b6ff2e", target: "d5" },
  { d: "D6", name: "NEURAL", sub: "on-device AI", color: "#00f5ff", target: "d6" },
  { d: "D7", name: "FORTRESS", sub: "OWASP MASVS L2", color: "#ff4d6d", target: "d7" },
  { d: "D8", name: "VELOCITY", sub: "620ms P90 cold start", color: "#ffb020", target: "d8" },
  { d: "D9", name: "CONSTELLATION", sub: "network & creds", color: "#7dd7ff", target: "d9" },
  { d: "D10", name: "SINGULARITY", sub: "contact & roadmap", color: "#ff2bd6", target: "d10" },
];

export const stats = [
  { v: "10M+", l: "USERS REACHED", d: "D5 // impact" },
  { v: "43", l: "APPS SHIPPED", d: "D4 // products" },
  { v: "42", l: "GRADLE MODULES", d: "D3 // systems" },
  { v: "99.98%", l: "CRASH-FREE", d: "D5 // telemetry" },
  { v: "620ms", l: "COLD START P90", d: "D8 // velocity" },
  { v: "5,400+", l: "TESTS IN FIELD", d: "D8 // quality" },
];

export type Project = {
  n: number; name: string; icon: string; cat: string; users: string;
  status: "LIVE" | "NEW" | "BETA" | "FLAGSHIP";
  desc: string; stack: string[]; repo: string;
  problem: string; build: string; result: string;
  code: string;
};

export const projects: Project[] = [
  {
    n: 1, name: "POS Ultimate Pro Max", icon: "🧾", cat: "MERCHANT OS", users: "1,200 stores", status: "FLAGSHIP",
    desc: "Offline-first retail OS for SEA merchants. 42 modules, local truth, cloud as replica.",
    stack: ["Kotlin", "Compose", "Hilt", "Room", "WorkManager"],
    repo: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    problem: "Shops died when the network died — till, stock book and chat thread lived in three places.",
    build: "Room holds ground state, WorkManager syncs with vector-clock conflicts, Hilt scopes features, MVI drives checkout.",
    result: "1,200 stores · 99.98% crash-free · −68% build time · onboarding 2d → 40min",
    code: `@HiltViewModel
class CheckoutVM @Inject constructor(
  private val cart: CartRepo,
  private val sync: SyncQueue,
) : ViewModel() {
  fun onIntent(i: CartIntent) = launch {
    when (i) {
      is Add -> cart.add(i.sku)
      is Checkout -> {
        cart.seal()
        sync.enqueue(CartJob)
      }
    }
  }
}`,
  },
  {
    n: 2, name: "Social Dashboard", icon: "📱", cat: "REALTIME ANALYTICS", users: "1.2M", status: "NEW",
    desc: "Multi-tenant social telemetry with live feeds and reactive reporting.",
    stack: ["Kotlin", "Compose", "MVI", "Flow", "Firebase"],
    repo: "https://github.com/moekyawaung-tech/social-dashboard",
    problem: "Creators made posting decisions from stale screenshots across five channels.",
    build: "MVI + Flow streams, Paging 3 + Room cache for instant cold start, multiplexed WebSocket.",
    result: "1.2M users · 99.95% uptime · scroll jank −41% · 4.8★",
    code: `val feed: Flow<PagingData<Post>> =
  repo.observeFeed().cachedIn(scope)

val presence = repo.presence()
  .stateIn(scope, WhileSubscribed(5_000), Offline)`,
  },
  {
    n: 3, name: "Video Player Pro", icon: "🎯", cat: "ADAPTIVE MEDIA", users: "820K", status: "LIVE",
    desc: "Adaptive streaming with PiP, subtitles and offline packs.",
    stack: ["Media3", "ExoPlayer", "HLS", "Compose"],
    repo: "https://github.com/moekyawaung-tech/video-player",
    problem: "Users on flaky 3G abandoned videos within seconds.",
    build: "Media3 with HLS ladder tuned per network, DownloadManager offline packs, one PlaybackState machine.",
    result: "820K installs · 380ms cold start · 0.02% dropped frames",
    code: `ExoPlayer.Builder(ctx)
  .setLoadControl(DefaultLoadControl
    .Builder()
    .setBufferDurationsMs(15_000, 40_000, 2_000, 5_000)
    .build())
  .build()`,
  },
  {
    n: 4, name: "Game Collection", icon: "🎮", cat: "ARCADE", users: "2.1M", status: "LIVE",
    desc: "Modular mini-game hub with shared scores and physics.",
    stack: ["Kotlin", "Compose", "Canvas", "Room"],
    repo: "https://github.com/moekyawaung-tech/game-collection",
    problem: "Nine game experiments had no shared home or scoring system.",
    build: "Fixed-timestep game loop, Canvas 2D sprite batching, shared Room leaderboard.",
    result: "2.1M players · stable 60 FPS",
    code: `var acc = 0f
while (acc >= STEP) {
  world.step(STEP)
  acc -= STEP
}
renderer.draw(world, acc / STEP)`,
  },
  {
    n: 5, name: "Weather Radar", icon: "🌤️", cat: "ATMOSPHERIC", users: "690K", status: "LIVE",
    desc: "Hyperlocal forecast with radar, alerts and cached resilience.",
    stack: ["Compose", "Retrofit", "Room", "WorkManager"],
    repo: "https://github.com/moekyawaung-tech/Weather-app",
    problem: "Forecasts must arrive before the rain, not after a reload.",
    build: "Fused location, certificate-pinned REST ingest, WorkManager polling with cached fallback.",
    result: "690K users · live alerts · full offline forecast",
    code: `@GET("onecall")
suspend fun fetch(
  @Query("lat") lat: Double,
  @Query("lon") lon: Double
): Response<Forecast>`,
  },
  {
    n: 6, name: "PWA Field App", icon: "🌐", cat: "OFFLINE WEB", users: "480K", status: "LIVE",
    desc: "Installable PWA that works when the network doesn't.",
    stack: ["Vue", "TypeScript", "Workbox", "IndexedDB"],
    repo: "https://github.com/moekyawaung-tech/pwa-app",
    problem: "Field users saw a spinner where a usable surface should be.",
    build: "Service-worker shell, stale-while-revalidate loop, background sync on reconnect.",
    result: "480K installs · 0ms offline latency",
    code: `self.addEventListener('fetch', e => {
  e.respondWith(cacheFirstOrNetwork(e.request))
})`,
  },
  {
    n: 7, name: "Daily Planner", icon: "📅", cat: "PRODUCTIVITY", users: "410K", status: "LIVE",
    desc: "Habit engine disguised as a calm calendar surface.",
    stack: ["Kotlin", "Compose", "Room", "WorkManager"],
    repo: "https://github.com/moekyawaung-tech/Daily-planner-app",
    problem: "Planning apps punish users with guilt mechanics instead of momentum.",
    build: "Room-backed streak engine, Compose glanceable widgets, gentle notification windows.",
    result: "410K installs · 38% D30 retention",
    code: `val streak: Flow<Int> = dao
  .completions()
  .map { dates -> dates.longestRun() }
  .distinctUntilChanged()`,
  },
  {
    n: 8, name: "Lens Lite", icon: "📸", cat: "ON-DEVICE VISION", users: "38K MAU", status: "BETA",
    desc: "Camera-first capture with on-device OCR — images never leave the phone.",
    stack: ["CameraX", "TFLite", "ML Kit", "Compose"],
    repo: "https://github.com/moekyawaung-tech/Lens-lite",
    problem: "Note apps upload your camera roll to parse a receipt.",
    build: "Quantized TFLite OCR pipeline on CameraX frames, ML Kit classification, Room vault.",
    result: "38K MAU · 100% on-device · 0 cloud cost",
    code: `val opts = Interpreter.Options()
  .setNumThreads(4)
  .setUseNnApi(true)

interpreter.run(frame, out)`,
  },
  {
    n: 9, name: "Job Portal", icon: "💼", cat: "MARKETPLACE", users: "320K", status: "LIVE",
    desc: "Job discovery and matching for a distributed workforce.",
    stack: ["Kotlin", "Firebase", "Compose", "Paging"],
    repo: "https://github.com/moekyawaung-tech/Job-Portal-App",
    problem: "Local talent needed a bridge to remote teams without desktop workflows.",
    build: "Search + filters + push over Firebase, Paging 3 lists, offline-saved applications.",
    result: "320K users exploring remote opportunities",
    code: `dao.search(query)
  .cachedIn(scope)
  .combine(prefs.filters) { page, f ->
    page.filter { it.matches(f) }
  }`,
  },
];

export const skills = [
  { group: "D2 · CRAFT", icon: "⌨", pct: 97, items: ["Kotlin", "Jetpack Compose", "Coroutines · Flow", "Material 3", "TypeScript", "Python"] },
  { group: "D3 · SYSTEMS", icon: "⬡", pct: 96, items: ["Clean Architecture", "MVI / MVVM", "Multi-module (42)", "Hilt / Dagger", "Konsist", "KMP"] },
  { group: "D4 · DATA", icon: "⬣", pct: 93, items: ["Room + SQLCipher", "Retrofit · Ktor", "Firebase Suite", "WebSocket", "WorkManager"] },
  { group: "D6 · NEURAL", icon: "✦", pct: 90, items: ["Gemini Nano", "LiteRT-LM", "Claude API", "TFLite", "ML Kit OCR"] },
  { group: "D7 · FORTRESS", icon: "⛨", pct: 88, items: ["OWASP MASVS L2", "Keystore + Biometric", "TLS pinning", "R8 anti-tamper"] },
  { group: "D8 · VELOCITY", icon: "⚡", pct: 94, items: ["Baseline Profiles", "Macrobenchmark", "Jank Stats", "Lighthouse CI"] },
];

export const doctrine = [
  { t: "Modularize by feature", d: "42 modules, downward deps only, Konsist-enforced. Monoliths don't scale — teams do." },
  { t: "Offline is a contract", d: "Room is the truth. Network is a sync detail. Every write lands locally first." },
  { t: "AI lives at the edge", d: "Gemini Nano and LiteRT make intelligence private by default. Cloud is fallback, not foundation." },
  { t: "Large screens are products", d: "Canonical layouts, posture-aware UX, predictive back. Foldables ship day one." },
  { t: "Measure what you ship", d: "Baseline profiles, Macrobenchmark gates, screenshot goldens. Perf is an admission ticket." },
  { t: "Sustainability is engineering", d: "Dark default, vector assets, budgeted work, visible CO₂ dashboards. Green is a requirement." },
];

export const systems = [
  { t: "DI GRAPH", v: "Hilt everywhere", d: "Compile-time verified, scoped lifetimes, assisted factories. −140ms startup. Zero runtime DI crashes.", c: "#00f5ff" },
  { t: "TEST PYRAMID", v: "5,400+ tests", d: "JUnit + MockK + Turbine, 1,100 Paparazzi goldens, Espresso + Maestro, real-device E2E. 92% coverage.", c: "#b6ff2e" },
  { t: "CI/CD RITUAL", v: "7 stages", d: "Lint → unit → goldens → device matrix → R8 seal → staged Play rollout. ~11 min, zero rollbacks.", c: "#ffb020" },
  { t: "OBSERVABILITY", v: "220+ traces", d: "Crashlytics, Performance Monitoring, custom traces, structured Timber per module. 24/7 alerting.", c: "#a855f7" },
];

export const securityLayers = [
  { l: "L1", t: "Transport", d: "TLS 1.3 · SSL pinning · certificate transparency", i: "🔒" },
  { l: "L2", t: "At Rest", d: "EncryptedSharedPreferences · Keystore · SQLCipher", i: "🗄" },
  { l: "L3", t: "Identity", d: "OAuth2 · BiometricPrompt · session rotation", i: "🔑" },
  { l: "L4", t: "Bytecode", d: "R8 · obfuscation · anti-tamper", i: "🛡" },
  { l: "L5", t: "Runtime", d: "Root detection · emulator guard · Frida hooks", i: "🚨" },
  { l: "L6", t: "Compliance", d: "OWASP MASVS L2 · GDPR · Play data safety", i: "📜" },
];

export const velocity = [
  { k: "COLD START", v: "620ms", d: "P90 · 2GB tier" },
  { k: "BUILD TIME", v: "−68%", d: "after modularization" },
  { k: "SCROLL JANK", v: "−41%", d: "Macrobenchmark" },
  { k: "APK SIZE", v: "−42%", d: "R8 + vector" },
  { k: "ANR RATE", v: "0.02%", d: "rolling 90d" },
  { k: "FRAME BUDGET", v: "16ms", d: "locked 60fps" },
];

export const neuralWork = [
  { t: "MoekyawTranslator", s: "IN FLIGHT", d: "Burmese ↔ English translation. Claude cloud path + quantized TFLite offline fallback.", c: "#ffb020", m: "12K waitlist" },
  { t: "Lens Lite", s: "BETA", d: "Camera-first capture with quantized TFLite OCR entirely on-device.", c: "#00f5ff", m: "38K MAU · 0B egress" },
  { t: "Agentic Task Graph", s: "LAB", d: "Gemini Nano decomposes goals into a PlanGraph the user can edit and veto.", c: "#c4a6ff", m: "4.2 actions per plan" },
  { t: "Smart Replies", s: "LIVE", d: "On-device suggestion engine for chat, trained on local context with zero telemetry.", c: "#b6ff2e", m: "3× reply speed" },
];

export const timeline = [
  { y: "2019", t: "First release", d: "Java + XML. First app shipped to Play Store from Tachileik." },
  { y: "2020", t: "Kotlin migration", d: "Went Kotlin-first across three production apps." },
  { y: "2021", t: "Compose era", d: "Early Compose adopter. Rebuilt UI layer on MVVM." },
  { y: "2022", t: "Clean Architecture", d: "Multi-module + Hilt + Flow standardized across four apps." },
  { y: "2023", t: "Delivery systems", d: "GitHub Actions, Fastlane, screenshot tests, 90%+ coverage." },
  { y: "2024", t: "Founding engineer", d: "Launched POS Ultimate. 1,200+ merchants onboarded." },
  { y: "2025", t: "Edge intelligence", d: "Claude API + TFLite. Shipped Lens Lite and ML integrations." },
  { y: "2026", t: "Quantum Matrix 10D", d: "KMP, agentic AI, foldables and sustainable engineering." },
];

export const testimonials = [
  { q: "Moe's architecture decisions cut our build time by 70% and our crash rate by 10x. He thinks like a founder, ships like a machine.", n: "Nyi Nyi H.", r: "CTO · POS Ultimate" },
  { q: "Rare combination: deep systems thinking + product intuition. He shipped our v1 in 6 weeks — solo.", n: "Aye Aye K.", r: "Product Lead" },
  { q: "The technical co-founder every founder dreams of. Multi-module Android, CI/CD, Firebase — all handled.", n: "Somchai T.", r: "Startup Founder · Bangkok" },
];

export const socials = [
  { n: "GITHUB", h: "@Dev-moe-kyawaung", u: "https://github.com/Dev-moe-kyawaung" },
  { n: "GRAVATAR", h: "moekyawaung2026", u: "https://gravatar.com/moekyawaung2026" },
  { n: "LINKEDIN", h: "Moe Kyaw Aung", u: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1" },
  { n: "YOUTUBE", h: "dev channel", u: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG" },
  { n: "BLUESKY", h: "@moekyawaung96", u: "https://bsky.app/profile/moekyawaung96.bsky.social" },
  { n: "VIMEO", h: "reel", u: "https://vimeo.com/user252414232" },
  { n: "TUMBLR", h: "tech log", u: "https://www.tumblr.com/moekyawaung" },
  { n: "FLICKR", h: "archive", u: "https://www.flickr.com/people/204037451@N06" },
];

export const githubPages = [
  "moekyawaung-tech", "moekyawaung", "moekyawaung-senior", "moekyawaung-cyber",
  "moekyawaung-bangkok", "moekyawaung-google", "moekyawaung-microsoft", "moekyawaung-linux",
  "moekyawaung-hack", "moekyawaung-web", "moekyawaung-designer", "moekyawaung2026",
];

export const certs = [
  "Kotlin Development", "Jetpack Compose", "Android Architecture Components",
  "Clean Architecture", "GitHub Actions CI/CD", "Firebase Backend",
  "TensorFlow Lite", "Ethical Hacking", "Kali Linux",
  "Docker", "PostgreSQL", "TypeScript", "Python Automation",
];

export const pipeline = [
  { n: "01", t: "LINT", d: "detekt · ktlint · Android Lint", c: "#ff4d6d" },
  { n: "02", t: "UNIT", d: "3,200+ JUnit · MockK · Turbine", c: "#00f5ff" },
  { n: "03", t: "GOLDENS", d: "1,100 Paparazzi screenshots", c: "#a855f7" },
  { n: "04", t: "DEVICE", d: "Espresso + Maestro · API 26/30/34", c: "#ffb020" },
  { n: "05", t: "SEAL", d: "R8 · shrinkResources · Play Signing", c: "#b6ff2e" },
  { n: "06", t: "ROLLOUT", d: "Play Console staged release", c: "#00f5ff" },
];

export const agentKB = {
  greeting: "QUBIT v10 online — 10 dimensions mapped, 43 repos indexed. Ask about any dimension, architecture decision, project impact, or how to reach Moe.",
  quick: ["POS impact?", "Offline-first?", "Modularization?", "CI pipeline?", "Security?", "Performance?", "On-device AI?", "Contact"],
  answer(q: string): string {
    const s = q.toLowerCase();
    const h = (...w: string[]) => w.some((x) => s.includes(x));
    if (h("pos", "merchant", "flagship")) return "POS Ultimate Pro Max is the flagship: 42 Gradle modules, Room-first offline truth, WorkManager sync with vector clocks, Hilt-scoped features, MVI checkout. 1,200 stores live, 99.98% crash-free, build time down 68%.";
    if (h("offline", "room", "sync")) return "Offline-first doctrine: Room is the source of truth. Writes land locally, UI emits optimistically, WorkManager queues the uplink. Conflicts resolve by vector clock — never last-write-wins.";
    if (h("module", "monolith", "gradle")) return "42 modules split by feature + layer: :app → :feature → :domain → :data → :core, downward only. Konsist tests in CI fail cyclic edges. Domain is pure Kotlin, zero Android imports. −68% build time.";
    if (h("test", "ci", "cd", "pipeline", "deploy")) return "Seven-stage pipeline: detekt + ktlint → 3,200+ unit tests (MockK/Turbine, 90% gate) → 1,100 Paparazzi goldens → Espresso + Maestro matrix → R8 + signing → staged Play rollout. ~11 min, zero rollbacks.";
    if (h("secur", "owasp", "encrypt", "keystore")) return "OWASP MASVS L2: EncryptedSharedPreferences over Keystore (AES-256 GCM), TLS 1.3 with SHA-256 pinning, BiometricPrompt gates, R8 + anti-tamper, runtime root/Frida detection.";
    if (h("perf", "speed", "cold", "fps", "jank", "velocity")) return "Velocity playbook: Baseline Profiles before every release, lazy Paging 3, conflated Flow collectors, Macrobenchmark gates in CI. 620ms P90 cold start on 2GB devices. Scroll jank down 41%.";
    if (h("ai", "tflite", "nano", "llm", "claude", "lens", "neural")) return "Edge intelligence: Lens Lite runs quantized TFLite OCR fully on-device (0 bytes leave). MoekyawTranslator pairs Claude API with offline TFLite fallback. Agentic Task Graph uses Gemini Nano to build editable PlanGraphs.";
    if (h("contact", "hire", "email", "phone")) return `Direct: ${profile.email} · ${profile.phones[0]} / ${profile.phones[1]}. Open to Senior/Staff and founding-engineer roles. Replies within 24h.`;
    if (h("who", "moe", "about")) return "Moe Kyaw Aung (မိုးကျော်အောင်) — Senior Android Architect & technical founder, Tachileik ↔ Bangkok. 8 years, 43 apps, 82+ certs, 10M+ users. Specialty: offline-first multi-module Kotlin systems.";
    if (h("compos", "kotlin", "stack")) return "Core stack: Kotlin, Jetpack Compose, Coroutines + Flow, Hilt, Room + SQLCipher, Retrofit/Ktor, Firebase. Everything ships in a live app.";
    if (h("video", "player", "media")) return "Video Player Pro (820K): Media3 ExoPlayer, adaptive HLS ladder per network class, DownloadManager offline packs, unified PlaybackState machine. 380ms cold start, 0.02% drops.";
    if (h("game", "arcade")) return "Game Collection (2.1M): modular mini-game hub, fixed-timestep physics loop, Canvas 2D sprite batching, shared Room leaderboard. Locked 60 FPS.";
    if (h("fold", "posture", "window")) return "Foldable doctrine: canonical layouts shipped as a library. PostureState maps hinge angle to layout family. Predictive Back mandatory in nav contracts. 100% large-screen score.";
    if (h("carbon", "green", "sustain")) return "Carbon-aware template: dark default, vector-only assets via lint, WorkManager energy windows, Macrobenchmark budget gates in CI, user-visible CO₂ dashboard. ~35% less energy per session.";
    return "I'm entangled with 43 repos and 10 dimensions. Try: 'POS impact?', 'offline-first?', 'modularization?', 'CI pipeline?', 'security?', 'performance?', 'on-device AI?', 'foldables?', or 'how do I contact Moe?'";
  },
};
