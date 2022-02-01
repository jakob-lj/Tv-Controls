import React from "react";
const MacHomePage: React.FC = () => {
  const date = new Date();

  return (
    <div>
      Berits TV Tid: {date.toString()}
      <div>
        <h1>Trykk på en av kanalene for å se på TV.</h1>
        <h2>Dagens visdomsord: Det er aldri for sent å lære seg TV-en.</h2>
      </div>
    </div>
  );
};

export default MacHomePage;
