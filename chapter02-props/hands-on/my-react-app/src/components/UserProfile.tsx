

type UserProfileProps = {
  name: string;
  hobby: string;
  bio?: string;
}

function UserProfile({name, hobby, bio}:UserProfileProps ){
  return (
    <div>
      <p>名前: {name}</p>
      <p>趣味: {hobby}</p>
      {bio && <p>自己紹介: {bio}</p>}
      <hr />
    </div>
  );
}

export default UserProfile;
