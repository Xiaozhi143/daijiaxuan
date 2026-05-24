import { useState, useEffect } from 'react';

const Navbar = ({ onProjectSelect }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWorksDropdownOpen, setIsWorksDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '作品', href: '#works', hasDropdown: true },
    { label: '关于', href: '#about' },
    { label: '技能', href: '#skills' },
    { label: '联系我', href: '#contact' },
  ];

  const projects = [
    { id: '01', label: 'MORIOR ITER', subtitle: '以情绪叙事与梦境世界为核心' },
    { id: '02', label: '步步生香', subtitle: '融合东方香文化与数字视觉设计' },
    { id: '03', label: 'MORE WORKS', subtitle: '更多精彩作品' },
  ];

  const handleProjectClick = (projectId) => {
    setIsWorksDropdownOpen(false);
    onProjectSelect(projectId);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-lg text-white tracking-wide" style={{ fontFamily: 'Georgia, serif', fontWeight: 600 }}>戴嘉轩</a>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="flex items-center gap-1 text-lg text-white hover:text-[#e6d5a7] transition-colors relative group cursor-pointer"
                    onMouseEnter={() => setIsWorksDropdownOpen(true)}
                    onMouseLeave={() => setIsWorksDropdownOpen(false)}
                    style={{ fontFamily: 'Georgia, serif', fontWeight: 600 }}
                  >
                    {item.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#e6d5a7] transition-all duration-300"></span>
                    
                    {/* 下拉菜单 */}
                    {isWorksDropdownOpen && (
                      <div className="absolute top-full left-0 -mt-0.5">
                        {/* 填补间隙的透明区域 */}
                        <div className="h-4 w-full -mb-0.5"></div>
                        <div 
                          className="bg-black/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 py-4 px-6 min-w-[300px]"
                          onMouseEnter={() => setIsWorksDropdownOpen(true)}
                          onMouseLeave={() => setIsWorksDropdownOpen(false)}
                        >
                          {projects.map((project) => (
                            <button
                              key={project.id}
                              onClick={() => handleProjectClick(project.id)}
                              className="w-full text-left py-3 hover:bg-white/10 rounded-lg transition-colors group"
                            >
                              <div className="flex items-start gap-4">
                                <span className="text-gray-400 text-sm font-mono mt-1">{project.id}</span>
                                <div>
                                  <div className="text-white text-lg font-medium group-hover:text-[#e6d5a7] transition-colors">{project.label}</div>
                                  <div className="text-gray-400 text-sm mt-1">{project.subtitle}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-lg text-gray-300 hover:text-[#e6d5a7] transition-colors relative group"
                    style={{ fontFamily: 'Georgia, serif', fontWeight: 600 }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e6d5a7] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
