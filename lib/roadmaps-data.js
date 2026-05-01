export const jobRoadmaps = {
  "software-engineer": {
    id: "software-engineer",
    title: "Software Engineer",
    icon: "Code",
    description: "Build scalable applications and systems",
    color: "bg-blue-500",
    timeline: "6-12 months",
    phases: [
      {
        name: "Foundation",
        duration: "2-3 months",
        description: "Master programming fundamentals and computer science basics",
        skills: ["Python/JavaScript", "Data Structures", "Algorithms", "Git"],
        resources: [
          { name: "CS50 by Harvard", type: "course", url: "https://cs50.harvard.edu/x/", description: "Best intro to CS" },
          { name: "FreeCodeCamp", type: "course", url: "https://www.freecodecamp.org/", description: "Hands-on web development" },
          { name: "The Odin Project", type: "course", url: "https://www.theodinproject.com/", description: "Full-stack curriculum" },
          { name: "Git Documentation", type: "docs", url: "https://git-scm.com/doc", description: "Version control mastery" }
        ],
        projects: ["Build a CLI tool", "Create a portfolio website", "Implement classic algorithms"],
        milestones: ["Complete 50 easy LeetCode problems", "Deploy first web application", "Contribute to open source"]
      },
      {
        name: "Core Development",
        duration: "2-3 months",
        description: "Learn web development and databases",
        skills: ["React/Vue", "Node.js", "SQL/NoSQL", "REST APIs"],
        resources: [
          { name: "React Documentation", type: "docs", url: "https://react.dev/", description: "Official React guide" },
          { name: "Node.js Documentation", type: "docs", url: "https://nodejs.org/docs/latest/api/", description: "Node.js APIs" },
          { name: "MongoDB University", type: "course", url: "https://learn.mongodb.com/", description: "Free MongoDB courses" },
          { name: "PostgreSQL Tutorial", type: "docs", url: "https://www.postgresqltutorial.com/", description: "SQL fundamentals" }
        ],
        projects: ["Build a full-stack CRUD app", "Create a REST API", "Design a database schema"],
        milestones: ["Complete 50 medium LeetCode problems", "Build 3 full-stack projects", "Understand MVC architecture"]
      },
      {
        name: "Advanced Topics",
        duration: "2-3 months",
        description: "Master system design and advanced concepts",
        skills: ["System Design", "Cloud Services", "CI/CD", "Testing"],
        resources: [
          { name: "System Design Primer", type: "guide", url: "https://github.com/donnemartin/system-design-primer", description: "Comprehensive system design" },
          { name: "AWS Free Tier", type: "platform", url: "https://aws.amazon.com/free/", description: "Hands-on cloud experience" },
          { name: "GitHub Actions Docs", type: "docs", url: "https://docs.github.com/en/actions", description: "CI/CD automation" },
          { name: "Testing JavaScript", type: "course", url: "https://testingjavascript.com/", description: "Testing best practices" }
        ],
        projects: ["Design a scalable system", "Set up CI/CD pipeline", "Write comprehensive tests"],
        milestones: ["Complete 20 hard LeetCode problems", "Pass mock system design interviews", "Deploy production app"]
      }
    ],
    leetcode: {
      easy: 75,
      medium: 100,
      hard: 25,
      topics: ["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Binary Search"],
      resources: [
        { name: "NeetCode 150", url: "https://neetcode.io/practice" },
        { name: "Blind 75", url: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions" },
        { name: "LeetCode Patterns", url: "https://seanprashad.com/leetcode-patterns/" }
      ]
    },
    interviewPrep: {
      technical: ["Data Structures", "Algorithms", "System Design", "OOP Principles", "Database Design"],
      behavioral: ["STAR Method", "Leadership examples", "Conflict resolution", "Project challenges"],
      resources: [
        { name: "Interviewing.io", url: "https://interviewing.io/" },
        { name: "Pramp", url: "https://www.pramp.com/" },
        { name: "Tech Interview Handbook", url: "https://www.techinterviewhandbook.org/" }
      ]
    }
  },

  "data-scientist": {
    id: "data-scientist",
    title: "Data Scientist / ML Engineer",
    icon: "Brain",
    description: "Extract insights and build ML models",
    color: "bg-green-500",
    timeline: "8-14 months",
    phases: [
      {
        name: "Mathematics & Statistics",
        duration: "2-3 months",
        description: "Build strong mathematical foundations",
        skills: ["Linear Algebra", "Calculus", "Probability", "Statistics"],
        resources: [
          { name: "Khan Academy Math", type: "course", url: "https://www.khanacademy.org/math", description: "Free math courses" },
          { name: "3Blue1Brown", type: "video", url: "https://www.3blue1brown.com/", description: "Visual math explanations" },
          { name: "StatQuest", type: "video", url: "https://www.youtube.com/@statquest", description: "Statistics made simple" },
          { name: "MIT OCW Mathematics", type: "course", url: "https://ocw.mit.edu/courses/mathematics/", description: "University-level math" }
        ],
        projects: ["Statistical analysis project", "Probability simulations", "Linear regression from scratch"],
        milestones: ["Complete linear algebra course", "Understand hypothesis testing", "Implement gradient descent"]
      },
      {
        name: "Python & Data Analysis",
        duration: "2-3 months",
        description: "Master data manipulation and visualization",
        skills: ["Python", "Pandas", "NumPy", "Matplotlib/Seaborn", "SQL"],
        resources: [
          { name: "Python for Data Analysis", type: "book", url: "https://wesmckinney.com/book/", description: "Pandas creator's book" },
          { name: "Kaggle Learn", type: "course", url: "https://www.kaggle.com/learn", description: "Free ML micro-courses" },
          { name: "Mode SQL Tutorial", type: "course", url: "https://mode.com/sql-tutorial/", description: "SQL for analysts" },
          { name: "DataCamp", type: "platform", url: "https://www.datacamp.com/", description: "Interactive learning" }
        ],
        projects: ["Exploratory data analysis", "Dashboard creation", "Data cleaning pipeline"],
        milestones: ["Complete 5 Kaggle datasets", "Build interactive visualizations", "Write efficient SQL queries"]
      },
      {
        name: "Machine Learning",
        duration: "3-4 months",
        description: "Learn ML algorithms and deep learning",
        skills: ["Scikit-learn", "TensorFlow/PyTorch", "Feature Engineering", "Model Evaluation"],
        resources: [
          { name: "Andrew Ng ML Course", type: "course", url: "https://www.coursera.org/learn/machine-learning", description: "Classic ML course" },
          { name: "Fast.ai", type: "course", url: "https://www.fast.ai/", description: "Practical deep learning" },
          { name: "Hands-On ML Book", type: "book", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/", description: "Comprehensive ML guide" },
          { name: "Papers With Code", type: "resource", url: "https://paperswithcode.com/", description: "Latest ML research" }
        ],
        projects: ["Classification/regression models", "Neural network from scratch", "Kaggle competition"],
        milestones: ["Complete Kaggle competition", "Deploy ML model", "Achieve top 10% on competition"]
      },
      {
        name: "MLOps & Production",
        duration: "1-2 months",
        description: "Deploy and maintain ML systems",
        skills: ["MLflow", "Docker", "Cloud ML Services", "Model Monitoring"],
        resources: [
          { name: "MLOps Zoomcamp", type: "course", url: "https://github.com/DataTalksClub/mlops-zoomcamp", description: "Free MLOps course" },
          { name: "Made With ML", type: "course", url: "https://madewithml.com/", description: "MLOps best practices" },
          { name: "AWS SageMaker", type: "platform", url: "https://aws.amazon.com/sagemaker/", description: "Cloud ML platform" }
        ],
        projects: ["End-to-end ML pipeline", "Model monitoring dashboard", "A/B testing framework"],
        milestones: ["Deploy model to production", "Set up CI/CD for ML", "Implement model versioning"]
      }
    ],
    leetcode: {
      easy: 30,
      medium: 50,
      hard: 10,
      topics: ["Arrays", "Strings", "Dynamic Programming", "Matrix Operations", "SQL"],
      resources: [
        { name: "LeetCode SQL", url: "https://leetcode.com/problemset/database/" },
        { name: "StrataScratch", url: "https://www.stratascratch.com/" }
      ]
    },
    interviewPrep: {
      technical: ["ML Algorithms", "Statistics", "A/B Testing", "Feature Engineering", "Model Evaluation"],
      behavioral: ["Project explanations", "Business impact", "Collaboration examples"],
      resources: [
        { name: "ML Interview Book", url: "https://huyenchip.com/ml-interviews-book/" },
        { name: "Data Science Interview", url: "https://www.interviewquery.com/" }
      ]
    }
  },

  "product-manager": {
    id: "product-manager",
    title: "Product Manager",
    icon: "Lightbulb",
    description: "Lead product strategy and execution",
    color: "bg-orange-500",
    timeline: "4-8 months",
    phases: [
      {
        name: "Product Fundamentals",
        duration: "1-2 months",
        description: "Understand product management basics",
        skills: ["Product Strategy", "User Research", "Market Analysis", "Roadmapping"],
        resources: [
          { name: "Inspired by Marty Cagan", type: "book", url: "https://www.svpg.com/inspired-how-to-create-products-customers-love/", description: "PM bible" },
          { name: "Product School", type: "course", url: "https://productschool.com/free-product-management-resources/", description: "Free PM resources" },
          { name: "Reforge", type: "platform", url: "https://www.reforge.com/", description: "Advanced PM programs" },
          { name: "Lenny's Newsletter", type: "newsletter", url: "https://www.lennysnewsletter.com/", description: "PM insights" }
        ],
        projects: ["Write a PRD", "Conduct user interviews", "Create product roadmap"],
        milestones: ["Complete PM fundamentals course", "Define product metrics", "Present product strategy"]
      },
      {
        name: "Technical Skills",
        duration: "1-2 months",
        description: "Gain technical literacy for product decisions",
        skills: ["Basic SQL", "Analytics Tools", "API Understanding", "Technical Communication"],
        resources: [
          { name: "SQL for PMs", type: "course", url: "https://mode.com/sql-tutorial/", description: "Data analysis basics" },
          { name: "Google Analytics Academy", type: "course", url: "https://analytics.google.com/analytics/academy/", description: "Analytics fundamentals" },
          { name: "Amplitude Academy", type: "course", url: "https://academy.amplitude.com/", description: "Product analytics" }
        ],
        projects: ["Build analytics dashboard", "Write technical requirements", "Analyze product metrics"],
        milestones: ["Run basic SQL queries", "Set up analytics tracking", "Communicate with engineers"]
      },
      {
        name: "Execution & Leadership",
        duration: "2-4 months",
        description: "Master product execution and team leadership",
        skills: ["Agile/Scrum", "Stakeholder Management", "Prioritization", "Go-to-Market"],
        resources: [
          { name: "Scrum Guide", type: "docs", url: "https://scrumguides.org/", description: "Official Scrum guide" },
          { name: "RICE Framework", type: "article", url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/", description: "Prioritization method" },
          { name: "Product-Led Growth", type: "book", url: "https://productled.com/book/", description: "Growth strategies" }
        ],
        projects: ["Lead a product launch", "Run sprint planning", "Create go-to-market plan"],
        milestones: ["Complete Agile certification", "Ship a feature end-to-end", "Present to stakeholders"]
      }
    ],
    leetcode: {
      easy: 0,
      medium: 0,
      hard: 0,
      topics: ["SQL basics for data analysis"],
      resources: [
        { name: "StrataScratch", url: "https://www.stratascratch.com/" }
      ]
    },
    interviewPrep: {
      technical: ["Product Metrics", "A/B Testing basics", "Technical trade-offs", "System thinking"],
      behavioral: ["Product sense", "Execution stories", "Leadership examples", "Failure recovery"],
      resources: [
        { name: "Exponent PM", url: "https://www.tryexponent.com/courses/pm" },
        { name: "Product Alliance", url: "https://www.productalliance.com/" },
        { name: "Lewis Lin's Decode", url: "https://www.lewis-lin.com/decode-and-conquer" }
      ]
    }
  },

  "devops-engineer": {
    id: "devops-engineer",
    title: "DevOps / Cloud Engineer",
    icon: "Cloud",
    description: "Build and maintain cloud infrastructure",
    color: "bg-cyan-500",
    timeline: "6-10 months",
    phases: [
      {
        name: "Linux & Networking",
        duration: "1-2 months",
        description: "Master Linux administration and networking basics",
        skills: ["Linux", "Bash Scripting", "Networking", "Security Basics"],
        resources: [
          { name: "Linux Journey", type: "course", url: "https://linuxjourney.com/", description: "Free Linux tutorial" },
          { name: "OverTheWire", type: "practice", url: "https://overthewire.org/wargames/", description: "Linux security games" },
          { name: "Networking Fundamentals", type: "course", url: "https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi", description: "Free networking course" }
        ],
        projects: ["Set up Linux server", "Write automation scripts", "Configure networking"],
        milestones: ["Complete Linux certification prep", "Automate server setup", "Understand TCP/IP"]
      },
      {
        name: "Cloud Platforms",
        duration: "2-3 months",
        description: "Learn major cloud platforms",
        skills: ["AWS/GCP/Azure", "IAM", "VPC", "Compute & Storage Services"],
        resources: [
          { name: "AWS Free Tier", type: "platform", url: "https://aws.amazon.com/free/", description: "Hands-on AWS" },
          { name: "A Cloud Guru", type: "course", url: "https://acloudguru.com/", description: "Cloud certifications" },
          { name: "AWS Well-Architected", type: "docs", url: "https://aws.amazon.com/architecture/well-architected/", description: "Best practices" },
          { name: "Google Cloud Skills Boost", type: "course", url: "https://www.cloudskillsboost.google/", description: "Free GCP learning" }
        ],
        projects: ["Deploy multi-tier app", "Set up auto-scaling", "Implement disaster recovery"],
        milestones: ["Pass AWS/GCP certification", "Deploy production workload", "Implement security best practices"]
      },
      {
        name: "Containers & Orchestration",
        duration: "2-3 months",
        description: "Master containerization and Kubernetes",
        skills: ["Docker", "Kubernetes", "Helm", "Service Mesh"],
        resources: [
          { name: "Docker Documentation", type: "docs", url: "https://docs.docker.com/", description: "Official Docker docs" },
          { name: "Kubernetes Documentation", type: "docs", url: "https://kubernetes.io/docs/home/", description: "Official K8s docs" },
          { name: "KodeKloud", type: "course", url: "https://kodekloud.com/", description: "Hands-on DevOps" },
          { name: "CNCF Landscape", type: "resource", url: "https://landscape.cncf.io/", description: "Cloud native tools" }
        ],
        projects: ["Containerize application", "Deploy to Kubernetes", "Set up Helm charts"],
        milestones: ["Pass CKA certification", "Deploy microservices", "Implement service mesh"]
      },
      {
        name: "CI/CD & IaC",
        duration: "1-2 months",
        description: "Automate everything with pipelines and infrastructure as code",
        skills: ["Terraform", "Ansible", "Jenkins/GitHub Actions", "GitOps"],
        resources: [
          { name: "Terraform Documentation", type: "docs", url: "https://developer.hashicorp.com/terraform/docs", description: "IaC with Terraform" },
          { name: "GitHub Actions", type: "docs", url: "https://docs.github.com/en/actions", description: "CI/CD automation" },
          { name: "ArgoCD", type: "docs", url: "https://argo-cd.readthedocs.io/", description: "GitOps for K8s" }
        ],
        projects: ["Build CI/CD pipeline", "Infrastructure as Code project", "Implement GitOps workflow"],
        milestones: ["Automate deployment pipeline", "Manage infrastructure with code", "Zero-downtime deployments"]
      }
    ],
    leetcode: {
      easy: 20,
      medium: 30,
      hard: 5,
      topics: ["Scripting", "System Design", "Networking problems"],
      resources: [
        { name: "LeetCode Shell", url: "https://leetcode.com/problemset/shell/" }
      ]
    },
    interviewPrep: {
      technical: ["System Design", "Troubleshooting scenarios", "Cloud architecture", "Security"],
      behavioral: ["Incident management", "Collaboration", "Automation mindset"],
      resources: [
        { name: "DevOps Roadmap", url: "https://roadmap.sh/devops" },
        { name: "SRE Book", url: "https://sre.google/sre-book/table-of-contents/" }
      ]
    }
  },

  "ai-engineer": {
    id: "ai-engineer",
    title: "AI Engineer",
    icon: "Sparkles",
    description: "Build AI-powered applications and systems",
    color: "bg-purple-500",
    timeline: "8-12 months",
    phases: [
      {
        name: "Programming & ML Foundations",
        duration: "2-3 months",
        description: "Build strong programming and ML basics",
        skills: ["Python", "PyTorch/TensorFlow", "ML Fundamentals", "Mathematics"],
        resources: [
          { name: "Fast.ai Course", type: "course", url: "https://www.fast.ai/", description: "Practical deep learning" },
          { name: "PyTorch Tutorials", type: "docs", url: "https://pytorch.org/tutorials/", description: "Official PyTorch" },
          { name: "3Blue1Brown Neural Networks", type: "video", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", description: "Visual NN explanations" },
          { name: "Stanford CS229", type: "course", url: "https://cs229.stanford.edu/", description: "ML theory" }
        ],
        projects: ["Build neural network from scratch", "Image classification project", "NLP text classifier"],
        milestones: ["Understand backpropagation", "Train models on custom data", "Complete Kaggle competition"]
      },
      {
        name: "Large Language Models",
        duration: "2-3 months",
        description: "Master LLMs and transformer architectures",
        skills: ["Transformers", "Prompt Engineering", "Fine-tuning", "RAG"],
        resources: [
          { name: "Hugging Face Course", type: "course", url: "https://huggingface.co/learn", description: "NLP with transformers" },
          { name: "OpenAI Cookbook", type: "docs", url: "https://cookbook.openai.com/", description: "LLM best practices" },
          { name: "LangChain Documentation", type: "docs", url: "https://python.langchain.com/docs/", description: "LLM applications" },
          { name: "Andrej Karpathy", type: "video", url: "https://www.youtube.com/@AndrejKarpathy", description: "Deep learning insights" }
        ],
        projects: ["Build RAG application", "Fine-tune LLM", "Create AI chatbot"],
        milestones: ["Implement transformer from scratch", "Deploy LLM application", "Build production RAG system"]
      },
      {
        name: "AI Application Development",
        duration: "2-3 months",
        description: "Build production AI applications",
        skills: ["Vector Databases", "AI APIs", "Embeddings", "Agent Systems"],
        resources: [
          { name: "Pinecone Docs", type: "docs", url: "https://docs.pinecone.io/", description: "Vector database" },
          { name: "OpenAI API Docs", type: "docs", url: "https://platform.openai.com/docs/", description: "GPT APIs" },
          { name: "Vercel AI SDK", type: "docs", url: "https://sdk.vercel.ai/docs", description: "AI app framework" },
          { name: "LlamaIndex", type: "docs", url: "https://docs.llamaindex.ai/", description: "Data framework for LLMs" }
        ],
        projects: ["Build AI-powered app", "Implement semantic search", "Create autonomous agent"],
        milestones: ["Deploy AI application", "Implement vector search", "Build multi-agent system"]
      },
      {
        name: "Production & Scale",
        duration: "2-3 months",
        description: "Deploy and scale AI systems",
        skills: ["Model Serving", "Optimization", "Monitoring", "Cost Management"],
        resources: [
          { name: "vLLM", type: "docs", url: "https://docs.vllm.ai/", description: "LLM serving" },
          { name: "NVIDIA TensorRT", type: "docs", url: "https://developer.nvidia.com/tensorrt", description: "Model optimization" },
          { name: "Weights & Biases", type: "platform", url: "https://wandb.ai/", description: "ML experiment tracking" }
        ],
        projects: ["Optimize model inference", "Set up model monitoring", "Build scalable AI service"],
        milestones: ["Reduce inference latency", "Implement model versioning", "Handle production traffic"]
      }
    ],
    leetcode: {
      easy: 40,
      medium: 60,
      hard: 15,
      topics: ["Arrays", "Dynamic Programming", "Graphs", "Matrix Operations"],
      resources: [
        { name: "NeetCode", url: "https://neetcode.io/" },
        { name: "LeetCode ML", url: "https://leetcode.com/tag/machine-learning/" }
      ]
    },
    interviewPrep: {
      technical: ["ML System Design", "LLM Architecture", "Prompt Engineering", "Model Optimization"],
      behavioral: ["AI Ethics", "Project impact", "Team collaboration"],
      resources: [
        { name: "ML System Design", url: "https://www.educative.io/courses/machine-learning-system-design" },
        { name: "AI Engineer Roadmap", url: "https://roadmap.sh/ai-engineer" }
      ]
    }
  }
}

export const skillsList = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "Go", "Rust",
  "React", "Vue.js", "Angular", "Next.js", "Node.js", "Django", "Flask",
  "SQL", "MongoDB", "PostgreSQL", "Redis", "GraphQL",
  "AWS", "GCP", "Azure", "Docker", "Kubernetes",
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
  "Data Analysis", "Statistics", "Data Visualization",
  "Git", "CI/CD", "Agile", "System Design"
]

export const collegeYears = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "graduate", label: "Graduate/Post-Graduate" },
  { value: "professional", label: "Working Professional" }
]

export const goalOptions = [
  "Get my first tech job",
  "Switch to a tech career",
  "Get promoted",
  "Switch roles within tech",
  "Start freelancing",
  "Build my own startup",
  "Prepare for FAANG interviews",
  "Learn new technologies",
  "Transition to management"
]
