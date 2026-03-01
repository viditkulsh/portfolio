import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Trophy, Building, Users, Calendar } from 'lucide-react';

const StoryActivities = () => {
  const { portfolioData } = usePortfolio();

  const getTypeColor = (type) => {
    switch (type) {
      case 'organization':
        return 'from-blue-500 to-indigo-600';
      case 'competition':
        return 'from-yellow-500 to-orange-600';
      case 'academic':
        return 'from-green-500 to-teal-600';
      default:
        return 'from-primary-cyan to-primary-purple';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'organization':
        return Building;
      case 'competition':
        return Trophy;
      case 'academic':
        return Users;
      default:
        return Users;
    }
  };

  return (
    <motion.div
      className="story-activities min-h-screen py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-gradient mb-4">Co-curricular Activities</h2>
          <p className="text-xl text-primary-text/80">
            Beyond coding - community engagement and growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.activities.map((activity, index) => {
            const IconComponent = getTypeIcon(activity.type);
            return (
              <motion.div
                key={activity.id}
                className="card hover:card-neon transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(activity.type)} rounded-full flex items-center justify-center`}>
                    <IconComponent size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text">
                      {activity.title}
                    </h3>
                    <p className="text-primary-text/70 text-sm">{activity.event}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary-text/70 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{activity.date}</span>
                </div>

                <p className="text-primary-text/80 text-sm mb-4">
                  {activity.description}
                </p>

              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default StoryActivities;
