import React from 'react';

export default function Post() {
  return (
    <>
      <div className="post">
        <div className="image">
          <img
            src="https://techcrunch.com/wp-content/uploads/2022/12/lawnmower-Large.jpeg"
            alt="image"
          />
        </div>
        <div className="texts">
          <h2>
            EcoFlow teases full-house battery backup coming later this year
          </h2>
          <p className="info">
            <a className="author">Atharva Pandharikar</a>
            <time > 2023-01-06 16:45</time>
          </p>
          <p className="summary">
            Today at its special launch event, home backup power giant EcoFlow
            launched a flurry of new products, including a “Whole-Home Backup
            Power Solution.”
          </p>
        </div>
      </div>
    </>
  );
}
