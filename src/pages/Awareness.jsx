import React from 'react';
import { AlertCircle, Leaf, Droplets, Zap, Recycle, Trash2, TrendingDown } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

const Awareness = () => {
  const impactStats = [
    {
      icon: <Trash2 className="text-red-500" size={32} />,
      title: 'Global Waste',
      stat: '2.12 Billion',
      description: 'Tons of waste generated annually',
      color: 'bg-red-50 border-red-200'
    },
    {
      icon: <Droplets className="text-blue-500" size={32} />,
      title: 'Ocean Plastic',
      stat: '8 Million',
      description: 'Tons entering oceans each year',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: <Zap className="text-yellow-500" size={32} />,
      title: 'CO2 Emissions',
      stat: '3.3 Billion',
      description: 'Tons from waste annually',
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      icon: <Leaf className="text-green-500" size={32} />,
      title: 'Recycling Rate',
      stat: '32%',
      description: 'Global average waste recycled',
      color: 'bg-green-50 border-green-200'
    }
  ];

  const wasteCategories = [
    {
      title: 'Organic Waste',
      items: ['Food scraps', 'Garden waste', 'Paper products', 'Natural fibers'],
      disposal: 'Compost or green waste collection',
      impact: 'Reduces methane emissions'
    },
    {
      title: 'Plastic Waste',
      items: ['Bottles', 'Bags', 'Packaging', 'Microplastics'],
      disposal: 'Separate by type and recycle',
      impact: 'Prevents ocean pollution'
    },
    {
      title: 'Metal & Glass',
      items: ['Aluminum cans', 'Steel cans', 'Glass bottles', 'Glass jars'],
      disposal: 'Place in recycling bin',
      impact: 'Infinitely recyclable materials'
    },
    {
      title: 'Electronic Waste',
      items: ['Old phones', 'Computers', 'Batteries', 'E-waste'],
      disposal: 'Take to e-waste collection centers',
      impact: 'Prevents toxic leaching'
    }
  ];

  const tips = [
    {
      category: 'Reduce',
      icon: <TrendingDown className="text-red-500" size={24} />,
      tips: [
        'Avoid single-use plastics',
        'Buy only what you need',
        'Choose products with minimal packaging',
        'Repair items instead of replacing'
      ]
    },
    {
      category: 'Reuse',
      icon: <Recycle className="text-blue-500" size={24} />,
      tips: [
        'Use reusable bags and containers',
        'Donate clothes and furniture',
        'Refill water bottles and containers',
        'Share or swap items with others'
      ]
    },
    {
      category: 'Recycle',
      icon: <Recycle className="text-green-500" size={24} />,
      tips: [
        'Separate recyclables properly',
        'Clean containers before recycling',
        'Check local recycling guidelines',
        'Compost organic materials'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-green-600" size={40} />
              <h1 className="text-4xl font-bold text-gray-900">Environmental Awareness</h1>
            </div>
            <p className="text-lg text-gray-600">
              Learn about waste, pollution, and how your actions make a difference in protecting our planet
            </p>
          </div>

          {/* Impact Statistics */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Impact Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {impactStats.map((stat, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-6 ${stat.color}`}
                >
                  <div className="mb-3">{stat.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{stat.stat}</p>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3Rs Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The 3Rs of Sustainability</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tips.map((section, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {section.icon}
                    <h3 className="text-xl font-bold text-gray-900">{section.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Waste Sorting Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Waste Sorting & Disposal Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wasteCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Common Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3 pb-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-700">How to Dispose:</p>
                    <p className="text-gray-600">{category.disposal}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700">Environmental Impact:</p>
                    <p className="text-green-600 font-medium">{category.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Educational Facts */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Did You Know?</h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">🌍 Climate & Pollution</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Waste in landfills produces methane, a greenhouse gas 25x more potent than CO2</li>
                    <li>• Plastic takes 400-1000 years to decompose</li>
                    <li>• Manufacturing new products uses 5-10x more energy than recycling</li>
                    <li>• Every ton of recycled paper saves 17 trees and 7,000 gallons of water</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">♻️ Recycling Benefits</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Recycling creates 5 jobs for every 1 job in landfills</li>
                    <li>• A single aluminum can is recycled and back on shelves in 60 days</li>
                    <li>• Recycling one aluminum can saves enough energy to power a laptop for 3 hours</li>
                    <li>• Glass can be recycled infinitely without losing quality</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Action Matters</h2>
            <p className="text-gray-600 mb-6">
              Every piece of waste you report and every proper disposal makes a difference. 
              Join our community of environmental champions and help build a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/report"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                Report Rubbish
              </a>
              <a
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                View Your Impact
              </a>
            </div>
          </section>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>
              Together, we can reduce waste, protect our environment, and create a sustainable planet for future generations.
            </p>
            <p className="mt-2">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awareness;
