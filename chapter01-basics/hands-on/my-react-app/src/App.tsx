import WelcomeMessage from "./components/WelcomeMessage";
import UserProfile from "./components/UserProfile";

function App() {

  return (
    <div>
      <WelcomeMessage />

      {/* UserProfileコンポーネントを2回再利用 */}
      <UserProfile />
      <UserProfile />
    </div>
  );
}

export default App;
