import React, { useEffect, useState } from 'react';
import { Input } from "../components/Input/Input.jsx";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IntroductoryPanelImage from "../assets/imgs/img-introductory-panel.jpg";
import IconImage1 from "../assets/imgs/icon-main-1.png";
import IconImage2 from "../assets/imgs/icon-main-2.png";
import NextPaymentStartsLogo from "../assets/imgs/next-payment-starts.svg";
import Button from "../components/Button/Button.jsx";
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as Yup from 'yup';

export const Home = () => {
  const [file, setFile] = useState(null);
  const [imgs, setImgs] = useState();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    companyDocument: '',
    proposalValue: '',
    unitName: '',
    imageUrl: ''
  });

  const schema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    email: Yup.string().email('Por favor, insira um email válido').required('O campo email é obrigatório'),
    password: Yup.string().min(8, 'A senha deve ter pelo menos 8 caracteres').required('O campo senha é obrigatório'),
    companyName: Yup.string().required('O campo nome da empresa é obrigatório'),
    companyDocument: Yup.string().matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, 'CNPJ inválido').required('O campo CNPJ é obrigatório'),
    proposalValue: Yup.number().typeError('O valor da proposta deve ser um número')
      .positive('O valor da proposta deve ser positivo')
      .required('O campo valor da proposta é obrigatório')
  });

  const [isLoading, setIsLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: base64String
      }));
      setImgs(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const validateData = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = err.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setErrors(newErrors);
      return false;
    }
  };

  const handlePasswordGenerate = () => {
    const newPassword = Math.random().toString(36).slice(-10); // Generates a random 10-character password
    setFormData({ ...formData, password: newPassword });
    toast.info('Senha gerada automaticamente');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateData();
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    const dataToSend = {
      ...formData,
      proposalValue: Number(formData.proposalValue), // Ensure this is a number
      imageUrl: formData.imageUrl // Include the base64 string in the submission
    };

    try {
      const response = await fetch('https://back-next-payment.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
        console.log("🚀 ~ handleSubmit ~ dataToSend:", dataToSend)

      // Check for 413 Payload Too Large error
      if (response.status === 413) {
        toast.error('Erro: O arquivo de imagem é muito grande. Tente uma imagem menor.');
        setIsLoading(false);
        return;
      }

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
          unitName: '',
          imageUrl: ''
        });
        setFile(null);
        setImgs(null);
      } else {
        toast.error(`Erro: ${data.message}`);
      }
    } catch (err) {
      if (err.name === 'TypeError') {
        toast.error('Ocorreu um erro ao se conectar com a API. Verifique sua conexão de internet.');
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const removeErrorOnChange = () => {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        for (const key in formData) {
          if (formData[key] !== '') {
            delete updatedErrors[key];
          }
        }
        return updatedErrors;
      });
    };
  
    removeErrorOnChange();
  }, [formData]);

  return (
    <div className="bg-dark-violet-background mx-0 overflow-hidden">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col md:grid md:grid-cols-[2fr_2fr] h-screen font-poppins"> 
        <img
          src={NextPaymentStartsLogo}
          alt="Logo Next Payment"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-md:hidden"
        />
        <div className="max-md:hidden relative bg-dark-violet-background h-full w-full max-h-full">
          <img className="min-h-full w-full xl object-cover rounded-tr-3xl rounded-br-3xl" src={IntroductoryPanelImage} alt="Introductory Panel"/>
          <div className="absolute inset-0 flex flex-col justify-start mt-40 items-center z-10 gap-10">
            <div className="flex items-center mb-4 gap-5">
              <img className="md:size-14 size-20" src={IconImage1} alt="Ícone" />
              <div className="flex flex-col">
                <span className="text-stormy-blue md:text-sm xl:text-3xl">Cadastre-se</span>
                <p className="text-stormy-blue-soft md:text-sm xl:text-2xl">Sem filas e com mais <span className="underline">praticidade</span></p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex flex-col">
                <span className="text-stormy-blue md:text-sm xl:text-3xl">Tenha mais controle</span>
                <p className="text-stormy-blue-soft md:text-sm xl:text-2xl">Lorem ipsum dolor sit amet</p>
              </div>
              <img className="size-20" src={IconImage2} alt="Ícone" />
            </div>
          </div>
        </div>
        <div className="bg-dark-violet-background flex justify-center items-center w-full h-full px-5 md:px-20 overflow-y-auto">
          <div className="flex flex-col items-center justify-center w-full max-w-xl">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-5 pt-5">
                <h1 className="md:text-3xl sm:text-3xl xxs:text-sm text-blue-light-text text-4xl">Cadastre-se</h1>
                <p className="md:text-xl sm:text-xl xxs:text-xs text-blue-light-text text-2xl flex gap-1">Já possui uma conta?
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
              ) : (
                <div className='w-full'>
                  <Input color="bg-card" name="name" size="large" label="Nome" type='text' placeholder="Digite seu nome" value={formData.name} onChange={handleChange} />
                  {errors.name && <p className="text-red-pastel text-md -mt-5">{errors.name}</p>}
                  <Input name="email" color="bg-card" size="large" label="E-mail" type='text' placeholder="Digite seu e-mail" value={formData.email} onChange={handleChange} />
                  {errors.email && <p className="text-red-pastel text-md -mt-5">{errors.email}</p>}
                  <Input name="companyName" color="bg-card" size="large" label="Nome da empresa" type='text' placeholder="Nome da empresa" value={formData.companyName} onChange={handleChange} />
                  {errors.companyName && <p className="text-red-pastel text-md -mt-5">{errors.companyName}</p>}
                  <Input name="companyDocument" color="bg-card" size="large" label="CNPJ(Exemplo: XX.XXX.XXX/XXXX-XX)" type='text' placeholder="Digite o CNPJ (Exemplo: XX.XXX.XXX/XXXX-XX)" value={formData.companyDocument} onChange={handleChange} />
                  {errors.companyDocument && <p className="text-red-pastel text-md -mt-5">{errors.companyDocument}</p>}
                  <div className="flex items-center">
                    <Input name="password" color="bg-card" size="large" label="Senha" type='password' placeholder="Digite sua senha" value={formData.password} onChange={handleChange} />
                    <Button onClick={handlePasswordGenerate} type="button" color='bg-blue-normal-light' text='text-white' rounded='rounded-lg' size='small'>Gerar Senha</Button>
                  </div>
                  {errors.password && <p className="text-red-pastel text-md -mt-5">{errors.password}</p>}
                  <Input name="proposalValue" size="large" color="bg-card" label="Valor da proposta" placeholder="Valor da proposta" value={formData.proposalValue} onChange={handleChange} />
                  {errors.proposalValue && <p className="text-red-pastel text-md -mt-5">{errors.proposalValue}</p>}
                  <Input name="unitName" color="bg-card" size="large" label="Unidade" placeholder="Digite a unidade" value={formData.unitName} onChange={handleChange} />
                  <Input name="imageAdd" size='large' type="file" label="Adicione uma imagem" onChange={handleFileChange}/>  
                  {file && <p className='mt-2 text-blue-normal text-sm'>Arquivo selecionado: <span className='font-semibold'>
                  {`${file.name.length > 15 ? file.name.substring(0,12) + '...' : file.name}`} </span>
                  <span className='text-gray-500'>({file.name.split('.').pop()})</span>
                  </p>}  
                </div>
              )}
              <div className="flex gap-4 justify-end mt-2 pb-5">
                <Button text='text-blue-light-text' color='bg-blue-normal-light' rounded='rounded-lg' size='large'>Cancelar</Button>
                <Button type="submit" color='bg-primary' text='text-blue-light-text' rounded='rounded-lg' size='large'>Cadastrar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
