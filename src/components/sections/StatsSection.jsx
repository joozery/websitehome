import React from 'react';

const StatsSection = ({ properties, availableProperties }) => {
  const stats = [
    {
      value: properties.length,
      label: 'ทรัพย์ทั้งหมด',
      color: 'text-blue-600'
    },
    {
      value: availableProperties.length,
      label: 'ทรัพย์ว่าง',
      color: 'text-green-600'
    },
    {
      value: '15+',
      label: 'พื้นที่',
      color: 'text-purple-600'
    },
    {
      value: '4.8',
      label: 'คะแนนเฉลี่ย',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="w-full max-w-full mx-auto px-8 sm:px-12 lg:px-16">
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={stat.label}>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 