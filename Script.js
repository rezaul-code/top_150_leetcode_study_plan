/* ============================================================
   DSA Solutions — script.js
   Data: LeetCode "Top Interview 150" study plan, grouped by topic.
   Behavior: Dashboard (default view), sidebar render/expand,
   problem selection + solved checklist, search filter, mobile
   drawer. Progress is persisted to localStorage — no backend
   needed, works fine on a static Vercel deploy.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. DATA
     Each problem tuple is [name, difficulty]. A stable id is
     appended to each tuple at runtime (see section 3).
     ---------------------------------------------------------- */

  const DATA = [
    {
      category: "Array / String",
      problems: [
        ["Merge Sorted Array", "Easy"],
        ["Remove Element", "Easy"],
        ["Remove Duplicates from Sorted Array", "Easy"],
        ["Remove Duplicates from Sorted Array II", "Medium"],
        ["Majority Element", "Easy"],
        ["Rotate Array", "Medium"],
        ["Best Time to Buy and Sell Stock", "Easy"],
        ["Best Time to Buy and Sell Stock II", "Medium"],
        ["Jump Game", "Medium"],
        ["Jump Game II", "Medium"],
        ["H-Index", "Medium"],
        ["Insert Delete GetRandom O(1)", "Medium"],
        ["Product of Array Except Self", "Medium"],
        ["Gas Station", "Medium"],
        ["Candy", "Hard"],
        ["Trapping Rain Water", "Hard"],
        ["Roman to Integer", "Easy"],
        ["Integer to Roman", "Medium"],
        ["Length of Last Word", "Easy"],
        ["Longest Common Prefix", "Easy"],
        ["Reverse Words in a String", "Medium"],
        ["Zigzag Conversion", "Medium"],
        ["Find the Index of the First Occurrence in a String", "Easy"],
        ["Text Justification", "Hard"],
      ],
    },
    {
      category: "Two Pointers",
      problems: [
        ["Valid Palindrome", "Easy"],
        ["Is Subsequence", "Easy"],
        ["Two Sum II - Input Array Is Sorted", "Medium"],
        ["Container With Most Water", "Medium"],
        ["3Sum", "Medium"],
      ],
    },
    {
      category: "Sliding Window",
      problems: [
        ["Minimum Size Subarray Sum", "Medium"],
        ["Longest Substring Without Repeating Characters", "Medium"],
        ["Substring with Concatenation of All Words", "Hard"],
        ["Minimum Window Substring", "Hard"],
      ],
    },
    {
      category: "Matrix",
      problems: [
        ["Valid Sudoku", "Medium"],
        ["Spiral Matrix", "Medium"],
        ["Rotate Image", "Medium"],
        ["Set Matrix Zeroes", "Medium"],
        ["Game of Life", "Medium"],
      ],
    },
    {
      category: "Hashmap",
      problems: [
        ["Ransom Note", "Easy"],
        ["Isomorphic Strings", "Easy"],
        ["Word Pattern", "Easy"],
        ["Valid Anagram", "Easy"],
        ["Group Anagrams", "Medium"],
        ["Two Sum", "Easy"],
        ["Happy Number", "Easy"],
        ["Contains Duplicate II", "Easy"],
        ["Longest Consecutive Sequence", "Medium"],
      ],
    },
    {
      category: "Intervals",
      problems: [
        ["Summary Ranges", "Easy"],
        ["Merge Intervals", "Medium"],
        ["Insert Interval", "Medium"],
        ["Minimum Number of Arrows to Burst Balloons", "Medium"],
      ],
    },
    {
      category: "Stack",
      problems: [
        ["Valid Parentheses", "Easy"],
        ["Simplify Path", "Medium"],
        ["Min Stack", "Medium"],
        ["Evaluate Reverse Polish Notation", "Medium"],
        ["Basic Calculator", "Hard"],
      ],
    },
    {
      category: "Linked List",
      problems: [
        ["Linked List Cycle", "Easy"],
        ["Add Two Numbers", "Medium"],
        ["Merge Two Sorted Lists", "Easy"],
        ["Copy List with Random Pointer", "Medium"],
        ["Reverse Linked List II", "Medium"],
        ["Remove Nodes From Linked List", "Medium"],
        ["Remove Duplicates from Sorted List II", "Medium"],
        ["Rotate List", "Medium"],
        ["Partition List", "Medium"],
        ["LRU Cache", "Medium"],
      ],
    },
    {
      category: "Binary Tree General",
      problems: [
        ["Maximum Depth of Binary Tree", "Easy"],
        ["Same Tree", "Easy"],
        ["Invert Binary Tree", "Easy"],
        ["Symmetric Tree", "Easy"],
        ["Construct Binary Tree from Preorder and Inorder Traversal", "Medium"],
        ["Populating Next Right Pointers in Each Node II", "Medium"],
        ["Flatten Binary Tree to Linked List", "Medium"],
        ["Path Sum", "Easy"],
        ["Sum Root to Leaf Numbers", "Medium"],
        ["Binary Tree Maximum Path Sum", "Hard"],
        ["Binary Search Tree Iterator", "Medium"],
        ["Count Complete Tree Nodes", "Easy"],
        ["Lowest Common Ancestor of a Binary Tree", "Medium"],
      ],
    },
    {
      category: "Binary Tree BFS",
      problems: [
        ["Binary Tree Right Side View", "Medium"],
        ["Average of Levels in Binary Tree", "Easy"],
        ["Binary Tree Level Order Traversal", "Medium"],
        ["Binary Tree Zigzag Level Order Traversal", "Medium"],
      ],
    },
    {
      category: "Binary Search Tree",
      problems: [
        ["Minimum Absolute Difference in BST", "Easy"],
        ["Kth Smallest Element in a BST", "Medium"],
        ["Validate Binary Search Tree", "Medium"],
      ],
    },
    {
      category: "Graph General",
      problems: [
        ["Number of Islands", "Medium"],
        ["Surrounded Regions", "Medium"],
        ["Clone Graph", "Medium"],
        ["Evaluate Division", "Medium"],
        ["Course Schedule", "Medium"],
        ["Course Schedule II", "Medium"],
      ],
    },
    {
      category: "Graph BFS",
      problems: [
        ["Snakes and Ladders", "Medium"],
        ["Minimum Genetic Mutation", "Medium"],
        ["Word Ladder", "Hard"],
      ],
    },
    {
      category: "Trie",
      problems: [
        ["Implement Trie (Prefix Tree)", "Medium"],
        ["Design Add and Search Words Data Structure", "Medium"],
        ["Word Search II", "Hard"],
      ],
    },
    {
      category: "Backtracking",
      problems: [
        ["Letter Combinations of a Phone Number", "Medium"],
        ["Combinations", "Medium"],
        ["Permutations", "Medium"],
        ["Combination Sum", "Medium"],
        ["N-Queens II", "Hard"],
        ["Generate Parentheses", "Medium"],
        ["Word Search", "Medium"],
      ],
    },
    {
      category: "Divide & Conquer",
      problems: [
        ["Convert Sorted Array to Binary Search Tree", "Easy"],
        ["Sort List", "Medium"],
        ["Construct Quad Tree", "Medium"],
        ["Merge k Sorted Lists", "Hard"],
      ],
    },
    {
      category: "Kadane's Algorithm",
      problems: [
        ["Maximum Subarray", "Medium"],
        ["Maximum Sum Circular Subarray", "Medium"],
      ],
    },
    {
      category: "Binary Search",
      problems: [
        ["Search Insert Position", "Easy"],
        ["Search a 2D Matrix", "Medium"],
        ["Find Peak Element", "Medium"],
        ["Search in Rotated Sorted Array", "Medium"],
        ["Find First and Last Position of Element in Sorted Array", "Medium"],
        ["Find Minimum in Rotated Sorted Array", "Medium"],
        ["Median of Two Sorted Arrays", "Hard"],
      ],
    },
    {
      category: "Heap",
      problems: [
        ["Kth Largest Element in an Array", "Medium"],
        ["IPO", "Hard"],
        ["Find K Pairs with Smallest Sums", "Medium"],
        ["Find Median from Data Stream", "Hard"],
      ],
    },
    {
      category: "Bit Manipulation",
      problems: [
        ["Add Binary", "Easy"],
        ["Reverse Bits", "Easy"],
        ["Number of 1 Bits", "Easy"],
        ["Single Number", "Easy"],
        ["Single Number II", "Medium"],
        ["Bitwise AND of Numbers Range", "Medium"],
      ],
    },
    {
      category: "Math",
      problems: [
        ["Palindrome Number", "Easy"],
        ["Plus One", "Easy"],
        ["Factorial Trailing Zeroes", "Medium"],
        ["Sqrt(x)", "Easy"],
        ["Pow(x, n)", "Medium"],
        ["Max Points on a Line", "Hard"],
      ],
    },
    {
      category: "1D Dynamic Programming",
      problems: [
        ["Climbing Stairs", "Easy"],
        ["House Robber", "Medium"],
        ["Word Break", "Medium"],
        ["Coin Change", "Medium"],
        ["Longest Increasing Subsequence", "Medium"],
      ],
    },
    {
      category: "Multidimensional Dynamic Programming",
      problems: [
        ["Triangle", "Medium"],
        ["Minimum Path Sum", "Medium"],
        ["Unique Paths II", "Medium"],
        ["Longest Palindromic Substring", "Medium"],
        ["Interleaving String", "Medium"],
        ["Edit Distance", "Medium"],
        ["Best Time to Buy and Sell Stock III", "Hard"],
        ["Best Time to Buy and Sell Stock IV", "Hard"],
        ["Maximum Profit in Job Scheduling", "Hard"],
        ["Distinct Subsequences", "Hard"],
        ["Regular Expression Matching", "Hard"],
      ],
    },
  ];

  /* ----------------------------------------------------------
     2. HELPERS
     ---------------------------------------------------------- */

  function slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function diffClass(diff) {
    return diff.toLowerCase();
  }

  function matchesQuery(name, query) {
    return name.toLowerCase().includes(query);
  }

  function todayISO(d) {
    const date = d || new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const CHECK_ICON_SVG = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8.5 6.5 12 13 4"></polyline></svg>`;

  /* ----------------------------------------------------------
     3. DERIVED DATA
     Attach a stable id to every problem tuple and build lookup
     tables used by the dashboard + sidebar.
     ---------------------------------------------------------- */

  const PROBLEM_META = [];

  DATA.forEach((cat, catIndex) => {
    cat.problems.forEach((p, probIndex) => {
      const id = `${slugify(cat.category)}--${slugify(p[0])}`;
      p[2] = id; // p = [name, difficulty, id]
      PROBLEM_META.push({
        id,
        name: p[0],
        difficulty: p[1],
        category: cat.category,
        catIndex,
        probIndex,
      });
    });
  });

  const PROBLEM_BY_ID = {};
  PROBLEM_META.forEach((m) => {
    PROBLEM_BY_ID[m.id] = m;
  });

  const DIFFICULTY_TOTALS = { Easy: 0, Medium: 0, Hard: 0 };
  PROBLEM_META.forEach((m) => {
    DIFFICULTY_TOTALS[m.difficulty] += 1;
  });

  const TOTAL_PROBLEMS = PROBLEM_META.length;

  const BADGE_TIERS = [
    { name: "Bronze", min: 40 },
    { name: "Silver", min: 80 },
    { name: "Gold", min: 120 },
    { name: "Platinum", min: 150 },
  ];

  /* ----------------------------------------------------------
     4. PERSISTENCE (localStorage — no backend required)
     progress = {
       solved: { [problemId]: { date: "YYYY-MM-DD" } },
       log:    [ { id, date }, ... ]   // one entry per "solve" event,
                                         // kept even after unchecking
                                         // so streak history isn't lost
     }
     ---------------------------------------------------------- */

  const STORAGE_KEY = "dsa-solutions-progress-v1";

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { solved: {}, log: [] };
      const parsed = JSON.parse(raw);
      return {
        solved: parsed && parsed.solved ? parsed.solved : {},
        log: parsed && Array.isArray(parsed.log) ? parsed.log : [],
      };
    } catch (e) {
      console.warn("Could not read saved progress, starting fresh.", e);
      return { solved: {}, log: [] };
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn("Could not save progress.", e);
    }
  }

  let progress = loadProgress();

  function isSolved(id) {
    return Boolean(progress.solved[id]);
  }

  function toggleSolved(id) {
    if (progress.solved[id]) {
      delete progress.solved[id];
    } else {
      const date = todayISO();
      progress.solved[id] = { date };
      progress.log.push({ id, date });
    }
    saveProgress();
  }

  function resetProgress() {
    progress = { solved: {}, log: [] };
    saveProgress();
  }

  function getTotalSolved() {
    return Object.keys(progress.solved).length;
  }

  /* ----------------------------------------------------------
     5. STATE
     ---------------------------------------------------------- */

  const state = {
    view: "dashboard", // "dashboard" | "problem"
    expanded: new Set(),
    active: { cat: 0, prob: 0 },
    query: "",
  };

  /* ----------------------------------------------------------
     6. DOM REFS
     ---------------------------------------------------------- */

  const sidebarNav = document.getElementById("sidebarNav");
  const contentEl = document.getElementById("content");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const problemCount = document.getElementById("problemCount");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const dashboardBtn = document.getElementById("dashboardBtn");

  /* ----------------------------------------------------------
     7. RENDER: SIDEBAR
     ---------------------------------------------------------- */

  function checkboxHtml(id) {
    const checked = isSolved(id);
    return `
      <button class="solved-check${checked ? " is-checked" : ""}" type="button"
        data-action="toggle-solved" data-id="${id}"
        aria-pressed="${checked}" aria-label="${checked ? "Mark as unsolved" : "Mark as solved"}">
        <span class="check-box">${checked ? CHECK_ICON_SVG : ""}</span>
      </button>`;
  }

  function renderSidebar() {
    const query = state.query.trim().toLowerCase();
    const hasQuery = query.length > 0;
    let visibleProblemTotal = 0;
    let html = "";

    DATA.forEach((cat, catIndex) => {
      const matches = cat.problems
        .map((p, pIndex) => ({ p, pIndex }))
        .filter(({ p }) => !hasQuery || matchesQuery(p[0], query));

      if (hasQuery && matches.length === 0) return;

      visibleProblemTotal += matches.length;

      const isExpanded = hasQuery ? true : state.expanded.has(catIndex);
      const solvedInCat = cat.problems.filter((p) => isSolved(p[2])).length;
      const progressLabel = hasQuery ? `${matches.length}/${cat.problems.length}` : `${solvedInCat}/${cat.problems.length}`;

      html += `<div class="category${isExpanded ? " is-expanded" : ""}" data-cat="${catIndex}">`;
      html += `<button class="category-header" type="button" data-action="toggle" data-cat="${catIndex}">`;
      html += `<svg class="category-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
      html += `<span class="category-name">${escapeHtml(cat.category)}</span>`;
      html += `<span class="category-progress">${progressLabel}</span>`;
      html += `</button>`;

      html += `<ul class="problem-list">`;
      matches.forEach(({ p, pIndex }) => {
        const [name, diff, id] = p;
        const isActive = state.view === "problem" && state.active.cat === catIndex && state.active.prob === pIndex;
        html += `<li class="problem-row">`;
        html += checkboxHtml(id);
        html += `<button class="problem-item${isActive ? " is-active" : ""}" type="button" data-action="select" data-cat="${catIndex}" data-prob="${pIndex}">`;
        html += `<span class="diff-dot ${diffClass(diff)}" title="${diff}"></span>`;
        html += `<span class="problem-item-title">${escapeHtml(name)}</span>`;
        html += `</button>`;
        html += `</li>`;
      });
      html += `</ul></div>`;
    });

    if (hasQuery && visibleProblemTotal === 0) {
      html = `<div class="sidebar-empty">No problems match&nbsp;&ldquo;${escapeHtml(state.query)}&rdquo;</div>`;
    }

    sidebarNav.innerHTML = html;
    problemCount.textContent = hasQuery
      ? `${visibleProblemTotal} / ${TOTAL_PROBLEMS} problems`
      : `${getTotalSolved()} / ${TOTAL_PROBLEMS} solved`;
  }

  /* ----------------------------------------------------------
     8. STATS (used by the dashboard)
     ---------------------------------------------------------- */

  function computeStats() {
    const byDiff = {
      Easy: { solved: 0, total: DIFFICULTY_TOTALS.Easy },
      Medium: { solved: 0, total: DIFFICULTY_TOTALS.Medium },
      Hard: { solved: 0, total: DIFFICULTY_TOTALS.Hard },
    };

    Object.keys(progress.solved).forEach((id) => {
      const meta = PROBLEM_BY_ID[id];
      if (meta) byDiff[meta.difficulty].solved += 1;
    });

    const totalSolved = Object.keys(progress.solved).length;

    const byDate = {};
    progress.log.forEach((entry) => {
      byDate[entry.date] = (byDate[entry.date] || 0) + 1;
    });

    const sortedDates = Object.keys(byDate).sort();
    let maxStreak = 0;
    let curStreak = 0;
    let prevDate = null;

    sortedDates.forEach((dStr) => {
      const d = new Date(`${dStr}T00:00:00`);
      if (prevDate) {
        const diffDays = Math.round((d - prevDate) / 86400000);
        curStreak = diffDays === 1 ? curStreak + 1 : 1;
      } else {
        curStreak = 1;
      }
      maxStreak = Math.max(maxStreak, curStreak);
      prevDate = d;
    });

    return {
      totalSolved,
      byDiff,
      byDate,
      activeDays: sortedDates.length,
      maxStreak,
      totalSubmissions: progress.log.length,
    };
  }

  function getCurrentTier(totalSolved) {
    let current = null;
    BADGE_TIERS.forEach((t) => {
      if (totalSolved >= t.min) current = t;
    });
    return current;
  }

  function getNextTier(totalSolved) {
    return BADGE_TIERS.find((t) => totalSolved < t.min) || null;
  }

  /* ----------------------------------------------------------
     9. RENDER: DASHBOARD
     ---------------------------------------------------------- */

  function buildRingSvg(byDiff, totalSolved) {
    const cx = 100;
    const cy = 100;
    const r = 80;
    const strokeWidth = 16;
    const circumference = 2 * Math.PI * r;
    const order = [
      ["Easy", "var(--easy)"],
      ["Medium", "var(--medium)"],
      ["Hard", "var(--hard)"],
    ];

    let offset = 0;
    let arcs = "";
    order.forEach(([diff, color]) => {
      const solved = byDiff[diff].solved;
      const len = (solved / TOTAL_PROBLEMS) * circumference;
      arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${color}" stroke-width="${strokeWidth}" fill="none"
        stroke-dasharray="${len.toFixed(2)} ${(circumference - len).toFixed(2)}"
        stroke-dashoffset="${(-offset).toFixed(2)}" transform="rotate(-90 ${cx} ${cy})"></circle>`;
      offset += len;
    });

    let marker = "";
    if (totalSolved > 0) {
      const pct = totalSolved / TOTAL_PROBLEMS;
      const angle = pct * 2 * Math.PI - Math.PI / 2;
      const dotX = cx + r * Math.cos(angle);
      const dotY = cy + r * Math.sin(angle);
      marker = `<circle cx="${dotX.toFixed(2)}" cy="${dotY.toFixed(2)}" r="6" fill="#ffffff" stroke="#0d1117" stroke-width="2"></circle>`;
    }

    return `
      <svg class="ring-svg" viewBox="0 0 200 200" width="180" height="180">
        <circle cx="${cx}" cy="${cy}" r="${r}" stroke="var(--border)" stroke-width="${strokeWidth}" fill="none"></circle>
        ${arcs}
        ${marker}
      </svg>`;
  }

  function statMiniHtml(label, className, solved, total) {
    return `
      <div class="stat-mini ${className}">
        <span class="stat-mini-label">${label}</span>
        <span class="stat-mini-value">${solved}/${total}</span>
      </div>`;
  }

  function renderBadgesCard(totalSolved) {
    const current = getCurrentTier(totalSolved);
    const next = getNextTier(totalSolved);

    let html = `
      <div class="dash-card badges-card">
        <div class="dash-card-label">Badges</div>
        <div class="badges-count">${current ? 1 : 0}</div>`;

    if (current) {
      html += `
        <div class="badge-chip badge-${current.name.toLowerCase()}">
          <span class="badge-icon">&#127942;</span><span>${current.name}</span>
        </div>`;
    }

    if (next) {
      const remaining = next.min - totalSolved;
      html += `
        <div class="badge-locked">
          <span class="badge-locked-label">Locked Badge</span>
          <span class="badge-locked-name">${next.name} &middot; ${remaining} problem${remaining === 1 ? "" : "s"} to go</span>
        </div>`;
    } else {
      html += `
        <div class="badge-locked badge-locked--done">
          <span class="badge-locked-label">All badges</span>
          <span class="badge-locked-name">Platinum unlocked &#127881;</span>
        </div>`;
    }

    html += `</div>`;
    return html;
  }

  function buildHeatmapWeeks(byDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const rangeDays = 371; // ~53 weeks
    const rangeStart = new Date(today);
    rangeStart.setDate(rangeStart.getDate() - (rangeDays - 1));

    const start = new Date(rangeStart);
    start.setDate(start.getDate() - start.getDay()); // back up to the Sunday on/before

    const totalSpanDays = Math.round((today - start) / 86400000) + 1;
    const numWeeks = Math.ceil(totalSpanDays / 7);

    const weeks = [];
    for (let w = 0; w < numWeeks; w += 1) {
      const week = [];
      for (let d = 0; d < 7; d += 1) {
        const cellDate = new Date(start);
        cellDate.setDate(start.getDate() + w * 7 + d);
        const iso = todayISO(cellDate);
        week.push({
          date: iso,
          count: byDate[iso] || 0,
          isFuture: cellDate.getTime() > today.getTime(),
          month: cellDate.getMonth(),
        });
      }
      weeks.push(week);
    }
    return weeks;
  }

  function renderHeatmapCard(stats) {
    const weeks = buildHeatmapWeeks(stats.byDate);
    let trackedMonth = -1;
    let monthsHtml = "";
    let gridHtml = "";

    weeks.forEach((week) => {
      const firstMonth = week[0].month;
      let label = "";
      if (firstMonth !== trackedMonth) {
        label = MONTH_ABBR[firstMonth];
        trackedMonth = firstMonth;
      }
      monthsHtml += `<span class="heatmap-month-label">${label}</span>`;

      let colHtml = "";
      week.forEach((day) => {
        if (day.isFuture) {
          colHtml += `<span class="heatmap-cell is-future"></span>`;
          return;
        }
        const level = day.count === 0 ? 0 : day.count === 1 ? 1 : day.count === 2 ? 2 : 3;
        const label2 = day.count === 0 ? "No submissions" : `${day.count} submission${day.count === 1 ? "" : "s"}`;
        colHtml += `<span class="heatmap-cell level-${level}" title="${day.date} &middot; ${label2}"></span>`;
      });
      gridHtml += `<div class="heatmap-week">${colHtml}</div>`;
    });

    return `
      <div class="dash-card heatmap-card">
        <div class="heatmap-header">
          <span>${stats.totalSubmissions} submission${stats.totalSubmissions === 1 ? "" : "s"} in the past one year</span>
          <div class="heatmap-stats">
            <span>Total active days: <strong>${stats.activeDays}</strong></span>
            <span>Max streak: <strong>${stats.maxStreak}</strong></span>
          </div>
        </div>
        <div class="heatmap-body">
          <div class="heatmap-months">${monthsHtml}</div>
          <div class="heatmap-grid">${gridHtml}</div>
        </div>
      </div>`;
  }

  function renderDashboard() {
    const stats = computeStats();
    const pct = TOTAL_PROBLEMS ? Math.round((stats.totalSolved / TOTAL_PROBLEMS) * 100) : 0;

    contentEl.innerHTML = `
      <div class="content-inner content-inner--wide">
        <div class="dashboard-heading">
          <h1 class="dashboard-title">Dashboard</h1>
          <p class="dashboard-subtitle">Your progress across the Top Interview 150 set.</p>
        </div>

        <div class="dashboard-grid">
          <div class="dash-card ring-card">
            <div class="ring-wrap">
              ${buildRingSvg(stats.byDiff, stats.totalSolved)}
              <div class="ring-center">
                <span class="ring-number">${stats.totalSolved}<span class="ring-number-total">/${TOTAL_PROBLEMS}</span></span>
                <span class="ring-solved-label">Solved</span>
                <span class="ring-pct">${pct}% complete</span>
              </div>
            </div>
            <div class="stat-mini-list">
              ${statMiniHtml("Easy", "easy", stats.byDiff.Easy.solved, stats.byDiff.Easy.total)}
              ${statMiniHtml("Med.", "medium", stats.byDiff.Medium.solved, stats.byDiff.Medium.total)}
              ${statMiniHtml("Hard", "hard", stats.byDiff.Hard.solved, stats.byDiff.Hard.total)}
            </div>
          </div>

          ${renderBadgesCard(stats.totalSolved)}
          ${renderHeatmapCard(stats)}
        </div>

        <button class="reset-progress-btn" type="button" data-action="reset-progress">Reset progress</button>
      </div>`;
  }

  /* ----------------------------------------------------------
     10. RENDER: PROBLEM DETAIL
     ---------------------------------------------------------- */

  function renderProblem() {
    const cat = DATA[state.active.cat];
    if (!cat) {
      contentEl.innerHTML = `<div class="content-inner"><p class="placeholder-card">Select a problem from the sidebar to get started.</p></div>`;
      return;
    }
    const [name, diff] = cat.problems[state.active.prob];
    const dClass = diffClass(diff);

    contentEl.innerHTML = `
      <div class="content-inner">
        <div class="breadcrumb">DSA Solutions <span class="crumb-accent">/</span> ${escapeHtml(cat.category)}</div>

        <div class="problem-header">
          <h1 class="problem-title">${escapeHtml(name)}</h1>
          <span class="difficulty-badge ${dClass}">${diff}</span>
        </div>

        <div class="problem-category-row">
          <span class="cat-label">Category:</span>
          <span class="cat-value">${escapeHtml(cat.category)}</span>
        </div>

        <div class="placeholder-card">
          <strong>Solution will be added later.</strong> This page is a structural placeholder —
          the problem statement, approach notes, and complexity analysis for
          &ldquo;${escapeHtml(name)}&rdquo; will go here.
        </div>

        <div class="section-label">Solution</div>
        <div class="code-block">
          <div class="code-block-bar">
            <span class="code-dot red"></span>
            <span class="code-dot yellow"></span>
            <span class="code-dot green"></span>
            <span class="code-block-lang">solution.js</span>
          </div>
          <div class="code-block-body">
            <code>// code coming soon</code>
          </div>
        </div>

        <div class="actions-row">
          <a class="btn-github" href="#" data-action="github" aria-disabled="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07
                -1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18
                1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
                2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38
                A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
            </svg>
            <span>View on GitHub</span>
          </a>
        </div>
      </div>`;
  }

  /* ----------------------------------------------------------
     11. RENDER DISPATCH
     ---------------------------------------------------------- */

  function renderContent() {
    if (state.view === "dashboard") {
      renderDashboard();
    } else {
      renderProblem();
    }
  }

  /* ----------------------------------------------------------
     12. ACTIONS
     ---------------------------------------------------------- */

  function toggleCategory(catIndex) {
    if (state.expanded.has(catIndex)) {
      state.expanded.delete(catIndex);
    } else {
      state.expanded.add(catIndex);
    }
    renderSidebar();
  }

  function setDashboardActive(isActive) {
    dashboardBtn.classList.toggle("is-active", isActive);
    if (isActive) {
      dashboardBtn.setAttribute("aria-current", "page");
    } else {
      dashboardBtn.removeAttribute("aria-current");
    }
  }

  function selectDashboard() {
    state.view = "dashboard";
    setDashboardActive(true);
    renderSidebar();
    renderContent();
    contentEl.scrollTop = 0;
    closeMobileSidebar();
  }

  function selectProblem(catIndex, probIndex) {
    state.view = "problem";
    state.active = { cat: catIndex, prob: probIndex };
    state.expanded.add(catIndex);
    setDashboardActive(false);
    renderSidebar();
    renderContent();
    contentEl.scrollTop = 0;
    closeMobileSidebar();
  }

  function handleSearch(value) {
    state.query = value;
    searchClear.hidden = value.length === 0;
    renderSidebar();
  }

  function handleToggleSolved(id) {
    toggleSolved(id);
    renderSidebar();
    if (state.view === "dashboard") {
      renderContent();
    }
  }

  function handleResetProgress() {
    const ok = window.confirm("Reset all solved progress and activity history? This cannot be undone.");
    if (!ok) return;
    resetProgress();
    renderSidebar();
    renderContent();
  }

  /* ----------------------------------------------------------
     13. MOBILE DRAWER
     ---------------------------------------------------------- */

  function openMobileSidebar() {
    sidebar.classList.add("is-open");
    sidebarOverlay.classList.add("is-visible");
    hamburgerBtn.classList.add("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
  }

  function closeMobileSidebar() {
    sidebar.classList.remove("is-open");
    sidebarOverlay.classList.remove("is-visible");
    hamburgerBtn.classList.remove("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }

  function toggleMobileSidebar() {
    if (sidebar.classList.contains("is-open")) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  }

  /* ----------------------------------------------------------
     14. EVENT WIRING
     ---------------------------------------------------------- */

  sidebarNav.addEventListener("click", function (e) {
    const trigger = e.target.closest("[data-action]");
    if (!trigger) return;

    const action = trigger.dataset.action;

    if (action === "toggle") {
      toggleCategory(Number(trigger.dataset.cat));
    } else if (action === "select") {
      selectProblem(Number(trigger.dataset.cat), Number(trigger.dataset.prob));
    } else if (action === "toggle-solved") {
      handleToggleSolved(trigger.dataset.id);
    }
  });

  contentEl.addEventListener("click", function (e) {
    const trigger = e.target.closest("[data-action]");
    if (!trigger) return;

    const action = trigger.dataset.action;

    if (action === "github") {
      e.preventDefault();
      // Placeholder link — wire up to a real repository later.
    } else if (action === "reset-progress") {
      handleResetProgress();
    }
  });

  dashboardBtn.addEventListener("click", selectDashboard);

  searchInput.addEventListener("input", function (e) {
    handleSearch(e.target.value);
  });

  searchClear.addEventListener("click", function () {
    searchInput.value = "";
    searchInput.focus();
    handleSearch("");
  });

  hamburgerBtn.addEventListener("click", toggleMobileSidebar);
  sidebarOverlay.addEventListener("click", closeMobileSidebar);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 880) closeMobileSidebar();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileSidebar();
  });

  /* ----------------------------------------------------------
     15. INIT
     ---------------------------------------------------------- */

  function init() {
    renderSidebar();
    renderContent();
  }

  init();
})();