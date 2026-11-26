// Centralized Technology Logo Mapping using external CDN icon resources
// (Devicon, Simple Icons, and Skill Icons)
// Zero local SVG asset dependencies.

export interface TechLogoDefinition {
  name: string;
  category: string;
  brandColor: string;
  deviconClass?: string;
  simpleIconUrl: string;
  skillIconSlug?: string;
}

export const techLogoCatalog: Record<string, TechLogoDefinition> = {
  // Programming Languages
  Python: {
    name: 'Python',
    category: 'Programming Languages',
    brandColor: '#3776AB',
    simpleIconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    skillIconSlug: 'python',
  },
  JavaScript: {
    name: 'JavaScript',
    category: 'Programming Languages',
    brandColor: '#F7DF1E',
    deviconClass: 'devicon-javascript-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    skillIconSlug: 'js',
  },
  TypeScript: {
    name: 'TypeScript',
    category: 'Programming Languages',
    brandColor: '#3178C6',
    deviconClass: 'devicon-typescript-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/typescript/3178C6',
    skillIconSlug: 'ts',
  },
  Java: {
    name: 'Java',
    category: 'Programming Languages',
    brandColor: '#ED8B00',
    deviconClass: 'devicon-java-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/openjdk/ED8B00',
    skillIconSlug: 'java',
  },
  C: {
    name: 'C',
    category: 'Programming Languages',
    brandColor: '#A8B9CC',
    deviconClass: 'devicon-c-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/c/A8B9CC',
    skillIconSlug: 'c',
  },
  'C++': {
    name: 'C++',
    category: 'Programming Languages',
    brandColor: '#00599C',
    deviconClass: 'devicon-cplusplus-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/cplusplus/00599C',
    skillIconSlug: 'cpp',
  },
  Go: {
    name: 'Go',
    category: 'Programming Languages',
    brandColor: '#00ADD8',
    deviconClass: 'devicon-go-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/go/00ADD8',
    skillIconSlug: 'go',
  },

  // Frontend Development
  HTML5: {
    name: 'HTML5',
    category: 'Frontend Development',
    brandColor: '#E34F26',
    deviconClass: 'devicon-html5-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/html5/E34F26',
    skillIconSlug: 'html',
  },
  CSS3: {
    name: 'CSS3',
    category: 'Frontend Development',
    brandColor: '#1572B6',
    deviconClass: 'devicon-css3-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/css3/1572B6',
    skillIconSlug: 'css',
  },
  React: {
    name: 'React',
    category: 'Frontend Development',
    brandColor: '#61DAFB',
    deviconClass: 'devicon-react-original colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/react/61DAFB',
    skillIconSlug: 'react',
  },
  'Next.js': {
    name: 'Next.js',
    category: 'Frontend Development',
    brandColor: '#000000',
    deviconClass: 'devicon-nextjs-plain',
    simpleIconUrl: 'https://cdn.simpleicons.org/nextdotjs/000000',
    skillIconSlug: 'nextjs',
  },
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    category: 'Frontend Development',
    brandColor: '#06B6D4',
    deviconClass: 'devicon-tailwindcss-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    skillIconSlug: 'tailwind',
  },
  Bootstrap: {
    name: 'Bootstrap',
    category: 'Frontend Development',
    brandColor: '#7952B3',
    deviconClass: 'devicon-bootstrap-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/bootstrap/7952B3',
    skillIconSlug: 'bootstrap',
  },
  Vite: {
    name: 'Vite',
    category: 'Frontend Development',
    brandColor: '#646CFF',
    deviconClass: 'devicon-vitejs-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/vite/646CFF',
    skillIconSlug: 'vite',
  },

  // Backend Development
  'Node.js': {
    name: 'Node.js',
    category: 'Backend Development',
    brandColor: '#339933',
    deviconClass: 'devicon-nodejs-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/nodedotjs/339933',
    skillIconSlug: 'nodejs',
  },
  Flask: {
    name: 'Flask',
    category: 'Backend Development',
    brandColor: '#000000',
    deviconClass: 'devicon-flask-original colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/flask/000000',
    skillIconSlug: 'flask',
  },
  FastAPI: {
    name: 'FastAPI',
    category: 'Backend Development',
    brandColor: '#009688',
    deviconClass: 'devicon-fastapi-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/fastapi/009688',
    skillIconSlug: 'fastapi',
  },
  'Express.js': {
    name: 'Express.js',
    category: 'Backend Development',
    brandColor: '#000000',
    deviconClass: 'devicon-express-original',
    simpleIconUrl: 'https://cdn.simpleicons.org/express/000000',
    skillIconSlug: 'express',
  },
  Django: {
    name: 'Django',
    category: 'Backend Development',
    brandColor: '#092E20',
    deviconClass: 'devicon-django-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/django/092E20',
    skillIconSlug: 'django',
  },
  JSON: {
    name: 'JSON',
    category: 'Data Formats',
    brandColor: '#000000',
    deviconClass: 'devicon-json-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/json/000000',
  },
  PyWebView: {
    name: 'PyWebView',
    category: 'Desktop Frameworks',
    brandColor: '#3776AB',
    deviconClass: 'devicon-python-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/python/3776AB',
  },

  // Databases & Storage
  MySQL: {
    name: 'MySQL',
    category: 'Databases',
    brandColor: '#4479A1',
    deviconClass: 'devicon-mysql-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/mysql/4479A1',
    skillIconSlug: 'mysql',
  },
  PostgreSQL: {
    name: 'PostgreSQL',
    category: 'Databases',
    brandColor: '#4169E1',
    deviconClass: 'devicon-postgresql-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/postgresql/4169E1',
    skillIconSlug: 'postgres',
  },
  MongoDB: {
    name: 'MongoDB',
    category: 'Databases',
    brandColor: '#47A248',
    deviconClass: 'devicon-mongodb-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/mongodb/47A248',
    skillIconSlug: 'mongodb',
  },
  SQLite: {
    name: 'SQLite',
    category: 'Databases',
    brandColor: '#003B57',
    deviconClass: 'devicon-sqlite-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/sqlite/003B57',
    skillIconSlug: 'sqlite',
  },
  Firebase: {
    name: 'Firebase',
    category: 'Databases',
    brandColor: '#FFCA28',
    deviconClass: 'devicon-firebase-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/firebase/FFCA28',
    skillIconSlug: 'firebase',
  },
  Supabase: {
    name: 'Supabase',
    category: 'Databases',
    brandColor: '#3ECF8E',
    deviconClass: 'devicon-supabase-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/supabase/3ECF8E',
    skillIconSlug: 'supabase',
  },
  Pinecone: {
    name: 'Pinecone',
    category: 'Databases',
    brandColor: '#10B981',
    simpleIconUrl: 'https://cdn.simpleicons.org/pinecone/10B981',
    skillIconSlug: 'pinecone',
  },
  Redis: {
    name: 'Redis',
    category: 'Databases',
    brandColor: '#DC382D',
    deviconClass: 'devicon-redis-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/redis/DC382D',
    skillIconSlug: 'redis',
  },

  // AI & Machine Learning
  PyTorch: {
    name: 'PyTorch',
    category: 'AI & Machine Learning',
    brandColor: '#EE4C2C',
    deviconClass: 'devicon-pytorch-original colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/pytorch/EE4C2C',
    skillIconSlug: 'pytorch',
  },
  TensorFlow: {
    name: 'TensorFlow',
    category: 'AI & Machine Learning',
    brandColor: '#FF6F00',
    deviconClass: 'devicon-tensorflow-original colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/tensorflow/FF6F00',
    skillIconSlug: 'tensorflow',
  },
  OpenCV: {
    name: 'OpenCV',
    category: 'AI & Machine Learning',
    brandColor: '#5C3EE8',
    deviconClass: 'devicon-opencv-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/opencv/5C3EE8',
    skillIconSlug: 'opencv',
  },
  YOLO: {
    name: 'YOLO',
    category: 'AI & Machine Learning',
    brandColor: '#00F0FF',
    simpleIconUrl: 'https://cdn.simpleicons.org/yolo/00F0FF',
  },
  'Hugging Face': {
    name: 'Hugging Face',
    category: 'AI & Machine Learning',
    brandColor: '#FFD21E',
    simpleIconUrl: 'https://cdn.simpleicons.org/huggingface/FFD21E',
  },
  LangChain: {
    name: 'LangChain',
    category: 'AI & Machine Learning',
    brandColor: '#1C3C3C',
    simpleIconUrl: 'https://cdn.simpleicons.org/langchain/1C3C3C',
  },
  Ollama: {
    name: 'Ollama',
    category: 'AI & Machine Learning',
    brandColor: '#000000',
    simpleIconUrl: 'https://cdn.simpleicons.org/ollama/000000',
  },

  // Data Science & Analytics
  Pandas: {
    name: 'Pandas',
    category: 'Data Science & Analytics',
    brandColor: '#150458',
    deviconClass: 'devicon-pandas-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/pandas/150458',
  },
  NumPy: {
    name: 'NumPy',
    category: 'Data Science & Analytics',
    brandColor: '#013243',
    deviconClass: 'devicon-numpy-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/numpy/013243',
  },
  'Scikit-learn': {
    name: 'Scikit-learn',
    category: 'Data Science & Analytics',
    brandColor: '#F7931E',
    deviconClass: 'devicon-scikitlearn-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/scikitlearn/F7931E',
    skillIconSlug: 'sklearn',
  },
  Matplotlib: {
    name: 'Matplotlib',
    category: 'Data Science & Analytics',
    brandColor: '#11557C',
    deviconClass: 'devicon-matplotlib-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/matplotlib/11557C',
  },
  Seaborn: {
    name: 'Seaborn',
    category: 'Data Science & Analytics',
    brandColor: '#4D7298',
    simpleIconUrl: 'https://cdn.simpleicons.org/seaborn/4D7298',
  },
  Plotly: {
    name: 'Plotly',
    category: 'Data Science & Analytics',
    brandColor: '#3F4F75',
    simpleIconUrl: 'https://cdn.simpleicons.org/plotly/3F4F75',
  },
  'Power BI': {
    name: 'Power BI',
    category: 'Data Science & Analytics',
    brandColor: '#F2C811',
    simpleIconUrl: 'https://cdn.simpleicons.org/powerbi/F2C811',
  },

  // DevOps & Tools
  Git: {
    name: 'Git',
    category: 'Development Tools',
    brandColor: '#F05032',
    deviconClass: 'devicon-git-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/git/F05032',
    skillIconSlug: 'git',
  },
  GitHub: {
    name: 'GitHub',
    category: 'Development Tools',
    brandColor: '#181717',
    deviconClass: 'devicon-github-original',
    simpleIconUrl: 'https://cdn.simpleicons.org/github/181717',
    skillIconSlug: 'github',
  },
  Docker: {
    name: 'Docker',
    category: 'Development Tools',
    brandColor: '#2496ED',
    deviconClass: 'devicon-docker-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/docker/2496ED',
    skillIconSlug: 'docker',
  },
  Kubernetes: {
    name: 'Kubernetes',
    category: 'Development Tools',
    brandColor: '#326CE5',
    deviconClass: 'devicon-kubernetes-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/kubernetes/326CE5',
    skillIconSlug: 'kubernetes',
  },
  'VS Code': {
    name: 'VS Code',
    category: 'Development Tools',
    brandColor: '#007ACC',
    deviconClass: 'devicon-vscode-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/visualstudiocode/007ACC',
    skillIconSlug: 'vscode',
  },
  'Google Colab': {
    name: 'Google Colab',
    category: 'Development Tools',
    brandColor: '#F9AB00',
    simpleIconUrl: 'https://cdn.simpleicons.org/googlecolab/F9AB00',
  },
  'Jupyter Notebook': {
    name: 'Jupyter Notebook',
    category: 'Development Tools',
    brandColor: '#F37626',
    deviconClass: 'devicon-jupyter-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/jupyter/F37626',
  },
  Linux: {
    name: 'Linux',
    category: 'Development Tools',
    brandColor: '#FCC624',
    deviconClass: 'devicon-linux-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/linux/FCC624',
    skillIconSlug: 'linux',
  },
  Postman: {
    name: 'Postman',
    category: 'Development Tools',
    brandColor: '#FF6C37',
    deviconClass: 'devicon-postman-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/postman/FF6C37',
    skillIconSlug: 'postman',
  },
  Figma: {
    name: 'Figma',
    category: 'Development Tools',
    brandColor: '#F24E1E',
    deviconClass: 'devicon-figma-plain colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/figma/F24E1E',
    skillIconSlug: 'figma',
  },
  n8n: {
    name: 'n8n',
    category: 'Workflow Automation',
    brandColor: '#EA4B71',
    simpleIconUrl: 'https://cdn.simpleicons.org/n8n/EA4B71',
  },
  Streamlit: {
    name: 'Streamlit',
    category: 'Development Tools',
    brandColor: '#FF4B4B',
    simpleIconUrl: 'https://cdn.simpleicons.org/streamlit/FF4B4B',
  },
  ThreeJS: {
    name: 'Three.js',
    category: 'Frontend Development',
    brandColor: '#000000',
    deviconClass: 'devicon-threejs-original colored',
    simpleIconUrl: 'https://cdn.simpleicons.org/threedotjs/000000',
  },
};

/**
 * Normalizes any technology string name to its matching catalog entry.
 */
export const getTechDefinition = (techName: string): TechLogoDefinition | undefined => {
  if (!techName) return undefined;
  const clean = techName.trim();
  if (techLogoCatalog[clean]) return techLogoCatalog[clean];

  // Exact lowercase check
  const lower = clean.toLowerCase();
  for (const [key, val] of Object.entries(techLogoCatalog)) {
    if (key.toLowerCase() === lower || val.name.toLowerCase() === lower) {
      return val;
    }
  }

  // Common aliases and variations
  if (lower === 'html') return techLogoCatalog['HTML5'];
  if (lower === 'css') return techLogoCatalog['CSS3'];
  if (lower === 'json') return techLogoCatalog['JSON'];
  if (lower.includes('pywebview')) return techLogoCatalog['PyWebView'];
  if (lower.includes('python')) return techLogoCatalog['Python'];
  if (lower === 'js' || lower.includes('javascript')) return techLogoCatalog['JavaScript'];
  if (lower === 'ts' || lower.includes('typescript')) return techLogoCatalog['TypeScript'];
  if (lower.includes('react')) return techLogoCatalog['React'];
  if (lower.includes('node')) return techLogoCatalog['Node.js'];
  if (lower.includes('tailwind')) return techLogoCatalog['Tailwind CSS'];
  if (lower.includes('postgres')) return techLogoCatalog['PostgreSQL'];
  if (lower.includes('mongo')) return techLogoCatalog['MongoDB'];
  if (lower.includes('docker')) return techLogoCatalog['Docker'];
  if (lower.includes('kubernetes')) return techLogoCatalog['Kubernetes'];
  if (lower.includes('colab')) return techLogoCatalog['Google Colab'];
  if (lower.includes('jupyter')) return techLogoCatalog['Jupyter Notebook'];
  if (lower.includes('opencv')) return techLogoCatalog['OpenCV'];
  if (lower.includes('tensorflow')) return techLogoCatalog['TensorFlow'];
  if (lower.includes('pytorch')) return techLogoCatalog['PyTorch'];
  if (lower.includes('three')) return techLogoCatalog['ThreeJS'];
  if (lower.includes('pypi') || lower.includes('pip')) return techLogoCatalog['Python'];

  return undefined;
};
