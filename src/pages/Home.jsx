import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiAward, 
  FiBook, 
  FiClock, 
  FiUsers,
  FiSun,
  FiMoon,
  FiChevronRight,
  FiCheckCircle,
  FiBarChart2,
  FiEdit3,
  FiLock
} from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import Button from '../components/UI/Button';
import Navbar from '../components/UI/Navbar';

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const features = [
    {
      icon: <FiBook className="w-8 h-8" />,
      title: "Comprehensive Exams",
      description: "Access thousands of curated exam questions with detailed solutions"
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Timed Practice",
      description: "Simulate real exam conditions with our advanced timer system"
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Track your progress with detailed insights and recommendations"
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden opacity-20 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: 0.1
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              transition: {
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>

      <Navbar isScrolled={isScrolled} theme={theme} />

      {/* Theme toggle floating button */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`fixed right-6 bottom-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'}`}
        aria-label="Toggle dark mode"
      >
        {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl w-full"
          >
            <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 text-sm font-medium ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}>
              <FaGraduationCap className="mr-2" /> The future of education is here
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme === 'dark' ? 'from-gray-300 to-gray-400' : 'from-gray-700 to-gray-800'}`}>
                Revolutionize Your <span className="whitespace-nowrap">Learning</span>
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Hawai Academy combines analytics with premium educational content to supercharge your academic journey.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button 
                as="a" 
                href="/student" 
                variant="primary"
                className="group relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                theme={theme}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Student Dashboard <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
                {isHovered && (
                  <motion.span
                    className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-gray-700 to-gray-600' : 'from-gray-600 to-gray-500'}`}
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </Button>
              
              <Button 
                as="a" 
                href="/admin" 
                variant="secondary"
                theme={theme}
              >
                Admin Dashboard
              </Button>
            </div>
          </motion.div>

          {/* Animated feature cards */}
          <div className="w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className={`p-8 rounded-2xl shadow-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className={`p-4 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    {features[currentFeature].icon}
                  </div>
                  <div className="text-left">
                    <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {features[currentFeature].title}
                    </h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {features[currentFeature].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-2 mt-6">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentFeature === index ? (theme === 'dark' ? 'bg-gray-400' : 'bg-gray-600') : (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300')}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`py-16 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "10K+", label: "Students", icon: <FiUsers className="w-6 h-6" /> },
                { value: "500+", label: "Exams", icon: <FiBook className="w-6 h-6" /> },
                { value: "24/7", label: "Access", icon: <FiClock className="w-6 h-6" /> },
                { value: "98%", label: "Satisfaction", icon: <FiAward className="w-6 h-6" /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border border-gray-200'} text-center`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    {stat.icon}
                  </div>
                  <p className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                    {stat.value}
                  </p>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800 text-white'}`}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hawai Academy</h3>
              <p className="opacity-80">
                Empowering students through innovative learning solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="opacity-80 hover:opacity-100 transition">Home</a></li>
                <li><a href="/features" className="opacity-80 hover:opacity-100 transition">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="opacity-80 hover:opacity-100 transition">Privacy Policy</a></li>
                <li><a href="/terms" className="opacity-80 hover:opacity-100 transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="opacity-80 hover:opacity-100 transition">Twitter</a>
                <a href="#" className="opacity-80 hover:opacity-100 transition">Facebook</a>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-opacity-20 text-center">
            <p className="opacity-70">© {new Date().getFullYear()} Hawai Academy. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;