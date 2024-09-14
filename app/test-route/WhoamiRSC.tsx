import { headers } from 'next/headers';

export default async function WhoamiRSC() {
  const {user} = await fetch('http://localhost:3000/api/whoami', {method:'GET', headers:headers()}).then(res => res.json());

  return (
    <div className="flex flex-col items-center gap-4">
      {user ? (
        <p>You are RSC: {user}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
