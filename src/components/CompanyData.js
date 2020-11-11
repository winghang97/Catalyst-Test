import React, { useState, useEffect } from "react";

function CompanyData() {
  const [comp, setComp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/orgs/catalyst")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        console.log(data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>
      <div key=
  </div>;
}

export default CompanyData;
