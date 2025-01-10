import { Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-8 border-t border-acid-green/20">
      <div className="container flex flex-col items-center justify-center gap-4 text-acid-green">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/noplacetoh1de/acid-pattern-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-acid-pink transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://lukasjost.de"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-acid-pink transition-colors"
          >
            lukasjost.de
          </a>
        </div>
        <div className="text-sm text-acid-green/70">
          © {currentYear} Lukas Jost
        </div>
      </div>
    </footer>
  );
};

export default Footer;