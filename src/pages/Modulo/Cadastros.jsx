import React, { useEffect } from 'react';
import { useAppBar } from "@/contexts/AppBarContext";

const Cadastros = () => {
  const { setTitle } = useAppBar();

  useEffect(() => {
      setTitle("");
    }, []);

  return (
    <div >
      <h3>Bem vindo ao módulo cadastros!</h3>
    </div>
  );
};

export default Cadastros;
