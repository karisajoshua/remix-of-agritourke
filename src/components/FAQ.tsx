import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqSections = [
    {
      id: "general",
      title: "General Information",
      questions: [
        {
          question: "What is agritourism, and what makes our farm special?",
          answer: "Agritourism connects visitors like you with working farms for educational, recreational, and entertaining experiences while supporting local agriculture. At Agritourism Adventures, we specialize in hands-on activities like seasonal fruit picking, guided tours of our organic orchards, and farm-to-table dinners using our fresh produce. Our safaris property emphasizes eco-friendly practices, including regenerative farming to preserve soil health and biodiversity."
        },
        {
          question: "What are the operating hours and seasons?",
          answer: "We're open year-round. Hours are 9 AM–5 PM Monday to Friday. Saturdays & Sundays operate from 9AM – 3PM. Always check our calendar for special events like festivals."
        }
      ]
    },
    {
      id: "visiting",
      title: "Visiting and Activities",
      questions: [
        {
          question: "Do I need reservations, and how do I book?",
          answer: "Yes, reservations are recommended for groups of 6+ or popular activities like private tours. This is for both logistical purposes and our tailor-made itinerary with you. Book online via our website or call (+254) 710 429 755."
        },
        {
          question: "What activities are available for families with children?",
          answer: "We offer many child-friendly options like animal feeding (petting our goats and chickens), and educational workshops on pollination and composting. All activities are designed for ages 3+, with free entry for kids under 3. Safety guidelines follow best practices for farm-animal contact to ensure a healthy experience."
        },
        {
          question: "Are there pet-friendly policies?",
          answer: "No. Please do not bring animals with you on visits or stays."
        }
      ]
    },
    {
      id: "pricing",
      title: "Pricing and Policies",
      questions: [
        {
          question: "What are the admission and activity fees?",
          answer: "Prices differ with sites, activities, and lengths of visits. These prices include tax; group discounts (10% off for 10+) available."
        },
        {
          question: "What is your cancellation policy?",
          answer: "We have a detailed trip cancellation policy spelt out on our website's blog page. Please refer to them."
        }
      ]
    },
    {
      id: "safety",
      title: "Safety, Accessibility, and Sustainability",
      questions: [
        {
          question: "What safety measures are in place?",
          answer: "Your safety is our priority—we follow risk management guidelines like clear signage, staff training, and liability waivers for interactive activities. We provide cleaning stations, and all animal interactions comply with health standards. In case of inclement weather, indoor alternatives are available."
        },
        {
          question: "Are the farms accessible for visitors with disabilities?",
          answer: "Yes, though not all of them. Contact us in advance for personalized accommodations."
        },
        {
          question: "How do farms in your itinerary promote sustainability?",
          answer: "We cannot dictate how farms and other similar establishments run their operations. Nonetheless, we have a healthy blend of organic and non-organic farms in our itinerary list (for those looking to know STEM activities that don't purely practice sustainable agriculture). We're committed to exposing our clients to regenerative agriculture. In some you'll see rainwater harvesting, and zero-waste events. Visitors eating at the farm, among many other activities, offset their visit's carbon footprint by zero km farm-to-fork activities."
        }
      ]
    },
    {
      id: "practical",
      title: "Practical Details",
      questions: [
        {
          question: "Can I bring my own food or picnic?",
          answer: "You're welcome to discuss with us. However, we'd highly recommend that you eat at the farm so that you experience farm-to-fork goodness."
        },
        {
          question: "What should I wear or bring?",
          answer: "Dress for the farm: closed-toe shoes, hats, sunscreen, and bug spray. We'll provide bags for produce, but reusable water bottles are encouraged to reduce plastic use."
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions (FAQs)
          </h1>
          <h2 className="text-xl text-primary mb-6">
            for Our Agritourism Farm
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Welcome to Agritourism Adventures, where we blend sustainable farming with unforgettable
            experiences! Below, we've compiled tailored FAQs based on common visitor inquiries. These
            cover everything from planning your visit to understanding our farm's unique offerings. If your
            question isn't here, feel free to contact us.
          </p>
        </div>

        <div className="space-y-8">
          {faqSections.map((section) => (
            <div key={section.id} className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                {section.title}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((faq, index) => (
                  <AccordionItem key={`${section.id}-${index}`} value={`${section.id}-${index}`}>
                    <AccordionTrigger className="text-left text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-6 bg-secondary rounded-lg">
          <p className="text-secondary-foreground font-medium">
            These FAQs are designed to help you plan a seamless, enriching visit. See you on the farm!
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
