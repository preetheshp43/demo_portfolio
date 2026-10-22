export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Web' | 'Python';
  tagline: string;
  description: string;
  architectureHighlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: string; icon?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  status: string;
  description: string[];
  coursework?: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Preethesh Poojary',
    role: 'Software & AI Engineer',
    educationBadge: 'Final-Year B.E. AI & ML Student',
    seeking: 'Seeking Software Development & AI/ML Internships (2027 Batch)',
    cgpa: '8.80 / 10',
    location: 'Mangaluru, Karnataka, India',
    email: 'preetheshp43@gmail.com',
    phone: '+91 8618570449',
    github: 'https://github.com/preetheshp43',
    linkedin: 'https://linkedin.com/in/preethesh-poojary-5a072338a',
    resumeUrl: '/resume.pdf',
    pitch:
      'Final-year AI & ML undergraduate with an 8.80 CGPA building agentic AI architectures and full-stack web applications that convert complex data streams into automated, reliable decisions.',
    rotatingRoles: [
      'Software & AI Engineer',
      'Agentic Systems Builder',
      'ML Enthusiast',
      'Full-Stack Developer'
    ],
  },

  about: {
    bio: [
      "I am a final-year B.E. student specializing in Artificial Intelligence & Machine Learning at A.J. Institute of Engineering & Technology, Mangaluru, holding an 8.80/10 CGPA.",
      "My core strengths lie in Python, Data Structures & Algorithms, C, and modern AI architectures. I have engineered agentic workflows with multi-step tool execution, state management, and real-time decision optimization.",
      "Beyond machine learning models, I build clean, high-performance web applications using React, TypeScript, and Tailwind CSS. I prioritize rigorous code quality, version control via Git/GitHub, and collaborative agile engineering."
    ],
    stats: [
      { label: 'Cumulative GPA', value: '8.80 / 10' },
      { label: 'Graduation Year', value: 'Jan 2027' },
      { label: 'Core Languages', value: 'Python · C · TS' },
      { label: 'Focus Areas', value: 'Agentic AI & Web' },
    ],
    highlights: [
      {
        title: 'Agentic AI & Modular Workflows',
        description: 'Hands-on design of agent planning, retrieval, API integration, and deterministic execution loops.'
      },
      {
        title: 'Core Computer Science',
        description: 'Strong foundation in Data Structures, Object-Oriented Programming, and algorithmic problem-solving.'
      },
      {
        title: 'Full-Stack Web Engineering',
        description: 'Crafting responsive, accessible web interfaces backed by clean database schemas and REST APIs.'
      },
      {
        title: 'Collaborative Version Control',
        description: 'Proficient in branch workflows, code reviews, and modular documentation using Git and GitHub.'
      }
    ]
  },

  skillCategories: [
    {
      title: 'Programming',
      description: 'Foundational and high-level languages for systems and algorithms',
      skills: [
        { name: 'Python' },
        { name: 'C' },
        { name: 'TypeScript' },
        { name: 'JavaScript' }
      ]
    },
    {
      title: 'Core Computer Science',
      description: 'Algorithmic rigor and computer science principles',
      skills: [
        { name: 'Data Structures & Algorithms' },
        { name: 'OOP (Object-Oriented Programming)' },
        { name: 'Problem Solving' },
        { name: 'Algorithm Optimization' }
      ]
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent systems, data manipulation, and autonomous agents',
      skills: [
        { name: 'Agentic AI' },
        { name: 'Artificial Intelligence' },
        { name: 'Machine Learning' },
        { name: 'NumPy' },
        { name: 'Pandas' },
        { name: 'Model Evaluation' }
      ]
    },
    {
      title: 'Web Technologies',
      description: 'Modern front-end tooling and UI development',
      skills: [
        { name: 'React' },
        { name: 'TypeScript' },
        { name: 'Tailwind CSS' },
        { name: 'HTML5' },
        { name: 'CSS3' },
        { name: 'Vite' }
      ]
    },
    {
      title: 'Database',
      description: 'Relational data management and persistence',
      skills: [
        { name: 'DBMS' },
        { name: 'SQL' },
        { name: 'Relational Schema Design' },
        { name: 'Query Optimization' }
      ]
    },
    {
      title: 'Tools & DevOps',
      description: 'Workflow, collaboration, and modern dev tools',
      skills: [
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'VS Code' },
        { name: 'Vercel / Netlify' },
        { name: 'Postman' }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: 'retail-supply-chain-agent',
      title: 'Autonomous Retail Supply Chain Agent',
      category: 'AI/ML',
      featured: true,
      tagline: 'Multi-Agent Autonomous Decision Engine for Retail Inventory & Logistics',
      description:
        'An agentic AI system engineered for autonomous retail supply-chain decisions. Features a modular architecture incorporating autonomous planning, external inventory tools/APIs, dynamic retrieval, multi-step execution loops, state management, and continuous performance evaluation.',
      architectureHighlights: [
        'Modular multi-step agent planning with deterministic tool-calling',
        'State persistence and evaluation engine for risk-weighted supply routing',
        'Collaborative development using Git/GitHub branching and modular PR workflows'
      ],
      techStack: ['Python', 'Agentic AI', 'Pandas', 'NumPy', 'REST APIs', 'Git/GitHub'],
      githubUrl: 'https://github.com/preetheshp43',
      liveUrl: 'https://github.com/preetheshp43',
      metrics: 'Zero-Touch Decision Pipeline'
    },
    {
      id: 'disaster-response-intelligence',
      title: 'AI-Powered Disaster Response Intelligence & Resource Optimization',
      category: 'AI/ML',
      featured: true,
      tagline: 'Real-Time Emergency Situation Analysis & Automated Resource Allocation',
      description:
        'An intelligent system designed to analyze emergency disaster situations and support real-time resource allocation, emergency response planning, and decision support under high-uncertainty environments.',
      architectureHighlights: [
        'Situation analysis pipeline scoring emergency severity across geographic clusters',
        'Optimization algorithms maximizing resource dispatch speed and casualty prevention',
        'Interactive situational dashboard for decision-makers and response teams'
      ],
      techStack: ['Python', 'Machine Learning', 'Data Analysis', 'NumPy', 'Decision Support'],
      githubUrl: 'https://github.com/preetheshp43',
      liveUrl: 'https://github.com/preetheshp43',
      metrics: 'Priority Allocation Engine'
    },
    {
      id: 'sgpa-cgpa-calculator',
      title: 'SGPA & CGPA Academic Calculator',
      category: 'Python',
      featured: false,
      tagline: 'Automated Academic Performance Computation Engine',
      description:
        'A robust Python application that automates semester and cumulative grade point average calculation using core Python fundamentals, credit-weight algorithms, and clean error handling for university grading schemes.',
      architectureHighlights: [
        'Deterministic credit-to-grade mapping supporting university credit schemas',
        'Clean CLI and structured file persistence for multi-semester academic records',
        'Comprehensive input validation ensuring fault-tolerant calculations'
      ],
      techStack: ['Python', 'File I/O', 'Data Validation', 'Algorithms', 'OOP'],
      githubUrl: 'https://github.com/preetheshp43',
      liveUrl: 'https://github.com/preetheshp43',
      metrics: '100% Deterministic Accuracy'
    }
  ] as Project[],

  education: [
    {
      degree: 'Bachelor of Engineering (B.E.) in Artificial Intelligence & Machine Learning',
      institution: 'A.J. Institute of Engineering & Technology (AJIET)',
      location: 'Mangaluru, Karnataka, India',
      period: '2023 — 01/2027 (Expected)',
      score: '8.80 / 10 CGPA',
      status: 'Final-Year Undergraduate',
      description: [
        'Specializing in Artificial Intelligence, Deep Learning, Autonomous Systems, and Algorithms.',
        'Maintained a consistently outstanding academic record with a cumulative GPA of 8.80 / 10.',
        'Active contributor in tech labs, hands-on project builds, and collaborative software engineering.'
      ],
      coursework: [
        'Data Structures & Algorithms',
        'Artificial Intelligence',
        'Machine Learning',
        'Database Management Systems',
        'Object-Oriented Programming'
      ]
    },
    {
      degree: 'Higher Secondary Education (Class XII - Pre-University)',
      institution: "Bhandarkars' Arts & Science College",
      location: 'Kundapura, Udupi, Karnataka, India',
      period: '2021 — 2023',
      score: '89% Percentage',
      status: 'Distinction',
      description: [
        'Focused on Mathematics, Physics, Chemistry, and Computer Science foundation.',
        'Graduated with Distinction (89%), demonstrating solid mathematical and analytical reasoning.'
      ]
    }
  ] as EducationItem[]
};
