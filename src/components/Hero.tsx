import ParticleText from './ParticleText';
import BackgroundDecoration from './BackgroundDecoration';
import SystemStatus from './SystemStatus';
import AmbientSound from './AmbientSound';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 lg:px-12 relative">
      <BackgroundDecoration />
      <SystemStatus />
      <AmbientSound />

      {/* 角落装饰 */}
      <div className="absolute top-20 left-6 w-12 h-12 border-t-2 border-l-2 border-[#e6d5a7] opacity-30"></div>
      <div className="absolute top-20 right-6 w-12 h-12 border-t-2 border-r-2 border-[#e6d5a7] opacity-30"></div>
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#e6d5a7] opacity-30"></div>
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#e6d5a7] opacity-30"></div>

      <div className="w-full text-center relative z-20 px-4">
        <div className="text-xs text-gray-500 tracking-[0.3em] mb-8 uppercase">
          Portfolio
        </div>
        
        <div className="mb-8 w-full max-w-none">
          <ParticleText text="JIAXUAN.DAI" />
        </div>
        
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-16" style={{ fontSize: '15px' }}>
          数字媒体创作者<br/>
          以三维视觉为笔，以信息设计为媒，让传统焕新，让创意落地
        </p>

        <div className="flex items-center justify-center gap-6">
          <a 
            href="#works"
            className="px-10 py-4 border border-gray-600/50 text-gray-400 text-sm tracking-wide hover:border-[#e6d5a7]/50 hover:text-[#e6d5a7] transition-all duration-500"
            style={{ fontWeight: 600 }}
          >
            查看作品
          </a>
          <a 
            href="#contact"
            className="px-10 py-4 border border-gray-600/50 text-gray-400 text-sm tracking-wide hover:border-[#e6d5a7]/50 hover:text-[#e6d5a7] transition-all duration-500"
            style={{ fontWeight: 600 }}
          >
            联系我
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <div className="text-xs text-[#e6d5a7] tracking-widest mb-2">SCROLL</div>
        <div className="w-8 h-12 border-2 border-[#e6d5a7]/50 rounded-full flex justify-center pt-3">
          <div className="w-2 h-4 bg-[#e6d5a7]/70 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
