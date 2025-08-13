
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogArticles from '@/components/BlogArticles';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-agri-green/10 to-agri-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-agri-dark mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-agri-dark/80 font-inter max-w-3xl mx-auto">
              Step off the beaten path and into the soul of the countryside. Visualize your way into rustic charm—where hayrides, harvests, and homemade pies tell the story of life on the land. Come for the fresh air, stay for the farm tales. It's simple living, seasoned with adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Content Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-agri-dark mb-6">
              Insights on Sustainable Tourism & Agriculture
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              Stay informed about the latest trends in agritourism, sustainable farming practices, and responsible travel. Our articles are grounded in research from leading organizations like the <a href="https://www.unwto.org/" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:text-agri-dark underline">UN World Tourism Organization</a> and <a href="https://www.fao.org/" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:text-agri-dark underline">Food and Agriculture Organization</a>, ensuring you receive accurate and valuable information.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="community-tourism">Community Tourism</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="travel-guidelines">Travel Guidelines</SelectItem>
                <SelectItem value="sustainability">Sustainability</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Articles */}
      <BlogArticles />

      {/* Additional Resources */}
      <section className="py-16 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-poppins font-bold text-agri-dark mb-6">
              Additional Resources
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed mb-8">
              Expand your knowledge with resources from leading organizations in sustainable tourism and agriculture.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <a 
                href="https://www.gstcouncil.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-poppins font-semibold text-agri-dark mb-2">
                  Global Sustainable Tourism Council
                </h3>
                <p className="text-gray-600 font-inter text-sm">
                  International standards for sustainable tourism practices
                </p>
              </a>
              
              <a 
                href="https://ecotourism.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-poppins font-semibold text-agri-dark mb-2">
                  The International Ecotourism Society
                </h3>
                <p className="text-gray-600 font-inter text-sm">
                  Promoting responsible travel to natural areas
                </p>
              </a>
              
              <a 
                href="https://sarep.ucdavis.edu/sustainable-ag/agritourism" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-poppins font-semibold text-agri-dark mb-2">
                  UC Davis Agritourism Research
                </h3>
                <p className="text-gray-600 font-inter text-sm">
                  Academic research on sustainable agritourism development
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
