export interface ProjectHowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectTechnicalImplementation {
  summary: string;
  details: string[];
}

export interface ProjectArchitecture {
  summary?: string;
  workflow?: { step: number; title: string; description: string }[];
  components?: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline?: string;
  description: string;
  overview: string;
  problemStatement: string;
  proposedSolution: string;
  keyFeatures: string[];
  howItWorks: ProjectHowItWorksStep[];
  architecture?: ProjectArchitecture;
  technicalImplementation: ProjectTechnicalImplementation;
  technologies: string[];
  engineeringChallenges: ProjectChallenge[];
  projectOutcome: string;
  conclusion: string;
  projectType: string;
  duration?: string;
  repositoryUrl: string;
  liveUrl?: string;
  hasDetailsPage: boolean;
  category: ('Python' | 'Flask' | 'FastAPI' | 'React' | 'JavaScript' | 'Machine Learning' | 'Deep Learning' | 'Automation')[];
  featuredLogo?: string;
  previewImage?: string;
}

export const projects: ProjectItem[] = [
  {
    id: "quickbrowse",
    slug: "quickbrowse",
    title: "QuickBrowse",
    subtitle: "Browser Profile Manager",
    tagline: "Windows Desktop Application · PyWebView & Flask",
    description: "A centralized desktop application designed to simplify discovering, searching, organizing, and launching browser profiles from one unified interface.",
    overview: "QuickBrowse is a centralized Windows desktop application designed to simplify browser profile management. It automatically discovers existing browser profiles across Google Chrome, Microsoft Edge, and Brave, allowing users to search, organize, filter, and launch profiles through a unified interface.",
    problemStatement: "Managing multiple browser profiles across different browsers can become time-consuming and inconvenient. Users often switch between personal, professional, and academic accounts, requiring them to manually locate and open the correct browser profile.",
    proposedSolution: "QuickBrowse provides a single desktop interface that discovers installed browser profiles and makes them accessible through a searchable profile management system.",
    keyFeatures: [
      "Automatic discovery of Chrome, Edge, and Brave profiles.",
      "Instant profile search using profile or account names.",
      "Browser-based profile filtering.",
      "Single-click profile selection and double-click launching.",
      "Direct profile-folder access through Windows Explorer.",
      "Keyboard navigation and shortcuts.",
      "Permission prompts before accessing profile data.",
      "Error handling and logging."
    ],
    howItWorks: [
      { step: 1, title: "Browser Detection", description: "Detects installed supported browsers across standard Windows program directories and Registry entries." },
      { step: 2, title: "Profile Discovery", description: "Discovers available user profiles by reading browser root User Data folders." },
      { step: 3, title: "Data Extraction", description: "Retrieves profile names, avatar icons, and account metadata from Local State and Preferences JSON files." },
      { step: 4, title: "Desktop Presentation", description: "Displays formatted profiles through the desktop interface with instantaneous search and filtering." },
      { step: 5, title: "User Search & Filter", description: "Allows users to filter by browser or search dynamically with real-time text matching." },
      { step: 6, title: "Profile Execution", description: "Launches the selected browser executable with the precise --profile-directory command-line switch." }
    ],
    architecture: {
      summary: "QuickBrowse connects a lightweight HTML5/JavaScript frontend with a local Python Flask API through an embedded PyWebView browser wrapper on Windows.",
      workflow: [
        { step: 1, title: "User Interface", description: "PyWebView presents a responsive desktop window communicating via local HTTP API requests." },
        { step: 2, title: "Flask Backend", description: "Flask server runs locally, orchestrating discovery requests, filesystem validation, and process spawning." },
        { step: 3, title: "Discovery Engine", description: "Scans Windows Registry and user AppData folders (Chrome, Edge, Brave) to parse JSON profile configurations." },
        { step: 4, title: "Execution Subprocess", description: "Spawns browser instances targeting selected profiles using native Windows subprocess calls." }
      ]
    },
    technicalImplementation: {
      summary: "Python handles the core application logic and system integration, while Flask and PyWebView deliver a modern desktop user experience.",
      details: [
        "Python handles core business logic, filesystem interactions, and process management.",
        "Flask provides lightweight local REST endpoints for profile discovery and launch operations.",
        "PyWebView embeds the web-based UI into a native Windows frame without requiring heavy browser runtimes.",
        "JavaScript handles frontend state management, keyboard shortcuts, and dynamic search filtering.",
        "Windows Registry and filesystem APIs locate Chrome, Edge, and Brave installation paths dynamically."
      ]
    },
    technologies: ["Python", "Flask", "PyWebView", "HTML5", "CSS3", "JavaScript", "Windows Registry"],
    engineeringChallenges: [
      {
        challenge: "Discovering browser profiles across different installation configurations.",
        solution: "Implemented hierarchical discovery routines supporting default user directories, custom installation drives, and portable browser configurations."
      },
      {
        challenge: "Handling missing or inaccessible profile directories.",
        solution: "Added proactive filesystem validation checks and graceful fallback handlers to filter out corrupted or deleted profile directories."
      },
      {
        challenge: "Integrating a web-based interface with Windows desktop functionality.",
        solution: "Utilized PyWebView's native inter-process bridge to invoke desktop subprocesses asynchronously without freezing UI responsiveness."
      },
      {
        challenge: "Managing permissions and application errors.",
        solution: "Designed user permission confirmation prompts and implemented rotating file-based error logging for diagnostic analysis."
      }
    ],
    projectOutcome: "QuickBrowse brings multiple browser profiles into one centralized desktop interface, reducing repetitive navigation and simplifying everyday browser profile management.",
    conclusion: "QuickBrowse demonstrates the integration of Python desktop development, browser profile discovery, local backend services, and web technologies into a unified Windows application.",
    projectType: "Windows Desktop Application",
    duration: "June 2026 – July 2026",
    repositoryUrl: "https://github.com/KarthikeyanSA369/QuickBrowse",
    hasDetailsPage: true,
    category: ["Python", "Flask", "JavaScript"],
    featuredLogo: "/src/assets/projects/quickbrowse-logo.png",
    previewImage: "/src/assets/projects/quickbrowse-laptop-preview.png"
  },
  {
    id: "terminal-board",
    slug: "terminal-board",
    title: "Terminal Board",
    subtitle: "Integrated System Monitoring & Diagnostic Platform",
    tagline: "One Center. Every Control.",
    description: "An integrated system monitoring and diagnostic platform for collecting hardware, software, and network information in real-time.",
    overview: "Terminal Board is an integrated system monitoring and diagnostic platform designed to bring important hardware, software, and system information into a centralized interface. It aims to simplify system inspection and make diagnostic information easier to access.",
    problemStatement: "System information and diagnostic details are often distributed across different operating system utilities and command-line tools. Manually checking hardware configurations, software information, and network-related details can make system inspection inconvenient.",
    proposedSolution: "Terminal Board organizes system monitoring and diagnostic capabilities into a unified platform, helping users access important system information without repeatedly switching between separate utilities.",
    keyFeatures: [
      "System information collection.",
      "Hardware inventory and configuration visibility.",
      "Software and system diagnostics.",
      "Network monitoring capabilities.",
      "Centralized diagnostic information.",
      "Organized presentation of system-related details."
    ],
    howItWorks: [
      { step: 1, title: "Initiate Collection", description: "Initiates system information collection across kernel, hardware, and OS diagnostic hooks." },
      { step: 2, title: "Hardware & Software Discovery", description: "Retrieves CPU metrics, memory allocation, storage partitions, motherboard specs, and OS build data." },
      { step: 3, title: "Diagnostic Monitoring", description: "Collects network socket telemetry, ping latency, and running system background process details." },
      { step: 4, title: "Data Processing", description: "Normalizes raw telemetry data into structured schemas with health threshold checks." },
      { step: 5, title: "Visual Presentation & Export", description: "Presents diagnostic metrics through the interface and supports automated export to JSON, TXT, and HTML." }
    ],
    architecture: {
      summary: "Terminal Board uses a multi-threaded telemetry engine in Python to aggregate hardware, network, and system diagnostics into unified report generators.",
      workflow: [
        { step: 1, title: "Telemetry Probes", description: "Asynchronous worker threads poll CPU counters, RAM pages, and storage volumes without blocking the UI." },
        { step: 2, title: "Diagnostic Core", description: "Analyzes system metrics against safety thresholds and detects abnormal utilization spikes." },
        { step: 3, title: "Network Prober", description: "Executes non-blocking socket checks and gateway latency monitoring." },
        { step: 4, title: "Report Generator", description: "Compiles system snapshots into standalone HTML, JSON, and text diagnostic reports." }
      ]
    },
    technicalImplementation: {
      summary: "The platform focuses on integrating system-level information collection, hardware inventory, and diagnostic functionality.",
      details: [
        "Python-based telemetry engine queries native OS APIs to retrieve CPU, memory, storage, and peripheral inventory.",
        "Hardware inventory parser identifies motherboards, GPU chipsets, BIOS firmware, and connected devices.",
        "Network inspection module measures socket telemetry, latency diagnostics, and active network adapters.",
        "Standalone report exporter formats system snapshots into portable JSON, TXT, and HTML executive summaries."
      ]
    },
    technologies: ["Python", "System Diagnostics", "Hardware Inventory", "Network Monitoring", "JSON/HTML Exporter"],
    engineeringChallenges: [
      {
        challenge: "Collecting information from different system components.",
        solution: "Engineered low-overhead metric polling using native OS system APIs to prevent observer-effect CPU spikes."
      },
      {
        challenge: "Organizing diagnostic information.",
        solution: "Constructed unified data schemas that normalize divergent hardware and operating system metrics into consistent key-value structures."
      },
      {
        challenge: "Presenting system information in an understandable format.",
        solution: "Structured clean tabular views and built multi-format reporting pipelines outputting clean, standalone HTML executive summaries."
      },
      {
        challenge: "Handling differences in available system information.",
        solution: "Structured asynchronous worker threads for non-blocking network socket diagnostics with fallback probes when hardware sensors are restricted."
      }
    ],
    projectOutcome: "A centralized system monitoring and diagnostic platform that makes hardware, software, and system-related information more accessible.",
    conclusion: "Terminal Board demonstrates an approach to combining system monitoring and diagnostic capabilities into one organized platform.",
    projectType: "System Utility",
    duration: "Verified Utility",
    repositoryUrl: "https://github.com/KarthikeyanSA369/TERMINAL-BOARD",
    hasDetailsPage: true,
    category: ["Python", "JavaScript"],
    featuredLogo: "/src/assets/projects/terminalboard-logo.png",
    previewImage: "/src/assets/projects/terminalboard-logo.png"
  },
  {
    id: "smart-report-alert",
    slug: "smart-report-alert-system",
    title: "Smart Report Alert System",
    subtitle: "Automated Stock Monitoring & Reorder Solution",
    tagline: "n8n Automated Inventory Intelligence Pipeline",
    description: "An automated stock monitoring and reporting solution designed to help shop owners identify inventory conditions and manage stock replenishment more efficiently.",
    overview: "Smart Report Alert System is an automated stock monitoring and reporting solution designed to help shop owners identify inventory conditions and manage stock replenishment more efficiently.",
    problemStatement: "Manually monitoring inventory levels and identifying products that require replenishment can become repetitive and time-consuming. Delayed identification of low-stock items may affect inventory availability and day-to-day operations.",
    proposedSolution: "The system automates stock monitoring and reporting workflows, helping identify inventory conditions and supporting timely reorder decisions.",
    keyFeatures: [
      "Automated stock data processing.",
      "Inventory level monitoring.",
      "Identification of low-stock conditions.",
      "Automated reporting.",
      "Reorder-related notifications.",
      "Workflow-based inventory monitoring."
    ],
    howItWorks: [
      { step: 1, title: "Data Ingestion", description: "Receives or reads inventory CSV data from store management spreadsheets or file drops." },
      { step: 2, title: "Data Processing", description: "Processes available stock information, cleans irregular formatting, and validates column schemas." },
      { step: 3, title: "Condition Evaluation", description: "Evaluates current stock levels against configured safety-stock formulas and sales velocity moving averages." },
      { step: 4, title: "Item Identification", description: "Identifies items requiring replenishment and automatically computes recommended reorder quantities." },
      { step: 5, title: "Alert Dispatch", description: "Generates formatted HTML alert summaries and dispatches email digests directly to shop owners." }
    ],
    architecture: {
      summary: "Smart Report Alert System is orchestrated using modular n8n workflow nodes that handle data ingestion, JavaScript computation, threshold evaluation, and email dispatch.",
      workflow: [
        { step: 1, title: "Trigger Node", description: "Scheduled cron triggers initiate daily inventory audits or execute on-demand when new CSV files arrive." },
        { step: 2, title: "CSV Parser", description: "Extracts line items, validates data types, and normalizes SKU numbers." },
        { step: 3, title: "Calculation Node", description: "Lightweight JavaScript code node computes moving-average demand and replenishment thresholds." },
        { step: 4, title: "Email Dispatch Node", description: "Formats responsive HTML tables and transmits alerts via SMTP/Gmail." }
      ]
    },
    technicalImplementation: {
      summary: "The project uses automation-oriented workflows and data processing to manage inventory monitoring and reporting.",
      details: [
        "n8n workflow engine schedules daily ingestion of supplier and store inventory CSV spreadsheets.",
        "JavaScript code nodes validate CSV schemas and compute moving-average demand across SKUs.",
        "Threshold evaluation rules detect items below critical safety stock quantities dynamically.",
        "Automated notification service formats responsive HTML alert digests and dispatches them via SMTP/Gmail."
      ]
    },
    technologies: ["n8n", "JavaScript", "CSV Processing", "Email Automation", "Data Analytics"],
    engineeringChallenges: [
      {
        challenge: "Processing inventory data consistently.",
        solution: "Constructed resilient n8n workflow nodes handling irregular CSV formatting, stray delimiters, and missing data values."
      },
      {
        challenge: "Identifying relevant stock conditions.",
        solution: "Formulated mathematical moving-average demand calculations inside lightweight JavaScript code nodes to prevent false alarms."
      },
      {
        challenge: "Automating reporting workflows.",
        solution: "Established automated scheduling triggers with retry mechanisms for transient network hiccups."
      },
      {
        challenge: "Managing notification triggers.",
        solution: "Implemented digest grouping and rate limiting to consolidate alerts into single daily executive digests and avoid notification fatigue."
      }
    ],
    projectOutcome: "An automated inventory monitoring and reporting workflow intended to reduce repetitive manual stock-checking activities.",
    conclusion: "Smart Report Alert System demonstrates how workflow automation and data processing can support inventory monitoring and reorder-related operations.",
    projectType: "Automation",
    duration: "Automated Pipeline",
    repositoryUrl: "https://github.com/KarthikeyanSA369/Smart-Report-Alert-System",
    hasDetailsPage: true,
    category: ["Automation", "JavaScript"]
  },
  {
    id: "gmail-response-automation",
    slug: "gmail-response-automation",
    title: "Gmail Response Automation",
    subtitle: "Intelligent Email Processing & Reply Workflow",
    tagline: "n8n · Gmail API · Groq API · Llama 3.3 70B",
    description: "An intelligent email processing workflow designed to automate incoming email handling and assist with generating contextual responses using AI-powered processing.",
    overview: "Gmail Response Automation is an intelligent email processing workflow designed to automate incoming email handling and assist with generating contextual responses using AI-powered processing.",
    problemStatement: "Handling incoming emails manually can consume significant time, especially when users receive repeated requests and messages requiring similar types of responses. Organizing and responding to emails efficiently can become challenging.",
    proposedSolution: "The workflow connects email processing with AI-based response generation to help automate supported email-handling tasks.",
    keyFeatures: [
      "Gmail integration.",
      "Automated incoming email processing.",
      "AI-assisted email understanding.",
      "Context-aware response generation.",
      "Workflow-based email handling.",
      "Automated response-related operations."
    ],
    howItWorks: [
      { step: 1, title: "Inbox Monitoring", description: "Monitors or receives incoming emails through the configured Gmail integration via OAuth2 webhooks." },
      { step: 2, title: "Context Retrieval", description: "Retrieves sender address, subject line, body text, and thread history for context extraction." },
      { step: 3, title: "AI Analysis", description: "Processes the message through configured n8n AI workflow nodes with structured prompt templates." },
      { step: 4, title: "Response Synthesis", description: "Generates an accurate, professional response using the connected Groq API and Llama 3.3 70B model." },
      { step: 5, title: "Reply Execution", description: "Executes the configured reply action, appending the response to the existing conversation thread." }
    ],
    architecture: {
      summary: "An autonomous communications bridge orchestrated with n8n, connecting the Gmail API with the ultra-fast Groq LLM inference engine.",
      workflow: [
        { step: 1, title: "Gmail Trigger", description: "Detects unread emails matching inbox filter criteria." },
        { step: 2, title: "Data Sanitizer", description: "Strips HTML tags, signatures, and disclaimers to extract clean core inquiry text." },
        { step: 3, title: "Groq Inference Node", description: "Sub-second inference with llama-3.3-70b-versatile generating contextual responses." },
        { step: 4, title: "Gmail Reply Node", description: "Dispatches the generated response maintaining message headers and thread IDs." }
      ]
    },
    technicalImplementation: {
      summary: "The workflow combines email APIs with modern LLM inference engines through event-driven automation nodes.",
      details: [
        "n8n orchestrates the automation workflow and polls the inbox using Gmail API OAuth2 credentials.",
        "Gmail API provides secure, token-authenticated access to read inquiries and send threaded replies.",
        "Groq API provides sub-second LLM inference utilizing the open-source llama-3.3-70b-versatile model.",
        "JavaScript transformation nodes handle body sanitization, regex matching, and payload formatting."
      ]
    },
    technologies: ["n8n", "Gmail API", "Groq API", "JavaScript", "llama-3.3-70b-versatile"],
    engineeringChallenges: [
      {
        challenge: "Integrating email services with automation workflows.",
        solution: "Configured robust OAuth2 authentication credentials and scopes for the Gmail API within n8n."
      },
      {
        challenge: "Processing incoming email content.",
        solution: "Engineered prompt templates and preprocessing filters preventing hallucinations while enforcing concise, polite corporate tone."
      },
      {
        challenge: "Connecting AI response generation to email operations.",
        solution: "Bound outbound replies directly to the incoming Message-ID and Thread-ID headers, maintaining unbroken email threads."
      },
      {
        challenge: "Handling workflow failures and API responses.",
        solution: "Implemented automated catch-and-retry error branches to absorb transient rate limits and network latency gracefully."
      }
    ],
    projectOutcome: "An AI-assisted email automation workflow that reduces repetitive email-processing activities.",
    conclusion: "Gmail Response Automation demonstrates the integration of email APIs, AI services, and workflow automation to simplify email handling.",
    projectType: "AI Automation",
    duration: "AI Workflow",
    repositoryUrl: "https://github.com/KarthikeyanSA369/Gmail_response_n8n",
    previewImage: "/src/assets/projects/gmail-automation-preview.png",
    hasDetailsPage: true,
    category: ["Automation", "Machine Learning", "JavaScript"]
  },
  {
    id: "sih-3d-ulpin",
    slug: "sih-3d-ulpin",
    title: "SIH 3D ULPIN",
    subtitle: "3D Property Visualization & Cadastral Mapping",
    tagline: "Smart India Hackathon · 3D WebGL Visualization",
    description: "A web application for 3D property visualization, cadastral mapping, vertical property management, and property validation.",
    overview: "SIH 3D ULPIN is a web-based project focused on 3D property visualization and cadastral mapping. It aims to present property-related geographical information through an interactive three-dimensional visualization experience.",
    problemStatement: "Understanding property boundaries and cadastral information through conventional two-dimensional representations can make spatial interpretation difficult. Users may need a more intuitive way to explore property-related information.",
    proposedSolution: "The project focuses on presenting property and cadastral information through interactive 3D visualization, helping users understand spatial relationships and property representations.",
    keyFeatures: [
      "3D property visualization.",
      "Cadastral mapping representation.",
      "Interactive spatial exploration.",
      "Web-based visualization interface.",
      "Structured presentation of property-related information."
    ],
    howItWorks: [
      { step: 1, title: "Application Access", description: "Accesses the web-based cadastral mapping portal directly via any modern web browser." },
      { step: 2, title: "Spatial Data Loading", description: "Loads spatial coordinates, boundary vectors, and ULPIN property registry metadata." },
      { step: 3, title: "3D Processing", description: "Processes geographic coordinates and applies vertical extrusion algorithms to construct volumetric models." },
      { step: 4, title: "WebGL Scene Rendering", description: "Displays parcel boundaries, vertical sub-units, and surrounding terrain in an interactive 3D scene." },
      { step: 5, title: "Spatial Exploration", description: "Allows users to orbit, zoom, inspect floor ownership, and run spatial validation queries." }
    ],
    architecture: {
      summary: "SIH 3D ULPIN combines a reactive component interface with a 3D WebGL rendering pipeline, mapping cadastral parcel boundaries to extruded volumetric meshes.",
      workflow: [
        { step: 1, title: "Frontend Client", description: "React and TypeScript power the application shell and cadastral inspection drawer." },
        { step: 2, title: "WebGL Viewport", description: "Renders 3D coordinate boundaries with dynamic lighting, orbital cameras, and polygon extrusions." },
        { step: 3, title: "Spatial Validation", description: "Calculates geometry intersections to detect overlapping parcels and verify vertical floor allocations." },
        { step: 4, title: "Query Assistant", description: "Optional Gemini API integration assists users with natural language cadastral registry inquiries." }
      ]
    },
    technicalImplementation: {
      summary: "React and TypeScript support the frontend application, Vite supports development, and WebGL powers the three-dimensional presentation.",
      details: [
        "React and TypeScript provide a type-safe, component-driven client architecture.",
        "Vite enables rapid compilation, hot-module replacement, and optimized production bundling.",
        "WebGL-based 3D visualization renders interactive spatial coordinate viewports with orbital camera controls.",
        "Coordinate transformation algorithms map geo-referenced ULPIN boundary points into 3D polygon meshes.",
        "Modular AI inquiry module connects to Google Gemini API for natural-language parcel assistance."
      ]
    },
    technologies: ["React", "TypeScript", "Vite", "3D WebGL Visualization", "Google Gemini API"],
    engineeringChallenges: [
      {
        challenge: "Presenting spatial information clearly.",
        solution: "Engineered smooth orbital camera controls with perspective presets, zoom limits, and automatic boundary framing."
      },
      {
        challenge: "Integrating three-dimensional visualization into a web interface.",
        solution: "Optimized polygon vertex buffers and extrusion algorithms to sustain smooth 60 FPS rendering in standard web browsers."
      },
      {
        challenge: "Organizing property-related information.",
        solution: "Structured a flexible schema separating base geographic coordinates from vertical multi-floor property rights."
      },
      {
        challenge: "Maintaining an understandable user interaction flow.",
        solution: "Built click-to-highlight inspection interactions allowing users to select any parcel and review its attributes instantly."
      }
    ],
    projectOutcome: "A web-based 3D property visualization experience designed to improve the presentation and exploration of cadastral information.",
    conclusion: "SIH 3D ULPIN demonstrates the use of modern web technologies and 3D visualization techniques for property-related spatial representation.",
    projectType: "Web Application",
    duration: "Hackathon Initiative",
    repositoryUrl: "https://github.com/KarthikeyanSA369/SIH_3D-ULPIN",
    previewImage: "/src/assets/projects/sih-3d-ulpin-preview.jpg",
    hasDetailsPage: true,
    category: ["React", "JavaScript"]
  },
  {
    id: "secureshare",
    slug: "secureshare",
    title: "SecureShare",
    subtitle: "Post-Quantum Secure Document Distribution & Forensics",
    tagline: "NIST Standards · Forensic Provenance Watermarking",
    description: "A secure document-sharing prototype combining encryption, recipient access, watermarking, digital signatures, and forensic verification.",
    overview: "SecureShare is a secure document-sharing prototype focused on document distribution, recipient access management, watermarking, and forensic-related capabilities. The project explores security-focused approaches to controlling and monitoring document sharing.",
    problemStatement: "Sharing sensitive documents digitally introduces challenges involving unauthorized distribution, recipient access, document confidentiality, and accountability. Conventional file-sharing approaches may not provide sufficient visibility or control over how documents are distributed.",
    proposedSolution: "SecureShare explores a secure document distribution workflow that combines controlled recipient access and document protection mechanisms with forensic-oriented capabilities.",
    keyFeatures: [
      "Secure document distribution.",
      "Recipient access management.",
      "Document watermarking.",
      "Forensic-oriented document tracking capabilities.",
      "Web-based application interface.",
      "Security-focused document handling."
    ],
    howItWorks: [
      { step: 1, title: "Document Upload", description: "A confidential document is uploaded to the application over encrypted channels." },
      { step: 2, title: "Process Initiation", description: "The document-sharing process is configured with recipient identity constraints and expiration rules." },
      { step: 3, title: "Cryptographic Protection", description: "Payload is encrypted using AES-256-GCM and enveloped using post-quantum ML-KEM-768 key encapsulation." },
      { step: 4, title: "Forensic Watermarking", description: "OpenCV applies spatial-frequency transforms to embed imperceptible recipient-specific watermarks." },
      { step: 5, title: "Controlled Distribution", description: "The protected document is signed with ML-DSA-65 and distributed securely to verified recipients." },
      { step: 6, title: "Forensic Leak Tracking", description: "Investigators can extract embedded watermarks from leaked files to verify exact recipient origin." }
    ],
    architecture: {
      summary: "SecureShare merges classical symmetric ciphers with NIST Post-Quantum Cryptography algorithms and OpenCV steganographic forensic pipelines.",
      workflow: [
        { step: 1, title: "Frontend Client", description: "React and TypeScript interface for document owners, recipients, and security auditors." },
        { step: 2, title: "FastAPI Backend", description: "Asynchronous Python API handling document processing, user auth, and encryption." },
        { step: 3, title: "Post-Quantum Crypto", description: "Implements ML-KEM-768 for quantum-safe key exchange and ML-DSA-65 for tamper-proof signatures." },
        { step: 4, title: "Forensics Engine", description: "OpenCV and NumPy algorithms embed and extract invisible frequency-domain watermarks." }
      ]
    },
    technicalImplementation: {
      summary: "Python and FastAPI power the secure backend while React and TypeScript deliver a clean recipient management interface.",
      details: [
        "Python and FastAPI provide high-performance asynchronous REST endpoints for file processing.",
        "React and TypeScript deliver an intuitive frontend for document configuration and audit logs.",
        "AES-256-GCM provides high-speed authenticated symmetric encryption for the underlying document payload.",
        "NIST-standardized ML-KEM-768 provides quantum-resistant key encapsulation for shared symmetric keys.",
        "ML-DSA-65 generates quantum-safe digital signatures verifying document integrity and sender authenticity.",
        "OpenCV and NumPy embed imperceptible recipient watermarks resistant to screenshot capture and re-encoding."
      ]
    },
    technologies: ["Python", "FastAPI", "React", "TypeScript", "OpenCV", "NumPy", "AES-256-GCM", "ML-KEM-768", "ML-DSA-65"],
    engineeringChallenges: [
      {
        challenge: "Managing document access.",
        solution: "Designed strict role-based access control separating Administrator, Recipient, and Investigator portals."
      },
      {
        challenge: "Integrating security mechanisms into document distribution.",
        solution: "Interfaced native C post-quantum cryptographic primitives seamlessly within Python FastAPI asynchronous endpoints."
      },
      {
        challenge: "Handling document protection and watermarking.",
        solution: "Engineered discrete cosine transform watermark embedding that survives image compression, cropping, and print-scan degradation."
      },
      {
        challenge: "Maintaining a clear user workflow for secure sharing.",
        solution: "Constructed secure in-memory temporary decryption buffers that prevent decrypted plain-text artifacts from leaking to disk."
      }
    ],
    projectOutcome: "A security-focused document-sharing prototype exploring controlled distribution and forensic-oriented document protection.",
    conclusion: "SecureShare demonstrates the integration of modern web application technologies with document security and controlled distribution concepts.",
    projectType: "Security Application",
    duration: "Research Prototype",
    repositoryUrl: "https://github.com/KarthikeyanSA369/SIH-Secure-Document-Sharing-with-Decryption-Tracking",
    previewImage: "/src/assets/projects/secureshare-preview.jpg",
    hasDetailsPage: true,
    category: ["Python", "FastAPI", "React", "Deep Learning"]
  },
  {
    id: "tamil-news-daily",
    slug: "tamil-news-daily",
    title: "Tamil News Daily",
    subtitle: "Automated Regional News Digest & Multi-Channel Distribution",
    tagline: "n8n · OpenAI GPT-4o Mini · Supabase · Multi-Channel",
    description: "An automated Tamil news newsletter workflow that collects news, generates Tamil summaries, manages subscribers, and distributes newsletters.",
    overview: "Tamil News Daily is an automated regional news digest workflow designed to collect news content, generate Tamil-language summaries, and support distribution across multiple communication channels.",
    problemStatement: "Following regional news from multiple sources and preparing readable Tamil summaries can require repeated manual effort. Distributing curated news through different channels can also become time-consuming.",
    proposedSolution: "Tamil News Daily automates the news digest preparation workflow, helping organize regional news content, generate summaries, and distribute the resulting digest through configured channels.",
    keyFeatures: [
      "Automated news collection.",
      "Regional news aggregation.",
      "Tamil-language news summarization.",
      "Automated digest generation.",
      "Multi-channel content distribution.",
      "Workflow-based content processing."
    ],
    howItWorks: [
      { step: 1, title: "Source Collection", description: "Collects news feeds continuously from configured Google News RSS and regional sources." },
      { step: 2, title: "Content Processing", description: "Processes and sanitizes incoming news articles, extracting full text and removing advertising noise." },
      { step: 3, title: "Tamil Summarization", description: "Generates concise, fluent Tamil summaries using OpenAI GPT-4o Mini with contextual prompt engineering." },
      { step: 4, title: "Digest Organization", description: "Organizes summarized articles by category (Politics, Business, Tech, Sports) into responsive HTML templates." },
      { step: 5, title: "Multi-Channel Distribution", description: "Distributes the completed digest to Supabase email subscribers and broadcasts alerts to Slack channels." }
    ],
    architecture: {
      summary: "An autonomous editorial pipeline built with n8n, integrating RSS scrapers, OpenAI LLM summarization, Supabase subscriber storage, and dispatch webhooks.",
      workflow: [
        { step: 1, title: "RSS Ingestion", description: "Crawls verified regional news feeds at scheduled daily intervals." },
        { step: 2, title: "Deduplication", description: "Vector and keyword matching nodes remove overlapping stories across news outlets." },
        { step: 3, title: "AI Translation & Summary", description: "OpenAI GPT-4o Mini crafts natural Tamil headlines and 3-sentence summaries." },
        { step: 4, title: "Publishing Matrix", description: "Simultaneously dispatches formatted email newsletters and broadcasts Slack announcements." }
      ]
    },
    technicalImplementation: {
      summary: "The workflow coordinates automated news scraping, AI language models, and multi-channel delivery nodes.",
      details: [
        "n8n orchestrates automated cron-scheduled execution across news aggregation pipelines.",
        "Google News RSS feeds continuously poll headlines across politics, economy, technology, and regional affairs.",
        "OpenAI GPT-4o Mini processes incoming news, synthesizing concise, grammatically fluent Tamil summaries.",
        "Supabase database manages subscriber lists, delivery preferences, and secure unsubscribe tokens.",
        "Multi-channel publishing nodes compile responsive HTML email newsletters and broadcast key news flashes to Slack."
      ]
    },
    technologies: ["n8n", "OpenAI GPT-4o Mini", "Google News RSS", "Supabase", "Gmail API", "Slack Webhooks", "JavaScript"],
    engineeringChallenges: [
      {
        challenge: "Collecting news from different sources.",
        solution: "Built robust multi-feed RSS aggregators with automated schema normalization and error-tolerant parsing."
      },
      {
        challenge: "Organizing incoming content.",
        solution: "Developed deduplication logic comparing headline semantic similarity to filter redundant stories from competing publishers."
      },
      {
        challenge: "Producing understandable Tamil summaries.",
        solution: "Formulated few-shot translation prompts ensuring natural Tamil grammatical syntax and localized regional terminology."
      },
      {
        challenge: "Coordinating automated multi-channel distribution.",
        solution: "Constructed parallel n8n execution branches for batch email dispatch and webhook broadcasts, complete with retry buffers."
      }
    ],
    projectOutcome: "An automated regional news digest workflow designed to simplify news collection, summarization, and distribution.",
    conclusion: "Tamil News Daily demonstrates how automation and language-processing workflows can support regional news consumption and distribution.",
    projectType: "AI Automation",
    duration: "Publishing System",
    repositoryUrl: "https://github.com/KarthikeyanSA369/Newsletter_Workflow_n8n",
    hasDetailsPage: true,
    category: ["Automation", "Machine Learning", "JavaScript"]
  },
  {
    id: "cleanify",
    slug: "cleanify",
    title: "Cleanify",
    subtitle: "Python Data & Environment Utility Package",
    tagline: "Pip-Installable Data & Workspace Sanitation Toolkit",
    description: "A pip-installable Python package utility engineered for rapid dataset hygiene, memory cleanup, and automated workspace sanitation.",
    overview: "Cleanify is a Python utility package designed to support data and development-environment-related utility operations. It aims to simplify commonly performed tasks through reusable Python functionality.",
    problemStatement: "Developers and data practitioners often perform repetitive data preparation and environment-related operations. Repeating these tasks across different projects can introduce unnecessary development effort.",
    proposedSolution: "Cleanify organizes supported utility operations into a reusable Python package that can be integrated into development workflows.",
    keyFeatures: [
      "Reusable Python utility functions.",
      "Data-related utility operations.",
      "Environment-related utility capabilities.",
      "Package-based installation and usage.",
      "Modular functionality for supported tasks."
    ],
    howItWorks: [
      { step: 1, title: "Installation", description: "Installs the Cleanify package directly into any standard Python environment via pip." },
      { step: 2, title: "Module Import", description: "Imports the required data or environment hygiene modules using intuitive functional syntax." },
      { step: 3, title: "Function Invocation", description: "Invokes supported utility functions passing pandas DataFrames, file paths, or directories." },
      { step: 4, title: "Processing & Sanitation", description: "Vectorized routines impute nulls, flag outliers, normalize whitespace, and prune temp caches." },
      { step: 5, title: "Output Return", description: "Returns sanitized data objects or comprehensive execution summaries with detailed metrics." }
    ],
    architecture: {
      summary: "Cleanify is organized into modular Python subpackages providing decoupled utilities for data cleaning and filesystem environment sanitation.",
      workflow: [
        { step: 1, title: "Core Library", description: "Pure Python architecture adhering to PEP 8 standards with zero bulky external dependencies." },
        { step: 2, title: "Data Module", description: "Vectorized routines for missing value imputation, text cleaning, and outlier normalization." },
        { step: 3, title: "Environment Module", description: "System utilities that detect ghost caches, orphaned temp files, and dangling artifacts." },
        { step: 4, title: "CLI Runner", description: "Optional command-line interface for executing workspace sanitation directly from terminal shells." }
      ]
    },
    technicalImplementation: {
      summary: "The package is designed around Python's reusable module and package structure, built for lightweight zero-overhead integration.",
      details: [
        "Pure Python architecture following PEP 8 coding standards and modular package organization.",
        "Vectorized cleaning routines for handling missing values, standardizing whitespace, and filtering anomalies in tabular datasets.",
        "Environment sanitation utilities that detect ghost caches, orphaned temporary files, and dangling artifacts.",
        "Setuptools packaging configuration enabling single-command installation (pip install cleanify).",
        "Automated unit test suite verifying cross-platform compatibility across Windows, Linux, and macOS."
      ]
    },
    technologies: ["Python", "PyPI Packaging", "Setuptools", "Flake8", "Unit Testing"],
    engineeringChallenges: [
      {
        challenge: "Designing reusable utility functions.",
        solution: "Created intuitive, chainable functional APIs requiring zero external heavy dependencies for fast import times."
      },
      {
        challenge: "Organizing package modules.",
        solution: "Partitioned data hygiene tools from environment management utilities into clean, independent namespaces."
      },
      {
        challenge: "Managing dependencies.",
        solution: "Built core utilities with pure Python standard libraries to eliminate version collision risks across varied projects."
      },
      {
        challenge: "Ensuring installation and usage are straightforward.",
        solution: "Published standardized wheels and source distributions with extensive docstrings and CLI flags."
      }
    ],
    projectOutcome: "A reusable Python package intended to simplify supported data and environment utility operations.",
    conclusion: "Cleanify demonstrates Python package development and the organization of reusable utilities for software development workflows.",
    projectType: "Python Package",
    duration: "Open-Source Utility",
    repositoryUrl: "https://github.com/KarthikeyanSA369/Cleanify",
    previewImage: "/src/assets/projects/cleanify-preview.webp",
    hasDetailsPage: true,
    category: ["Python"]
  }
];
