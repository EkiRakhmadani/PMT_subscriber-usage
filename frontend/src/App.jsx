import { useState, useEffect } from 'react';
import { getSubscribers, getUsages } from './api';
import UsageForm from './components/UsageForm';
import UsageTable from './components/UsageTable';
import SubscriberForm from './components/SubscriberForm';


function App() {
  const [subscribers, setSubscribers] = useState([]);
  const [usages, setUsages] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [subscriberRefresh, setSubscriberRefresh] = useState(0);


  useEffect(() => {
    getSubscribers()
      .then((data) => setSubscribers(data))
      .catch((err) => setError(err.message));
  }, [subscriberRefresh]);

  useEffect(() => {
    getUsages(filter)
      .then((data) => {
        setUsages(data);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filter, refresh]);

  function handleFilterChange(e) {
    setLoading(true);
    setFilter(e.target.value);
  }

  function handleCreated() {
    setRefresh(refresh + 1);
  }

  function handleSubscriberCreated() {
    setSubscriberRefresh(subscriberRefresh + 1);
  }


  return (
    <div className="container">
      <header>
        <h1>Subscriber Usage</h1>
        <p>Record and view subscriber call, SMS and data usage.</p>
      </header>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        <div className="side">
          <SubscriberForm onCreated={handleSubscriberCreated} />
          <UsageForm subscribers={subscribers} onCreated={handleCreated} />
        </div>
        <UsageTable
          usages={usages}
          subscribers={subscribers}
          filter={filter}
          onFilterChange={handleFilterChange}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default App
