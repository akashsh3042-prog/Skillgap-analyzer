export const SAMPLE_PROFILES = [
  {
    id: 'frontend-sr',
    title: 'Senior Frontend Developer',
    subtitle: 'Targeting Lead React & Next.js Role',
    resumeFileName: 'Alex_Rivera_Resume_2026.pdf',
    resumeText: `Alex Rivera | Senior Frontend Developer
Summary: Passionate frontend engineer with 5 years of experience building modern web applications with React, TypeScript, Tailwind CSS, Redux Toolkit, and REST APIs. Proficient in web performance optimization, responsive design, component architecture, Jest unit testing, and Git version control.

Skills: React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Redux, Context API, REST APIs, Git, Webpack, Vite, Jest, Cypress, Responsive Web Design, Web Vitals Performance, UI/UX Design.`,
    jobTitle: 'Senior Frontend & Full-Stack AI Engineer',
    jobCompany: 'Nexus Technologies',
    jobDescription: `Role: Senior Frontend & Full-Stack AI Engineer

Key Responsibilities:
- Lead the architecture of high-performance frontend interfaces using React, Next.js 14 (App Router), and Tailwind CSS.
- Integrate GraphQL APIs and WebSocket connections for real-time AI analytics dashboards.
- Build micro-frontend components, implement CI/CD pipelines with GitHub Actions, and deploy serverless functions to Vercel/AWS.
- Optimize frontend bundling using Vite and Webpack, aiming for sub-second LCP scores.
- Unit testing with Vitest/Jest and E2E testing with Playwright.
- Collaborate with AI/ML engineering team to consume Python FastAPI endpoints and stream LLM responses.

Requirements:
- 4+ years of professional React experience.
- Deep expertise in React, TypeScript, Next.js, GraphQL, Node.js / Express, Docker, Tailwind CSS, CI/CD, Playwright, WebSockets.`,
    analysisResult: {
      matchScore: 78,
      readinessRating: 'Strong Alignment',
      summary: 'You match 78% of the core requirements for this position. Your foundation in React, TypeScript, and Tailwind CSS is solid. Acquiring Next.js App Router, GraphQL, WebSockets, and Playwright will close your skill gap.',
      stats: {
        totalRequired: 18,
        matchedCount: 12,
        missingCount: 6,
      },
      categories: [
        { name: 'Core Frontend', percentage: 95, matched: 6, total: 6, color: 'bg-sky-500' },
        { name: 'State & APIs', percentage: 70, matched: 3, total: 4, color: 'bg-emerald-500' },
        { name: 'Fullstack & Cloud', percentage: 40, matched: 1, total: 3, color: 'bg-amber-500' },
        { name: 'Testing & DevOps', percentage: 50, matched: 2, total: 4, color: 'bg-rose-500' },
      ],
      matchedSkills: [
        { name: 'React.js', level: 'Expert', category: 'Core Frontend', icon: 'Code' },
        { name: 'TypeScript', level: 'Advanced', category: 'Core Frontend', icon: 'FileCode' },
        { name: 'Tailwind CSS', level: 'Expert', category: 'Core Frontend', icon: 'Palette' },
        { name: 'JavaScript (ES6+)', level: 'Expert', category: 'Core Frontend', icon: 'Cpu' },
        { name: 'HTML5 & CSS3', level: 'Expert', category: 'Core Frontend', icon: 'Layout' },
        { name: 'Vite & Webpack', level: 'Advanced', category: 'Core Frontend', icon: 'Zap' },
        { name: 'Redux Toolkit', level: 'Advanced', category: 'State & APIs', icon: 'Layers' },
        { name: 'REST APIs', level: 'Expert', category: 'State & APIs', icon: 'Globe' },
        { name: 'Git & GitHub', level: 'Advanced', category: 'Testing & DevOps', icon: 'GitBranch' },
        { name: 'Jest Unit Testing', level: 'Intermediate', category: 'Testing & DevOps', icon: 'CheckCircle' },
        { name: 'Web Vitals / Perf', level: 'Intermediate', category: 'Core Frontend', icon: 'Gauge' },
        { name: 'Responsive Design', level: 'Expert', category: 'Core Frontend', icon: 'Monitor' },
      ],
      missingSkills: [
        { name: 'Next.js 14 (App Router)', priority: 'High Priority', category: 'Fullstack & Cloud', hoursToLearn: 20, impact: '+10% Match' },
        { name: 'GraphQL & Apollo', priority: 'High Priority', category: 'State & APIs', hoursToLearn: 14, impact: '+7% Match' },
        { name: 'WebSockets (Real-time)', priority: 'Medium Priority', category: 'State & APIs', hoursToLearn: 10, impact: '+5% Match' },
        { name: 'Playwright E2E', priority: 'Medium Priority', category: 'Testing & DevOps', hoursToLearn: 12, impact: '+4% Match' },
        { name: 'Docker Containers', priority: 'Medium Priority', category: 'Fullstack & Cloud', hoursToLearn: 16, impact: '+5% Match' },
        { name: 'CI/CD GitHub Actions', priority: 'Low Priority', category: 'Testing & DevOps', hoursToLearn: 8, impact: '+3% Match' },
      ],
      roadmap: [
        {
          id: 'nextjs-14',
          skillName: 'Next.js 14 (App Router & SSR)',
          category: 'Fullstack & Cloud',
          priority: 'High Priority',
          estimatedDuration: '2 Weeks (20 hrs)',
          difficulty: 'Intermediate',
          description: 'Master server components, app routing architecture, server actions, and streaming SSR in Next.js 14.',
          keyTopics: [
            'App Router vs Pages Router architecture',
            'React Server Components (RSC) and Client Directives',
            'Server Actions & Form Handling',
            'Dynamic Routing, Parallel Routes, & Intercepting Routes',
            'SEO Optimization & OpenGraph Image Generation'
          ],
          courses: [
            {
              title: 'Next.js 14 & React - The Complete Guide',
              platform: 'Udemy / Vercel Academy',
              instructor: 'Maximilian Schwarzmüller',
              rating: 4.8,
              reviewsCount: 42100,
              duration: '16.5 hours',
              price: '$14.99',
              isFree: false,
              url: 'https://www.udemy.com',
            },
            {
              title: 'Official Next.js Learn Tutorial',
              platform: 'Vercel Official',
              instructor: 'Vercel Dev Team',
              rating: 4.9,
              reviewsCount: 18500,
              duration: '5 hours',
              price: 'Free',
              isFree: true,
              url: 'https://nextjs.org/learn',
            }
          ],
          projectIdea: 'Build a Server-Side Rendered E-Commerce Product Catalog with Next.js Server Actions and Stripe Checkout.'
        },
        {
          id: 'graphql-apollo',
          skillName: 'GraphQL & Apollo Client',
          category: 'State & APIs',
          priority: 'High Priority',
          estimatedDuration: '1.5 Weeks (14 hrs)',
          difficulty: 'Intermediate',
          description: 'Learn to write efficient GraphQL queries, mutations, subscriptions, and manage client-side cache using Apollo Client.',
          keyTopics: [
            'Schemas, Types, Queries, & Mutations',
            'Apollo Client setup in React with hooks (useQuery, useMutation)',
            'Normalized caching and optimistic UI updates',
            'GraphQL pagination and fragment colocation'
          ],
          courses: [
            {
              title: 'GraphQL with React: The Complete Developers Guide',
              platform: 'Udemy',
              instructor: 'Stephen Grider',
              rating: 4.7,
              reviewsCount: 15400,
              duration: '13 hours',
              price: '$16.99',
              isFree: false,
              url: 'https://www.udemy.com',
            },
            {
              title: 'Odyssey: Lift Off with GraphQL & React',
              platform: 'Apollo GraphQL Academy',
              instructor: 'Apollo Team',
              rating: 4.9,
              reviewsCount: 8900,
              duration: '4 hours',
              price: 'Free',
              isFree: true,
              url: 'https://www.apollographql.com/tutorials/',
            }
          ],
          projectIdea: 'Create a GitHub Dashboard app using GitHub’s GraphQL API with live search and star management.'
        },
        {
          id: 'websockets',
          skillName: 'WebSockets & Socket.io (Real-time)',
          category: 'State & APIs',
          priority: 'Medium Priority',
          estimatedDuration: '1 Week (10 hrs)',
          difficulty: 'Intermediate',
          description: 'Build real-time bi-directional messaging and live updates into React applications using WebSockets.',
          keyTopics: [
            'WebSocket handshake protocol vs HTTP polling',
            'Socket.io client-server event handling',
            'Reconnection strategies and state synchronization',
            'Broadcasting channels and rooms'
          ],
          courses: [
            {
              title: 'Real-Time Apps with WebSockets & Node.js',
              platform: 'Frontend Masters',
              instructor: 'Steve Kinney',
              rating: 4.8,
              reviewsCount: 6200,
              duration: '4.5 hours',
              price: 'Subscription',
              isFree: false,
              url: 'https://frontendmasters.com',
            }
          ],
          projectIdea: 'Build a Live Collaborative Code Editor or Chat Room with active presence indicators.'
        },
        {
          id: 'playwright-e2e',
          skillName: 'Playwright End-to-End Testing',
          category: 'Testing & DevOps',
          priority: 'Medium Priority',
          estimatedDuration: '1 Week (12 hrs)',
          difficulty: 'Beginner',
          description: 'Write robust cross-browser E2E and visual regression tests for modern web applications.',
          keyTopics: [
            'Test syntax, selectors, and auto-waiting',
            'Mocking network requests and API responses',
            'Cross-browser and mobile viewport testing',
            'Integrating Playwright into GitHub Actions CI'
          ],
          courses: [
            {
              title: 'Playwright: Web Automation & Testing with JavaScript',
              platform: 'Udemy',
              instructor: 'Rahul Shetty',
              rating: 4.7,
              reviewsCount: 11200,
              duration: '9.5 hours',
              price: '$13.99',
              isFree: false,
              url: 'https://www.udemy.com',
            }
          ],
          projectIdea: 'Write a comprehensive E2E test suite covering user authentication, form submission, and checkout flow.'
        },
        {
          id: 'docker',
          skillName: 'Docker & Containerization',
          category: 'Fullstack & Cloud',
          priority: 'Medium Priority',
          estimatedDuration: '1.5 Weeks (16 hrs)',
          difficulty: 'Intermediate',
          description: 'Learn container fundamentals, multi-stage Dockerfiles for React/Node apps, and Docker Compose.',
          keyTopics: [
            'Docker images, containers, and volumes',
            'Multi-stage Docker builds for optimized React bundle size',
            'Docker Compose for multi-container web apps',
            'Environment variables and environment isolation'
          ],
          courses: [
            {
              title: 'Docker Mastery: with Kubernetes & Swarm',
              platform: 'Udemy',
              instructor: 'Bret Fisher',
              rating: 4.8,
              reviewsCount: 68000,
              duration: '21 hours',
              price: '$18.99',
              isFree: false,
              url: 'https://www.udemy.com',
            }
          ],
          projectIdea: 'Containerize a React frontend and Node/Express backend into a single-command docker-compose environment.'
        },
        {
          id: 'cicd-github-actions',
          skillName: 'CI/CD with GitHub Actions',
          category: 'Testing & DevOps',
          priority: 'Low Priority',
          estimatedDuration: '4 Days (8 hrs)',
          difficulty: 'Beginner',
          description: 'Automate build, linting, unit test execution, and deployment pipelines on every git push.',
          keyTopics: [
            'Workflows, jobs, steps, and triggers',
            'Secret management and environment secrets',
            'Automated linting and test runs PR checks',
            'Deploying frontend to Vercel/Netlify automatically'
          ],
          courses: [
            {
              title: 'GitHub Actions - The Complete Guide',
              platform: 'Udemy',
              instructor: 'Manuel Lorenz',
              rating: 4.7,
              reviewsCount: 9800,
              duration: '6 hours',
              price: '$14.99',
              isFree: false,
              url: 'https://www.udemy.com',
            }
          ],
          projectIdea: 'Create a GitHub Actions pipeline that lints JS/CSS, runs Jest unit tests, and deploys preview links.'
        }
      ]
    }
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Web Developer',
    subtitle: 'Targeting MERN / Node.js & React Role',
    resumeFileName: 'Sam_Taylor_Fullstack.docx',
    resumeText: `Sam Taylor | Full Stack Web Developer
Skills: React, JavaScript, Node.js, Express, MongoDB, HTML, CSS, Bootstrap, REST APIs, Git.
Experience: 3 years building web apps. Created fullstack e-commerce store and social blog using Node.js & React.`,
    jobTitle: 'Senior Full Stack Engineer (React + Node + AWS)',
    jobCompany: 'CloudScale Solutions',
    jobDescription: `Looking for a Senior Full Stack Engineer.
Required Skills: React, Node.js, Express, PostgreSQL, TypeScript, Redis, AWS (S3, EC2, Lambda), Docker, Microservices architecture, WebSockets, Tailwind CSS.`,
    analysisResult: {
      matchScore: 65,
      readinessRating: 'Moderate Gap',
      summary: 'You match 65% of the requirements. Strong in Node.js and React basics, but need PostgreSQL, TypeScript, AWS cloud infrastructure, and Redis caching.',
      stats: {
        totalRequired: 14,
        matchedCount: 9,
        missingCount: 5,
      },
      categories: [
        { name: 'Frontend', percentage: 80, matched: 4, total: 5, color: 'bg-sky-500' },
        { name: 'Backend & Data', percentage: 60, matched: 3, total: 5, color: 'bg-emerald-500' },
        { name: 'Cloud & Infrastructure', percentage: 25, matched: 1, total: 4, color: 'bg-rose-500' },
      ],
      matchedSkills: [
        { name: 'React.js', level: 'Advanced', category: 'Frontend', icon: 'Code' },
        { name: 'Node.js', level: 'Advanced', category: 'Backend & Data', icon: 'Server' },
        { name: 'Express.js', level: 'Advanced', category: 'Backend & Data', icon: 'Cpu' },
        { name: 'JavaScript', level: 'Expert', category: 'Frontend', icon: 'FileCode' },
        { name: 'REST APIs', level: 'Advanced', category: 'Backend & Data', icon: 'Globe' },
        { name: 'MongoDB', level: 'Intermediate', category: 'Backend & Data', icon: 'Database' },
        { name: 'Git & Version Control', level: 'Advanced', category: 'Cloud & Infrastructure', icon: 'GitBranch' },
        { name: 'HTML & CSS', level: 'Expert', category: 'Frontend', icon: 'Layout' },
        { name: 'Bootstrap', level: 'Intermediate', category: 'Frontend', icon: 'Palette' },
      ],
      missingSkills: [
        { name: 'TypeScript', priority: 'High Priority', category: 'Frontend', hoursToLearn: 15, impact: '+12% Match' },
        { name: 'PostgreSQL & SQL', priority: 'High Priority', category: 'Backend & Data', hoursToLearn: 18, impact: '+10% Match' },
        { name: 'AWS Cloud (S3, EC2, Lambda)', priority: 'High Priority', category: 'Cloud & Infrastructure', hoursToLearn: 25, impact: '+15% Match' },
        { name: 'Redis Caching', priority: 'Medium Priority', category: 'Backend & Data', hoursToLearn: 8, impact: '+5% Match' },
        { name: 'Tailwind CSS', priority: 'Low Priority', category: 'Frontend', hoursToLearn: 6, impact: '+4% Match' },
      ],
      roadmap: [
        {
          id: 'typescript-full',
          skillName: 'TypeScript for Fullstack Developers',
          category: 'Frontend & Node',
          priority: 'High Priority',
          estimatedDuration: '1.5 Weeks (15 hrs)',
          difficulty: 'Intermediate',
          description: 'Type-safe React components, generics, Node.js express type definitions, and backend interfaces.',
          keyTopics: ['Interfaces vs Types', 'Generics & Utility Types', 'Express Request/Response typing', 'React Prop types'],
          courses: [
            {
              title: 'Understanding TypeScript',
              platform: 'Udemy',
              instructor: 'Maximilian Schwarzmüller',
              rating: 4.8,
              reviewsCount: 39000,
              duration: '15 hours',
              price: '$14.99',
              isFree: false,
              url: 'https://www.udemy.com',
            }
          ],
          projectIdea: 'Refactor an existing Express + React project into strict TypeScript.'
        },
        {
          id: 'postgres-sql',
          skillName: 'PostgreSQL Relational Databases & Prisma ORM',
          category: 'Backend & Data',
          priority: 'High Priority',
          estimatedDuration: '2 Weeks (18 hrs)',
          difficulty: 'Intermediate',
          description: 'Relational data modeling, SQL queries, indexing, joins, transactions, and Prisma ORM integration.',
          keyTopics: ['SQL Joins & Indexes', 'Data Normalization', 'Prisma Schema & Migrations', 'Transactions & ACID properties'],
          courses: [
            {
              title: 'SQL and PostgreSQL: The Complete Developer Guide',
              platform: 'Udemy',
              instructor: 'Stephen Grider',
              rating: 4.8,
              reviewsCount: 24000,
              duration: '22 hours',
              price: '$16.99',
              isFree: false,
              url: 'https://www.udemy.com',
            }
          ],
          projectIdea: 'Design a multi-tenant SaaS schema in Postgres with Prisma ORM.'
        },
        {
          id: 'aws-cloud',
          skillName: 'AWS Cloud Fundamentals (S3, EC2, Lambda)',
          category: 'Cloud & Infrastructure',
          priority: 'High Priority',
          estimatedDuration: '2.5 Weeks (25 hrs)',
          difficulty: 'Intermediate',
          description: 'Learn cloud compute, object storage, serverless functions, and IAM security on AWS.',
          keyTopics: ['Amazon S3 File Uploads', 'EC2 Server Hosting', 'AWS Lambda Serverless APIs', 'IAM & CloudFront CDN'],
          courses: [
            {
              title: 'AWS Certified Cloud Practitioner Ultimate Course',
              platform: 'Udemy',
              instructor: 'Stephane Maarek',
              rating: 4.9,
              reviewsCount: 110000,
              duration: '14 hours',
              price: '$17.99',
              isFree: false,
              url: 'https://www.udemy.com',
            }
          ],
          projectIdea: 'Deploy a fullstack React app with S3 static hosting, CloudFront CDN, and an EC2/Lambda API backend.'
        }
      ]
    }
  }
];

// Default helper to analyze custom text input dynamically
export function analyzeCustomInput(resumeText, jobText) {
  if (!resumeText || !jobText) return null;

  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobText.toLowerCase();

  // Dictionary of known technology keywords to scan for
  const techKeywords = [
    { name: 'React.js', category: 'Core Frontend', icon: 'Code', impact: 8, hours: 10, course: 'React - The Complete Guide' },
    { name: 'TypeScript', category: 'Core Frontend', icon: 'FileCode', impact: 9, hours: 15, course: 'Understanding TypeScript' },
    { name: 'Tailwind CSS', category: 'Core Frontend', icon: 'Palette', impact: 6, hours: 8, course: 'Tailwind CSS From Scratch' },
    { name: 'Next.js', category: 'Fullstack & Cloud', icon: 'Zap', impact: 10, hours: 20, course: 'Next.js 14 App Router' },
    { name: 'Node.js', category: 'Fullstack & Cloud', icon: 'Server', impact: 9, hours: 16, course: 'Node.js, Express & MongoDB BootCamp' },
    { name: 'Python', category: 'AI & Data', icon: 'Cpu', impact: 8, hours: 18, course: 'Complete Python BootCamp' },
    { name: 'GraphQL', category: 'State & APIs', icon: 'Globe', impact: 7, hours: 12, course: 'GraphQL with React & Node' },
    { name: 'Docker', category: 'Testing & DevOps', icon: 'Layers', impact: 8, hours: 14, course: 'Docker Mastery' },
    { name: 'AWS Cloud', category: 'Fullstack & Cloud', icon: 'Cloud', impact: 10, hours: 25, course: 'AWS Certified Cloud Practitioner' },
    { name: 'PostgreSQL', category: 'State & APIs', icon: 'Database', impact: 8, hours: 15, course: 'PostgreSQL Developer Guide' },
    { name: 'MongoDB', category: 'State & APIs', icon: 'Database', impact: 6, hours: 10, course: 'MongoDB The Complete Developers Guide' },
    { name: 'Jest / Testing', category: 'Testing & DevOps', icon: 'CheckCircle', impact: 6, hours: 10, course: 'Testing React Apps with Jest' },
    { name: 'Git & Version Control', category: 'Testing & DevOps', icon: 'GitBranch', impact: 5, hours: 6, course: 'Git & GitHub Masterclass' },
    { name: 'CI/CD Pipelines', category: 'Testing & DevOps', icon: 'Gauge', impact: 7, hours: 10, course: 'GitHub Actions DevOps' }
  ];

  const matched = [];
  const missing = [];

  techKeywords.forEach(item => {
    const keywords = item.name.toLowerCase().split(' ');
    const isRequiredInJob = keywords.some(kw => kw.length > 2 && jobLower.includes(kw));
    const isPresentInResume = keywords.some(kw => kw.length > 2 && resumeLower.includes(kw));

    if (isRequiredInJob || isPresentInResume) {
      if (isPresentInResume) {
        matched.push({
          name: item.name,
          level: 'Proficient',
          category: item.category,
          icon: item.icon
        });
      } else {
        missing.push({
          name: item.name,
          priority: item.impact > 8 ? 'High Priority' : 'Medium Priority',
          category: item.category,
          hoursToLearn: item.hours,
          impact: `+${item.impact}% Match`
        });
      }
    }
  });

  // Default fallback if text is small or unstructured
  if (matched.length === 0 && missing.length === 0) {
    matched.push(
      { name: 'JavaScript', level: 'Intermediate', category: 'Core Frontend', icon: 'Code' },
      { name: 'HTML & CSS', level: 'Expert', category: 'Core Frontend', icon: 'Layout' }
    );
    missing.push(
      { name: 'React.js', priority: 'High Priority', category: 'Core Frontend', hoursToLearn: 15, impact: '+15% Match' },
      { name: 'TypeScript', priority: 'High Priority', category: 'Core Frontend', hoursToLearn: 15, impact: '+12% Match' }
    );
  }

  const total = matched.length + missing.length;
  const matchScore = Math.min(96, Math.max(35, Math.round((matched.length / total) * 100)));

  const roadmap = missing.map((m, idx) => ({
    id: `custom-missing-${idx}`,
    skillName: m.name,
    category: m.category,
    priority: m.priority,
    estimatedDuration: `${Math.ceil(m.hoursToLearn / 7)} Weeks (${m.hoursToLearn} hrs)`,
    difficulty: m.hoursToLearn > 15 ? 'Intermediate' : 'Beginner',
    description: `Master ${m.name} to fulfill the specific requirements mentioned in the job description.`,
    keyTopics: [
      `Fundamentals & Core Concepts of ${m.name}`,
      `Integration with existing frontend/backend stack`,
      `Best Practices, Performance, & Security`,
      `Hands-on testing and deployment`
    ],
    courses: [
      {
        title: `Mastering ${m.name} - Complete Practical Guide`,
        platform: 'Udemy / Coursera',
        instructor: 'Industry Specialist',
        rating: 4.8,
        reviewsCount: 12400,
        duration: `${m.hoursToLearn} hours`,
        price: 'Free / $14.99',
        isFree: true,
        url: 'https://www.coursera.org',
      }
    ],
    projectIdea: `Build a real-world portfolio project using ${m.name} to demonstrate practical competency.`
  }));

  return {
    matchScore,
    readinessRating: matchScore >= 75 ? 'Strong Alignment' : matchScore >= 55 ? 'Moderate Gap' : 'Action Required',
    summary: `Based on your analysis, you match ${matchScore}% of the core competencies for this role. You have ${matched.length} matched skills and ${missing.length} target skills to develop.`,
    stats: {
      totalRequired: total,
      matchedCount: matched.length,
      missingCount: missing.length
    },
    categories: [
      { name: 'Core Frontend', percentage: Math.min(100, matchScore + 10), color: 'bg-sky-500' },
      { name: 'State & APIs', percentage: Math.max(30, matchScore - 5), color: 'bg-emerald-500' },
      { name: 'Fullstack & Cloud', percentage: Math.max(20, matchScore - 15), color: 'bg-amber-500' },
      { name: 'Testing & DevOps', percentage: Math.max(25, matchScore - 20), color: 'bg-rose-500' },
    ],
    matchedSkills: matched,
    missingSkills: missing,
    roadmap
  };
}
