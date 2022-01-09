import { useEffect } from 'react';

const Landing = () => {

  // redirect from old url to new url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user');
    if (userId) {
      window.location.href = `/user/${userId}`;
    }
  }, []);

  return (
    <div className="landing">
      <h1>Coinrocket App 🚀</h1>
    </div>
  );
};

export default Landing;
