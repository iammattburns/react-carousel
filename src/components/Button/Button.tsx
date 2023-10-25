import React from "react";
import styled from "styled-components";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  const StyledButtton = styled.button`
    background-color: #e74079;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 1.15rem;
    &:hover {
      background-color: #dc3f73;
      cursor: pointer;
    }
  `;
  return <StyledButtton onClick={onClick}>{label}</StyledButtton>;
};

export default Button;
