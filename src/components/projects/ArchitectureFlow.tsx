import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Cpu,
  Server,
  Database,
  Sparkles,
  User,
  Globe,
  Lock,
  Workflow,
  CheckCircle2,
  Info,
  ArrowRight,
  LayoutGrid,
  ListOrdered
} from 'lucide-react';
import type { ProjectItem } from '../../data/projects';

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'user' | 'frontend' | 'backend' | 'database' | 'ai' | 'security' | 'external' | 'output';
  techBadge?: string;
  responsibility: string;
  dataInput?: string;
  dataOutput?: string;
  notes?: string;
}

export interface ArchitectureConnection {
  fromId: string;
  toId: string;
  label: string;
  protocol?: string;
}

export interface ProjectArchitectureFlow {
  title: string;
  description: string;
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
}

export const projectArchitectureData: Record<string, ProjectArchitectureFlow> = {
  quickbrowse: {
    title: 'QuickBrowse Architecture & Profile Execution Flow',
    description: 'Local PyWebView desktop pipeline orchestrating browser profile discovery, fuzzy search, and isolated Chromium instance launching.',
    nodes: [
      {
        id: 'user-input',
        label: 'User',
        sublabel: 'Desktop Operator',
        type: 'user',
        techBadge: 'User Interaction',
        responsibility: 'Initiates profile search, selects browser filters (Chrome/Edge/Brave), or requests immediate profile launching.',
        dataInput: 'Keyboard strokes, mouse selections, launch triggers',
        dataOutput: 'Search query string & selected profile ID'
      },
      {
        id: 'desktop-ui',
        label: 'Desktop Interface',
        sublabel: 'PyWebView Native Window',
        type: 'frontend',
        techBadge: 'PyWebView / HTML5 / CSS3',
        responsibility: 'Renders reactive client application inside a lightweight native webview window without heavyweight electron dependencies.',
        dataInput: 'User interactions & local Flask API status',
        dataOutput: 'HTTP/JSON calls dispatched across the local loopback bridge'
      },
      {
        id: 'profile-search',
        label: 'Profile Search & Filter',
        sublabel: 'Real-Time Query Engine',
        type: 'frontend',
        techBadge: 'JavaScript Engine',
        responsibility: 'Executes high-speed fuzzy filtering on loaded profile metadata across profile names, account emails, and browser categories.',
        dataInput: 'Raw profile catalog JSON',
        dataOutput: 'Real-time filtered profile collection'
      },
      {
        id: 'flask-backend',
        label: 'Flask Backend',
        sublabel: 'Local Control API (127.0.0.1)',
        type: 'backend',
        techBadge: 'Python 3.11+ / Flask',
        responsibility: 'Coordinates system filesystem access, registry queries, logging, and child-process execution in a secure sandbox.',
        dataInput: 'Profile discovery requests & launch commands',
        dataOutput: 'Serialized profile objects & subprocess status'
      },
      {
        id: 'browser-detection',
        label: 'Browser Detection & Services',
        sublabel: 'Chromium Profile Parser',
        type: 'backend',
        techBadge: 'Python System Services',
        responsibility: 'Scans %LOCALAPPDATA% directories, locates Chrome, Edge, and Brave installations, and parses Local State and Preferences JSON.',
        dataInput: 'Windows User directory filesystem structures',
        dataOutput: 'Verified profile records (name, avatar, path, browser)'
      },
      {
        id: 'profile-launch',
        label: 'Profile Launch Engine',
        sublabel: 'Process Dispatcher',
        type: 'output',
        techBadge: 'subprocess.Popen',
        responsibility: 'Executes the exact browser executable using --profile-directory arguments, isolating process lifecycles safely.',
        dataInput: 'Executable path and target profile directory flag',
        dataOutput: 'Spawns detached browser process'
      },
      {
        id: 'target-browser',
        label: 'Active Browser Profile',
        sublabel: 'Launched Environment',
        type: 'output',
        techBadge: 'Chrome / Edge / Brave',
        responsibility: 'Opens target browser with full user cookies, sessions, extensions, and bookmarks ready for productive workflows.',
        dataInput: 'Browser profile directory launch context',
        dataOutput: 'Interactive browser session delivered to user'
      }
    ],
    connections: [
      { fromId: 'user-input', toId: 'desktop-ui', label: 'Enters search keywords / selects profile', protocol: 'UI Input' },
      { fromId: 'desktop-ui', toId: 'profile-search', label: 'Updates search query in real-time', protocol: 'DOM Event' },
      { fromId: 'profile-search', toId: 'flask-backend', label: 'POST /api/launch-profile', protocol: 'HTTP JSON Bridge' },
      { fromId: 'flask-backend', toId: 'browser-detection', label: 'Queries filesystem profile stores', protocol: 'Python Call' },
      { fromId: 'browser-detection', toId: 'profile-launch', label: 'Supplies verified browser executable & directory flag', protocol: 'Internal IPC' },
      { fromId: 'profile-launch', toId: 'target-browser', label: 'Launches browser with --profile-directory flag', protocol: 'OS Subprocess' }
    ]
  },

  'terminal-board': {
    title: 'Terminal Board Architecture & Telemetry Pipeline',
    description: 'Workstation diagnostic command center gathering CPU, memory, storage, and network sockets with instantaneous multi-format report exports.',
    nodes: [
      {
        id: 'user-control',
        label: 'User',
        sublabel: 'Systems Engineer',
        type: 'user',
        techBadge: 'Operator',
        responsibility: 'Monitors real-time telemetry, triggers hardware inspections, searches files, or requests diagnostic report generation.',
        dataInput: 'Dashboard view selections and export options',
        dataOutput: 'Sampling frequency, search queries, audit commands'
      },
      {
        id: 'terminal-ui',
        label: 'Terminal Board Interface',
        sublabel: 'Workstation Command Center',
        type: 'frontend',
        techBadge: 'Modern Reactive Dashboard',
        responsibility: 'Presents real-time telemetry widgets, metric gauges, system alerts, and diagnostic controls in a unified UI.',
        dataInput: 'Processed metric state stream',
        dataOutput: 'Display parameters & export trigger requests'
      },
      {
        id: 'monitoring-modules',
        label: 'System Monitoring Modules',
        sublabel: 'Telemetry Collection Workers',
        type: 'backend',
        techBadge: 'Python psutil / ctypes',
        responsibility: 'Asynchronously polls hardware sensors, CPU core frequencies, memory tables, disk I/O, and active network connections.',
        dataInput: 'Hardware & OS kernel telemetry interfaces',
        dataOutput: 'Raw system metric samples'
      },
      {
        id: 'hardware-network-info',
        label: 'Hardware & Network Audit',
        sublabel: 'Component Enumerator',
        type: 'backend',
        techBadge: 'WMI / System Diagnostics',
        responsibility: 'Enumerates motherboard specs, GPU details, network adapter configurations, ping latency metrics, and open listening sockets.',
        dataInput: 'Hardware registries and network sockets',
        dataOutput: 'Structured device and network inventories'
      },
      {
        id: 'data-processing',
        label: 'Data Processing Engine',
        sublabel: 'Threshold & Aggregator',
        type: 'backend',
        techBadge: 'Python Analysis Core',
        responsibility: 'Computes rolling utilization averages, analyzes spike anomalies, evaluates warning thresholds, and structures data models.',
        dataInput: 'Raw telemetry and inventory samples',
        dataOutput: 'Consolidated diagnostic health state'
      },
      {
        id: 'diagnostic-results',
        label: 'Diagnostic Results & Alerts',
        sublabel: 'Evaluation Unit',
        type: 'output',
        techBadge: 'Health Analyzer',
        responsibility: 'Generates health scorecards, flags resource bottlenecks, and generates actionable optimization recommendations.',
        dataInput: 'Consolidated diagnostic health state',
        dataOutput: 'Health status summary & critical notifications'
      },
      {
        id: 'dashboard-export',
        label: 'Dashboard & Report Exporter',
        sublabel: 'Multi-Format Pipeline',
        type: 'output',
        techBadge: 'JSON / TXT / HTML Exporter',
        responsibility: 'Outputs live UI visualizations and compiles standalone, portable executive diagnostic reports in HTML, JSON, and plain text.',
        dataInput: 'Complete diagnostic audit dataset',
        dataOutput: 'Downloadable inspection reports & live telemetry'
      }
    ],
    connections: [
      { fromId: 'user-control', toId: 'terminal-ui', label: 'Selects audit scope or initiates export', protocol: 'User Event' },
      { fromId: 'terminal-ui', toId: 'monitoring-modules', label: 'Dispatches metric polling requests', protocol: 'Async Thread' },
      { fromId: 'monitoring-modules', toId: 'hardware-network-info', label: 'Polls hardware, network, and sockets', protocol: 'OS API / WMI' },
      { fromId: 'hardware-network-info', toId: 'data-processing', label: 'Streams raw samples and interface states', protocol: 'Telemetry Stream' },
      { fromId: 'data-processing', toId: 'diagnostic-results', label: 'Feeds aggregated utilization & threshold anomalies', protocol: 'Data Pipeline' },
      { fromId: 'diagnostic-results', toId: 'dashboard-export', label: 'Formats diagnostic logs into standalone reports', protocol: 'File Writer' }
    ]
  },

  'smart-report-alert': {
    title: 'Smart Report Alert System Architecture',
    description: 'Autonomous inventory replenishment pipeline parsing stock CSV records, calculating demand velocity, and distributing automated restock notifications.',
    nodes: [
      {
        id: 'inventory-csv',
        label: 'Inventory CSV Source',
        sublabel: 'Daily Stock Records',
        type: 'database',
        techBadge: 'CSV Dataset',
        responsibility: 'Provides current SKU counts, lead times, historical unit sales, and supplier safety minimums.',
        dataInput: 'Point-of-Sale / ERP export spreadsheets',
        dataOutput: 'Raw delimited inventory records'
      },
      {
        id: 'data-processing',
        label: 'Data Processing & Parsing',
        sublabel: 'Schema Sanitizer',
        type: 'backend',
        techBadge: 'n8n JavaScript Core',
        responsibility: 'Parses CSV data rows, normalizes product codes, validates numeric stock levels, and cleans missing attributes.',
        dataInput: 'Raw delimited inventory records',
        dataOutput: 'Sanitized inventory objects'
      },
      {
        id: 'stock-demand-analysis',
        label: 'Stock & Demand Analysis',
        sublabel: 'Velocity Modeling',
        type: 'backend',
        techBadge: 'Moving-Average Engine',
        responsibility: 'Calculates moving-average sales velocity over 7-day and 30-day windows to determine actual consumption rate.',
        dataInput: 'Sanitized inventory objects & sales history',
        dataOutput: 'Demand velocity & days-of-supply metrics'
      },
      {
        id: 'reorder-checking',
        label: 'Reorder Condition Checking',
        sublabel: 'Rule Engine',
        type: 'backend',
        techBadge: 'Decision Logic',
        responsibility: 'Compares remaining stock against dynamic safety stock thresholds; flags critical stockouts and computes suggested reorder units.',
        dataInput: 'Days-of-supply & supplier minimum thresholds',
        dataOutput: 'Flagged replenishment list with reorder quantities'
      },
      {
        id: 'n8n-workflow',
        label: 'n8n Workflow Automation',
        sublabel: 'Orchestrator Core',
        type: 'backend',
        techBadge: 'n8n Workflow Engine',
        responsibility: 'Coordinates node execution, handles error branches, groups alerts by supplier, and compiles executive HTML email digests.',
        dataInput: 'Replenishment list & store configuration',
        dataOutput: 'Rendered responsive HTML email payload'
      },
      {
        id: 'email-notification',
        label: 'Email Alert Notification',
        sublabel: 'Dispatch Service',
        type: 'output',
        techBadge: 'SMTP / Gmail Integration',
        responsibility: 'Dispatches high-priority restock digest email directly to store managers with highlighted urgency indicators.',
        dataInput: 'Rendered responsive HTML email payload',
        dataOutput: 'Outbound SMTP email transmission'
      },
      {
        id: 'store-manager',
        label: 'Store Manager / User',
        sublabel: 'Business Decision Maker',
        type: 'user',
        techBadge: 'Recipient',
        responsibility: 'Receives instant actionable notification with reorder quantities and initiates purchase orders to prevent stockouts.',
        dataInput: 'Delivered email digest report',
        dataOutput: 'Supplier reorders executed on time'
      }
    ],
    connections: [
      { fromId: 'inventory-csv', toId: 'data-processing', label: 'Ingests daily inventory file', protocol: 'File Reader' },
      { fromId: 'data-processing', toId: 'stock-demand-analysis', label: 'Supplies sanitized product rows', protocol: 'In-Memory Pipeline' },
      { fromId: 'stock-demand-analysis', toId: 'reorder-checking', label: 'Provides moving-average consumption rates', protocol: 'Internal Analytics' },
      { fromId: 'reorder-checking', toId: 'n8n-workflow', label: 'Flags products requiring immediate reorder', protocol: 'Filter Output' },
      { fromId: 'n8n-workflow', toId: 'email-notification', label: 'Compiles formatted HTML email digest', protocol: 'SMTP Connector' },
      { fromId: 'email-notification', toId: 'store-manager', label: 'Delivers morning replenishment alerts to inbox', protocol: 'Delivered Email' }
    ]
  },

  'gmail-response-automation': {
    title: 'Gmail Response Automation Architecture',
    description: 'Intelligent AI communications bridge using n8n and Groq API (llama-3.3-70b-versatile) for sub-second, context-aware inbox replies.',
    nodes: [
      {
        id: 'incoming-email',
        label: 'Incoming Gmail Message',
        sublabel: 'Customer Inquiry',
        type: 'external',
        techBadge: 'Sender',
        responsibility: 'User or customer sends an email inquiry, feedback, or support question to the connected Gmail inbox.',
        dataInput: 'Customer email content & subject header',
        dataOutput: 'New unread message in Gmail inbox'
      },
      {
        id: 'gmail-trigger',
        label: 'Gmail Trigger & Poller',
        sublabel: 'OAuth2 Event Ingestion',
        type: 'external',
        techBadge: 'Google Gmail API',
        responsibility: 'Monitors inbox via OAuth2 credentials, detects unread messages, and retrieves the full message thread history.',
        dataInput: 'Inbox polling events',
        dataOutput: 'Raw email payload (headers, sender, body, threadId)'
      },
      {
        id: 'n8n-workflow',
        label: 'n8n Workflow Engine',
        sublabel: 'Context Processor',
        type: 'backend',
        techBadge: 'n8n Automation',
        responsibility: 'Parses email body, removes HTML signature clutter, prepares tone prompts, and formats API request parameters.',
        dataInput: 'Raw email payload',
        dataOutput: 'Structured LLM prompt with inquiry context'
      },
      {
        id: 'groq-ai',
        label: 'Groq AI API (LLM Inference)',
        sublabel: 'Sub-Second Intelligence Core',
        type: 'ai',
        techBadge: 'llama-3.3-70b-versatile',
        responsibility: 'Processes context and generates polite, concise, professional responses following rigorous prompt guardrails.',
        dataInput: 'Prompt with email context and response guidelines',
        dataOutput: 'High-quality generated candidate response'
      },
      {
        id: 'response-validation',
        label: 'Response Safety & Formatting',
        sublabel: 'Quality Assurance',
        type: 'backend',
        techBadge: 'JavaScript Rule Engine',
        responsibility: 'Validates reply structure, attaches official contact signatures, and binds conversation thread references.',
        dataInput: 'Generated candidate response',
        dataOutput: 'Approved final email draft'
      },
      {
        id: 'gmail-reply-action',
        label: 'Gmail Reply Action',
        sublabel: 'Threaded Dispatcher',
        type: 'output',
        techBadge: 'Gmail API Send',
        responsibility: 'Transmits email response directly within the active thread, ensuring seamless continuity for the recipient.',
        dataInput: 'Approved email draft with threadId and In-Reply-To',
        dataOutput: 'Dispatched outbound email message'
      },
      {
        id: 'recipient',
        label: 'Recipient / Customer',
        sublabel: 'End User',
        type: 'user',
        techBadge: 'Customer Inbox',
        responsibility: 'Receives prompt, human-like resolution to their query within seconds of sending their initial message.',
        dataInput: 'Delivered response email',
        dataOutput: 'Satisfied customer interaction'
      }
    ],
    connections: [
      { fromId: 'incoming-email', toId: 'gmail-trigger', label: 'Message arrives in connected inbox', protocol: 'SMTP' },
      { fromId: 'gmail-trigger', toId: 'n8n-workflow', label: 'Triggers on unread message with full body', protocol: 'OAuth2 Webhook' },
      { fromId: 'n8n-workflow', toId: 'groq-ai', label: 'Sends structured prompt with inquiry context', protocol: 'HTTPS REST / JSON' },
      { fromId: 'groq-ai', toId: 'response-validation', label: 'Returns synthesized reply in < 800ms', protocol: 'Groq Cloud Response' },
      { fromId: 'response-validation', toId: 'gmail-reply-action', label: 'Formats thread headers & signature', protocol: 'Internal Payload' },
      { fromId: 'gmail-reply-action', toId: 'recipient', label: 'Dispatches response into original thread', protocol: 'Gmail API' }
    ]
  },

  'sih-3d-ulpin': {
    title: 'SIH 3D ULPIN Architecture & Spatial Pipeline',
    description: '3D cadastral property visualization platform modernizing land records through multi-story vertical zoning and WebGL spatial mapping.',
    nodes: [
      {
        id: 'user-surveyor',
        label: 'User / Surveyor',
        sublabel: 'Citizen or Land Officer',
        type: 'user',
        techBadge: 'Web User',
        responsibility: 'Searches ULPIN parcel codes, navigates 3D spatial terrain, inspects floor subdivisions, and validates property rights.',
        dataInput: 'Parcel lookup queries, camera orbit & zoom actions',
        dataOutput: 'Selected parcel identifier & filter parameters'
      },
      {
        id: 'react-interface',
        label: 'React / TypeScript Interface',
        sublabel: 'Spatial Web Client',
        type: 'frontend',
        techBadge: 'React 19 / TypeScript / Vite',
        responsibility: 'Renders intuitive GIS controls, layer toggles, parcel metadata panels, and coordinates viewport camera interactions.',
        dataInput: 'User selections and transformed polygon coordinates',
        dataOutput: 'WebGL viewport draw directives'
      },
      {
        id: 'property-data',
        label: 'Property Data & ULPIN Store',
        sublabel: 'Cadastral Database',
        type: 'database',
        techBadge: 'Spatial Data Engine',
        responsibility: 'Maintains geographic coordinate boundaries, land ownership records, floor level subdivisions, and ULPIN registry records.',
        dataInput: 'Regional land survey dataset records',
        dataOutput: 'Raw parcel boundary coordinates and vertical metadata'
      },
      {
        id: 'spatial-processing',
        label: 'Backend & Processing Layer',
        sublabel: 'Coordinate Normalizer',
        type: 'backend',
        techBadge: 'TypeScript Spatial Core',
        responsibility: 'Calculates polygon extrusions, converts geographic coordinates to local 3D Cartesian coordinates, and validates parcel boundaries.',
        dataInput: 'Raw parcel boundary coordinates',
        dataOutput: 'Normalized 3D vertices, height layers & floor polygons'
      },
      {
        id: 'cadastral-visualization',
        label: 'Cadastral / Spatial 3D Engine',
        sublabel: 'WebGL Viewport',
        type: 'output',
        techBadge: 'Three.js / WebGL',
        responsibility: 'Projects 3D spatial property models, renders transparent vertical zoning boundaries, and animates property selections.',
        dataInput: 'Normalized 3D mesh geometry and camera state',
        dataOutput: 'Interactive 60fps 3D canvas rendering'
      },
      {
        id: 'gemini-integration',
        label: 'Google Gemini AI (Optional)',
        sublabel: 'Modular Inquiry Assistant',
        type: 'ai',
        techBadge: 'Optional Gemini API',
        responsibility: 'Optional modular AI assistant providing natural-language parcel explanation; not a mandatory dependency for core 3D mapping.',
        dataInput: 'Citizen property queries & parcel attributes',
        dataOutput: 'Natural-language spatial inquiry responses'
      },
      {
        id: 'property-view-output',
        label: '3D Property View & Rights',
        sublabel: 'Final Deliverable',
        type: 'output',
        techBadge: 'Verified Cadastral View',
        responsibility: 'Delivers transparent, tamper-evident visualization of vertical property ownership to citizens and land administration authorities.',
        dataInput: 'Interactive WebGL scene and validated land records',
        dataOutput: 'Accurate 3D cadastral rights confirmation'
      }
    ],
    connections: [
      { fromId: 'user-surveyor', toId: 'react-interface', label: 'Inputs ULPIN parcel code or clicks map', protocol: 'Web Client' },
      { fromId: 'react-interface', toId: 'property-data', label: 'Queries parcel boundary records', protocol: 'Data Service' },
      { fromId: 'property-data', toId: 'spatial-processing', label: 'Transmits boundary vertices & vertical levels', protocol: 'GIS Schema' },
      { fromId: 'spatial-processing', toId: 'cadastral-visualization', label: 'Streams 3D extruded mesh geometry', protocol: 'WebGL Buffer' },
      { fromId: 'cadastral-visualization', toId: 'property-view-output', label: 'Renders 3D property boundaries in canvas', protocol: '60fps Viewport' },
      { fromId: 'react-interface', toId: 'gemini-integration', label: 'Optional: Queries Gemini on land regulations', protocol: 'HTTPS REST API' },
      { fromId: 'gemini-integration', toId: 'property-view-output', label: 'Displays contextual parcel guidance overlay', protocol: 'UI Stream' }
    ]
  },

  secureshare: {
    title: 'SecureShare Architecture & Post-Quantum Forensic Flow',
    description: 'Post-quantum document distribution prototype combining AES-256-GCM, ML-KEM-768 key encapsulation, ML-DSA-65 signatures, and OpenCV forensic watermarking.',
    nodes: [
      {
        id: 'admin-sender',
        label: 'Admin / Sender',
        sublabel: 'Authorized Officer',
        type: 'user',
        techBadge: 'Identity Role',
        responsibility: 'Uploads sensitive organization documents, specifies authorized recipient public keys, and configures tracking policies.',
        dataInput: 'Original document payload & recipient identities',
        dataOutput: 'Document transmission manifest'
      },
      {
        id: 'doc-upload',
        label: 'Document Ingestion Layer',
        sublabel: 'Preprocessing Unit',
        type: 'backend',
        techBadge: 'FastAPI / Python',
        responsibility: 'Validates file integrity, hashes document contents, and generates ephemeral session parameters.',
        dataInput: 'Uploaded raw document stream',
        dataOutput: 'Validated plain-text buffer in secure memory'
      },
      {
        id: 'aes-encryption',
        label: 'AES-256-GCM Encryption',
        sublabel: 'Symmetric Payload Encryption',
        type: 'security',
        techBadge: 'AES-256-GCM Cipher',
        responsibility: 'Encrypts the bulk document payload with a one-time generated symmetric key, producing authenticated ciphertext and tag.',
        dataInput: 'Plain-text document buffer & random symmetric key',
        dataOutput: 'Encrypted ciphertext envelope & GCM auth tag'
      },
      {
        id: 'ml-kem-encapsulation',
        label: 'ML-KEM-768 Key Encapsulation',
        sublabel: 'Post-Quantum Crypto (NIST FIPS 203)',
        type: 'security',
        techBadge: 'ML-KEM-768 / Kyber',
        responsibility: 'Encapsulates the AES symmetric key against quantum computer attacks using the recipient post-quantum public key.',
        dataInput: 'Symmetric key & recipient ML-KEM public key',
        dataOutput: 'Encapsulated post-quantum ciphertext header'
      },
      {
        id: 'ml-dsa-signature',
        label: 'ML-DSA-65 Digital Signature',
        sublabel: 'Post-Quantum Signing (NIST FIPS 204)',
        type: 'security',
        techBadge: 'ML-DSA-65 / Dilithium',
        responsibility: 'Digitally signs the complete encrypted package with sender post-quantum private key to guarantee origin authenticity.',
        dataInput: 'Encrypted package & sender private key',
        dataOutput: 'Post-quantum cryptographic signature'
      },
      {
        id: 'secure-distribution',
        label: 'Secure Distribution Layer',
        sublabel: 'Transfer Gateway',
        type: 'backend',
        techBadge: 'FastAPI / MySQL',
        responsibility: 'Stores encrypted packages in database without ever persisting plain-text; validates recipient access tokens upon request.',
        dataInput: 'Signed cryptographic envelope & access policies',
        dataOutput: 'Restricted distribution feed'
      },
      {
        id: 'recipient-decryption',
        label: 'Recipient Access & Decryption',
        sublabel: 'Authorized Recipient Portal',
        type: 'user',
        techBadge: 'Recipient Portal',
        responsibility: 'Decapsulates the symmetric key using recipient ML-KEM private key, verifies ML-DSA signature, and decrypts document in-memory.',
        dataInput: 'Signed encrypted package & recipient private key',
        dataOutput: 'Decrypted document stream in memory'
      },
      {
        id: 'invisible-watermark',
        label: 'Invisible Watermarking Engine',
        sublabel: 'Forensic Steganography',
        type: 'output',
        techBadge: 'OpenCV / NumPy Transforms',
        responsibility: 'Embeds recipient-specific forensic watermark into the spatial frequency domain of the rendered document, invisible to human eyes.',
        dataInput: 'Decrypted document stream & recipient ID hash',
        dataOutput: 'Forensically tagged viewed document'
      },
      {
        id: 'investigator-verification',
        label: 'Investigator Verification Tool',
        sublabel: 'Leak Provenance Extraction',
        type: 'output',
        techBadge: 'Forensic Provenance Core',
        responsibility: 'Extracts embedded forensic watermark from leaked physical or digital documents to identify the exact recipient responsible.',
        dataInput: 'Leaked document scan / screenshot image',
        dataOutput: 'Proven recipient identity and timestamp audit'
      }
    ],
    connections: [
      { fromId: 'admin-sender', toId: 'doc-upload', label: 'Uploads sensitive file and designates recipient', protocol: 'TLS 1.3 Upload' },
      { fromId: 'doc-upload', toId: 'aes-encryption', label: 'Passes in-memory document buffer', protocol: 'Memory Stream' },
      { fromId: 'aes-encryption', toId: 'ml-kem-encapsulation', label: 'Passes one-time symmetric key for PQC encapsulation', protocol: 'Key Encapsulation' },
      { fromId: 'ml-kem-encapsulation', toId: 'ml-dsa-signature', label: 'Signs encapsulated header and encrypted payload', protocol: 'Post-Quantum Sign' },
      { fromId: 'ml-dsa-signature', toId: 'secure-distribution', label: 'Stores tamper-evident package', protocol: 'Encrypted Persistence' },
      { fromId: 'secure-distribution', toId: 'recipient-decryption', label: 'Transfers package upon authenticated request', protocol: 'Bearer Token' },
      { fromId: 'recipient-decryption', toId: 'invisible-watermark', label: 'Injects recipient forensic fingerprint into viewed document', protocol: 'OpenCV Spatial Transform' },
      { fromId: 'invisible-watermark', toId: 'investigator-verification', label: 'Provides provenance decoding if unauthorized leak occurs', protocol: 'Forensic Extraction' }
    ]
  },

  'tamil-news-daily': {
    title: 'Tamil News Daily Architecture & Publishing Pipeline',
    description: 'Autonomous regional editorial workflow gathering RSS headlines, generating natural Tamil language summaries via OpenAI, and distributing multi-channel digests.',
    nodes: [
      {
        id: 'google-rss',
        label: 'Google News RSS Feed',
        sublabel: 'Regional News Stream',
        type: 'external',
        techBadge: 'XML / RSS Feeds',
        responsibility: 'Streams latest regional headlines, article links, and publication timestamps across state politics, economy, tech, and sports.',
        dataInput: 'Global news publishers and regional journalists',
        dataOutput: 'Raw RSS XML feeds'
      },
      {
        id: 'n8n-ingestion',
        label: 'n8n Workflow Ingestion',
        sublabel: 'Scheduled Cron Trigger',
        type: 'backend',
        techBadge: 'n8n Automated Poller',
        responsibility: 'Fires on a scheduled cron interval, fetches XML feeds, parses item elements, and normalizes headline attributes.',
        dataInput: 'Raw RSS XML feeds',
        dataOutput: 'Structured article collection'
      },
      {
        id: 'duplicate-filtering',
        label: 'Duplicate Filtering & Ranking',
        sublabel: 'Deduplication Pipeline',
        type: 'backend',
        techBadge: 'JavaScript Similarity Core',
        responsibility: 'Compares semantic headline similarity to eliminate duplicate coverage across publishers and ranks top significant stories.',
        dataInput: 'Structured article collection',
        dataOutput: 'Curated list of top unique news items'
      },
      {
        id: 'openai-translation',
        label: 'OpenAI GPT-4o Mini',
        sublabel: 'Tamil Language Synthesizer',
        type: 'ai',
        techBadge: 'GPT-4o Mini API',
        responsibility: 'Translates news context into natural, colloquial, grammatically sound Tamil prose and creates engaging bullet-point summaries.',
        dataInput: 'Curated unique news items & Tamil prompt guidelines',
        dataOutput: 'High-quality native Tamil news summaries'
      },
      {
        id: 'tamil-summarization',
        label: 'Content Formatting & Layout',
        sublabel: 'Template Compiler',
        type: 'output',
        techBadge: 'HTML5 Newsletter Compiler',
        responsibility: 'Compiles translated summaries into responsive HTML newsletter templates and markdown Slack alert payloads.',
        dataInput: 'High-quality native Tamil news summaries',
        dataOutput: 'Responsive email newsletter & Slack messages'
      },
      {
        id: 'supabase-database',
        label: 'Supabase Database',
        sublabel: 'Subscriber & Preference Store',
        type: 'database',
        techBadge: 'PostgreSQL / Supabase',
        responsibility: 'Maintains verified subscriber emails, preferences, delivery logs, and handles one-click unsubscribe tokens.',
        dataInput: 'Subscription actions and delivery requests',
        dataOutput: 'Active subscriber recipient list'
      },
      {
        id: 'distribution-channels',
        label: 'Multi-Channel Distribution',
        sublabel: 'Email & Slack Dispatcher',
        type: 'output',
        techBadge: 'Gmail API / Slack Webhook',
        responsibility: 'Dispatches morning email digests to subscribers via Gmail API and broadcasts breaking alerts to community Slack channels.',
        dataInput: 'Compiled templates & active subscriber list',
        dataOutput: 'Dispatched newsletters and Slack alerts'
      },
      {
        id: 'subscribers',
        label: 'Subscribers & Community',
        sublabel: 'Regional Tamil Readers',
        type: 'user',
        techBadge: 'End Audience',
        responsibility: 'Regional language readers receive reliable, curated, clickbait-free daily news digests in their native Tamil language.',
        dataInput: 'Delivered newsletters & Slack notifications',
        dataOutput: 'Informed community engagement'
      }
    ],
    connections: [
      { fromId: 'google-rss', toId: 'n8n-ingestion', label: 'Polls Google News RSS feeds on cron schedule', protocol: 'HTTP XML' },
      { fromId: 'n8n-ingestion', toId: 'duplicate-filtering', label: 'Transfers parsed article array', protocol: 'n8n Flow' },
      { fromId: 'duplicate-filtering', toId: 'openai-translation', label: 'Sends curated top headlines for Tamil translation', protocol: 'OpenAI API' },
      { fromId: 'openai-translation', toId: 'tamil-summarization', label: 'Supplies fluent Tamil text summaries', protocol: 'JSON Response' },
      { fromId: 'tamil-summarization', toId: 'supabase-database', label: 'Queries verified subscriber list and records delivery', protocol: 'Supabase Client' },
      { fromId: 'supabase-database', toId: 'distribution-channels', label: 'Triggers multi-channel dispatch', protocol: 'API & Webhooks' },
      { fromId: 'distribution-channels', toId: 'subscribers', label: 'Delivers daily morning digest directly to readers', protocol: 'Email / Slack' }
    ]
  },

  cleanify: {
    title: 'Cleanify Architecture & Workspace Sanitation Pipeline',
    description: 'Lightweight Python packaging architecture engineered for high-performance dataset hygiene, cache sanitation, and workspace cleanup.',
    nodes: [
      {
        id: 'cli-input',
        label: 'CLI / User Input',
        sublabel: 'Terminal Operator or Script',
        type: 'user',
        techBadge: 'CLI / Python API',
        responsibility: 'User invokes cleanify via terminal arguments (--path, --dry-run) or imports cleanify modules directly into data scripts.',
        dataInput: 'Target directory paths & sanitation flags',
        dataOutput: 'Parsed CLI command options or function calls'
      },
      {
        id: 'path-scanner',
        label: 'Target Path Scanner',
        sublabel: 'Optimized Filesystem Walker',
        type: 'backend',
        techBadge: 'Python os.scandir',
        responsibility: 'Performs high-speed recursive traversal of target directory paths with minimal memory footprint.',
        dataInput: 'Target directory path parameter',
        dataOutput: 'Stream of discovered directory entries and metadata'
      },
      {
        id: 'redundant-detection',
        label: 'Redundant File Detection',
        sublabel: 'Pattern Matching Engine',
        type: 'backend',
        techBadge: 'Pattern Evaluator',
        responsibility: 'Identifies __pycache__, .pytest_cache, .DS_Store, orphan .log files, and temporary artifacts against known cache signatures.',
        dataInput: 'Discovered file and folder names',
        dataOutput: 'Candidate list of temporary/redundant files'
      },
      {
        id: 'safety-verification',
        label: 'Safety Verification & Guard',
        sublabel: 'Whitelist Validator',
        type: 'security',
        techBadge: 'Safety Rules Engine',
        responsibility: 'Validates candidate files against strict protective whitelists to prevent accidental deletion of source code, git records, or assets.',
        dataInput: 'Candidate deletion list',
        dataOutput: 'Approved safe deletion manifest'
      },
      {
        id: 'batch-removal',
        label: 'Batch Removal Engine',
        sublabel: 'Sanitation Executor',
        type: 'output',
        techBadge: 'Safe File Operations',
        responsibility: 'Safely removes approved temporary files, clears compiled bytecode caches, and handles file permission exceptions gracefully.',
        dataInput: 'Approved safe deletion manifest',
        dataOutput: 'Deleted file count and byte tallies'
      },
      {
        id: 'storage-audit',
        label: 'Storage Audit Summary',
        sublabel: 'CLI Tabular Reporter',
        type: 'output',
        techBadge: 'Terminal Output',
        responsibility: 'Computes reclaimed disk space in MB/GB, outputs clean formatted summary table, and logs audit metrics for developer review.',
        dataInput: 'Reclaimed byte statistics and file lists',
        dataOutput: 'Detailed terminal summary report delivered to user'
      }
    ],
    connections: [
      { fromId: 'cli-input', toId: 'path-scanner', label: 'Passes target directory and execution flags', protocol: 'CLI Arguments' },
      { fromId: 'path-scanner', toId: 'redundant-detection', label: 'Streams discovered filesystem entries', protocol: 'Generator Stream' },
      { fromId: 'redundant-detection', toId: 'safety-verification', label: 'Supplies candidate redundant files', protocol: 'Internal Manifest' },
      { fromId: 'safety-verification', toId: 'batch-removal', label: 'Authorizes verified non-critical files for removal', protocol: 'Verified List' },
      { fromId: 'batch-removal', toId: 'storage-audit', label: 'Provides execution counts and reclaimed bytes', protocol: 'Metrics Object' }
    ]
  }
};

interface ArchitectureFlowProps {
  project: ProjectItem;
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ project }) => {
  const flowKey = project.slug.startsWith('smart-report-alert') ? 'smart-report-alert' : project.slug;
  const flow = projectArchitectureData[flowKey] || projectArchitectureData['quickbrowse'];

  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(flow.nodes[0]);
  const [selectedConnection, setSelectedConnection] = useState<ArchitectureConnection | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1.0);
    setSelectedConnection(null);
    setSelectedNode(flow.nodes[0]);
  };

  const getNodeIcon = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'user':
        return <User className="w-4 h-4 text-primaryRoyalBlue" />;
      case 'frontend':
        return <Layers className="w-4 h-4 text-emerald-600" />;
      case 'backend':
        return <Server className="w-4 h-4 text-blue-600" />;
      case 'database':
        return <Database className="w-4 h-4 text-indigo-600" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'security':
        return <Lock className="w-4 h-4 text-amber-600" />;
      case 'external':
        return <Globe className="w-4 h-4 text-sky-600" />;
      case 'output':
        return <CheckCircle2 className="w-4 h-4 text-primaryRoyalBlue" />;
      default:
        return <Cpu className="w-4 h-4 text-primaryRoyalBlue" />;
    }
  };

  const getNodeTypeBadge = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'user':
        return 'bg-blue-50 text-primaryRoyalBlue border-blue-200';
      case 'frontend':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'backend':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'database':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'ai':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'security':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'external':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'output':
        return 'bg-royalBlue-50 text-primaryRoyalBlue border-royalBlue-200';
      default:
        return 'bg-slate-50 text-headingNavy border-cardBorder';
    }
  };

  return (
    <div className="bg-white border border-cardBorder rounded-3xl p-6 sm:p-8 shadow-card mb-8">
      {/* Header and Controls Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cardBorder mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lightBlueCard text-primaryRoyalBlue text-xs font-semibold mb-2 border border-cardBorder">
            <Workflow className="w-3.5 h-3.5" />
            <span>Interactive Architecture & Data Flow</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-headingNavy">
            {flow.title}
          </h3>
          <p className="text-xs sm:text-sm text-secondaryText mt-1 max-w-2xl leading-relaxed">
            {flow.description}
          </p>
        </div>

        {/* Interactive Controls Toolbar */}
        <div className="flex items-center gap-2 shrink-0 bg-secondaryCardBg p-1.5 rounded-2xl border border-cardBorder shadow-xs">
          {/* Layout Toggle */}
          <button
            onClick={() => setLayoutMode(layoutMode === 'horizontal' ? 'vertical' : 'horizontal')}
            title={`Switch to ${layoutMode === 'horizontal' ? 'Vertical Stepped' : 'Horizontal Pipeline'} Layout`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-cardBorder text-xs font-semibold text-headingNavy hover:bg-lightBlueCard hover:text-primaryRoyalBlue transition-colors shadow-xs"
          >
            {layoutMode === 'horizontal' ? (
              <>
                <ListOrdered className="w-3.5 h-3.5 text-primaryRoyalBlue" />
                <span className="hidden md:inline">Stepped View</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-primaryRoyalBlue" />
                <span className="hidden md:inline">Pipeline View</span>
              </>
            )}
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            aria-label="Zoom Out"
            className="p-2 rounded-xl bg-white border border-cardBorder text-headingNavy hover:text-primaryRoyalBlue hover:bg-lightBlueCard transition-colors shadow-xs"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Level Indicator */}
          <span className="text-xs font-bold text-secondaryText px-1.5">
            {Math.round(zoomLevel * 100)}%
          </span>

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            aria-label="Zoom In"
            className="p-2 rounded-xl bg-white border border-cardBorder text-headingNavy hover:text-primaryRoyalBlue hover:bg-lightBlueCard transition-colors shadow-xs"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Reset / Fit to Screen */}
          <button
            onClick={handleResetZoom}
            aria-label="Reset View"
            className="p-2 rounded-xl bg-white border border-cardBorder text-headingNavy hover:text-primaryRoyalBlue hover:bg-lightBlueCard transition-colors shadow-xs"
            title="Reset View & Fit to Screen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="relative overflow-hidden p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-mainPageBg via-[#F8FAFF] to-[#F3F6FF] border border-cardBorder min-h-[380px]">
        
        {/* Subtle Background Circuit Grid */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#1763E8 0.75px, transparent 0.75px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
          className="transition-transform duration-200 relative z-10 w-full"
        >
          {layoutMode === 'horizontal' ? (
            /* Responsive Container-Fitted Pipeline Flow (Fits width, zero horizontal scrollbar) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full py-2">
              {flow.nodes.map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                const isHovered = hoveredNodeId === node.id;
                const nextConnection = flow.connections.find((c) => c.fromId === node.id);

                return (
                  <div key={node.id} className="flex flex-col justify-between relative">
                    {/* Node Card */}
                    <motion.div
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedNode(node);
                        setSelectedConnection(null);
                      }}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className={`w-full rounded-2xl p-4 cursor-pointer transition-all duration-200 relative bg-white border ${
                        isSelected
                          ? 'border-primaryRoyalBlue shadow-md ring-2 ring-primaryRoyalBlue/20'
                          : isHovered
                          ? 'border-primaryRoyalBlue/60 shadow-sm'
                          : 'border-cardBorder shadow-xs'
                      }`}
                    >
                      {/* Step Indicator Pill & Node Category */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-lightBlueCard text-primaryRoyalBlue text-xs font-extrabold flex items-center justify-center border border-cardBorder shrink-0">
                          {index + 1}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getNodeTypeBadge(node.type)}`}>
                          {node.type}
                        </span>
                      </div>

                      {/* Node Icon & Titles */}
                      <div className="flex items-start gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-lightBlueCard border border-cardBorder flex items-center justify-center shrink-0">
                          {getNodeIcon(node.type)}
                        </div>
                        <div className="overflow-hidden min-w-0">
                          <h4 className="text-xs font-bold text-headingNavy truncate">
                            {node.label}
                          </h4>
                          <p className="text-[11px] text-secondaryText truncate">
                            {node.sublabel}
                          </p>
                        </div>
                      </div>

                      {/* Responsibility summary snippet */}
                      <p className="text-[11px] text-secondaryText line-clamp-2 leading-relaxed mb-2">
                        {node.responsibility}
                      </p>

                      {/* Tech Badge & Inspection trigger */}
                      {node.techBadge && (
                        <div className="pt-2 border-t border-cardBorder/60 flex items-center justify-between text-[10px]">
                          <span className="font-semibold text-primaryRoyalBlue bg-lightBlueCard/70 px-2 py-0.5 rounded-md truncate max-w-[70%]">
                            {node.techBadge}
                          </span>
                          <span className="text-secondaryText font-medium text-[10px] shrink-0">Inspect ➜</span>
                        </div>
                      )}
                    </motion.div>

                    {/* Connecting Data Direction Indicator */}
                    {nextConnection && (
                      <div
                        onClick={() => setSelectedConnection(nextConnection)}
                        className="flex items-center justify-center gap-1.5 py-1.5 px-2 mt-1 cursor-pointer group text-[10px] font-medium text-secondaryText hover:text-primaryRoyalBlue transition-colors rounded-lg hover:bg-lightBlueCard/50"
                        title={`Click to inspect data connection: ${nextConnection.label}`}
                      >
                        <span className="truncate">{nextConnection.protocol || 'Next Step'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-primaryRoyalBlue group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Vertical Stepped Layout */
            <div className="flex flex-col gap-4 max-w-xl mx-auto py-4">
              {flow.nodes.map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                const nextConnection = flow.connections.find((c) => c.fromId === node.id);

                return (
                  <React.Fragment key={node.id}>
                    <div
                      onClick={() => {
                        setSelectedNode(node);
                        setSelectedConnection(null);
                      }}
                      className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primaryRoyalBlue shadow-md ring-2 ring-primaryRoyalBlue/20'
                          : 'border-cardBorder shadow-xs hover:border-primaryRoyalBlue/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-lightBlueCard text-primaryRoyalBlue text-xs font-extrabold flex items-center justify-center border border-cardBorder">
                            {index + 1}
                          </span>
                          <h4 className="text-sm font-bold text-headingNavy">{node.label}</h4>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getNodeTypeBadge(node.type)}`}>
                          {node.type}
                        </span>
                      </div>
                      <p className="text-xs text-secondaryText mb-2">{node.sublabel}</p>
                      <p className="text-xs text-headingNavy/90 leading-relaxed">{node.responsibility}</p>
                    </div>

                    {nextConnection && (
                      <div
                        onClick={() => setSelectedConnection(nextConnection)}
                        className="flex items-center justify-center gap-2 py-1 cursor-pointer text-xs font-semibold text-primaryRoyalBlue"
                      >
                        <div className="h-6 w-0.5 bg-primaryRoyalBlue/40 relative">
                          <motion.span
                            animate={{ y: [0, 24] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                            className="absolute -left-1 top-0 w-2.5 h-2.5 rounded-full bg-primaryRoyalBlue"
                          />
                        </div>
                        <span className="text-[11px] text-secondaryText hover:text-primaryRoyalBlue">
                          {nextConnection.label}
                        </span>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Selected Node or Connection Detail Inspection Card */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {selectedConnection ? (
            <motion.div
              key={selectedConnection.fromId + selectedConnection.toId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-2xl bg-lightBlueCard/60 border border-primaryRoyalBlue/30 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-primaryRoyalBlue" />
                  <h4 className="text-sm font-bold text-headingNavy">
                    Connection Protocol & Data Movement
                  </h4>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-primaryRoyalBlue text-white">
                  {selectedConnection.protocol || 'Data Bus'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-headingNavy font-medium leading-relaxed">
                {selectedConnection.label}
              </p>
            </motion.div>
          ) : selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-2xl bg-white border border-cardBorder shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-cardBorder">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-lightBlueCard text-primaryRoyalBlue flex items-center justify-center border border-cardBorder font-bold">
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-headingNavy">
                      {selectedNode.label}
                    </h4>
                    <p className="text-xs text-secondaryText">
                      {selectedNode.sublabel} {selectedNode.techBadge && `• ${selectedNode.techBadge}`}
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border w-fit ${getNodeTypeBadge(selectedNode.type)}`}>
                  {selectedNode.type} Node
                </span>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-primaryRoyalBlue mb-1">
                    System Responsibility & Implementation
                  </h5>
                  <p className="text-xs sm:text-sm text-secondaryText leading-relaxed">
                    {selectedNode.responsibility}
                  </p>
                </div>

                {/* Data Input & Output Grid */}
                {(selectedNode.dataInput || selectedNode.dataOutput) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    {selectedNode.dataInput && (
                      <div className="p-3 rounded-xl bg-secondaryCardBg border border-cardBorder">
                        <span className="font-bold text-headingNavy block mb-0.5">📥 Data Input Received:</span>
                        <span className="text-secondaryText">{selectedNode.dataInput}</span>
                      </div>
                    )}
                    {selectedNode.dataOutput && (
                      <div className="p-3 rounded-xl bg-secondaryCardBg border border-cardBorder">
                        <span className="font-bold text-headingNavy block mb-0.5">📤 Data Output Emitted:</span>
                        <span className="text-secondaryText">{selectedNode.dataOutput}</span>
                      </div>
                    )}
                  </div>
                )}

                {selectedNode.notes && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{selectedNode.notes}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
