import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import type { ProjectItem } from '../../../data/projects';

interface InteractiveCodeBlockProps {
  project: ProjectItem;
  shouldReduceMotion: boolean;
}

const projectCommands: Record<string, { title: string; filename: string; command: string }> = {
  quickbrowse: {
    title: 'QuickBrowse Desktop Run Commands',
    filename: 'terminal.sh',
    command: `# Clone repository & initialize virtual environment\ngit clone https://github.com/KarthikeyanSA369/QuickBrowse.git\ncd QuickBrowse\npip install -r requirements.txt\npython app.py`,
  },
  'terminal-board': {
    title: 'Terminal Board Telemetry Execution',
    filename: 'terminal.sh',
    command: `# Clone repository & run telemetry engine\ngit clone https://github.com/KarthikeyanSA369/TERMINAL-BOARD.git\ncd TERMINAL-BOARD\npython -m terminal_board.cli --monitor --interval 1.0`,
  },
  'smart-report-alert': {
    title: 'n8n Inventory Audit Trigger',
    filename: 'workflow-exec.sh',
    command: `# Deploy & execute automated alert workflow\nn8n import:workflow --input=inventory_alert_workflow.json\nn8n execute --id=smart-report-alert --trigger=cron`,
  },
  'gmail-response-automation': {
    title: 'Gmail LLM Auto-Responder Deployment',
    filename: 'workflow-exec.sh',
    command: `# Deploy & poll Gmail inquiry pipeline\nn8n import:workflow --input=gmail_response_workflow.json\nn8n execute --id=gmail-response-automation --trigger=poll`,
  },
  'sih-3d-ulpin': {
    title: '3D WebGL Cadastral Parcel Dev Server',
    filename: 'launch.sh',
    command: `# Clone repository & start Vite dev server\ngit clone https://github.com/KarthikeyanSA369/SIH-3D-ULPIN.git\ncd SIH-3D-ULPIN\nnpm install && npm run dev`,
  },
  secureshare: {
    title: 'SecureShare Post-Quantum Backend Execution',
    filename: 'api-server.sh',
    command: `# Launch FastAPI asynchronous encryption service\ngit clone https://github.com/KarthikeyanSA369/SIH-Secure-Document-Sharing-with-Decryption-Tracking.git\ncd secureshare\nuvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`,
  },
  'tamil-news-daily': {
    title: 'Tamil News Crawler & Summarizer Routine',
    filename: 'crawler.sh',
    command: `# Crawl regional feeds & generate daily digest\npython -m news_crawler --source=rss_feeds.json --locale=ta_IN\npython -m news_summarizer --model=gpt-4o-mini --dispatch=daily`,
  },
  cleanify: {
    title: 'Cleanify PyPI Package Installation & Ingestion',
    filename: 'install.sh',
    command: `# Install cleanify package and execute workspace sanitation\npip install cleanify\npython -c "import cleanify; cleanify.clean_tabular_dataset('raw_data.csv')"`,
  },
};

export const InteractiveCodeBlock: React.FC<InteractiveCodeBlockProps> = ({
  project,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const snippet =
    projectCommands[project.slug] ||
    projectCommands[project.id] ||
    projectCommands['quickbrowse'];

  // 18. Code Block Interaction: Functional copy-to-clipboard controls
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(snippet.command);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = snippet.command;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy code snippet to clipboard:', err);
    }
  };

  return (
    <div className="my-5 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 overflow-hidden shadow-xs text-xs sm:text-sm font-mono max-w-full">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/90 border-b border-slate-700 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-primaryRoyalBlue" />
          <span className="font-semibold text-slate-200">{snippet.title}</span>
          <span className="text-slate-500 hidden sm:inline">({snippet.filename})</span>
        </div>

        {/* Copy Button with Feedback */}
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Code snippet copied' : 'Copy code snippet to clipboard'}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-700/80 hover:bg-slate-600 text-slate-200 hover:text-white transition-all text-xs font-sans font-medium focus:outline-none focus:ring-1 focus:ring-primaryRoyalBlue"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Commands</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto max-w-full leading-relaxed text-slate-300 select-all">
        <pre className="m-0 font-mono text-xs sm:text-sm whitespace-pre overflow-x-auto max-w-full">
          <code>{snippet.command}</code>
        </pre>
      </div>
    </div>
  );
};
