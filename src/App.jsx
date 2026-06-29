import React, { useState, useMemo } from "react";

export default function ManojYasoPortfolio() {
  // State to manage showing the overlay gallery
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  // State to manage which folder category is currently being viewed
  const [selectedCategory, setSelectedCategory] = useState(null);
  // State for zooming into a single image
  const [selectedImage, setSelectedImage] = useState(null);

  // ----------------------------------------------------
  // ⚡ DEEP FOLDER SCANNER (Reads Subfolders Dynamically)
  // ----------------------------------------------------
  const portfolioData = useMemo(() => {
    // The /**/ added here tells Vite to look inside subfolders too!
    const imageModules = import.meta.glob(
      "/public/portfolio/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}",
      { eager: true }
    );

    const categories = {};

    Object.keys(imageModules).forEach((filePath) => {
      // Remove /public for web URL paths
      const cleanPath = filePath.replace("/public", "");
      const pathParts = cleanPath.split("/");

      let folderName = "Main Gallery"; 
      let fileNameWithExt = "";

      // Check if the file is inside a subfolder
      if (pathParts.length > 3) {
        // Grab the folder name and replace underscores/dashes with spaces for clean UI
        folderName = pathParts[2].replace(/[_-]/g, " ");
        fileNameWithExt = pathParts[pathParts.length - 1];
      } else {
        // It sits directly in the root /portfolio/ folder
        fileNameWithExt = pathParts[2];
      }

      const cleanTitle = fileNameWithExt.replace(/\.[^/.]+$/, "");
      const encodedPath = encodeURI(cleanPath);

      // Create the category array if it doesn't exist yet
      if (!categories[folderName]) {
        categories[folderName] = [];
      }

      categories[folderName].push({
        src: encodedPath,
        title: cleanTitle,
      });
    });

    return categories;
  }, []);

  // ----------------------------------------------------
  // 🏠 FEATURED PROJECTS CARDS (Reading from public/title images)
  // ----------------------------------------------------
  const projects = [
    {
      title: "Modern Villa Exterior",
      category: "Architectural Visualization",
      baseName: "MAN%20(1)", 
    },
    {
      title: "Luxury Interior",
      category: "Interior Visualization",
      baseName: "MAN%20(2)",
    },
    {
      title: "Game Environment",
      category: "3D Environment Art",
      baseName: "MAN%20(3)",
    },
    {
      title: "VR Experience",
      category: "AR / VR Environment",
      baseName: "MAN%20(4)",
    },
  ];

  // Helper function to auto-switch extensions inside /title images/ if an image breaks
  const handleImageError = (e, baseName) => {
    const currentSrc = e.target.src;
    
    // If it failed as a .jpg, try changing it to a .png
    if (currentSrc.endsWith(".jpg")) {
      e.target.src = `/title%20images/${baseName}.png`;
    } 
    // If it failed as a .png, try changing it to a .jpeg
    else if (currentSrc.endsWith(".png")) {
      e.target.src = `/title%20images/${baseName}.jpeg`;
    }
  };

  // Helper to cleanly close gallery and reset views
  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedCategory(null);
    setSelectedImage(null);
  };

  return (
    <div className="bg-[#05070c] text-white min-h-screen overflow-x-hidden antialiased">
      {/* Injecting Arizonia Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Arizonia&display=swap"
        rel="stylesheet"
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-screen flex items-center border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#111827]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="uppercase tracking-[0.35em] text-3xl lg:text-5xl font-light text-yellow-400 mb-8">
              MONAIM Studio
            </p>

            <h1 className="text-6xl lg:text-8xl font-bold leading-none mb-4 tracking-tight">
              Manoj Yaso
            </h1>

            {/* PROFESSIONAL TITLE */}
            <div className="mb-8 border-l-2 border-yellow-400 pl-5">
              <h2 className="text-2xl lg:text-3xl font-semibold text-yellow-300 mb-3 tracking-wide leading-snug">
                Senior 3D Environment Artist | Senior 3D Visualizer
              </h2>
              <p className="text-gray-300 text-lg tracking-wide leading-relaxed">
                AR/VR • Game Environments • High-End Architectural Visualization
              </p>
            </div>

            {/* BRAND */}
            <p className="text-yellow-400 text-3xl tracking-[0.5em] uppercase mb-10 font-light">
              [ MONAIM ]
            </p>

            {/* DESCRIPTION */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mb-10">
              Creating immersive 3D experiences and cinematic architectural
              visualization with photorealistic rendering, realtime environments,
              AR/VR interaction, metaverse spaces, and premium visual storytelling.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="px-8 py-4 rounded-2xl bg-yellow-400 text-black font-semibold hover:scale-105 transition duration-300 cursor-pointer text-center shadow-lg shadow-yellow-400/10"
              >
                View Portfolio
              </button>

              <a
                href="https://www.youtube.com/@manojyaso"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl border border-gray-600 hover:border-yellow-400 hover:text-yellow-400 transition duration-300 inline-block text-center"
              >
                Watch Showreel
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute -inset-6 bg-yellow-400/10 blur-3xl rounded-full" />
            <img
              src="/title%20images/MAN%20(1).png"
              alt="Luxury Architecture"
              className="relative rounded-[32px] shadow-2xl border border-gray-700 object-cover w-full h-[500px]"
              onError={(e) => { e.target.src = "/title%20images/MAN%20(1).jpg"; }}
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-gray-800">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* LEFT */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-10 text-yellow-400">
                About Me
              </h2>

              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                I am a Senior 3D Environment Artist and Visualizer specializing
                in cinematic architectural visualization, AR/VR environments,
                realtime rendering, game environments, and immersive experiences.
              </p>

              <p className="text-gray-400 leading-relaxed text-lg">
                Passionate about realism, storytelling, and designing environments
                that merge architecture, technology, and next-generation interactive
                experiences.
              </p>
            </div>

            {/* SIGNATURE */}
            <div className="mt-12">
              <p
                className="text-yellow-400 text-6xl tracking-wide select-none"
                style={{
                  fontFamily: "'Arizonia', cursive",
                  lineHeight: "1.2",
                }}
              >
                Manoj Yaso
              </p>
            </div>
          </div>

          {/* RIGHT INFO CARD */}
          <div className="bg-[#0d1420] border border-gray-700 rounded-[32px] p-10 shadow-2xl">
            <div className="space-y-8 text-lg">
              <div>
                <p className="text-gray-500 mb-1">Website</p>
                <p className="font-semibold text-yellow-400">manojyaso.com</p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <p className="font-semibold text-gray-200">manojyesodharan@gmail.com</p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">WhatsApp</p>
                <p className="font-semibold text-gray-200">+91 83048 59553</p>
              </div>

              {/* SPECIALIZATION */}
              <div>
                <p className="text-gray-500 mb-3">Specialization</p>
                <div className="space-y-3">
                  <p className="font-semibold text-white leading-relaxed">
                    AR/VR • Unreal Engine • Environment Design
                  </p>
                  <p className="font-semibold text-yellow-400 leading-relaxed">
                    3D Visualization • Architecture • Interior Design
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-gray-800">
        <div className="flex items-center justify-between mb-14">
          <h2 className="text-4xl font-bold text-yellow-400">
            Featured Projects
          </h2>

          <a
            href="https://www.behance.net/mano"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-white transition duration-300 font-medium tracking-wide"
          >
            View All Projects →
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-[28px] border border-gray-700 bg-[#0d1420] hover:border-yellow-400 transition duration-500 flex flex-col h-full"
            >
              <div className="overflow-hidden aspect-video md:aspect-square lg:h-64">
                <img
                  src={`/title%20images/${project.baseName}.jpg`} // Scans title images folder
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  onError={(e) => handleImageError(e, project.baseName)} // Handles extension adjustments seamlessly
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold mb-2 text-gray-100">
                  {project.title}
                </h3>

                <p className="text-yellow-400 mb-3 font-medium">
                  {project.category}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mt-auto">
                  Premium cinematic visualization and immersive environment presentation.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-gray-800">
        <h2 className="text-4xl font-bold text-yellow-400 mb-14">
          Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Architectural Rendering",
            "Interior Visualization",
            "3D Walkthrough Animation",
            "Real Estate Presentation",
            "AR Environment Design",
            "VR Interactive Experience",
            "Game Environments",
            "Realtime Unreal Environments",
          ].map((service, index) => (
            <div
              key={index}
              className="bg-[#0d1420] border border-gray-700 rounded-[28px] p-8 hover:border-yellow-400 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-200">
                {service}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                High-end premium visual content optimized for immersive
                presentation and realtime interaction.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWREEL SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-gray-800">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            Showreel & Walkthroughs
          </h2>

          <p className="text-gray-400 max-w-2xl">
            Cinematic architectural walkthroughs, immersive animations,
            and realtime environment showcases.
          </p>
        </div>

        <div className="rounded-[32px] overflow-hidden border border-gray-700 shadow-2xl bg-[#0d1420]">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/K3HVp0dVdTs"
            title="Manoj Yaso Showreel"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-28 text-center">
        <div className="bg-gradient-to-br from-[#0d1420] to-[#111827] border border-gray-700 rounded-[40px] p-14 shadow-2xl">
          <h2 className="text-5xl font-bold mb-8 text-gray-100">
            Let’s Build Something Amazing
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
            Available for architectural visualization, AR/VR environment design,
            cinematic walkthroughs, metaverse spaces, immersive virtual experiences,
            game environments, and premium real-estate presentation projects.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="px-8 py-4 bg-yellow-400 text-black rounded-2xl font-semibold hover:scale-105 transition duration-300 cursor-pointer"
            >
              View My Portfolio
            </button>

            <a
              href="https://wa.me/918304859553"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-gray-500 text-gray-300 rounded-2xl hover:border-yellow-400 hover:text-yellow-400 transition duration-300 inline-block"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-10 text-center text-gray-500 text-sm tracking-wide">
        © 2026 Manoj Yasodharan [ MONAIM ] — AR/VR • Environment Design • Architectural Visualization
      </footer>


      {/* 🖼️ AUTOMATED FULL-PAGE GALLERY OVERLAY */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-[#05070c]/98 backdrop-blur-xl flex flex-col p-6 overflow-y-auto">
          
          {/* HEADER NAV */}
          <div className="max-w-7xl w-full mx-auto flex justify-between items-center mb-10 border-b border-gray-800 pb-5 pt-4">
            <div>
              <h2 className="text-3xl font-bold text-yellow-400 tracking-tight">
                {selectedCategory ? `CATEGORY: ${selectedCategory.toUpperCase()}` : "PORTFOLIO GALLERIES"}
              </h2>
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="mt-3 text-gray-400 hover:text-yellow-400 transition duration-200 text-sm font-medium flex items-center gap-2"
                >
                  ← Back to Categories
                </button>
              )}
            </div>
            
            <button
              onClick={closeGallery}
              className="px-6 py-3 bg-gray-800 hover:bg-yellow-400 hover:text-black text-white rounded-xl font-semibold transition duration-200 cursor-pointer text-sm uppercase tracking-wider"
            >
              ✕ Close Gallery
            </button>
          </div>

          {Object.keys(portfolioData).length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-lg">
              No images found inside your <code className="text-yellow-400">public/portfolio/</code> folder yet.
            </div>
          ) : (
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              
              {/* VIEW 1: SHOW CATEGORY FOLDERS */}
              {!selectedCategory && Object.keys(portfolioData).map((folderName, idx) => {
                const imagesInFolder = portfolioData[folderName];
                const thumbImage = imagesInFolder[0]?.src; // Use first image as thumbnail
                return (
                  <div 
                    key={idx} 
                    className="group relative bg-[#0d1420] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:border-yellow-400 transition duration-300 cursor-pointer"
                    onClick={() => setSelectedCategory(folderName)}
                  >
                    <div className="aspect-video w-full overflow-hidden bg-black relative">
                      <img 
                        src={thumbImage} 
                        alt={folderName} 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      {/* Folder Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-gray-600 group-hover:border-yellow-400 transition duration-300 flex items-center gap-3">
                            <span className="text-2xl">📁</span>
                            <span className="text-white font-bold tracking-wide uppercase">{folderName}</span>
                         </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-t from-[#05070c] via-[#0d1420]/90 to-transparent flex justify-between items-center">
                       <p className="text-gray-300 text-sm font-medium group-hover:text-yellow-400">Open Folder</p>
                       <p className="text-gray-500 text-xs uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-full">{imagesInFolder.length} Items</p>
                    </div>
                  </div>
                );
              })}

              {/* VIEW 2: SHOW IMAGES INSIDE SELECTED CATEGORY */}
              {selectedCategory && portfolioData[selectedCategory].map((image, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-[#0d1420] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:border-yellow-400 transition duration-300 cursor-zoom-in"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-video w-full overflow-hidden bg-black/40">
                    <img 
                      src={image.src} 
                      alt={image.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 bg-gradient-to-t from-[#05070c] via-[#0d1420]/90 to-transparent">
                    <p className="text-gray-200 text-lg font-medium group-hover:text-yellow-400 transition duration-200 truncate">
                      {image.title}
                    </p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Click to View Full Size</p>
                  </div>
                </div>
              ))}
              
            </div>
          )}
        </div>
      )}


      {/* 🔍 FULLSCREEN LIGHTBOX FOR INDIVIDUAL IMAGES */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white text-xl bg-gray-900/80 w-12 h-12 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition duration-200 shadow-xl">
            ✕
          </button>
          
          <div className="max-w-6xl max-h-[80vh] relative">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg border border-gray-800 shadow-2xl" 
            />
          </div>
          
          <p className="text-yellow-400 text-2xl font-semibold mt-6 tracking-wide drop-shadow-md">
            {selectedImage.title}
          </p>
          <p className="text-gray-400 text-sm mt-1">Click anywhere to return to grid</p>
        </div>
      )}

    </div>
  );
}
