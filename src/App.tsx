import '@woong-new/ui/design-system.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/main';
import PlaygroundPage from './pages/playground';
import QueryClientProvider from '@shared/providers/QueryClientProvider';

function App() {
  return (
    <QueryClientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
