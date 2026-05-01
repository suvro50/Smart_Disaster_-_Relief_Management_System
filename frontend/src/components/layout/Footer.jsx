export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8 px-8 bg-gradient-to-b from-transparent to-black/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <p className="text-white font-semibold text-base">Smart Disaster & Relief Management</p>
              <p className="text-white/40 text-xs">Real-time disaster monitoring & rescue coordination</p>
            </div>
          </div>
          <div className="flex gap-6 text-white/40 text-xs">
            <a href="/public-map" className="hover:text-white/80 transition-colors duration-300">Live Map</a>
            <a href="/victim/request-help" className="hover:text-white/80 transition-colors duration-300">Request Help</a>
            <a href="/report-disaster" className="hover:text-white/80 transition-colors duration-300">Report Disaster</a>
            <a href="/victim/safety-info" className="hover:text-white/80 transition-colors duration-300">Safety Info</a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Developed by</span>
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-bold text-lg">
                Suvrojit Bose Sarthok
              </span>
            </div>
            <span className="text-white/30 text-sm hidden md:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">🎓</span>
              <span className="text-white/80 text-sm">United International University</span>
            </div>
            <span className="text-white/30 text-sm hidden md:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">💻</span>
              <span className="text-white/80 text-sm">B.Sc. in Computer Science & Engineering</span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <span>Built with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>for saving lives</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
