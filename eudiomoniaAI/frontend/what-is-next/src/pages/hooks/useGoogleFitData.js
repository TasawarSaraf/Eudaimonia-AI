import { useState, useEffect } from 'react';

const useGoogleFitData = (accessToken) => {
  const [fitData, setFitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchGoogleFitData = async () => {
      // Dynamically set the time range to cover the last 24 hours
      const endTimeMillis = Date.now();
      const startTimeMillis = endTimeMillis - 86400000; // Subtract 24 hours in milliseconds

      try {
        // Exchange the authorization code for an access token
        console.log("ACCESS TOKEN: " + accessToken);
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            code: accessToken,
            client_id: '531821750138-ll6llkm5j4p99m4hjipe3tih7jqr1emi.apps.googleusercontent.com',
            client_secret: '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',
            redirect_uri: 'http://localhost:3000',
            grant_type: 'authorization_code'
          }).toString()
        });

        if (!response.ok) {
          throw new Error('Failed to exchange authorization code for access token: ' + response.statusText);
        }

        const tokenResponse = await response.json();
        const accessToken = tokenResponse.access_token;

        // Fetch Google Fit data using the obtained access token
        const fitResponse = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "aggregateBy": [{
              "dataTypeName": "com.google.step_count.delta",
            }],
            "bucketByTime": { "durationMillis": 86400000 },
            "startTimeMillis": startTimeMillis.toString(),
            "endTimeMillis": endTimeMillis.toString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`Google Fit API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setFitData(data); // Set the fetched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Google Fit data:', error); // More detailed error logging
        setError(error);
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchGoogleFitData();
    } else {
      setError(new Error('Access token is undefined.'));
      setLoading(false);
    }
  }, [accessToken]); // Re-fetch if accessToken changes

  return { fitData, loading, error };
};

export default useGoogleFitData;