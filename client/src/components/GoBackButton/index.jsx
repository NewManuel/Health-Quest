import { useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";

const GoBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button variant="outlined" onClick={goBack}>
      &larr; Go Back
    </Button>
  );
};

export default GoBackButton;
