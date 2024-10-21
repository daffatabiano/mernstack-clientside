import { useRoutes } from 'react-router-dom';
import { routeLists } from './routes/routeLists';

function App() {
  const elements = useRoutes(routeLists);

  return elements;
}

export default App;
