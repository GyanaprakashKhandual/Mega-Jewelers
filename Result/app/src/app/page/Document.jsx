'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  PlayCircle, 
  BookOpen, 
  Component, 
  FileText, 
  Users, 
  Building, 
  Settings, 
  Shield, 
  Key, 
  Zap, 
  Moon, 
  Sun,
  Search,
  ChevronRight,
  Database,
  Palette,
  Smartphone,
  Code,
  Layers,
  Globe,
  Terminal
} from 'lucide-react';
import { FaCoffee } from 'react-icons/fa';

// Component imports
const HomeContent = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Welcome to Rabit Documentation</h2>
    <p>Select an item from the sidebar to get started.</p>
  </div>
);

const GettingStarted = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
    <div className="space-y-4">
      <p>To get started with Rabit, follow these steps:</p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Create an account on our platform</li>
        <li>Install the Rabit SDK</li>
        <li>Configure your application</li>
        <li>Implement authentication</li>
        <li>Deploy your application</li>
      </ol>
    </div>
  </div>
);

const Guides = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Guides</h2>
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Authentication Guide</h3>
        <p>Learn how to implement secure authentication in your application.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">API Integration</h3>
        <p>Step-by-step guide to integrating with our API.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Performance Optimization</h3>
        <p>Tips and tricks to optimize your Rabit implementation.</p>
      </div>
    </div>
  </div>
);

const Reports = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Reports</h2>
    <p>View and analyze your application's performance metrics.</p>
  </div>
);

const WorkFlow = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Work Flow</h2>
    <p>Understand the Rabit work flow and best practices.</p>
  </div>
);

const Introduction = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Introduction</h2>
    <p>Learn about the core concepts of Rabit.</p>
  </div>
);

const Extension = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Extension</h2>
    <p>Extend Rabit's functionality with our extension system.</p>
  </div>
);

const Connection = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Connection</h2>
    <p>Connect your services with Rabit's integration platform.</p>
  </div>
);

const NetworkAccess = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Network Access</h2>
    <p>Configure network access and security settings.</p>
  </div>
);

const Security = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Security at Rabit</h2>
    <p>Learn about Rabit's security measures and best practices.</p>
  </div>
);

const FrontendAPI = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Frontend API</h2>
    <p>Documentation for Rabit's frontend API.</p>
  </div>
);

const BackendAPI = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Backend API</h2>
    <p>Documentation for Rabit's backend API.</p>
  </div>
);

const BackendSDK = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Backend SDK</h2>
    <p>Documentation for Rabit's backend SDK.</p>
  </div>
);

const RabitDocumentation = () => {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContent, setActiveContent] = useState('Home');
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
    }
  };

  const currentTheme = themes[theme];

  const sidebarItems = [
    { icon: Home, label: 'Home', component: 'Home' },
    { icon: PlayCircle, label: 'Getting started', component: 'GettingStarted' },
    { icon: BookOpen, label: 'Guides', component: 'Guides' },
    { icon: Component, label: 'Reports', component: 'Reports' },
    { icon: FileText, label: 'Work Flow', component: 'WorkFlow' }
  ];

  const coreConceptsItems = [
    { icon: Zap, label: 'Introduction', component: 'Introduction' },
    { icon: Users, label: 'Extension', component: 'Extension' },
    { icon: Building, label: 'Connection', component: 'Connection' },
    { icon: Settings, label: 'Network Access', component: 'NetworkAccess' },
    { icon: Shield, label: 'Security at Rabit', component: 'Security' },
  ];

  const referenceItems = [
    { label: 'Frontend API', component: 'FrontendAPI' },
    { label: 'Backend API', component: 'BackendAPI' },
    { label: 'Backend SDK', component: 'BackendSDK' }
  ];

  const allContentItems = [
    ...sidebarItems,
    ...coreConceptsItems,
    ...referenceItems
  ];

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
        return <HomeContent />;
      case 'GettingStarted':
        return <GettingStarted />;
      case 'Guides':
        return <Guides />;
      case 'Reports':
        return <Reports />;
      case 'WorkFlow':
        return <WorkFlow />;
      case 'Introduction':
        return <Introduction />;
      case 'Extension':
        return <Extension />;
      case 'Connection':
        return <Connection />;
      case 'NetworkAccess':
        return <NetworkAccess />;
      case 'Security':
        return <Security />;
      case 'FrontendAPI':
        return <FrontendAPI />;
      case 'BackendAPI':
        return <BackendAPI />;
      case 'BackendSDK':
        return <BackendSDK />;
      default:
        return <HomeContent />;
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
            <div className={`w-8 h-8 ${theme === 'brown' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'} rounded-lg flex items-center justify-center`}>
              <FaCoffee className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${currentTheme.text.primary}`}>Rabit</span>
            <span className={`text-sm ${currentTheme.text.tertiary}`}>Docs</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setActiveContent(item.component);
                  setShowSearchResults(false);
                }}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  activeContent === item.component
                    ? currentTheme.active
                    : `${currentTheme.text.secondary} ${currentTheme.hover}`
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Core Concepts */}
          <div className="px-4 py-2">
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${currentTheme.text.muted} mb-3`}>
              Core concepts
            </h3>
            <div className="space-y-1">
              {coreConceptsItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: (index + 5) * 0.1 }}
                  onClick={() => {
                    setActiveContent(item.component);
                    setShowSearchResults(false);
                  }}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    activeContent === item.component
                      ? currentTheme.active
                      : `${currentTheme.text.secondary} ${currentTheme.hover}`
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reference */}
          <div className="px-4 py-2">
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${currentTheme.text.muted} mb-3`}>
              Reference
            </h3>
            <div className="space-y-1">
              {referenceItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: (index + 11) * 0.1 }}
                  onClick={() => {
                    setActiveContent(item.component);
                    setShowSearchResults(false);
                  }}
                  className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    activeContent === item.component
                      ? currentTheme.active
                      : `${currentTheme.text.secondary} ${currentTheme.hover}`
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
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
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.text.muted}`} />
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
                  <Sun className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded-md transition-colors ${
                    theme === 'dark' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Dark theme"
                >
                  <Moon className="w-4 h-4 text-gray-600" />
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
              </div>
              <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentTheme.button}`}>
                <span>Sign in</span>
                <ChevronRight className="w-4 h-4" />
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