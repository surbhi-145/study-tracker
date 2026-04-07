import { useState, useEffect } from "react";

const WEEKS = [
    {
        week: 1,
        trackA: { title: "BGP Internals, RFCs", tasks: ["Study BGP path selection & attributes", "Read BGP RFC 4271", "Study iBGP vs eBGP", "Write BGP notes"] },
        trackB: { title: "Arrays & Hashing", tasks: ["LC: Two Sum", "LC: Contains Duplicate", "LC: Top K Frequent Elements", "LC: Group Anagrams", "LC: Valid Anagram"] },
        trackC: { title: "—", tasks: [] },
        paper: null,
        systemDesign: "Intro: How to approach system design",
        blog: false,
        hours: { sat: "Track A deep study (6h) + notes (2h)", sun: "Track A continuation (5h) + Feynman explain (1h) + Track C lab (2h)", mon: "Track B DSA (3h) + Anki (2h)", tue: "Track C lab (1.5h) + Anki (1h) + LC journal (0.5h)", wed: "Track C lab (1.5h) + Anki (1h) + weak spot (0.5h)", thu: "System design study (0.5h) + flashcards (1h) + prep next week (1.5h)", fri: "Track B DSA timed (3h) + Track C recall (2h)" }
    },
    {
        week: 2,
        trackA: { title: "OSPF, VXLAN, VLAN", tasks: ["Study OSPF LSA types & flooding", "Study VXLAN encapsulation", "Study VLAN tagging, 802.1Q", "GNS3: OSPF lab", "Read VXLAN RFC 7348"] },
        trackB: { title: "Two Pointers & Sliding Window", tasks: ["LC: Valid Palindrome", "LC: 3Sum", "LC: Container With Most Water", "LC: Longest Substring Without Repeat", "LC: Minimum Window Substring"] },
        trackC: { title: "BGP Recall", tasks: ["GNS3: BGP lab (route reflection)", "Anki: BGP deck review", "Write 5 BGP flashcards"] },
        paper: null,
        systemDesign: "Design a URL shortener",
        blog: false,
        hours: { sat: "Track A: OSPF (6h) + notes (2h)", sun: "Track A: VXLAN/VLAN (5h) + Track C BGP lab (2h) + Feynman (1h)", mon: "Track B DSA (3h) + Anki (2h)", tue: "Track C: BGP Anki + lab (3h)", wed: "Track C: OSPF notes recap (3h)", thu: "System design (0.5h) + Anki (1h) + prep (1.5h)", fri: "Track B DSA timed (3h) + BGP recall (2h)" }
    },
    {
        week: 3,
        trackA: { title: "Multicast & Datapath", tasks: ["Study PIM-SM, IGMP", "Study multicast routing tables", "Study datapath internals (forwarding plane)", "GNS3: multicast lab"] },
        trackB: { title: "Stacks & Queues", tasks: ["LC: Valid Parentheses", "LC: Min Stack", "LC: Daily Temperatures", "LC: Car Fleet", "LC: Evaluate Reverse Polish Notation"] },
        trackC: { title: "OSPF/VXLAN Recall", tasks: ["GNS3: OSPF + VXLAN combined lab", "Anki: OSPF/VXLAN deck", "Python: write OSPF neighbor parser"] },
        paper: { title: "B4: Google SDN WAN", url: "https://research.google/pubs/b4-experience-with-a-globally-deployed-software-defined-wan/" },
        systemDesign: "Design a DNS system",
        blog: true,
        hours: { sat: "Track A: Multicast (6h) + B4 paper (2h)", sun: "Track A: Datapath (5h) + Track C lab (2h) + Feynman (1h)", mon: "Track B DSA (3h) + Anki (2h)", tue: "Track C: OSPF/VXLAN lab (3h)", wed: "Track C: Anki + notes (3h)", thu: "System design DNS (0.5h) + Anki (1h) + blog draft (1.5h)", fri: "Track B timed (3h) + blog post: BGP + Networking (2h)" }
    },
    {
        week: 4,
        trackA: { title: "Python: Sockets, Async, NAPALM", tasks: ["Study Python asyncio & event loop", "Build a TCP socket client/server", "NAPALM: connect to device, get facts", "PyATS: write first testcase", "Study Python data model"] },
        trackB: { title: "Linked Lists & Binary Search", tasks: ["LC: Reverse Linked List", "LC: Merge Two Sorted Lists", "LC: Reorder List", "LC: Binary Search", "LC: Find Minimum in Rotated Array"] },
        trackC: { title: "Multicast + BGP Recall", tasks: ["GNS3: multicast lab v2", "Anki: all networking decks", "Feynman: explain multicast to self"] },
        paper: null,
        systemDesign: "Design a load balancer",
        blog: false,
        hours: { sat: "Track A: Python sockets + async (6h) + notes (2h)", sun: "Track A: NAPALM + PyATS (5h) + Track C lab (2h) + Feynman (1h)", mon: "Track B DSA (3h) + Anki (2h)", tue: "Track C: networking Anki + lab (3h)", wed: "Track C: Python problems (3h)", thu: "System design load balancer (0.5h) + Anki (1h) + prep (1.5h)", fri: "Track B timed (3h) + Track C recall (2h)" }
    },
    {
        week: 5,
        trackA: { title: "Go: Goroutines, CLI Tool", tasks: ["Go syntax: interfaces, structs, error handling", "Study goroutines and channels", "Build a network CLI tool in Go", "Study Go standard library (net package)", "Write tests for your CLI"] },
        trackB: { title: "Trees & BST", tasks: ["LC: Invert Binary Tree", "LC: Max Depth of Binary Tree", "LC: Same Tree", "LC: Kth Smallest in BST", "LC: Validate BST", "LC: Level Order Traversal"] },
        trackC: { title: "Python + Networking Recall", tasks: ["Python: write BGP log parser", "Anki: Python + networking decks", "NAPALM: automate config backup script"] },
        paper: { title: "Maglev: Google's Network Load Balancer", url: "https://research.google/pubs/maglev-a-fast-and-reliable-software-network-load-balancer/" },
        systemDesign: "Design a CDN",
        blog: false,
        hours: { sat: "Track A: Go syntax + goroutines (6h) + Maglev paper (2h)", sun: "Track A: Go CLI tool (5h) + Track C Python lab (2h) + Feynman (1h)", mon: "Track B DSA: Trees (3h) + Anki (2h)", tue: "Track C: Python parser project (3h)", wed: "Track C: Go + networking Anki (3h)", thu: "System design CDN (0.5h) + Anki (1h) + prep (1.5h)", fri: "Track B timed: BST (3h) + Track C recall (2h)" }
    },
    {
        week: 6,
        trackA: { title: "Ansible, Jinja2, Terraform", tasks: ["Write Ansible playbook for network device config", "Study Jinja2 templates for config generation", "Terraform: provision a VPC", "Study idempotency in IaC", "Combine Ansible + Jinja2 for config push"] },
        trackB: { title: "Heap & Priority Queue", tasks: ["LC: Kth Largest Element in Array", "LC: Last Stone Weight", "LC: K Closest Points to Origin", "LC: Task Scheduler", "LC: Find Median from Data Stream"] },
        trackC: { title: "Go + Trees Recall", tasks: ["Go CLI tool v2: add new features", "Anki: Go + trees deck", "LC: review 5 tree problems from week 5"] },
        paper: null,
        systemDesign: "Design a rate limiter",
        blog: true,
        hours: { sat: "Track A: Ansible + Jinja2 (6h) + notes (2h)", sun: "Track A: Terraform (5h) + Track C Go lab (2h) + Feynman (1h)", mon: "Track B DSA: Heap (3h) + Anki (2h)", tue: "Track C: Go + Ansible lab (3h)", wed: "Track C: Anki + heap problems (3h)", thu: "System design rate limiter (0.5h) + Anki (1h) + blog draft (1.5h)", fri: "Track B timed (3h) + blog: Automation + DSA Trees (2h)" }
    },
    {
        week: 7,
        trackA: { title: "Linux: Namespaces, veth, tc, eBPF intro", tasks: ["Study Linux network namespaces", "Create veth pairs + connect namespaces", "Study tc (traffic control) and qdisc", "eBPF: write first XDP program (drop packets)", "Study netfilter hooks"] },
        trackB: { title: "Graphs: BFS & DFS", tasks: ["LC: Number of Islands", "LC: Clone Graph", "LC: Max Area of Island", "LC: Pacific Atlantic Water Flow", "LC: Course Schedule", "LC: Network Delay Time (very relevant!)"] },
        trackC: { title: "Ansible + Terraform Recall", tasks: ["Ansible: write idempotent playbook v2", "Terraform: add modules to your VPC project", "Anki: IaC + automation deck"] },
        paper: null,
        systemDesign: "Design a distributed cache",
        blog: false,
        hours: { sat: "Track A: namespaces + veth + tc (6h) + notes (2h)", sun: "Track A: eBPF intro (5h) + Track C IaC lab (2h) + Feynman (1h)", mon: "Track B: Graphs BFS/DFS (3h) + Anki (2h)", tue: "Track C: namespace lab v2 (3h)", wed: "Track C: Ansible + Anki (3h)", thu: "System design distributed cache (0.5h) + Anki (1h) + prep (1.5h)", fri: "Track B timed: graphs (3h) + Track C recall (2h)" }
    },
    {
        week: 8,
        trackA: { title: "eBPF, XDP, Kernel Bypass", tasks: ["Study XDP in depth: redirect, pass, drop", "Study DPDK concepts and use cases", "Write XDP program: packet counter", "Study kernel bypass networking", "Compare XDP vs DPDK vs AF_XDP"] },
        trackB: { title: "Tries & Graph Mediums", tasks: ["LC: Implement Trie", "LC: Design Add and Search Words", "LC: Word Search II", "LC: Redundant Connection", "LC: Word Ladder"] },
        trackC: { title: "Linux Net + Graphs Recall", tasks: ["eBPF: extend your XDP program", "Anki: Linux networking deck", "LC: re-solve 3 graph problems from week 7"] },
        paper: { title: "BBR Congestion Control", url: "https://research.google/pubs/bbr-congestion-based-congestion-control/" },
        systemDesign: "Design a message queue",
        blog: false,
        hours: { sat: "Track A: XDP + DPDK (6h) + BBR paper (2h)", sun: "Track A: kernel bypass (5h) + Track C lab (2h) + Feynman (1h)", mon: "Track B: Tries (3h) + Anki (2h)", tue: "Track C: eBPF lab v2 (3h)", wed: "Track C: graph Anki + LC (3h)", thu: "System design message queue (0.5h) + Anki (1h) + prep (1.5h)", fri: "Track B timed: tries + graphs (3h) + Track C recall (2h)" }
    },
    {
        week: 9,
        trackA: { title: "Distributed Systems: CAP, Raft", tasks: ["Study CAP theorem in depth", "Read Raft paper (full)", "Implement simplified Raft leader election in Python/Go", "Study eventual vs strong consistency", "Study distributed clocks, vector clocks"] },
        trackB: { title: "Dynamic Programming Intro", tasks: ["LC: Climbing Stairs", "LC: House Robber", "LC: Coin Change", "LC: Longest Common Subsequence", "LC: 0/1 Knapsack"] },
        trackC: { title: "Linux Net + eBPF Recall", tasks: ["Linux namespace + eBPF combined lab", "Anki: distributed systems starter deck", "Feynman: explain CAP theorem"] },
        paper: { title: "Raft: In Search of an Understandable Consensus Algorithm", url: "https://raft.github.io/raft.pdf" },
        systemDesign: "Design a key-value store",
        blog: true,
        hours: { sat: "Track A: CAP + Raft paper (6h) + notes (2h)", sun: "Track A: Raft implementation (5h) + Track C lab (2h) + Feynman (1h)", mon: "Track B: DP intro (3h) + Anki (2h)", tue: "Track C: eBPF lab (3h)", wed: "Track C: distributed systems Anki (3h)", thu: "System design KV store (0.5h) + Anki (1h) + blog draft (1.5h)", fri: "Track B DP timed (3h) + blog: Linux Networking + Graphs (2h)" }
    },
    {
        week: 10,
        trackA: { title: "Consensus, DDIA Ch 5–8", tasks: ["Read DDIA Ch 5: Replication", "Read DDIA Ch 6: Partitioning", "Read DDIA Ch 7: Transactions", "Read DDIA Ch 8: Trouble with Distributed Systems", "Study Paxos vs Raft tradeoffs"] },
        trackB: { title: "DP Continued", tasks: ["LC: Word Break", "LC: Partition Equal Subset Sum", "LC: Longest Increasing Subsequence", "LC: Edit Distance", "LC: Burst Balloons"] },
        trackC: { title: "Raft + CAP Recall", tasks: ["Anki: DDIA concepts deck", "Feynman: explain Raft to self", "Write 1-page summary of DDIA Ch 5–6"] },
        paper: null,
        systemDesign: "Design a distributed database",
        blog: false,
        hours: { sat: "Track A: DDIA Ch 5–6 (6h) + notes (2h)", sun: "Track A: DDIA Ch 7–8 (5h) + Track C Raft recall (2h) + Feynman (1h)", mon: "Track B: DP (3h) + Anki (2h)", tue: "Track C: DDIA summary writing (3h)", wed: "Track C: distributed systems Anki (3h)", thu: "System design distributed DB (0.5h) + Anki (1h) + prep (1.5h)", fri: "Track B DP timed (3h) + Track C recall (2h)" }
    },
    {
        week: 11,
        trackA: { title: "Cloud: VPC, Peering, Transit GW", tasks: ["Study VPC architecture and subnets", "Study VPC peering vs Transit Gateway", "Study security groups vs NACLs", "Study cloud routing and BGP in cloud", "Lab: set up VPC with peering"] },
        trackB: { title: "Intervals & Mixed LC", tasks: ["LC: Meeting Rooms II", "LC: Merge Intervals", "LC: Non-overlapping Intervals", "LC: Insert Interval", "LC: 2 mixed mediums of choice"] },
        trackC: { title: "DDIA + Distributed Systems Recall", tasks: ["Anki: all distributed systems cards", "Feynman: explain partitioning strategies", "LC: re-solve 3 DP problems"] },
        paper: null,
        systemDesign: "Design a network monitor",
        blog: false,
        hours: { sat: "Track A: VPC + peering (6h) + notes (2h)", sun: "Track A: Transit GW + cloud routing (5h) + Track C lab (2h) + Feynman (1h)", mon: "Track B: intervals (3h) + Anki (2h)", tue: "Track C: DDIA Anki (3h)", wed: "Track C: cloud lab (3h)", thu: "System design network monitor (0.5h) + Anki (1h) + prep (1.5h)", fri: "Track B timed (3h) + Track C recall (2h)" }
    },
    {
        week: 12,
        trackA: { title: "IaC: Terraform + Ansible Project", tasks: ["Build end-to-end IaC project: VPC + config", "Terraform modules: reusable components", "Ansible: integrate with Terraform outputs", "Add CI/CD pipeline to your IaC project", "Document your project (README)"] },
        trackB: { title: "Mixed Mediums", tasks: ["LC: 2 graph mediums", "LC: 2 DP mediums", "LC: 2 tree mediums", "LC: 1 hard problem attempt"] },
        trackC: { title: "Cloud + IaC Recall", tasks: ["Anki: cloud networking deck", "Cloud lab: extend VPC project", "Feynman: explain VPC peering vs Transit GW"] },
        paper: { title: "Monarch: Google's Planet-Scale Monitoring", url: "https://research.google/pubs/monarch-googles-planet-scale-in-memory-time-series-database/" },
        systemDesign: "Design a metrics pipeline",
        blog: true,
        hours: { sat: "Track A: IaC project (6h) + Monarch paper (2h)", sun: "Track A: IaC project v2 (5h) + Track C lab (2h) + Feynman (1h)", mon: "Track B: mixed LC (3h) + Anki (2h)", tue: "Track C: cloud Anki (3h)", wed: "Track C: IaC project docs (3h)", thu: "System design metrics pipeline (0.5h) + Anki (1h) + blog draft (1.5h)", fri: "Track B timed (3h) + blog: Distributed Systems (2h)" }
    },
    {
        week: 13,
        trackA: { title: "Observability: Prometheus, Grafana, SNMP", tasks: ["Set up Prometheus + Grafana stack", "Write custom exporters", "Study SNMP MIBs and polling", "Study sFlow and NetFlow", "Build dashboard for your lab network"] },
        trackB: { title: "Mixed Mediums", tasks: ["LC: 2 graph mediums", "LC: 2 DP mediums", "LC: 2 string mediums", "LC: 1 hard problem attempt"] },
        trackC: { title: "IaC + Cloud Recall", tasks: ["Anki: observability concepts", "Extend Prometheus dashboard", "Feynman: explain Prometheus pull model"] },
        paper: null,
        systemDesign: "Design an alerting system",
        blog: false,
        hours: { sat: "Track A: Prometheus + Grafana setup (6h) + notes (2h)", sun: "Track A: SNMP + dashboard (5h) + Track C lab (2h) + Feynman (1h)", mon: "Track B: mixed LC (3h) + Anki (2h)", tue: "Track C: observability lab (3h)", wed: "Track C: Anki (3h)", thu: "System design alerting (0.5h) + Anki (1h) + prep (1.5h)", fri: "Track B timed (3h) + Track C recall (2h)" }
    },
    {
        week: 14,
        trackA: { title: "Bazel, Build Systems, Netbox/Nautobot", tasks: ["Study Bazel BUILD files and targets", "Build a simple Go project with Bazel", "Set up Netbox: add devices, IPs, prefixes", "Study Nautobot vs Netbox", "Automate Netbox via API (Python)"] },
        trackB: { title: "Hard Problems", tasks: ["LC: Median of Two Sorted Arrays", "LC: Trapping Rain Water", "LC: N-Queens", "LC: Serialize/Deserialize Binary Tree", "LC: 1 timed contest problem"] },
        trackC: { title: "Observability + Full Stack Recall", tasks: ["End-to-end lab: network → Prometheus → alert", "Anki: all decks rapid review", "Feynman: explain full monitoring stack"] },
        paper: null,
        systemDesign: "Design a CI/CD pipeline",
        blog: true,
        hours: { sat: "Track A: Bazel + Netbox (6h) + notes (2h)", sun: "Track A: Netbox API automation (5h) + Track C lab (2h) + Feynman (1h)", mon: "Track B: hard problems (3h) + Anki (2h)", tue: "Track C: end-to-end lab (3h)", wed: "Track C: rapid Anki review (3h)", thu: "System design CI/CD (0.5h) + Anki (1h) + blog draft (1.5h)", fri: "Track B timed (3h) + blog: Cloud + Observability (2h)" }
    },
    {
        week: 15,
        trackA: { title: "Weak Spot Review", tasks: ["Identify 3 weakest topics from all phases", "Deep review: weakest networking topic", "Deep review: weakest coding pattern", "Deep review: weakest system design area", "Re-do labs from hardest weeks"] },
        trackB: { title: "Mock LC Contests", tasks: ["Timed: 4 problems in 90 mins (x2)", "Review all wrong answers", "Re-solve 5 hardest problems from past weeks", "1 system design mock (full 45 min)"] },
        trackC: { title: "All Tracks Rapid Recall", tasks: ["Anki: all decks", "Feynman: explain 3 random topics", "Write cheat sheet: networking concepts"] },
        paper: null,
        systemDesign: "Full system design mock interview",
        blog: false,
        hours: { sat: "Weak spot review: networking (6h) + notes (2h)", sun: "Weak spot review: coding + SD (5h) + rapid recall (2h) + Feynman (1h)", mon: "Mock LC contest (3h) + Anki (2h)", tue: "Track C: rapid recall (3h)", wed: "Track C: cheat sheets (3h)", thu: "Full SD mock (1h) + Anki (1h) + prep (1h)", fri: "Mock LC contest (3h) + weak spot (2h)" }
    },
    {
        week: 16,
        trackA: { title: "Buffer & Applying", tasks: ["Polish resume with all projects", "Write cover letter template", "Set up LinkedIn: update all sections", "Apply to 10 target companies", "Reach out to 5 network contacts"] },
        trackB: { title: "Mock Interviews", tasks: ["2x technical mock interviews (DSA)", "1x system design mock interview", "1x networking/domain mock interview", "Review all feedback"] },
        trackC: { title: "Portfolio & Resume", tasks: ["Write project READMEs (GitHub)", "Record yourself doing Feynman on 3 topics", "Finalize blog posts: publish all drafts"] },
        paper: null,
        systemDesign: null,
        blog: false,
        hours: { sat: "Resume + LinkedIn (4h) + mock interview prep (4h)", sun: "Mock interviews (4h) + applying (4h)", mon: "Apply + follow-ups (3h) + Anki (2h)", tue: "Mock interview (3h)", wed: "Portfolio polish (3h)", thu: "Networking outreach (2h) + prep (1h)", fri: "Mock interview (3h) + apply (2h)" }
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
            const ids = [...w.trackA.tasks.map((_, j) => `w${i+1}-tA-${j}`), ...w.trackB.tasks.map((_, j) => `w${i+1}-tB-${j}`), ...w.trackC.tasks.map((_, j) => `w${i+1}-tC-${j}`)];
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
                                <button key={i} onClick={() => { setActiveWeek(i + 1); if(activeTab === 'overview') setActiveTab('tasks'); }}
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
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                {['terminal', 'feynman'].map(mode => (
                                    <button key={mode} onClick={() => save({ ...data, journalMode: mode })} className={`text-[9px] uppercase px-2 py-1 rounded border ${(data.journalMode || 'terminal') === mode ? "bg-indigo-600 border-indigo-500 text-white" : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400"}`}>{mode}</button>
                                ))}
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 relative">
                                <div className="absolute top-3 left-6 text-[10px] font-bold text-indigo-500/50 uppercase font-mono">
                                    {data.journalMode === 'feynman' ? `feynman_engine --explain --w${activeWeek}` : `surbhi@terminal:~/w${activeWeek}$ log.sh`}
                                </div>
                                <textarea value={data[`w${activeWeek}-journal`] || ""} onChange={(e) => save({ ...data, [`w${activeWeek}-journal`]: e.target.value })}
                                    className="w-full h-80 bg-transparent text-gray-900 dark:text-white outline-none resize-none pt-8 font-mono text-sm leading-relaxed"
                                    placeholder={data.journalMode === 'feynman' ? "Teach the concept..." : "Log technical findings..."}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "overview" && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {WEEKS.map((w, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                                    <div className="text-[10px] font-bold text-gray-400 mb-1">WEEK {i+1}</div>
                                    <div className="text-xs font-bold truncate mb-2">{w.trackA.title}</div>
                                    <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full">
                                        <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${getWeekProgress(i+1)}%` }} />
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