import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import epcImage from "../../imports/image-3.png";
import avonImage from "../../imports/image-5.png";
import { ProjectCharts } from "./ProjectCharts";
import { ProjectSlider } from "./ProjectSlider";

const PROJECTS = [
  {
    id: "epc-01",
    title: "EPC Multifamily Partners VI",
    location: "High-Growth U.S. Markets",
    type: "Value-Add Multifamily",
    status: "Capital Raising",
    yield: "12-15% Target Net IRR",
    image: epcImage,
    sliderImages: [
      "/projects/epc/260610 EPC Multifamily Partners VI LLC - RS Presentation vP_p1_i0.jpeg",
      "/projects/epc/260610 EPC Multifamily Partners VI LLC - Teaser_p1_i2.jpeg",
      "/projects/epc/260610 EPC Multifamily Partners VI LLC - Teaser_p3_i1.jpeg",
    ],
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
    image: "/projects/apotech/Apotech Short Teaser v2_p1_i0.jpeg",
    sliderImages: [
      "/projects/apotech/Apotech Short Teaser v2_p1_i0.jpeg",
      "/projects/apotech/Project Core_Investors Teaser_04.2026_p1_i1.jpeg",
      "/projects/apotech/Project Core_Investors Teaser_04.2026_p24_i0.jpeg",
      "/projects/apotech/Project Core_Investors Teaser_04.2026_p31_i1.jpeg",
    ],
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
    title: "Frontgate Avon Residences",
    location: "Avon, CO",
    type: "Modern Mountain Residences",
    status: "Completed",
    yield: "N/A",
    image: avonImage,
    sliderImages: [
      "/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p1_i0.jpeg",
      "/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p5_i0.jpeg",
      "/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p7_i0.jpeg",
      "/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p12_i0.jpeg",
    ],
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
              className="relative w-full max-w-[1200px] bg-white rounded-3xl overflow-hidden h-[90vh] flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-black/5"
            >
              <div className="p-8 lg:p-12 flex-grow overflow-y-auto custom-scrollbar">
                <button 
                  onClick={() => setActiveProject(null)}
                  className="absolute top-6 right-6 p-2 bg-black/5 rounded-full text-black/50 hover:text-black hover:bg-black/10 transition-all duration-300 z-10"
                >
                  <X size={20} />
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-black/40 font-bold block mb-4">
                      {activeProject.status}
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-semibold mb-6 tracking-tight text-black">{activeProject.title}</h2>
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

                    <div className="mt-8">
                      <h4 className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-6">Key Metrics</h4>
                      <ul className="space-y-4">
                        {activeProject.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-normal text-black/70">
                            <div className="w-1 h-1 rounded-full bg-black/40" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-4">Project Gallery</h4>
                    <ProjectSlider images={activeProject.sliderImages} />
                  </div>
                </div>

                {/* Animated Charts go here */}
                <ProjectCharts projectId={activeProject.id} />

                <div className="mt-16 flex justify-center border-t border-black/10 pt-12">
                  <button 
                    onClick={() => {
                      setActiveProject(null);
                      const contactElement = document.getElementById("contact");
                      if (contactElement) {
                        contactElement.scrollIntoView({ behavior: "smooth" });
                        setTimeout(() => {
                          const nameInput = document.getElementById("contact-name");
                          if (nameInput) nameInput.focus();
                        }, 800);
                      }
                    }}
                    className="bg-black rounded-full text-white px-12 py-5 text-xs tracking-[0.2em] uppercase font-bold hover:bg-black/80 transition-all duration-300 shadow-xl"
                  >
                    Request Information
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
