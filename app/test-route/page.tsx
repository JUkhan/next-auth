
import { auth } from '@/auth';
import WhoAmIServerAction from './WhoAmIServerAction';
import Whoami from './Whoami';
import WhoamiRSC from './WhoamiRSC';

async function getUser() {
        "use server"
        const user = await auth();
        return user?.user?.name?? null;
    }

const TestRoute = async () => {
    const session = await auth();
  return (
    <div>
      <h1>Test Route</h1>
      <p>This is a test route component. user: {session?.user?.name}</p>
      <WhoAmIServerAction getUser={getUser} />
      <Whoami />
      <WhoamiRSC />
    </div>
  );
};

export default TestRoute;
