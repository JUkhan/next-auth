"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Whoami() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/whoami');
      const data = await response.json();
      setUsername(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : username ? (
        <p>You are: {username}</p>
      ) : (
        <p>Not logged in</p>
      )}
      <Button onClick={fetchUser} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh'}
      </Button>
    </div>
  );
}
