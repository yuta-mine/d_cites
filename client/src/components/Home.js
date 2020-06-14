import React from 'react';
import elephants from '../image/elephants.jpg';
import puffins from '../image/puffins.jpg';
import tiger from '../image/tiger.jpg';
import turtle from '../image/turtle.jpg';

import './Home.css';

function Home(props) {
  return (
    <div className="home">
      <div>
        <ul className="image">
          <li className="image_list">
            <img src={elephants} alt="01" />
          </li>
          <li className="image_list">
            <img src={puffins} alt="02" />
          </li>
          <li className="image_list">
            <img src={tiger} alt="03" />
          </li>
          <li className="image_list">
            <img src={turtle} alt="04" />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Home;
