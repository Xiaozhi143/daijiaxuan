import ScrollAnimate from './ScrollAnimate';

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimate>
          <div className="section-number">04</div>
        </ScrollAnimate>
        <ScrollAnimate delay={100}>
          <h2 className="section-title">联系我</h2>
        </ScrollAnimate>
        <ScrollAnimate delay={200}>
          <p className="section-subtitle">如果对我的作品感兴趣，或有合作想法，欢迎随时联系。</p>
        </ScrollAnimate>

        <div className="mt-8 flex flex-col gap-4">
          <ScrollAnimate delay={300}>
            <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Email</p>
                <a href="mailto:2267037048@qq.com" className="text-xl text-white hover:text-gray-300 transition-colors">
                  2267037048@qq.com
                </a>
              </div>
            </div>
          </ScrollAnimate>
          
          <ScrollAnimate delay={400}>
            <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <span className="text-2xl">📱</span>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Phone</p>
                <a href="tel:19961670950" className="text-xl text-white hover:text-gray-300 transition-colors">
                  199 6167 0950
                </a>
              </div>
            </div>
          </ScrollAnimate>
          
          <ScrollAnimate delay={500}>
            <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider">WeChat</p>
                <span className="text-xl text-white">d19961670950</span>
              </div>
            </div>
          </ScrollAnimate>
        </div>

        <ScrollAnimate delay={600}>
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-gray-400">© 2026 戴嘉轩. Design Portfolio.</p>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default Contact;
