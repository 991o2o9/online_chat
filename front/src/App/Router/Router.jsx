import { createBrowserRouter } from 'react-router-dom';
import { path } from '../../Utils/Constants/Constants';
import { ChatPage } from '../../Pages/ChatPage/ChatPage';
import { HomePage } from '../../Pages/HomePage/HomePage';

export const Router = createBrowserRouter(
  [
    {
      children: [
        {
          path: path.home,
          element: <HomePage />,
        },
        {
          path: path.chat,
          element: <ChatPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
