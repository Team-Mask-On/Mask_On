import './App.css';
import KakaoMap from './Components/KakaoMap';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import "animate.css/animate.css";

function App() {
  const apiURL = process.env.REACT_APP_API_URL + '/api';
  const refreshTerm = process.env.REACT_APP_REFRESH_TERM;
  return (
    <div style={{height: "100%"}}>
      <ReactNotification />
      <KakaoMap 
        apiURL={apiURL} 
        refreshTerm={refreshTerm}
      ></KakaoMap>
    </div>
  )
}

export default App;
