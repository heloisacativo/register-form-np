import React, { useState } from 'react';
import { Input } from "../components/Input/Input.jsx";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IntroductoryPanelImage from "../assets/imgs/img-introductory-panel.jpg";
import IconImage1 from "../assets/imgs/icon-main-1.png";
import IconImage2 from "../assets/imgs/icon-main-2.png";
import Button from "../components/Button/Button.jsx";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


export const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    companyDocument: '',
    proposalValue: '',
    unitName: ''
  });

  const [isLoading, setIsLoading] = useState(false); // Estado para controle do carregamento

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateData = () => {
    const { name, email, password, companyDocument, proposalValue } = formData;

    if (!name || !email || !password || !companyDocument || !proposalValue) {
      toast.error('Por favor, preencha todos os campos obrigatórios.', {
    theme: 'dark'
});
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, insira um e-mail válido.', {
    theme: 'dark'
});
      return false;
    }

    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.', {
    theme: 'dark'
});
      return false;
    }

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    if (!cnpjRegex.test(companyDocument)) {
      toast.error('Por favor, insira um CNPJ válido (XX.XXX.XXX/XXXX-XX).', {
    theme: 'dark'
});
      return false;
    }

    if (isNaN(parseFloat(proposalValue))) {
      toast.error('Por favor, insira um valor de proposta válido.', {
    theme: 'dark'
});
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateData()) {
      return;
    }

    setIsLoading(true); // Iniciar o carregamento

    const dataToSend = {
      ...formData,
      proposalValue: parseFloat(formData.proposalValue)
    };

    try {
      const response = await fetch('https://back-next-payment.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Cadastro realizado com sucesso!');
        setFormData({
          name: '',
          email: '',
          password: '',
          companyName: '',
          companyDocument: '',
          proposalValue: '',
          unitName: ''
        });
      } else {
        toast.error(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      toast.error('Ocorreu um erro ao se conectar com a API.');
    } finally {
      setIsLoading(false); // Finalizar o carregamento
    }
  };

  return (
    <div className="bg-dark-violet-background mx-0 overflow-hidden">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-4 h-screen">
        <div className="max-md:hidden relative bg-dark-violet-background h-full w-full max-w-sm max-h-full">
          <img className="h-full w-full xl object-cover" src={IntroductoryPanelImage} alt="Introductory Panel" />
          <div className="absolute inset-0 flex flex-col justify-start mt-10 items-center z-10">
            <div className="flex items-center mb-4">
              <img className="md:size-14 size-20" src={IconImage1} alt="Ícone" />
              <div className="flex flex-col">
                <span className="text-stormy-blue md:text-sm">Facilite suas vendas</span>
                <p className="text-stormy-blue-soft md:text-sm">Sem filas e com mais praticidade</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-stormy-blue md:text-sm">Lorem ipsum dolor</span>
                <p className="text-stormy-blue-soft md:text-sm">Sem filas e com mais praticidade</p>
              </div>
              <img className="size-20" src={IconImage2} alt="Ícone" />
            </div>
          </div>
        </div>

        <div className="bg-dark-violet-background flex justify-center items-center w-full h-full px-5 md:px-20 overflow-y-auto">
          <div className="flex flex-col items-center justify-center w-full max-w-xl">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-5 pt-5">
                  <h1 className="md:text-3xl xxs:text-xl text-blue-light-text text-4xl">Cadastre-se</h1>
                  <p className="md:text-xl xxs:text-xs text-blue-light-text text-2xl flex gap-1">Já possui uma conta?
                    <Link to="/login" className="text-blue-dark-text underline">
                      Entre aqui
                    </Link>
                  </p>
                </div>
                {isLoading ? (
                <SkeletonTheme className="w-full" baseColor="#202020" highlightColor="#444">
                  <p>
                    <Skeleton className='p-2 my-6 w-80' count={5} />
                  </p>
                </SkeletonTheme>

                ):
                (<div className='w-full'><Input name="name" size="medium" label="Nome" placeholder="Digite seu nome" value={formData.name} onChange={handleChange} /><Input name="email" size="medium" label="E-mail" placeholder="Digite seu e-mail" value={formData.email} onChange={handleChange} /><Input name="password" size="medium" label="Senha" placeholder="Digite sua senha" value={formData.password} onChange={handleChange} /><Input name="companyName" size="medium" label="Nome da empresa" placeholder="Nome da empresa" value={formData.companyName} onChange={handleChange} /><Input name="companyDocument" size="medium" label="CNPJ" placeholder="Digite o CNPJ (Exemplo: XX.XXX.XXX/XXXX-XX)" value={formData.companyDocument} onChange={handleChange} /></div>)
                }
                   {isLoading ? (
                <SkeletonTheme className="w-full" baseColor="#202020" highlightColor="#444">
                  <p >
                    <Skeleton className='p-2 my-6' count={1} />
                    {/* <Skeleton className='p-2 my-6' count={1} /> */}
                  </p>
                </SkeletonTheme>

                ):
                (<div className="flex gap-6">
                  <Input name="proposalValue" size="large" label="Valor da proposta" placeholder="Valor da proposta" value={formData.proposalValue} onChange={handleChange} />
                  <Input name="unitName" size="large" type="select" options={[
                    { value: "", label: 'Selecione uma unidade' },
                    { value: 'unidade 1', label: 'Unidade 1' },
                    { value: 'unidade 2', label: 'Unidade 2' }
                  ]} label="Unidade" placeholder="Digite a unidade" value={formData.unitName} onChange={handleChange} />
                </div>)}
                <div className="flex gap-4 justify-end mt-2 pb-5">
                  <Button text='text-blue-light-text' color='bg-blue-normal-light' rounded='rounded-lg' size='large'>Cancelar</Button>
                  <Button type="submit" text='text-blue-light-text' rounded='rounded-lg' size='large'>Entrar</Button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
