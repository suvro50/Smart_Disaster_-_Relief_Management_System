const SAFETY_GUIDES = [
  {
    type: "flood",
    icon: "🌊",
    color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    title: "Flood Safety",
    steps: [
      "Move to higher ground immediately when you hear warnings",
      "Never walk, swim, or drive through flood waters — 6 inches can knock you down",
      "Avoid contact with flood water — it may be contaminated",
      "Turn off utilities at the main switches if instructed",
      "Do not drink tap water until officials say it is safe",
    ],
  },
  {
    type: "earthquake",
    icon: "🌍",
    color: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
    title: "Earthquake Safety",
    steps: [
      "DROP, COVER, and HOLD ON — get under sturdy furniture",
      "Stay away from windows, outside walls, and things that can fall",
      "If outdoors, move to a clear area away from buildings and trees",
      "Do not use elevators during or after the earthquake",
      "After shaking stops, check for injuries and damage carefully",
    ],
  },
  {
    type: "cyclone",
    icon: "🌀",
    color: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    title: "Cyclone Safety",
    steps: [
      "Shelter in an interior room away from windows and doors",
      "Keep emergency supplies: water, food, flashlight, first aid",
      "Stay informed via radio or official channels",
      "Do not go outside during the eye of the cyclone",
      "Prepare to evacuate if officials order it — know your route",
    ],
  },
  {
    type: "fire",
    icon: "🔥",
    color: "from-red-500/20 to-red-600/20 border-red-500/30",
    title: "Fire Safety",
    steps: [
      "Get out immediately — do not stop to collect belongings",
      "Stay low to the ground — smoke rises, clean air is near the floor",
      "Feel doors before opening — if hot, find another way out",
      "Call emergency services once you are safely outside",
      "Stop, Drop, and Roll if your clothes catch fire",
    ],
  },
  {
    type: "landslide",
    icon: "⛰️",
    color: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
    title: "Landslide Safety",
    steps: [
      "Evacuate immediately if you hear rumbling or see ground cracking",
      "Move away from the path of the landslide at a right angle",
      "Do not cross roads with flowing mud or debris",
      "Stay away from steep slopes during heavy rainfall",
      "Report any unusual ground movement to authorities",
    ],
  },
  {
    type: "general",
    icon: "🛡️",
    color: "from-green-500/20 to-green-600/20 border-green-500/30",
    title: "General Emergency Tips",
    steps: [
      "Keep an emergency kit: water, food, flashlight, radio, first aid, documents",
      "Know your local emergency shelters and evacuation routes",
      "Keep your phone charged and have a backup power source",
      "Register on this platform to receive real-time alerts for your district",
      "Help neighbors who are elderly, disabled, or have young children",
    ],
  },
];

export default function SafetyInfo() {
  return (
    <main className="page">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
        Safety Information
      </h2>
      <p className="text-white/40 text-sm mb-8">
        Life-saving guidelines for different disaster types. Share with your family and community.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SAFETY_GUIDES.map((guide) => (
          <div key={guide.type} className={`bg-gradient-to-br ${guide.color} backdrop-blur-md border rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{guide.icon}</span>
              <h3 className="text-lg font-bold text-white">{guide.title}</h3>
            </div>
            <ol className="space-y-2">
              {guide.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-white/70">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
        <p className="text-red-400 font-semibold text-lg mb-2">🚨 In Immediate Danger?</p>
        <p className="text-white/50 text-sm mb-4">Request help now — no login required</p>
        <a href="/victim/request-help" className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-500 hover:to-orange-500 transition-all">
          🆘 Request Help Now
        </a>
      </div>
    </main>
  );
}
