export const portfolioData = {
  hero: {
    name: "Omik",
    title: "",
    tagline: "Transforming Ideas into Intelligent Solutions through AI Innovation",
    description: "I'm a Prompt Engineer and AI Automation specialist dedicated to harnessing the power of artificial intelligence to solve complex problems and create innovative automated solutions that drive efficiency and creativity.",
    cta: {
      primary: "View Projects",
      secondary: "Contact"
    },
    social: {
      github: "https://github.com/omik",
      linkedin: "https://linkedin.com/in/omik",
      twitter: "https://twitter.com/omik"
    }
  },

  about: {
    bio: "I'm Omik, a passionate Prompt Engineer and AI Automation specialist with a deep focus on leveraging cutting-edge AI technologies to build innovative solutions. I specialize in crafting intelligent prompts, designing AI workflows, and creating automated systems that transform how businesses operate. My expertise spans across multiple AI platforms, language models, and automation tools, enabling me to deliver solutions that are both powerful and practical.",
    stats: [
      { label: "AI Projects Built", value: "100+" },
      { label: "Automation Workflows", value: "50+" },
      { label: "AI Models Mastered", value: "15+" },
      { label: "Prompt Templates", value: "500+" }
    ],
    highlights: [
      "Prompt Engineering",
      "AI Automation & Integration",
      "LLM Fine-tuning",
      "Workflow Optimization"
    ]
  },

  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, team features, and progress tracking.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      tech: ["Vue.js", "Firebase", "TailwindCSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      description: "Intelligent chatbot powered by GPT-4 with context awareness and multi-language support.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      tech: ["Python", "OpenAI", "FastAPI", "React"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather application with detailed forecasts, interactive maps, and location-based services.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
      tech: ["React", "TypeScript", "Weather API"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Portfolio Generator",
      description: "Dynamic portfolio builder with customizable themes, drag-and-drop editor, and instant preview.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "Social Media Analytics",
      description: "Comprehensive analytics platform for social media with insights, scheduling, and reporting features.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tech: ["React", "D3.js", "Node.js", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ],

  skills: {
    categories: [
      {
        name: "AI & Machine Learning",
        icon: "🤖",
        skills: [
          { name: "TensorFlow/PyTorch", level: 90 },
          { name: "OpenAI API (GPT-4, Claude)", level: 95 },
          { name: "LangChain", level: 88 },
          { name: "Hugging Face", level: 85 },
          { name: "Computer Vision", level: 82 },
          { name: "NLP/LLMs", level: 92 }
        ]
      },
      {
        name: "Prompt Engineering",
        icon: "💡",
        skills: [
          { name: "GPT-4 Prompting", level: 95 },
          { name: "Claude Prompting", level: 93 },
          { name: "Prompt Templates", level: 90 },
          { name: "Chain-of-Thought", level: 88 },
          { name: "Few-Shot Learning", level: 85 },
          { name: "Prompt Optimization", level: 92 }
        ]
      },
      {
        name: "Automation",
        icon: "⚡",
        skills: [
          { name: "Zapier/Make", level: 90 },
          { name: "Python Scripts", level: 88 },
          { name: "n8n", level: 85 },
          { name: "API Integration", level: 92 },
          { name: "Workflow Automation", level: 94 },
          { name: "RPA Tools", level: 80 }
        ]
      },
      {
        name: "Web Development",
        icon: "🌐",
        skills: [
          { name: "React/Next.js", level: 92 },
          { name: "Node.js", level: 88 },
          { name: "TypeScript", level: 90 },
          { name: "TailwindCSS", level: 85 },
          { name: "APIs (REST/GraphQL)", level: 90 },
          { name: "Vercel/Netlify", level: 87 }
        ]
      },
      {
        name: "DevOps & Cloud",
        icon: "☁️",
        skills: [
          { name: "Docker", level: 85 },
          { name: "GitHub Actions", level: 88 },
          { name: "AWS/GCP", level: 82 },
          { name: "CI/CD", level: 86 },
          { name: "Kubernetes", level: 78 },
          { name: "Infrastructure as Code", level: 80 }
        ]
      }
    ]
  },

  contact: {
    email: "omik@example.com",
    phone: "+8801748686669",
    location: "Bogura, Bangladesh",
    social: {
      github: "https://github.com/omik",
      linkedin: "https://linkedin.com/in/omik",
      twitter: "https://twitter.com/omik",
      devto: "https://dev.to/omik"
    },
    form: {
      name: "Your Name",
      email: "your.email@example.com",
      subject: "AI Project Inquiry",
      message: "Tell me about your AI automation project..."
    }
  }
};
