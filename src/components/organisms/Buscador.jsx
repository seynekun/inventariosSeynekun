import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

export function Buscador({
  value: initialValue = "",
  onChange,
  debounce = 300,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange?.(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <Container>
      <article className="content">
        <FaSearch className="icono" />

        <input
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </article>
    </Container>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.bg};

  border-radius: 10px;

  height: 55px;

  display: flex;

  border: 1px solid #d8d8d8;

  transition: 0.2s;

  &:focus-within {
    border-color: #3b82f6;

    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
  }

  .content {
    padding: 0 16px;

    display: flex;

    align-items: center;

    gap: 12px;

    width: 100%;
  }

  .icono {
    font-size: 16px;

    opacity: 0.6;
  }

  input {
    flex: 1;

    border: none;

    outline: none;

    background: none;

    font-size: 15px;

    color: ${({ theme }) => theme.text};

    &::placeholder {
      opacity: 0.5;
    }
  }
`;
