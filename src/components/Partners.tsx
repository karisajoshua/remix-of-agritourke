
const Partners = () => {
  const partners = [
    {
      name: "Global Agritourism Network",
      logo: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Partner%20logo/Global%20Agritourism%20Network.png",
      website: "https://globalagritourismnetwork.org/"
    },
    {
      name: "KenInvest",
      logo: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Partner%20logo/KenIvest%20Logo%202.png",
      website: "https://www.investkenya.go.ke/"
    },
    {
      name: "Ministry of Agriculture, Livestock and Development",
      logo: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Partner%20logo/MoALD%20Logo.png",
      website: "https://kilimo.go.ke/"
    },
    {
      name: "NCCG",
      logo: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Partner%20logo/NCCG%20Logo.jpeg",
      website: "https://nairobi.go.ke/green-nairobi-environment-water-food-and-agriculture"
    },
    {
      name: "NHC",
      logo: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Partner%20logo/NHC%20Logo.png",
      website: "https://www.nhckenya.go.ke/"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Our Partners
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
            Working together with leading organizations to promote sustainable agritourism 
            and support Kenya's agricultural communities.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${partner.name} website`}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center h-32 cursor-pointer"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain filter hover:grayscale-0 grayscale transition-all duration-300"
              />
            </a>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="mt-16 text-center">
          <div className="bg-agri-grey rounded-2xl p-8">
            <h3 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
              Interested in Partnership?
            </h3>
            <p className="text-lg text-gray-600 font-inter mb-6 max-w-2xl mx-auto">
              Join our network of partners committed to sustainable agritourism and 
              community development in Kenya.
            </p>
            <button className="bg-agri-green hover:bg-agri-green/90 text-white px-8 py-3 rounded-lg font-inter font-semibold transition-colors">
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
