import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Compass, Briefcase, Mail } from 'lucide-react';

const GlobalOverlay = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/story', label: 'Story', icon: BookOpen },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/recruiter', label: 'Recruiter', icon: Briefcase },
  ];

  const go = (path) => { navigate(path); setOpen(false); };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-ink-800 text-white shadow-lifted flex items-center justify-center hover:bg-warm transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-20 right-6 z-50 w-56 bg-white rounded-2xl shadow-lifted border border-ink-100 overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => go(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === item.path
                      ? 'bg-warm-50 text-warm-600'
                      : 'text-ink-500 hover:bg-ink-50 hover:text-ink-800'
                    }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t border-ink-100 p-2">
              <button
                onClick={() => { window.open('mailto:viditkulsh.work@gmail.com', '_blank'); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-warm-600 hover:bg-warm-50 transition-all"
              >
                <Mail size={16} /> Contact Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalOverlay;
