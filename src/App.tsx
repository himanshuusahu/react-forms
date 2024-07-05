import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FirstPage from './Pages/FirstPage.tsx';
import SecondPage from './Pages/SecondPage.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;