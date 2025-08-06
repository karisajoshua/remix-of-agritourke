
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Users, Leaf, FileText } from 'lucide-react';
import { useContentProtection } from '@/hooks/useContentProtection';

const Blog = () => {
  useContentProtection();
  
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  const toggleArticle = (index: number) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  const articles = [
    {
      id: 1,
      title: "Community-Based Tourism",
      category: "Sustainable Travel",
      excerpt: "Community-Based Tourism (CBT) is more than travel—it's connection. It's the opportunity to experience life as locals do, guided by those who call the land home.",
      icon: <Users className="h-6 w-6 text-agri-green" />,
      content: `
        <p class="mb-4">Community-Based Tourism (CBT) is more than travel—it's connection. It's the opportunity to experience life as locals do, guided by those who call the land home. In this sustainable model, local communities host travellers, lead excursions, and manage tourism enterprises, ensuring that the economic benefits remain within the community.</p>
        
        <p class="mb-6">If you're fascinated by authentic lifestyles, traditional wisdom, and cultural richness, then CBT is what you've been seeking.</p>
        
        <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">🌍 What Makes CBT Unique?</h3>
        <p class="mb-4">CBT is built on the pillars of:</p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>Cultural exchange</li>
          <li>Economic empowerment</li>
          <li>Environmental conservation</li>
        </ul>
        
        <p class="mb-6">Rather than being passive observers, visitors become participants—learning indigenous crafts, hearing oral histories, and sharing meals prepared with heritage and heart.</p>
        
        <h4 class="text-lg font-poppins font-semibold text-agri-dark mb-3">In Kenya, for example:</h4>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>The Maasai in the Mara welcome guests with traditional dances, storytelling, and homestays</li>
          <li>Community-owned workshops create handmade crafts, preserving culture and creating livelihoods</li>
        </ul>
        
        <h4 class="text-lg font-poppins font-semibold text-agri-dark mb-3">Other global examples:</h4>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>Chiang Mai, Thailand:</strong> Homestays invite guests to farm, weave, and cook with host families</li>
          <li><strong>Costa Rica:</strong> Community-run eco-lodges preserve the environment while powering the local economy</li>
          <li><strong>Nepal:</strong> Locally managed trekking routes ensure tourism directly benefits residents</li>
          <li><strong>South Africa:</strong> Zulu cultural tours educate visitors and empower artisans</li>
        </ul>
        
        <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">⚖️ Challenges in Sustainable Tourism</h3>
        <p class="mb-4">Despite its promise, CBT faces notable challenges:</p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>Limited funding for marketing, infrastructure, and training</li>
          <li>Scalability issues that hinder broader community reach</li>
          <li>Risk of over-commercialization, which can dilute authenticity and shift focus from preservation to profit</li>
        </ul>
        <p class="mb-6">Maintaining a balance between growth and integrity is critical to sustaining the true spirit of CBT.</p>
        
        <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">💡 Innovative Hybrids: CBT + Industry Resources</h3>
        <p class="mb-4">The future lies in synergy. Hybrid models are proving successful by blending CBT's grassroots authenticity with the scale and infrastructure of mainstream tourism.</p>
        <p class="mb-4">Examples include:</p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>Rwanda's Gorilla Trekking:</strong> Luxury lodges for high-end travellers fund local guides, conservationists, and village projects</li>
          <li><strong>Bhutan's "High-Value, Low-Impact" Policy:</strong> Tourists pay a premium to minimize environmental and cultural disruption while funding social programs</li>
        </ul>
        
        <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">🇰🇪 Kenya's Role in Community-Based Tourism</h3>
        <p class="mb-6">At Agritourism Adventures, we proudly offer community-based experiences across Kenya—from farming and cultural immersions to homestays and village-led excursions. We believe that sustainable tourism should uplift, not exploit—and Kenya is rich with communities ready to welcome you.</p>
        
        <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">🌿 Ready to Travel with Purpose?</h3>
        <p class="mb-4">Take the journey that makes a difference. Contact us today to explore how you can be part of a transformational tourism experience rooted in safety, serenity, and satisfaction—for all.</p>
      `
    },
    {
      id: 2,
      title: "Embrace the Bleat - Goat Farming for a More Sustainable World",
      category: "Agriculture",
      excerpt: "Goat farming is more than just a rural pastime in Kenya—it's a thriving, sustainable practice with immense value for food systems, natural health solutions, and green energy alternatives.",
      icon: <Leaf className="h-6 w-6 text-agri-green" />,
      content: `
        <p class="mb-6">Goat farming is more than just a rural pastime in Kenya—it's a thriving, sustainable practice with immense value. Whether it's the nutritious milk, organic droppings, or high-demand meat, goats are quietly powering food systems, natural health solutions, and green energy alternatives.</p>
        
        <p class="mb-6">In fact, it's no surprise that Kenyans flock to nyama choma joints every weekend to enjoy the rich, flavorful delicacy that is goat meat. But why are goats so treasured? Let's explore the hidden power of these humble animals.</p>
        
        <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">🥛 Goat Milk – A Natural Superfood</h3>
        <p class="mb-4">Goat milk is an incredibly versatile and nutrient-rich product. It's used to make:</p>
        <ul class="list-disc list-inside mb-4 space-y-1">
          <li>Yoghurt</li>
          <li>Kefir</li>
          <li>Butter & Ghee</li>
          <li>Cheese & Whey</li>
          <li>Natural cosmetic products like soap, lotion, and facial cleansers</li>
        </ul>
        
        <h4 class="text-lg font-poppins font-semibold text-agri-dark mb-3">Health Benefits Include:</h4>
        <ul class="list-none mb-6 space-y-2">
          <li>✅ 13% more calcium than cow milk</li>
          <li>✅ 27% more antioxidant-rich selenium</li>
          <li>✅ 47% more Vitamin A</li>
          <li>✅ Supports a healthy immune system</li>
          <li>✅ Suitable for lactose-intolerant individuals</li>
          <li>✅ Naturally homogenized</li>
        </ul>
        <p class="mb-6 font-medium">It's not just food—it's fuel for your body and skin!</p>
        
        <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">🌱 Goat Droppings – Waste That Works Wonders</h3>
        <p class="mb-4">While often discarded, goat droppings are a goldmine when used correctly. Their pellet form makes them perfect for:</p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>Biogas production</strong> – Generating clean energy and producing bio-slurry, which can be turned into nutrient-rich fertilizer</li>
          <li><strong>Composting</strong> – Enriching soil to grow food, herbs, and fodder</li>
          <li><strong>Cost-saving</strong> – Reducing dependence on LPG gas, synthetic fertilizer, and chemical-laden beauty products</li>
        </ul>
        <p class="mb-6">If you feed goats with organic food, their organic waste returns to your garden, closing the loop in a sustainable cycle.</p>
        
        <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">🍖 Goat Meat – Premium Taste, Premium Profits</h3>
        <p class="mb-4">Goat meat is prized in Kenya for its taste and health benefits. It's leaner than beef, packed with nutrients, and always in demand. Whether grilled, fried, or stewed, it delivers both flavor and function.</p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>Used to produce tallow for soap and cooking oil</li>
          <li>Sells at a premium compared to beef</li>
          <li>Opens business opportunities in butcheries, restaurants, and institutions</li>
        </ul>
        <p class="mb-6">With consistent demand, goat farming can be both fulfilling and financially rewarding.</p>
        
        <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">🐐 Ready to Learn More?</h3>
        <p class="mb-4">Curious about goats and the farm life they sustain? Explore our Goat Farm Tour for a firsthand experience, and book your slot today. Whether you're a foodie, farmer, or eco-conscious traveler, this is your chance to connect with nature—and with one of Kenya's most sustainable farm animals.</p>
      `
    },
    {
      id: 3,
      title: "Trip Cancellation Guidelines",
      category: "Policy",
      excerpt: "All our tours are tailor-made to suit your preferences. However, cancellations affect planning and costs. Here are our clear guidelines for cancellations and refunds.",
      icon: <FileText className="h-6 w-6 text-agri-green" />,
      content: `
        <p class="mb-6">All our tours are tailor-made to suit your preferences. However, cancellations affect planning and costs. Kindly note the following policy:</p>
        
        <div class="bg-agri-light/20 p-6 rounded-lg mb-6">
          <h3 class="text-xl font-poppins font-semibold text-agri-dark mb-4">Cancellation Policy</h3>
          <ul class="space-y-3">
            <li class="flex justify-between items-center p-3 bg-white rounded border-l-4 border-green-500">
              <span class="font-medium">Cancellation 4 days or earlier:</span>
              <span class="text-green-600 font-semibold">Full refund</span>
            </li>
            <li class="flex justify-between items-center p-3 bg-white rounded border-l-4 border-yellow-500">
              <span class="font-medium">3 days before tour:</span>
              <span class="text-yellow-600 font-semibold">70% refund (30% charge)</span>
            </li>
            <li class="flex justify-between items-center p-3 bg-white rounded border-l-4 border-orange-500">
              <span class="font-medium">2 days before tour:</span>
              <span class="text-orange-600 font-semibold">50% refund</span>
            </li>
            <li class="flex justify-between items-center p-3 bg-white rounded border-l-4 border-red-400">
              <span class="font-medium">1 day before tour:</span>
              <span class="text-red-600 font-semibold">25% refund</span>
            </li>
            <li class="flex justify-between items-center p-3 bg-white rounded border-l-4 border-red-600">
              <span class="font-medium">Same-day cancellation:</span>
              <span class="text-red-700 font-semibold">10% refund</span>
            </li>
          </ul>
        </div>
        
        <p class="text-agri-dark font-medium">Thank you for your understanding and support.</p>
        
        <div class="mt-6 p-4 bg-agri-teal/10 rounded-lg">
          <p class="text-sm text-agri-dark">
            <strong>Note:</strong> This policy helps us manage resources effectively while being fair to all our guests. 
            We appreciate your cooperation in planning memorable experiences for everyone.
          </p>
        </div>
      `
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-agri-light to-agri-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-agri-dark/80 font-inter max-w-3xl mx-auto">
              Discover insights on sustainable tourism, agriculture, and travel experiences that make a difference. 
              Stay informed about the latest trends and policies in responsible travel.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    {article.icon}
                    <span className="text-sm font-medium text-agri-green bg-agri-green/10 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-poppins font-bold text-agri-dark leading-tight">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-inter">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {expandedArticle === index && (
                    <div 
                      className="prose prose-lg max-w-none text-gray-700 font-inter mb-6 animate-fade-in"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  )}
                  <Button
                    onClick={() => toggleArticle(index)}
                    variant="outline"
                    className="w-full border-agri-green text-agri-green hover:bg-agri-green hover:text-white"
                  >
                    {expandedArticle === index ? (
                      <>
                        Read Less <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Read More <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-agri-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-poppins font-bold text-white mb-6">
            Ready to Experience It Yourself?
          </h2>
          <p className="text-xl text-white/90 font-inter mb-8 max-w-2xl mx-auto">
            From community-based tourism to sustainable farming experiences, 
            discover the authentic Kenya with our guided tours.
          </p>
          <Button 
            className="bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-medium px-8 py-3 text-lg"
            onClick={() => window.location.href = '/tours'}
          >
            Explore Our Tours
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
