"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function WhoAmIServerAction({getUser}: {getUser: () => Promise<string | null>}) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    getUser().then(setUsername);
  }, [getUser]);

  return (
    <div className="flex flex-col items-center gap-4">
      {username && <p>You are: {username}</p>}
    </div>
  );
}
