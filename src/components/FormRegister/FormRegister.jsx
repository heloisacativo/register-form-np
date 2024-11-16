import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextPaymentStartsLogo from "../../assets/imgs/next-payment-starts.svg";
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as Yup from 'yup';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import { ChatBubbleOvalLeftIcon, TvIcon } from '@heroicons/react/16/solid';
import { CogIcon } from '@heroicons/vue/24/outline';

const FormRegister = () => {

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
    
    return(

        <div className="bg-background mx-0 overflow-hidden">
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

        <div className="bg-background flex justify-center items-center w-full h-screen px-5 md:px-20">
        <div className="flex flex-col items-center justify-center w-full max-w-xl mt-10">  
            <form onSubmit={handleSubmit} className="h-screen xxs:overflow-auto">
              <div className="flex flex-col mb-5 pt-5">
              <img
               src={NextPaymentStartsLogo}
               alt="Logo Next Payment"
               className="w-16 flex mb-5 z-10"
              />
                <h1 className="md:text-3xl sm:text-3xl xxs:text-lg text-muted-foreground text-4xl">Cadastre-se</h1>
              </div>
              {isLoading ? (
                <SkeletonTheme className="w-full" baseColor="#202020" highlightColor="#444">
                  <p>
                    <Skeleton className='p-2 my-6 w-80' count={5} />
                  </p>
                </SkeletonTheme>
              ) : (
                <div className='w-full'>
                  <Input
                  name="name"
                  size="large"
                  label="Nome"
                  type='text'
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  />
                  {errors.name && <p className="text-destructive text-md -mt-5">{errors.name}</p>}
                  <Input
                  name="email"
                  size="large"
                  label="E-mail"
                  type='text'
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  />
                  {errors.email && <p className="text-destructive text-md -mt-5">{errors.email}</p>}

                 
                  <div className="flex gap-3 justify-between">
                  <div className="flex-1">
                   <Input
                  name="companyName"
                  size="large"
                  label="Nome da empresa"
                  type='text'
                  placeholder="Nome da empresa"
                  value={formData.companyName}
                  onChange={handleChange}
                  />
                  {errors.companyName && <p className="text-destructive text-xs -mt-5">{errors.companyName}</p>}
                  </div>
                  <div className="flex-1">
                   <Input name="companyDocument"
                  size="large"
                  label="CNPJ"
                  type='text'
                  placeholder="Digite o CNPJ"
                  value={formData.companyDocument}
                  onChange={handleChange}
                  />
                  {errors.companyDocument && <p className="text-destructive text-xs -mt-5">{errors.companyDocument}</p>}
                  </div>
                   </div>
                  <div className="flex gap-3 justify-between">
                  <div className="flex-1">
                  <Input
                  name="proposalValue"
                  size="large"
                  label="Valor da proposta"
                  placeholder="Valor da proposta"
                  value={formData.proposalValue}
                  onChange={handleChange} />
                  {errors.proposalValue && <p className="text-destructive text-md -mt-5">{errors.proposalValue}</p>}
                  </div>
                  <div className="flex-1">
                  <Input
                  name="unitName"
                  size="large"
                  label="Unidade"
                  placeholder="Digite a unidade"
                  value={formData.unitName}
                  onChange={handleChange} />
                  </div>
                   </div>              
                  <Input
                  name="imageAdd"
                  type="file"
                  label="Adicione uma imagem"
                  onChange={handleFileChange}/>  
                  {file && <p className='mt-2 text-muted-foreground text-sm'>Arquivo selecionado: <span className='font-semibold'>
                  {`${file.name.length > 15 ? file.name.substring(0,12) + '...' : file.name}`} </span>
                  <span className='text-gray-500'>({file.name.split('.').pop()})</span>
                  </p>}
                  <Input
                  name="password"
                  size="large"
                  label="Senha"
                  type='password'
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  />
                  {errors.password && <p className="text-destructive text-md -mt-5">{errors.password}</p>}  
                </div>
              )}
              <div className="flex flex-wrap gap-3 justify-end mt-5 pb-5">
              <Button
              type="button" 
              color="bg-muted"
              rounded="rounded-lg"
              size="medium"
              text="text-muted-foreground"
              onClick={() => window.open('https://wa.me/5592984788147?text=Olá, preciso de ajuda com o cadastro.', '_blank')} // Ao clicar no botão, abre o WhatsApp
              >
            <div className="flex items-center">
            <ChatBubbleOvalLeftIcon className="mr-2 w-5" />
             Preciso de ajuda
            </div>
            </Button>
                <Button type="submit" color='bg-primary-chart' text='text-muted-foreground' rounded='rounded-lg' size='medium'>Cadastrar</Button>
              </div>
            </form>

          </div>

        </div>
        </div>
    )
}

export default FormRegister;