import Link from "next/link";
import { Activity, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 rounded-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">TRACER</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Next-generation tracking and analytics for the modern web.
              Built for performance, designed for scale.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Section 1</h3>
            <ul className="space-y-2">
              {["Placeholder 1", "Placeholder 2", "Placeholder 3", "Placeholder 4"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Section 2</h3>
            <ul className="space-y-2">
              {["Placeholder 5", "Placeholder 6", "Placeholder 7", "Placeholder 8"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} developed by David C. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm">Placeholder 9</Link>
            <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm">Placeholder 10</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
