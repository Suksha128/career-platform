// =====================================================================
// lib/mockData.ts — Rich mock fixtures for all 5 platform agents
// No API keys required; all features demo instantly.
// =====================================================================

export const MOCK_CANDIDATE_PROFILE = {
  name: "Arjun Sharma",
  email: "arjun.sharma@college.edu",
  preferred_domain: "Software Development",
  experience_years: 0,
  location: "Bangalore, India",
  extracted_skills: ["Python", "React", "JavaScript", "HTML", "CSS", "Node.js", "SQL", "Git", "REST APIs"],
  soft_skills: ["Communication", "Team Collaboration", "Problem Solving", "Time Management"],
  tools: ["VS Code", "GitHub", "Postman", "Figma"],
  education: [
    { degree: "B.Tech Computer Science", institution: "RVCE Bangalore", year: "2025", cgpa: "8.4" }
  ],
  projects: [
    { title: "E-Commerce Web App", description: "Full-stack React + Node.js with PostgreSQL", tech_stack: ["React", "Node.js", "PostgreSQL", "Stripe API"] },
    { title: "ML Sentiment Analyzer", description: "NLP pipeline using scikit-learn", tech_stack: ["Python", "scikit-learn", "NLTK", "Flask"] },
    { title: "Campus Event Portal", description: "Event management system with real-time updates", tech_stack: ["React", "Firebase", "Tailwind CSS"] }
  ],
  certifications: ["AWS Cloud Practitioner", "Meta Front-End Developer (Coursera)"],
};

export const MOCK_JOB_OPENINGS = [
  {
    id: "j1",
    company: "Amazon",
    role: "SDE-1 (Software Development Engineer)",
    location: "Bangalore, India",
    type: "Full-Time",
    location_type: "Hybrid",
    posted: "2 days ago",
    salary: "₹25–32 LPA",
    logo: "🟠",
    required_skills: ["Python", "Java", "Data Structures", "Algorithms", "System Design", "SQL", "OOP", "LLD"],
    description: "Join Amazon's world-class engineering team building scalable distributed systems.",
    match_score: 74,
    matched_skills: ["Python", "SQL", "REST APIs", "Git"],
    missing_skills: ["Java", "Data Structures (Advanced)", "System Design", "LLD"],
    location_suitability: "High",
    fresher_friendly: true,
  },
  {
    id: "j2",
    company: "Google",
    role: "Associate Software Engineer",
    location: "Hyderabad, India",
    type: "Full-Time",
    location_type: "On-Site",
    posted: "1 week ago",
    salary: "₹30–42 LPA",
    logo: "🔵",
    required_skills: ["C++", "Python", "Algorithms", "Data Structures", "System Design", "Machine Learning"],
    description: "Work on Google-scale problems impacting billions of users worldwide.",
    match_score: 61,
    matched_skills: ["Python", "Machine Learning (basic)", "Git"],
    missing_skills: ["C++", "Advanced Algorithms", "System Design", "Distributed Systems"],
    location_suitability: "Medium",
    fresher_friendly: false,
  },
  {
    id: "j3",
    company: "Infosys",
    role: "Systems Engineer",
    location: "Bangalore, India",
    type: "Full-Time",
    location_type: "On-Site",
    posted: "3 days ago",
    salary: "₹4.5–6.5 LPA",
    logo: "🟣",
    required_skills: ["Java", "SQL", "OOPS", "Communication", "Teamwork"],
    description: "Join India's premier IT services company as a fresher hire for the 2025 batch.",
    match_score: 82,
    matched_skills: ["SQL", "JavaScript", "Communication", "Teamwork", "REST APIs"],
    missing_skills: ["Java", "OOPS (formal)"],
    location_suitability: "High",
    fresher_friendly: true,
  },
  {
    id: "j4",
    company: "TCS",
    role: "Smart Hire / NQT Qualifier",
    location: "Multiple Cities",
    type: "Full-Time",
    location_type: "On-Site",
    posted: "5 days ago",
    salary: "₹3.5–7 LPA",
    logo: "🔷",
    required_skills: ["Aptitude", "Reasoning", "Programming Basics", "SQL", "Communication"],
    description: "TCS National Qualifier Test for top campus batch — multiple tracks available.",
    match_score: 91,
    matched_skills: ["SQL", "Python", "JavaScript", "React", "Communication", "Git"],
    missing_skills: ["Formal Aptitude Practice"],
    location_suitability: "High",
    fresher_friendly: true,
  },
  {
    id: "j5",
    company: "Wipro",
    role: "Project Engineer (WILP)",
    location: "Pune, India",
    type: "Full-Time",
    location_type: "Hybrid",
    posted: "1 day ago",
    salary: "₹5–7 LPA",
    logo: "🟤",
    required_skills: ["Python", "SQL", "REST APIs", "OOP", "Testing"],
    description: "Work-integrated learning program combining industry experience with upskilling.",
    match_score: 85,
    matched_skills: ["Python", "SQL", "REST APIs", "Node.js", "Git"],
    missing_skills: ["Unit Testing", "OOP (formal)"],
    location_suitability: "Medium",
    fresher_friendly: true,
  },
  {
    id: "j6",
    company: "Microsoft",
    role: "Software Engineer (University)",
    location: "Hyderabad, India",
    type: "Full-Time",
    location_type: "Hybrid",
    posted: "4 days ago",
    salary: "₹20–28 LPA",
    logo: "🪟",
    required_skills: ["C#", "Azure", "TypeScript", "Algorithms", "System Design", "OOP"],
    description: "Join Microsoft's university hiring program with opportunities across Azure, M365, and Gaming.",
    match_score: 68,
    matched_skills: ["JavaScript/TypeScript", "React", "REST APIs", "Git", "SQL"],
    missing_skills: ["C#", "Azure", "System Design", "Advanced Algorithms"],
    location_suitability: "Medium",
    fresher_friendly: true,
  },
];

// Mock radar chart skill data
export const MOCK_SKILL_RADAR = [
  { skill: "Python", candidate: 75, required: 85 },
  { skill: "DSA", candidate: 45, required: 90 },
  { skill: "System Design", candidate: 20, required: 75 },
  { skill: "SQL", candidate: 70, required: 80 },
  { skill: "React/JS", candidate: 80, required: 70 },
  { skill: "OOP", candidate: 55, required: 85 },
  { skill: "REST APIs", candidate: 72, required: 75 },
];

// Mock tailored resume bullets
export const MOCK_RESUME_TAILORED = {
  company: "Amazon",
  role: "SDE-1",
  ats_score_before: 54,
  ats_score_after: 87,
  summary: "Results-driven Computer Science engineer with hands-on experience in Python, React, and distributed web services. Built 3 production-grade full-stack applications processing 10K+ events. Demonstrated ability to optimize REST API throughput and design data-efficient SQL schemas — directly aligned with Amazon's SDE-1 engineering standards.",
  bullets: [
    {
      original: "Built an e-commerce website using React and Node.js",
      tailored: "Engineered a full-stack e-commerce platform using React.js and Node.js serving 500+ concurrent users, reducing checkout latency by 35% via optimized REST API architecture and PostgreSQL query indexing.",
      keywords_added: ["REST API", "PostgreSQL", "scalable", "concurrent users"],
    },
    {
      original: "Made a sentiment analysis model using Python",
      tailored: "Developed an NLP-based sentiment analysis pipeline using Python and scikit-learn achieving 91% F1-score on 50K+ review dataset, deployed as a Flask microservice integrated with 3rd-party systems.",
      keywords_added: ["microservice", "pipeline", "F1-score", "deployed"],
    },
    {
      original: "Built event portal for college",
      tailored: "Designed and launched a real-time campus event management system using React and Firebase, automating notifications for 2,000+ students and reducing manual coordination overhead by 60%.",
      keywords_added: ["real-time", "automation", "scalability", "Firebase"],
    },
  ],
  ats_keywords: ["distributed systems", "scalable", "OOP", "Java/Python", "LLD", "data structures", "agile", "ownership"],
  formatting_tips: [
    "Place Technical Skills section ABOVE Education — Amazon recruiters scan skills first.",
    "Add a 'Leadership Principles Alignment' note to your summary.",
    "Quantify every bullet with a numeric impact metric.",
    "Include your GitHub profile link prominently at the top.",
  ],
};

// Mock quiz questions
export const MOCK_QUIZ_QUESTIONS = {
  "TCS": [
    {
      id: 1, company: "TCS", year_asked: "TCS NQT 2024",
      category: "Aptitude",
      question: "A train 125 m long passes a pole in 5 seconds. What is the speed of the train in km/hr?",
      options: ["72 km/hr", "90 km/hr", "100 km/hr", "54 km/hr"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Speed = Distance/Time = 125/5 = 25 m/s. Convert to km/hr: 25 × (18/5) = 90 km/hr. Remember: multiply m/s by 18/5 to get km/hr.",
    },
    {
      id: 2, company: "TCS", year_asked: "TCS NQT 2023",
      category: "Coding",
      question: "What is the output of this Python code?\n\n  x = [1, 2, 3, 4, 5]\n  print(x[-2:])",
      options: ["[4, 5]", "[3, 4, 5]", "[1, 2, 3]", "[5]"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Negative slicing in Python: x[-2:] starts from the 2nd last element (index -2 = 4) to the end. Result: [4, 5]. This is a very common TCS NQT coding question.",
    },
    {
      id: 3, company: "TCS", year_asked: "TCS Digital 2024",
      category: "SQL",
      question: "Which SQL clause is used to filter groups after a GROUP BY aggregation?",
      options: ["WHERE", "HAVING", "FILTER", "LIMIT"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "HAVING clause filters aggregated groups AFTER GROUP BY (e.g., HAVING COUNT(*) > 5). WHERE filters individual rows BEFORE grouping. This distinction is crucial and asked in virtually every TCS SQL round.",
    },
    {
      id: 4, company: "TCS", year_asked: "TCS NQT 2022",
      category: "Verbal",
      question: "Choose the word that best completes the sentence: 'The scientist's _____ approach to research helped uncover solutions others had overlooked.'",
      options: ["methodical", "haphazard", "complacent", "dismissive"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "The context requires a positive word describing careful, systematic work. 'Methodical' = proceeding in a systematic, orderly way. Other options are negative or neutral.",
    },
    {
      id: 5, company: "TCS", year_asked: "TCS Digital 2023",
      category: "Data Structures",
      question: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "In a balanced BST, each comparison eliminates half the tree. With n nodes and height log(n), search takes O(log n). This degrades to O(n) for a skewed/unbalanced BST.",
    },
  ],
  "Amazon": [
    {
      id: 1, company: "Amazon", year_asked: "Amazon SDE-1 2024",
      category: "Data Structures",
      question: "Given an array of integers, find two numbers that sum to a target value. What is the most efficient approach?",
      options: ["O(n²) brute force nested loop", "Sort and binary search — O(n log n)", "Hash map in single pass — O(n)", "Two pointer after sorting — O(n log n)"],
      correct_index: 2,
      difficulty: "Medium",
      explanation: "The optimal solution uses a hash map: for each element x, check if (target-x) exists in the map. Single pass = O(n) time, O(n) space. This is a classic LeetCode #1 and an Amazon staple question.",
    },
    {
      id: 2, company: "Amazon", year_asked: "Amazon Internship 2023",
      category: "System Design",
      question: "Amazon's S3 storage stores billions of objects. Which consistency model does Amazon S3 now provide?",
      options: ["Eventual consistency for all operations", "Strong read-after-write consistency for all S3 objects", "Weak consistency for GET after PUT", "No consistency guarantees"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "Since Dec 2020, Amazon S3 provides strong read-after-write consistency for all operations (GETs, PUTs, LISTs). This was a major update from eventual consistency. Amazon tests this in senior/intern system design discussions.",
    },
    {
      id: 3, company: "Amazon", year_asked: "Amazon SDE-1 2023",
      category: "OOP",
      question: "Which SOLID principle states that a class should have only ONE reason to change?",
      options: ["Open/Closed Principle", "Single Responsibility Principle", "Liskov Substitution Principle", "Interface Segregation Principle"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Single Responsibility Principle (SRP): Every class should do exactly one thing and have one reason to change. Amazon's LLD rounds focus heavily on SOLID principles and clean code design.",
    },
  ],
  "Infosys": [
    {
      id: 1, company: "Infosys", year_asked: "Infosys InfyTQ 2024",
      category: "Java",
      question: "What is the output of: System.out.println(10 + 20 + \"Hello\" + 10 + 20)?",
      options: ["30Hello30", "30Hello1020", "102Hello1020", "1020Hello1020"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Java evaluates left to right: 10+20=30 (int arithmetic), then 30+'Hello'='30Hello' (string concat), then '30Hello'+10='30Hello10', then '30Hello10'+20='30Hello1020'. String concatenation changes the type mid-expression.",
    },
    {
      id: 2, company: "Infosys", year_asked: "Infosys 2023",
      category: "Aptitude",
      question: "If 8 workers can complete a job in 12 days, how many days will 12 workers take to complete the same job?",
      options: ["6 days", "8 days", "10 days", "16 days"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Work = 8 × 12 = 96 worker-days. With 12 workers: 96 ÷ 12 = 8 days. This is a classic 'men-days' problem frequently appearing in Infosys aptitude sections.",
    },
  ],
};

// Mock learning path
export const MOCK_LEARNING_PATH = [
  {
    skill: "Data Structures & Algorithms",
    priority: "Critical",
    hours: 40,
    difficulty: "Advanced",
    color: "#f43f5e",
    why: "Required for ALL product company interviews (Amazon, Google, Microsoft)",
    modules: [
      { topic: "Arrays, Strings, Hashing", hours: 6, resource: "NeetCode 150 Playlist", url: "https://www.youtube.com/watch?v=3OamzN90kPg", platform: "YouTube" },
      { topic: "Linked Lists & Stacks/Queues", hours: 5, resource: "Abdul Bari DSA Course", url: "https://www.youtube.com/watch?v=zLnJcAt1UbM", platform: "YouTube" },
      { topic: "Trees & Binary Search Trees", hours: 8, resource: "William Fiset — Trees", url: "https://www.youtube.com/watch?v=oSWTXtMglKE", platform: "YouTube" },
      { topic: "Graphs (BFS/DFS/Dijkstra)", hours: 8, resource: "Striver A2Z DSA Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/", platform: "Website" },
      { topic: "Dynamic Programming", hours: 10, resource: "Aditya Verma DP Playlist", url: "https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go", platform: "YouTube" },
      { topic: "Practice: LeetCode Top 150", hours: 3, resource: "LeetCode Top Interview 150", url: "https://leetcode.com/studyplan/top-interview-150/", platform: "LeetCode" },
    ]
  },
  {
    skill: "System Design",
    priority: "High",
    hours: 20,
    difficulty: "Advanced",
    color: "#f59e0b",
    why: "Essential for SDE-1+ roles at product companies",
    modules: [
      { topic: "Fundamentals (Scaling, Load Balancing, Caching)", hours: 4, resource: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", platform: "GitHub" },
      { topic: "Database Design & Sharding", hours: 4, resource: "Gaurav Sen — System Design", url: "https://www.youtube.com/watch?v=xpDnVSmNFX0", platform: "YouTube" },
      { topic: "Microservices Architecture", hours: 5, resource: "TechDummies Systemd Design", url: "https://www.youtube.com/watch?v=y8OnoxKotPQ", platform: "YouTube" },
      { topic: "Case Studies: Design Twitter, YouTube", hours: 7, resource: "Alex Xu — DDIA Book (Free PDF)", url: "https://www.youtube.com/watch?v=vvhC64hQZMk", platform: "YouTube" },
    ]
  },
  {
    skill: "Java (OOP + Core)",
    priority: "High",
    hours: 15,
    difficulty: "Intermediate",
    color: "#6366f1",
    why: "Preferred language for Infosys, Wipro, and Cognizant rounds",
    modules: [
      { topic: "Java Basics & OOP Concepts", hours: 5, resource: "Programming with Mosh — Java", url: "https://www.youtube.com/watch?v=eIrMbAQSU34", platform: "YouTube" },
      { topic: "Collections Framework & Generics", hours: 4, resource: "Telusko Java Full Course", url: "https://www.youtube.com/watch?v=BGTx91t8q50", platform: "YouTube" },
      { topic: "Exception Handling & Multithreading", hours: 3, resource: "Java Brains", url: "https://www.youtube.com/c/JavaBrainsChannel", platform: "YouTube" },
      { topic: "Spring Boot Basics (Bonus)", hours: 3, resource: "Amigoscode Spring Boot", url: "https://www.youtube.com/watch?v=9SGDpanrc8U", platform: "YouTube" },
    ]
  },
  {
    skill: "SQL & Database Design",
    priority: "Medium",
    hours: 10,
    difficulty: "Intermediate",
    color: "#10b981",
    why: "SQL is tested in EVERY company's online assessment",
    modules: [
      { topic: "SQL Fundamentals & JOINs", hours: 3, resource: "freeCodeCamp SQL Tutorial", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", platform: "YouTube" },
      { topic: "Subqueries, GROUP BY, HAVING", hours: 3, resource: "Ankit Bansal SQL Playlist", url: "https://www.youtube.com/watch?v=M-55BmjOuXY", platform: "YouTube" },
      { topic: "Practice: HackerRank SQL", hours: 4, resource: "HackerRank SQL Challenges", url: "https://www.hackerrank.com/domains/sql", platform: "HackerRank" },
    ]
  },
  {
    skill: "Aptitude & Reasoning",
    priority: "Medium",
    hours: 12,
    difficulty: "Beginner",
    color: "#06b6d4",
    why: "Mandatory screening round for TCS, Infosys, Wipro, Accenture",
    modules: [
      { topic: "Number System, Time & Work", hours: 3, resource: "Arun Sharma Quant (PDF + Video)", url: "https://www.youtube.com/watch?v=fUWClKEgYas", platform: "YouTube" },
      { topic: "Logical Reasoning & Puzzles", hours: 4, resource: "PrepInsta Aptitude Series", url: "https://prepinsta.com/aptitude/", platform: "Website" },
      { topic: "Verbal Ability & Reading Comprehension", hours: 2, resource: "IndiaBIX Verbal Section", url: "https://www.indiabix.com/verbal-ability/", platform: "Website" },
      { topic: "Mock Tests — TCS / Infosys Pattern", hours: 3, resource: "PrepInsta Mock Tests", url: "https://prepinsta.com/mock-tests/", platform: "Website" },
    ]
  }
];

export const COMPANIES = ["TCS", "Amazon", "Infosys", "Wipro", "Microsoft", "Google", "Accenture", "Cognizant"];
export const DOMAINS = [
  "Software Development (SDE)", "Data Science & ML", "Data Engineering",
  "Frontend Development", "Backend Development", "DevOps & Cloud",
  "Business Analyst", "Product Management", "QA / Testing"
];
export const EXPERIENCE_LEVELS = ["Fresher (0 years)", "0-1 Year", "1-2 Years", "2-3 Years"];
export const LOCATIONS = ["Bangalore", "Hyderabad", "Chennai", "Pune", "Mumbai", "Delhi NCR", "Remote/Any"];
