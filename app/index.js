import "./global.css"
import { useRootNavigationState, Redirect } from 'expo-router';

const App = () => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={'/login'} />
}

export default App;