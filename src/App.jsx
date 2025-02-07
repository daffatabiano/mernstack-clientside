import { useRoutes } from 'react-router-dom';
import { routeLists } from './routes/routeLists';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { useEffect } from 'react';
import { clearNotification } from './redux/reducers/notificationReducers';
import { loadingAnimation } from './assets';

function App() {
  const dispatch = useDispatch();
  const { visible, message, type, description } = useSelector(
    (state) => state?.notification
  );
  const load = useSelector((state) => console.log(state.loading));

  useEffect(() => {
    if (visible)
      notification[type]({
        message,
        description,
        onClose: () => dispatch(clearNotification()),
      });
  }, [visible]);

  // useEffect(() => {
  //   if (loading) {
  //     return (
  //       <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-800/50 z-[100]">
  //         <img src={loadingAnimation} alt="loading-animation" />
  //       </div>
  //     );
  //   }
  // }, [loading]);

  const elements = useRoutes(routeLists);

  return elements;
}

export default App;
