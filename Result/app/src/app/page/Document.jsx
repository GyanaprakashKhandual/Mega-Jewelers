'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  PlayCircle, 
  BookOpen, 
  Component, 
  FileText, 
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { FaCoffee } from 'react-icons/fa';

const GoogleArrowDown = () => {
  return(
    <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="Dropdown arrow" xmlns="http://www.w3.org/2000/svg">
  <title>Dropdown arrow</title>
  <path d="M7 10l5 5 5-5z" fill="currentColor"/>
</svg>

  )
}

// Test Phase Components
const TestPhaseOneManual = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Test Phase 1 Manual</h2>
    <p>This is the content for Test Phase 1 Manual testing.</p>
  </div>
);

const TestPhaseTwoManual = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Test Phase 2 Manual</h2>
    <p>This is the content for Test Phase 2 Manual testing.</p>
  </div>
);

const TestPhaseOneAuto = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Test Phase 1 Automation</h2>
    <p>This is the content for Test Phase 1 Automation testing.</p>
  </div>
);

const TestPhaseTwoAuto = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Test Phase 2 Automation</h2>
    <p>This is the content for Test Phase 2 Automation testing.</p>
  </div>
);

const RabitDocumentation = () => {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContent, setActiveContent] = useState('Home');
  const [expandedItems, setExpandedItems] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Load theme and active content from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('rabit-docs-theme');
    const savedContent = localStorage.getItem('rabit-docs-activeContent');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedContent) setActiveContent(savedContent);
  }, []);

  // Save theme and active content to localStorage when they change
  useEffect(() => {
    localStorage.setItem('rabit-docs-theme', theme);
    localStorage.setItem('rabit-docs-activeContent', activeContent);
  }, [theme, activeContent]);

  const themes = {
    light: {
      bg: 'bg-gray-50',
      sidebar: 'bg-white border-gray-200',
      header: 'bg-white border-gray-200',
      card: 'bg-white border-gray-200',
      text: {
        primary: 'text-gray-900',
        secondary: 'text-gray-600',
        tertiary: 'text-gray-500',
        muted: 'text-gray-400'
      },
      hover: 'hover:bg-gray-100',
      active: 'bg-blue-50 text-blue-700',
      input: 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500',
      button: 'hover:bg-gray-100 text-gray-600'
    },
    dark: {
      bg: 'bg-gray-900',
      sidebar: 'bg-gray-800 border-gray-700',
      header: 'bg-gray-800 border-gray-700',
      card: 'bg-gray-800 border-gray-700',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-300',
        tertiary: 'text-gray-400',
        muted: 'text-gray-500'
      },
      hover: 'hover:bg-gray-700',
      active: 'bg-gray-700 text-white',
      input: 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500',
      button: 'hover:bg-gray-700 text-gray-300'
    },
    brown: {
      bg: 'bg-amber-50',
      sidebar: 'bg-amber-100 border-amber-200',
      header: 'bg-amber-100 border-amber-200',
      card: 'bg-white border-amber-200',
      text: {
        primary: 'text-amber-900',
        secondary: 'text-amber-800',
        tertiary: 'text-amber-700',
        muted: 'text-amber-600'
      },
      hover: 'hover:bg-amber-200',
      active: 'bg-amber-200 text-amber-900',
      input: 'bg-white border-amber-300 text-amber-900 placeholder-amber-600 focus:border-amber-500',
      button: 'hover:bg-amber-200 text-amber-800'
    },
    coffee: {
      bg: 'bg-stone-100',
      sidebar: 'bg-stone-200 border-stone-300',
      header: 'bg-stone-200 border-stone-300',
      card: 'bg-stone-50 border-stone-300',
      text: {
        primary: 'text-stone-900',
        secondary: 'text-stone-800',
        tertiary: 'text-stone-700',
        muted: 'text-stone-600'
      },
      hover: 'hover:bg-stone-300',
      active: 'bg-stone-300 text-stone-900',
      input: 'bg-stone-50 border-stone-400 text-stone-900 placeholder-stone-600 focus:border-stone-600',
      button: 'hover:bg-stone-300 text-stone-800'
    }
  };

  const currentTheme = themes[theme];

  const sidebarItems = [
    { icon: Home, label: 'Home', component: 'Home' },
    { icon: PlayCircle, label: 'Manual Reports', component: 'ManualReports', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' },
      { label: 'Test Phase 2', component: 'TestPhaseTwoManual' }
    ]},
    { icon: BookOpen, label: 'Automation Result', component: 'AutomationResult', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneAuto' },
      { label: 'Test Phase 2', component: 'TestPhaseTwoAuto' }
    ]},
    { icon: Component, label: 'API Test Reports', component: 'APIs', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]},
    { icon: FileText, label: 'Performance Test Report', component: 'Performance', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]},
    { icon: Home, label: 'Database Test Report', component: 'Database', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]},
    { icon: PlayCircle, label: 'Security Test Report', component: 'Security', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]},
    { icon: BookOpen, label: 'Automation Test Codes', component: 'Links', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]},
    { icon: Component, label: 'API Test Codes', component: 'Code', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]},
    { icon: FileText, label: 'Perfromace Test Codes', component: 'Repo', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]},
    { icon: FileText, label: 'Overall Test Graphs', component: 'Repo', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]},
    { icon: FileText, label: 'Project Issue Track', component: 'Repo', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]},
    { icon: FileText, label: 'Project Conclusion', component: 'Repo', testPhases: [
      { label: 'Test Phase 1', component: 'TestPhaseOneManual' }
    ]}
  ];

  const allContentItems = [
    ...sidebarItems
  ];

  const toggleItemExpansion = (itemLabel) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemLabel]: !prev[itemLabel]
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    
    const results = allContentItems.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
    setShowSearchResults(true);
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Home':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Rabit Documentation</h2>
            <p>Select an item from the sidebar to get started.</p>
          </div>
        );
      case 'TestPhaseOneManual':
        return <TestPhaseOneManual />;
      case 'TestPhaseTwoManual':
        return <TestPhaseTwoManual />;
      case 'TestPhaseOneAuto':
        return <TestPhaseOneAuto />;
      case 'TestPhaseTwoAuto':
        return <TestPhaseTwoAuto />;
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{activeContent}</h2>
            <p>This is the default content for {activeContent}.</p>
          </div>
        );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const subItemVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className={`min-h-screen flex ${currentTheme.bg}`}>
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`w-64 ${currentTheme.sidebar} border-r flex flex-col sticky top-0 h-screen`}
      >
        {/* Logo */}
        <div className="p-[20px]">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 ${
              theme === 'brown' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 
              theme === 'coffee' ? 'bg-gradient-to-br from-amber-700 to-stone-800' :
              'bg-gradient-to-br from-blue-500 to-purple-600'
            } rounded-lg flex items-center justify-center`}>
              <FaCoffee className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${currentTheme.text.primary}`}>Mega Jewelers</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <div key={item.label} className="space-y-1">
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    if (item.testPhases) {
                      toggleItemExpansion(item.label);
                    } else {
                      setActiveContent(item.component);
                    }
                    setShowSearchResults(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    activeContent === item.component || expandedItems[item.label]
                      ? currentTheme.active
                      : `${currentTheme.text.secondary} ${currentTheme.hover}`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.testPhases && (
                    <GoogleArrowDown
                      className={`w-4 h-4 transition-transform ${
                        expandedItems[item.label] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </motion.div>
                
                {/* Test Phase Sub-items */}
                {item.testPhases && (
                  <AnimatePresence>
                    {expandedItems[item.label] && (
                      <motion.div
                        variants={subItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="pl-8 space-y-1"
                      >
                        {item.testPhases.map((phase, phaseIndex) => (
                          <motion.div
                            key={phase.label}
                            onClick={() => {
                              setActiveContent(phase.component);
                              setShowSearchResults(false);
                            }}
                            className={`px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
                              activeContent === phase.component
                                ? currentTheme.active
                                : `${currentTheme.text.secondary} ${currentTheme.hover}`
                            }`}
                          >
                            {phase.label}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`${currentTheme.header} border-b px-6 py-4 sticky top-0 z-10`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search documentation"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${currentTheme.input} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${currentTheme.text.muted}`}>
                  ⌘K
                </span>
                
                {/* Search Results Dropdown */}
                {showSearchResults && (
                  <div className={`absolute left-0 right-0 mt-1 rounded-lg shadow-lg z-20 ${currentTheme.card} border ${currentTheme.text.primary}`}>
                    {searchResults.length > 0 ? (
                      <div className="py-1">
                        {searchResults.map((item) => (
                          <div
                            key={item.label}
                            onClick={() => {
                              setActiveContent(item.component);
                              setShowSearchResults(false);
                              setSearchQuery('');
                            }}
                            className={`px-4 py-2 cursor-pointer ${currentTheme.hover}`}
                          >
                            <div className="flex items-center">
                              {item.icon && <item.icon className="w-4 h-4 mr-3" />}
                              <span>{item.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-2 text-sm">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Theme Selector */}
              <div className="flex items-center space-x-1 p-1 rounded-lg bg-gray-100">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2 rounded-md transition-colors ${
                    theme === 'light' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Light theme"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded-md transition-colors ${
                    theme === 'dark' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Dark theme"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-600 to-gray-900"></div>
                </button>
                <button
                  onClick={() => setTheme('brown')}
                  className={`p-2 rounded-md transition-colors ${
                    theme === 'brown' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Brown theme"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600"></div>
                </button>
                <button
                  onClick={() => setTheme('coffee')}
                  className={`p-2 rounded-md transition-colors ${
                    theme === 'coffee' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Coffee theme"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-700 to-stone-800"></div>
                </button>
              </div>
              <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentTheme.button}`}>
                <span>Logged In</span>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RabitDocumentation;