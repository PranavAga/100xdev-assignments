import { useState, useEffect } from 'react';

const GitHubInfoCard = ({ username }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user data');
        }
      })
      .then(data => {
        console.log(data)
        setUserData(data);
      })
      .catch(error => {
        alert(error.message);
      });
  }, [username]);

  if(userData == null){
    return(
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <img src={userData.avatar_url} 
        style={{ width: 100, height: 100 }}
      />
      <h2>{userData.name}</h2>
      <p>{userData.bio}</p>
      <p>Followers: {userData.followers}</p>
      <p>Following: {userData.following}</p>
      <p>Public Repositories: {userData.public_repos}</p>
      <a href={userData.html_url}>Link to the page</a>
    </div>
  );
};

export default GitHubInfoCard;
