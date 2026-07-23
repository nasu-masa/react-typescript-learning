import WelcomeMessage from "./components/WelcomeMessage";
import UserProfile from "./components/UserProfile";
import Card from "./components/Card";

function App() {

  return (
    <div>
      <WelcomeMessage />

      {/* UserProfileコンポーネントを2回再利用 */}
      <Card>
        <UserProfile name="山田太郎" hobby="プログラミング" bio="私はReactを学習しています。" />
        <UserProfile name="山田花子" hobby="ボルダリング" />
      </Card>
    </div>
  );
}

export default App;
