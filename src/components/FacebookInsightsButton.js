"use client"
import React, { useState } from 'react';
import axios from 'axios';

const FacebookInsightsButton = ({ pageId, accessToken }) => {
  const [insights, setInsights] = useState(null);

  const fetchPageInsights = async () => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v13.0/${pageId}/insights?access_token=${accessToken}&metric=page_fan_adds_by_location_unique,page_impressions,page_impressions_unique`
      );
      setInsights(response.data.data);
    } catch (error) {
      console.error('Error fetching Facebook Page insights:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchPageInsights}>Fetch Page Insights</button>
      {insights && (
        <div>
          <h2>Page Insights</h2>
          <ul>
            {insights.map((insight) => (
              <li key={insight.name}>
                <h3>{insight.name}</h3>
                <p>{insight.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FacebookInsightsButton;
