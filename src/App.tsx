import './scss/app.scss';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { UserInfo } from './pages/UserInfo';
import { HeaderLayout } from './layouts/HeaderLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route path="" element={<Home />} />
        <Route path="users/:id" element={<UserInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
