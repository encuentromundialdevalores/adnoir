import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import epcImage from "../../imports/image-3.png";
import avonImage from "../../imports/image-5.png";

const PROJECTS = [
  {
    id: "epc-01",
    title: "EPC Multifamily Partners VI",
    location: "High-Growth U.S. Markets",
    type: "Value-Add Multifamily",
    status: "Capital Raising",
    yield: "12-15% Target Net IRR",
    image: epcImage,
    description: "Disciplined investment approach targeting existing income-producing value-add and core-plus multifamily properties with upside potential in high-growth U.S. markets.",
    details: [
      "Target Equity Commitments: $300M",
      "Target Net Equity Multiple: 1.7x - 2.0x",
      "Est. Avg. Annual Cash-on-Cash: 4% - 6%",
      "Target holding period: 5 years"
    ]
  },
  {
    id: "apotech-01",
    title: "APOTECH FUND III",
    location: "Strategic U.S. Markets",
    type: "Enterprise Data Centers",
    status: "Acquisition & Expansion",
    yield: "20-25% Target Gross IRR",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc2VydmVycyUyMG1vZGVybnxlbnwxfHx8fDE3ODE4ODg5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Scalable U.S. enterprise data center platform addressing the market gap where AI demand is growing and enterprise infrastructure is being left behind.",
    details: [
      "Fund Size: $60M",
      "Target MOIC: 2.0x",
      "Hold Period: 5 Years",
      "Focus: AI & Hybrid Cloud inference"
    ]
  },
  {
    id: "fontgate-01",
    title: "Fontgate Avon Residences",
    location: "Avon, CO",
    type: "Modern Mountain Residences",
    status: "Completed",
    yield: "N/A",
    image: avonImage,
    description: "A limited collection of modern mountain residences adjacent to Beaver Creek Resort, featuring luxury condominiums and townhomes with resort-style amenities including an expansive outdoor aquatics experience.",
    details: [
      "75 Luxury Condominiums & 9 Townhomes",
      "Mountain Modern Design",
      "The Springs Outdoor Oasis & Pioneer Plunge",
      "Opened Ski Season 2023-2024"
    ]
  }
];

export function ProjectGrid() {
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-black mb-6">
            Active Opportunities
          </h2>
          <p className="max-w-xl mx-auto text-black/50 text-lg font-normal">
            Institutional holdings and exclusive access to premier real estate developments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="mb-6 text-center">
                <p className="text-black/40 text-[11px] font-bold uppercase tracking-[0.4em]">
                  {project.location}
                </p>
              </div>
              
              <div
                className="group relative cursor-pointer aspect-[3/4] rounded-2xl overflow-hidden bg-black/5"
                onClick={() => setActiveProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-semibold text-white tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <div className="mt-6 w-8 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-xl"
              onClick={() => setActiveProject(null)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden max-h-[90vh] flex flex-col lg:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-black/5"
            >
              <div className="w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-16 overflow-y-auto bg-white">
                <button 
                  onClick={() => setActiveProject(null)}
                  className="absolute top-6 right-6 p-2 bg-black/5 rounded-full text-black/50 hover:text-black hover:bg-black/10 transition-all duration-300"
                >
                  <X size={20} />
                </button>
                
                <div className="mb-10">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-black/40 font-bold block mb-4">
                    {activeProject.status}
                  </span>
                  <h2 className="text-3xl font-semibold mb-6 tracking-tight text-black">{activeProject.title}</h2>
                  <p className="text-black/60 leading-relaxed text-base font-normal mb-8">
                    {activeProject.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 py-8 border-y border-black/10">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-black/40 mb-2 font-bold">Asset Class</h4>
                      <p className="text-sm font-semibold text-black">{activeProject.type}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-black/40 mb-2 font-bold">Target Return</h4>
                      <p className="text-sm font-semibold text-black">{activeProject.yield}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-6">Key Metrics</h4>
                  <ul className="space-y-4">
                    {activeProject.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-normal text-black/70">
                        <div className="w-1 h-1 rounded-full bg-black/40" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-12">
                    <button 
                      onClick={() => {
                        setActiveProject(null);
                        const contactElement = document.getElementById("contact");
                        if (contactElement) {
                          contactElement.scrollIntoView({ behavior: "smooth" });
                          // Small delay to allow scroll to start, then focus
                          setTimeout(() => {
                            const nameInput = document.getElementById("contact-name");
                            if (nameInput) nameInput.focus();
                          }, 800);
                        }
                      }}
                      className="w-full bg-black rounded-full text-white py-5 text-xs tracking-[0.2em] uppercase font-bold hover:bg-black/80 transition-all duration-300 shadow-xl"
                    >
                      Request Information
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
