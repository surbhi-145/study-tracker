import { useState, useEffect } from "react";

const WEEKS = [
  {
    week: 1,
    phase: "I: The Plumbing",
    trackA: { 
      title: "BGP FSM & Linux File Descriptors", 
      tasks: [
        "BGP Finite State Machine (RFC 4271)", 
        "Linux: 'Everything is a File' - Study File Descriptors (FD) & Inodes", 
        "Relationship between Sockets and the FD Table"
      ] 
    },
    trackB: { title: "Arrays & Hashing", tasks: ["LC: Two Sum", "LC: Top K Frequent Elements"] },
    trackC: { 
      title: "BGP Attribute Evaluator", 
      tasks: ["Project: Build a path selection engine", "Refactor/Depth: Go Interfaces & Error Handling patterns"] 
    },
    systemDesign: "Scalability: Stateful vs. Stateless Networking",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Go Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 2,
    phase: "I: The Plumbing",
    trackA: { 
      title: "OSPF & The Linux Routing Table", 
      tasks: [
        "Dijkstra's SPF Math", 
        "Linux: How `ip route` interacts with the FIB (Forwarding Info Base)", 
        "Understanding Routing Policy Databases (RPDB)"
      ] 
    },
    trackB: { title: "Two Pointers", tasks: ["LC: 3Sum", "LC: Container With Most Water"] },
    trackC: { 
      title: "SPF Path Solver", 
      tasks: ["Project: Dijkstra solver for mock graphs", "Refactor/Depth: Python Type Hinting & Pydantic for Network Models"] 
    },
    systemDesign: "Availability: Designing for Fault Domains",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Python Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 3,
    phase: "I: The Plumbing",
    trackA: { 
      title: "Encapsulation & MTU/MSS", 
      tasks: [
        "VXLAN/EVPN Headers", 
        "Linux: The Network Stack Path (From NIC to User-space)", 
        "MTU path discovery and fragmentation issues"
      ] 
    },
    trackB: { title: "Sliding Window", tasks: ["LC: Longest Substring Without Repeating Characters"] },
    trackC: { 
      title: "VXLAN Packet Builder", 
      tasks: ["Project: Build/Parse VXLAN with Scapy", "Refactor/Depth: Go Concurrency - Channels vs WaitGroups"] 
    },
    systemDesign: "Multi-tenancy: Virtual Routing & Forwarding (VRF)",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Go Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 4,
    phase: "I: The Plumbing",
    trackA: { 
      title: "TCP Internals & Syscalls", 
      tasks: [
        "TCP Congestion Control (Cubic vs BBR)", 
        "Linux: Syscalls - read(), write(), select(), epoll()", 
        "Socket Buffer (sk_buff) architecture"
      ] 
    },
    trackB: { title: "Linked Lists & Binary Search", tasks: ["LC: Reverse Linked List", "LC: Binary Search Variants"] },
    trackC: { 
      title: "Concurrent Poller", 
      tasks: ["Project: Worker-pool SNMP/gNMI poller", "Refactor/Depth: Python Asyncio - Event Loop & Tasks"] 
    },
    systemDesign: "Load Balancing: Consistent Hashing Algorithms",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Python Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 5,
    phase: "II: The Performance",
    trackA: { 
      title: "DNS & Linux Resolver Internals", 
      tasks: [
        "QUIC & HTTP/3 multiplexing", 
        "Linux: `/etc/resolv.conf`, nsswitch, and systemd-resolved", 
        "EDNS and Anycast routing for DNS"
      ] 
    },
    trackB: { title: "Stacks & Queues", tasks: ["LC: Valid Parentheses", "LC: Min Stack"] },
    trackC: { 
      title: "Go Load Balancer", 
      tasks: ["Project: Build L4 LB with Health Checks", "Refactor/Depth: Nix Foundations - Reproducible Dev Shells"] 
    },
    systemDesign: "DNS Design: Global Traffic Management (GTM)",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Nix Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 6,
    phase: "II: The Performance",
    trackA: { 
      title: "K8s Data Plane & iptables", 
      tasks: [
        "kube-proxy: iptables vs IPVS vs eBPF", 
        "Linux: Netfilter architecture & hook points", 
        "Conntrack table management and bottlenecks"
      ] 
    },
    trackB: { title: "Trees", tasks: ["LC: Invert Binary Tree", "LC: Level Order Traversal"] },
    trackC: { 
      title: "K8s Controller", 
      tasks: ["Project: Go controller to sync Pod state", "Refactor/Depth: Go Memory - Pointers vs Values & Escape Analysis"] 
    },
    systemDesign: "Service Mesh: Envoy Data Plane & Control Plane",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Go Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 7,
    phase: "II: The Performance",
    trackA: { 
      title: "Linux Virtual Networking & namespaces", 
      tasks: [
        "Network Namespaces, veth pairs, & Bridges", 
        "Linux: The Virtual File System (VFS) & Mount Namespaces", 
        "Understanding `chroot` vs `unshare`"
      ] 
    },
    trackB: { title: "Graphs (BFS/DFS)", tasks: ["LC: Number of Islands", "LC: Network Delay Time"] },
    trackC: { 
      title: "eBPF Tracer", 
      tasks: ["Project: XDP packet counter in C/Go", "Refactor/Depth: Python Context Managers & Decorators"] 
    },
    systemDesign: "Distributed Caching: Invalidation & Thundering Herd",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Python Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 8,
    phase: "II: The Performance",
    trackA: { 
      title: "Kernel Bypass & Hardware Access", 
      tasks: [
        "DPDK/AF_XDP and Zero-Copy memory", 
        "Linux: Page Cache, HugePages, and Memory Mapping (mmap)", 
        "CPU Pinning & NUMA awareness for network dev"
      ] 
    },
    trackB: { title: "Heap & Priority Queues", tasks: ["LC: Kth Largest Element"] },
    trackC: { 
      title: "Lock-Free Ring Buffer", 
      tasks: ["Project: Implement circular buffer in C/Go", "Refactor/Depth: Nix Flakes - Managing Cross-Language Deps"] 
    },
    systemDesign: "Design a 100Gbps Packet Gateway",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Nix Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 9,
    phase: "III: The State",
    trackA: { 
      title: "Distributed Consensus & IPC", 
      tasks: [
        "Raft Algorithm: Leader Election & Log Replication", 
        "Linux: Inter-Process Communication (IPC) - Pipes, Shm, Unix Sockets", 
        "Atomic Operations & Semaphores"
      ] 
    },
    trackB: { title: "Tries & Bit Manipulation", tasks: ["LC: Implement Trie", "LC: Number of 1 Bits"] },
    trackC: { 
      title: "LPM Trie", 
      tasks: ["Project: Implement IP Prefix matching engine", "Refactor/Depth: Go Generics & Custom Data Structures"] 
    },
    systemDesign: "Design a Distributed Key-Value Store",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Go Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 10,
    phase: "III: The State",
    trackA: { 
      title: "Storage Engines & Memory Management", 
      tasks: [
        "LSM-Trees vs B-Trees", 
        "Linux: Process Memory Layout (Stack, Heap, Data, Text)", 
        "Copy-on-Write (COW) and Forking behavior"
      ] 
    },
    trackB: { title: "Advanced Graphs", tasks: ["LC: Course Schedule", "LC: Alien Dictionary"] },
    trackC: { 
      title: "WAL Persistence", 
      tasks: ["Project: Build a crash-safe KV store with WAL", "Refactor/Depth: Python Memory Profiling - Garbage Collection & __slots__"] 
    },
    systemDesign: "Design a Time-Series Database (TSDB)",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Python Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 11,
    phase: "III: The State",
    trackA: { 
      title: "Consistency & Locking Models", 
      tasks: [
        "Optimistic vs Pessimistic Locking in DBs", 
        "Linux: Mutexes, Futexes, and Spinlocks", 
        "Deadlock detection and prevention in systems"
      ] 
    },
    trackB: { title: "Intervals", tasks: ["LC: Merge Intervals"] },
    trackC: { 
      title: "Reconciliation Engine", 
      tasks: ["Project: Build state sync with backoff logic", "Refactor/Depth: Nix - Packaging custom Go/Python binaries"] 
    },
    systemDesign: "Design a Global Network Inventory (SoT)",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Nix Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 12,
    phase: "III: The State",
    trackA: { 
      title: "IaaC Graph Theory & Processes", 
      tasks: [
        "Terraform DAG & State Sharding", 
        "Linux: Process Lifecycle - PIDs, TIDs, Zombies, and Orphans", 
        "The `init` process and Signal handling"
      ] 
    },
    trackB: { title: "Backtracking", tasks: ["LC: Subsets", "LC: Combination Sum"] },
    trackC: { 
      title: "Custom TF Provider", 
      tasks: ["Project: Write a TF provider for a mock API", "Refactor/Depth: Go Struct Tags & Reflection"] 
    },
    systemDesign: "Design a Global Deployment System (CI/CD)",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Go Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 13,
    phase: "IV: The Platform",
    trackA: { 
      title: "Telemetry & Performance Profiling", 
      tasks: [
        "gRPC Bidirectional Streaming", 
        "Linux: Performance analysis with `perf`, `strace`, and `lsof`", 
        "Observing CPU context switches and IRQ balance"
      ] 
    },
    trackB: { title: "Hard Problems", tasks: ["LC: Trapping Rain Water"] },
    trackC: { 
      title: "gRPC Collector", 
      tasks: ["Project: Build a streaming Go collector", "Refactor/Depth: Python Metaprogramming & Type Classes"] 
    },
    systemDesign: "Design an Observability Platform (Metrics/Logs)",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Python Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 14,
    phase: "IV: The Platform",
    trackA: { 
      title: "Security & Container Isolation", 
      tasks: [
        "Zero Trust Architecture & mTLS", 
        "Linux: cgroups (Control Groups) & Resource Limits", 
        "Capabilities & Seccomp profiles for network tools"
      ] 
    },
    trackB: { title: "Dynamic Programming", tasks: ["LC: Climbing Stairs", "LC: Longest Increasing Subsequence"] },
    trackC: { 
      title: "Policy Engine", 
      tasks: ["Project: Build a config validator", "Refactor/Depth: Go Plugin System & Shared Objects"] 
    },
    systemDesign: "Design a Multi-Region Distributed Firewall",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Go Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 15,
    phase: "IV: The Platform",
    trackA: { 
      title: "Chaos Engineering & OS Stability", 
      tasks: [
        "Blast Radius & FMEA", 
        "Linux: Understanding OOM Killer and Swap behavior", 
        "Kernel Panic analysis & Core Dumps"
      ] 
    },
    trackB: { title: "DP Continued", tasks: ["LC: Edit Distance"] },
    trackC: { 
      title: "Chaos Tool", 
      tasks: ["Project: Tool to inject latency into Linux interfaces", "Refactor/Depth: Nix - Setting up a full OS config (NixOS basics)"] 
    },
    systemDesign: "Design for Disaster Recovery",
    hours: { sat: "Network + Linux (6h)", sun: "Project (6h)", mon: "DSA (3h)", tue: "DSA (2h)", wed: "SD (2h)", thu: "Refactor + Nix Depth (2h)", fri: "Recall (1.5h)" }
  },
  {
    week: 16,
    phase: "IV: The Platform",
    trackA: { title: "Final Readiness", tasks: ["Review Journals", "Mock Systems Design", "Trivia"] },
    trackB: { title: "Review", tasks: ["Re-solve 15 Mixed LC Medium/Hards"] },
    trackC: { title: "Portfolio Polish", tasks: ["Documentation & README Refactoring for all 15 projects"] },
    systemDesign: "Capstone: Design a Low-Latency Hedge Fund Data Highway",
    hours: { sat: "Final Review (8h)", sun: "Portfolio Work (8h)", mon: "Track B (3h)", tue: "Track B (3h)", wed: "SD (2h)", thu: "Mock Interview (2h)", fri: "GO TIME" }
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