import { useState, useEffect } from "react";

const WEEKS = [
    {
        week: 1,
        trackA: { title: "BGP Internals & State Machines", tasks: ["Study BGP path selection & attributes", "Read BGP RFC 4271", "Study iBGP vs eBGP"] },
        trackB: { title: "Arrays & Hashing (LPM Foundations)", tasks: ["LC: Two Sum", "LC: Top K Frequent Elements", "LC: Group Anagrams"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Implement a BGP Best Path Selection engine in Go/Python"] },
        paper: null,
        systemDesign: "Intro: Reliability & Scalability",
        blog: false,
        hours: { sat: "Track A study (6h)", sun: "Stretch Goal: Path Selection Engine (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD Intro (2h)", fri: "Review (2h)" }
    },
    {
        week: 2,
        trackA: { title: "OSPF & Graph Theory", tasks: ["Study OSPF LSA types", "Dijkstra's Algorithm in SPF", "GNS3: OSPF lab"] },
        trackB: { title: "Two Pointers (Packet Parsing)", tasks: ["LC: Valid Palindrome", "LC: 3Sum", "LC: Container With Most Water"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Write a Dijkstra-based SPF solver for a mock network graph"] },
        paper: null,
        systemDesign: "Design a URL shortener",
        blog: false,
        hours: { sat: "Track A study (6h)", sun: "Stretch Goal: SPF Solver (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 3,
        trackA: { title: "VXLAN, EVPN & Overlay Networks", tasks: ["Study VXLAN frame format", "MP-BGP EVPN Control Plane", "Underlay vs Overlay routing"] },
        trackB: { title: "Sliding Window", tasks: ["LC: Longest Substring Without Repeating Characters", "LC: Minimum Window Substring"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Write a Python script to build/parse a VXLAN header using Scapy"] },
        paper: null,
        systemDesign: "Design a Multi-tenant Cloud Network",
        blog: false,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: Header Parser (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 4,
        trackA: { title: "Python/Go: Concurrency & Sockets", tasks: ["Study asyncio/goroutines", "TCP/UDP socket programming", "NAPALM/Scapy basics"] },
        trackB: { title: "Linked Lists & Binary Search", tasks: ["LC: Reverse Linked List", "LC: Binary Search"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Build a 'Turbo' SNMP Poller using a Worker Pool to poll 1k IPs"] },
        paper: null,
        systemDesign: "Design a load balancer",
        blog: false,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: Concurrent Poller (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 5,
        trackA: { title: "HTTP/3, QUIC & DNS Internals", tasks: ["QUIC stream multiplexing", "DNS Record types & Anycast", "TLS 1.3 Handshake"] },
        trackB: { title: "Stack & Queue Logic", tasks: ["LC: Valid Parentheses", "LC: Min Stack", "LC: Implement Queue using Stacks"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Build a Go Load Balancer with Round Robin & Health Checks"] },
        paper: { title: "Google B4: BGP/SDN", url: "https://research.google/pubs/b4-experience-with-a-globally-deployed-software-defined-wan/" },
        systemDesign: "Design a Global Load Balancer (GSLB)",
        blog: true,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: Go Load Balancer (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 6,
        trackA: { title: "Kubernetes Networking & CNI", tasks: ["iptables vs IPVS", "CNI Plugin Architecture", "CoreDNS internals"] },
        trackB: { title: "Trees Deep Dive", tasks: ["LC: Invert Binary Tree", "LC: Maximum Depth of Binary Tree"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Write a custom K8s Controller in Go to watch pods and sync state"] },
        paper: null,
        systemDesign: "Design a Service Mesh Control Plane",
        blog: false,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: K8s Controller (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 7,
        trackA: { title: "Linux Networking & eBPF Intro", tasks: ["Namespaces, veth, & tc", "Intro to eBPF hooks", "Netfilter architecture"] },
        trackB: { title: "Graphs: BFS & DFS", tasks: ["LC: Number of Islands", "LC: Network Delay Time"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Write a C/Go XDP program to count packets by protocol (TCP/UDP)"] },
        paper: null,
        systemDesign: "Design a distributed cache",
        blog: false,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: XDP Packet Counter (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 8,
        trackA: { title: "High-Perf Linux & Kernel Bypass", tasks: ["Study DPDK/AF_XDP basics", "Interrupt Moderation vs Polling", "Zero-copy memory mapping"] },
        trackB: { title: "Heap & Priority Queues", tasks: ["LC: Kth Largest Element", "LC: Find Median from Data Stream"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Implement a Lock-Free Ring Buffer for packet processing"] },
        paper: { title: "The Maglev Paper", url: "https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44824.pdf" },
        systemDesign: "Design a 100Gbps Packet Gateway",
        blog: true,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: Ring Buffer (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 9,
        trackA: { title: "Distributed Systems & Consensus", tasks: ["CAP Theorem deep-dive", "Read Raft Paper", "Strong vs Eventual Consistency"] },
        trackB: { title: "Tries & Bit Manipulation", tasks: ["LC: Implement Trie", "LC: Number of 1 Bits"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Implement a Longest Prefix Match (LPM) algorithm using a Trie"] },
        paper: { title: "Raft Consensus", url: "https://raft.github.io/raft.pdf" },
        systemDesign: "Design a Key-Value Store",
        blog: true,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: LPM Trie (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 10,
        trackA: { title: "Storage Engines & Data Layout", tasks: ["LSM-Trees vs B-Trees", "Columnar Storage basics", "Write-Ahead Logs (WAL)"] },
        trackB: { title: "Graphs: Advanced", tasks: ["LC: Course Schedule", "LC: Alien Dictionary"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Implement a simple KV store that persists to disk using a WAL"] },
        paper: null,
        systemDesign: "Design a Time-Series Database (TSDB)",
        blog: false,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: WAL Implementation (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 11,
        trackA: { title: "Inventory & State Consistency", tasks: ["Data Modeling for SoT", "Concurrency in DB writes", "Optimistic vs Pessimistic locking"] },
        trackB: { title: "Intervals & Mixed LC", tasks: ["LC: Merge Intervals", "LC: Meeting Rooms II"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Build a state reconciliation engine with exponential backoff"] },
        paper: null,
        systemDesign: "Design a Network Inventory SoT",
        blog: false,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: Sync Engine (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 12,
        trackA: { title: "IaaC Internals & DAGs", tasks: ["Resource Graph execution", "State locking mechanisms", "Idempotency in API design"] },
        trackB: { title: "Backtracking", tasks: ["LC: Subsets", "LC: Combination Sum"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Write a custom Terraform Provider for a mock API"] },
        paper: null,
        systemDesign: "Design a Global Deployment System (CI/CD)",
        blog: true,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: TF Provider (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 13,
        trackA: { title: "Observability & Telemetry", tasks: ["gRPC vs REST", "Prometheus Pull vs Push", "SNMP vs gNMI"] },
        trackB: { title: "Hard Problems", tasks: ["LC: Trapping Rain Water"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Build a gRPC streaming telemetry collector in Go"] },
        paper: { title: "Monarch Paper", url: "https://research.google/pubs/monarch-googles-planet-scale-in-memory-time-series-database/" },
        systemDesign: "Design an Alerting System",
        blog: false,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: gRPC Collector (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 14,
        trackA: { title: "Security & Policy Engines", tasks: ["Zero Trust Architecture", "OPA (Open Policy Agent) basics", "mTLS at Scale"] },
        trackB: { title: "Dynamic Programming", tasks: ["LC: Climbing Stairs", "LC: Longest Increasing Subsequence"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Build a Policy Engine that validates if a config follows security rules"] },
        paper: null,
        systemDesign: "Design a Distributed Firewall",
        blog: false,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: Policy Engine (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 15,
        trackA: { title: "Chaos Engineering", tasks: ["Blast Radius Analysis", "FMEA", "Simulating Latency/Loss"] },
        trackB: { title: "Greedy Algorithms", tasks: ["LC: Maximum Subarray", "LC: Jump Game"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Build a 'Chaos Script' that randomly drops traffic on a Linux bridge"] },
        paper: null,
        systemDesign: "Design for Disaster Recovery",
        blog: true,
        hours: { sat: "Track A (6h)", sun: "Stretch Goal: Chaos Tool (6h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "Review (2h)" }
    },
    {
        week: 16,
        trackA: { title: "Final Readiness", tasks: ["Review Journals", "Mock System Design interview", "Network Dev trivia"] },
        trackB: { title: "Final Review", tasks: ["Re-solve 10 'High-Impact' LC Mediums"] },
        trackC: { title: "Dev Stretch Goal", tasks: ["Polish Portfolio: READMEs for all stretch goals"] },
        paper: null,
        systemDesign: "Capstone: High-Performance Data Highway",
        blog: true,
        hours: { sat: "Final Review (8h)", sun: "Portfolio Polish (8h)", mon: "Track B (3h)", tue: "Track C (2h)", wed: "Track C (2h)", thu: "SD (2h)", fri: "GO TIME (0h)" }
    }
];

const TRACK_COLORS = {
    A: {
        bg: "bg-blue-50 dark:bg-blue-950",
        badge: "bg-blue-500",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800"
    },
    B: {
        bg: "bg-emerald-50 dark:bg-emerald-950",
        badge: "bg-emerald-500",
        text: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800"
    },
    C: {
        bg: "bg-amber-50 dark:bg-amber-950",
        badge: "bg-amber-500",
        text: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800"
    },
};

const DAYS = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];
function useStorage() {
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const result = localStorage.getItem("tracker-state");
            if (result) setData(JSON.parse(result));
        } catch (e) { console.error("Load failed", e); }
        setLoaded(true);
    }, []);

    function save(newData) {
        setData(newData);
        localStorage.setItem("tracker-state", JSON.stringify(newData));
    }

    return { data, save, loaded };
}

function CheckItem({ id, label, checked, onToggle }) {
    return (
        <button
            onClick={() => onToggle(id)}
            className="flex items-start gap-2 w-full text-left py-2 px-3 rounded-lg transition-all hover:bg-black/5 dark:hover:bg-white/5 group"
        >
            <div className={`mt-0.5 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all ${checked ? "bg-indigo-500 border-indigo-500" : "border-gray-300 dark:border-gray-600 group-hover:border-indigo-400"}`}>
                {checked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className={`text-[14px] leading-snug transition-all ${checked ? "line-through text-gray-400 dark:text-gray-600" : "text-gray-700 dark:text-gray-300"}`}>{label}</span>
        </button>
    );
}

function TrackCard({ week, track, data: trackData, storageData, onToggle, label }) {
    const colors = TRACK_COLORS[track];
    if (!trackData.tasks.length && !trackData.title) return null;

    const completedCount = trackData.tasks.filter((_, i) => storageData[`w${week}-t${track}-${i}`]).length;
    const total = trackData.tasks.length;
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    return (
        <div className={`rounded-xl border ${colors.border} ${colors.bg} bg-opacity-40 dark:bg-opacity-30 p-4 shadow-sm transition-colors`}>
            <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${colors.badge} text-white`}>{label}</span>
                <span className="ml-auto text-xs text-gray-500 font-mono">{completedCount}/{total}</span>
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-4 leading-tight">{trackData.title}</p>
            {total > 0 && (
                <>
                    <div className="w-full h-1 bg-gray-200 dark:bg-gray-900 rounded-full mb-4">
                        <div className={`h-1 rounded-full transition-all duration-700 ${colors.badge}`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="space-y-1">
                        {trackData.tasks.map((task, i) => (
                            <CheckItem key={i} id={`w${week}-t${track}-${i}`} label={task} checked={!!storageData[`w${week}-t${track}-${i}`]} onToggle={onToggle} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
// --- Main Application ---

export default function StudyTracker() {
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [activeWeek, setActiveWeek] = useState(1);
    const [activeTab, setActiveTab] = useState("tasks");

    useEffect(() => {
        const result = localStorage.getItem("tracker-state");
        if (result) setData(JSON.parse(result));
        setLoaded(true);
    }, []);

    const save = (newData) => {
        setData(newData);
        localStorage.setItem("tracker-state", JSON.stringify(newData));
    };

    const toggleItem = (id) => save({ ...data, [id]: !data[id] });

    const getWeekProgress = (weekNum) => {
        const w = WEEKS[weekNum - 1];
        const ids = [...w.trackA.tasks.map((_, i) => `w${weekNum}-tA-${i}`), ...w.trackB.tasks.map((_, i) => `w${weekNum}-tB-${i}`), ...w.trackC.tasks.map((_, i) => `w${weekNum}-tC-${i}`)];
        return ids.length ? Math.round((ids.filter(id => data[id]).length / ids.length) * 100) : 0;
    };

    const totalPct = (() => {
        let total = 0, done = 0;
        WEEKS.forEach((w, i) => {
            const ids = [...w.trackA.tasks.map((_, j) => `w${i + 1}-tA-${j}`), ...w.trackB.tasks.map((_, j) => `w${i + 1}-tB-${j}`), ...w.trackC.tasks.map((_, j) => `w${i + 1}-tC-${j}`)];
            total += ids.length; done += ids.filter(id => data[id]).length;
        });
        return total > 0 ? Math.round((done / total) * 100) : 0;
    })();

    const weekData = WEEKS[activeWeek - 1];

    if (!loaded) return <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center font-mono text-gray-400">LOADING_SRE_CORE...</div>;

    return (
        <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-950 text-gray-900 dark:text-white pb-24" style={{ fontFamily: "'DM Mono', monospace" }}>

            {/* ADAPTIVE HEADER */}
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 px-4 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-md font-bold tracking-tighter">STUDY_LOG.v1</h1>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Target: Senior SRE</p>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase mb-1">{totalPct}% OVERALL</div>
                        <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${totalPct}%` }} />
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 mt-6">

                {/* TIMELINE SELECTOR */}
                <div className="mb-8">
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] font-bold mb-3">Timeline</p>
                    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                        {WEEKS.map((w, i) => {
                            const isActive = activeWeek === i + 1;
                            const progress = getWeekProgress(i + 1);
                            return (
                                <button key={i} onClick={() => { setActiveWeek(i + 1); if (activeTab === 'overview') setActiveTab('tasks'); }}
                                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all ${isActive ? "bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-2 dark:ring-offset-gray-950" : progress === 100 ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600" : "bg-gray-100 dark:bg-gray-900 text-gray-400 border border-gray-200 dark:border-gray-800"}`}
                                >
                                    <span className="text-[10px] font-bold">W{i + 1}</span>
                                    {w.paper && <div className="w-1 h-1 bg-purple-500 rounded-full mt-1"></div>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* WEEKLY METADATA (Restore System Design & Papers) */}
                {activeTab !== "overview" && (
                    <div className="mb-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-end justify-between mb-2">
                            <h2 className="text-3xl font-black italic tracking-tighter">WEEK {activeWeek}</h2>
                            <span className="text-sm font-mono text-indigo-600 dark:text-indigo-400 font-bold">{getWeekProgress(activeWeek)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-indigo-500 transition-all duration-700" style={{ width: `${getWeekProgress(activeWeek)}%` }} />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {weekData.paper && (
                                <a href={weekData.paper.url} target="_blank" rel="noreferrer" className="text-[9px] bg-purple-100 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full uppercase font-bold">📄 {weekData.paper.title}</a>
                            )}
                            {weekData.systemDesign && (
                                <span className="text-[9px] bg-rose-100 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-3 py-1 rounded-full uppercase font-bold">🏗 {weekData.systemDesign}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* NAVIGATION */}
                <nav className="flex gap-1 mb-8 border-b border-gray-200 dark:border-gray-900 overflow-x-auto no-scrollbar">
                    {["tasks", "schedule", "journal", "overview"].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 -mb-px ${activeTab === tab ? "border-indigo-500 text-indigo-600 dark:text-white" : "border-transparent text-gray-400"}`}>{tab}</button>
                    ))}
                </nav>

                <main className="min-h-[400px]">
                    {activeTab === "tasks" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TrackCard week={activeWeek} track="A" data={weekData.trackA} storageData={data} onToggle={toggleItem} label="Networking" />
                            <TrackCard week={activeWeek} track="B" data={weekData.trackB} storageData={data} onToggle={toggleItem} label="DSA" />
                            <TrackCard week={activeWeek} track="C" data={weekData.trackC} storageData={data} onToggle={toggleItem} label="Recall" />
                        </div>
                    )}

                    {activeTab === "schedule" && (
                        <div className="space-y-3">
                            {DAYS.map(day => (
                                <div key={day} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex gap-4">
                                    <div className="w-12 text-center border-r border-gray-200 dark:border-gray-800 pr-4">
                                        <div className="text-xs font-black text-indigo-600 dark:text-indigo-500 uppercase">{day}</div>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300 italic">{weekData.hours[day]}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "journal" && (
                        <div className="space-y-4 animate-in fade-in duration-500">
                            <div className="flex items-center justify-between px-1">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Log Mode</p>
                                <div className="flex gap-2">
                                    {['terminal', 'feynman', 'heartbeat'].map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => save({ ...data, journalMode: mode })}
                                            className={`text-[9px] uppercase px-3 py-1 rounded-full border transition-all ${(data.journalMode || 'terminal') === mode
                                                    ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20"
                                                    : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400"
                                                }`}
                                        >
                                            {mode === 'heartbeat' ? '❤️ Heartbeat' : mode}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={`border rounded-2xl p-6 relative transition-all duration-500 ${data.journalMode === 'heartbeat'
                                    ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 shadow-inner"
                                    : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                                }`}>
                                {/* Contextual Header */}
                                <div className="absolute top-3 left-6 text-[10px] font-bold uppercase tracking-widest font-mono">
                                    {data.journalMode === 'heartbeat'
                                        ? <span className="text-rose-600 dark:text-rose-400">system_check --health --mental</span>
                                        : data.journalMode === 'feynman'
                                            ? <span className="text-indigo-500/50">feynman_engine --explain --w{activeWeek}</span>
                                            : <span className="text-indigo-500/50">surbhi@terminal:~/w{activeWeek}$ log.sh</span>
                                    }
                                </div>

                                <textarea
                                    value={data[`w${activeWeek}-journal-${data.journalMode || 'terminal'}`] || ""}
                                    onChange={(e) => save({ ...data, [`w${activeWeek}-journal-${data.journalMode || 'terminal'}`]: e.target.value })}
                                    className="w-full h-80 bg-transparent text-gray-900 dark:text-white outline-none resize-none pt-8 font-mono text-sm leading-relaxed"
                                    placeholder={
                                        data.journalMode === 'heartbeat'
                                            ? "How is the load today? Are you red-lining? Record thoughts on work chaos, burnout levels, and when you need to shed load..."
                                            : data.journalMode === 'feynman'
                                                ? "Teach the core concept..."
                                                : "Log technical findings..."
                                    }
                                />
                            </div>

                            {data.journalMode === 'heartbeat' && (
                                <div className="bg-rose-100/50 dark:bg-rose-900/30 p-4 rounded-xl border border-rose-200 dark:border-rose-800/50">
                                    <p className="text-[11px] text-rose-800 dark:text-rose-300 italic leading-relaxed">
                                        <strong>SRE Reminder:</strong> Sustained 100% CPU usage leads to hardware failure. If work is chaotic, it is okay to switch the study plan to "Degraded Mode" for a few days. Maintenance is part of the uptime.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "overview" && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {WEEKS.map((w, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                                    <div className="text-[10px] font-bold text-gray-400 mb-1">WEEK {i + 1}</div>
                                    <div className="text-xs font-bold truncate mb-2">{w.trackA.title}</div>
                                    <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full">
                                        <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${getWeekProgress(i + 1)}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}