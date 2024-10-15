const handleCepChange = async (cep) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (!data.erro) {
      setAddress(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
    } else {
      alert('CEP não encontrado!');
    }
  };
  