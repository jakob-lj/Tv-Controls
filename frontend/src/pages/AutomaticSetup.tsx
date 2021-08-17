import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { easySetup } from "../setup/easy";

const AutomaticSetup: React.FC = () => {
  const easyPassword = useQuery("easypassword");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (easyPassword !== null) {
      localStorage.clear();
      easySetup(easyPassword).then((r) => {
        setLoading(false);
      });
    } else {
      setError(true);
    }
  }, []);

  if (error) {
    return <div>Kunne ikke sette opp automatisk</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Redirect to={"/"} />;
};

export default AutomaticSetup;
