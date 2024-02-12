import React, { useState } from 'react';

function showValue(number){
    const ink=number/1000
    return ink<1?number:ink+'k'
}
const Profile = ({ useID }) => {
    const [dp,setDp]=useState("./src/assets/cat.jpg")
    const [followers,setFollowers]=useState(1000);
    const [likes,setLikes]=useState(100000);
    const [pics,setPics]=useState(1);


  return (
    <div>
        <table>
            <tr>
                <div>
                    <img src={dp} alt="Profile" width="200px" height=" 200px"></img>
                </div>
            </tr>
            <tr>
                <div>
                    <h2>Mr. Kitty</h2>
                    <sub>in your walls</sub>
                    <p>{showValue(followers)} Followers &nbsp;&nbsp; {showValue(likes)} Likes &nbsp;&nbsp; {showValue(pics)} Photos</p>
                </div>
            </tr>
        </table>
    </div>
  );
}

export default Profile;