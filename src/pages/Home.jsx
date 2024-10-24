import { Input } from "../components/Input/Input.jsx"
import { Link } from 'react-router-dom'
import IntroductoryPanelImage from "../assets/imgs/img-introductory-panel.jpg"
import IconImage1 from "../assets/imgs/icon-main-1.png"
import IconImage2 from "../assets/imgs/icon-main-2.png"
import Button from "../components/Button/Button.jsx"

export const Home = () => {
    return (
      <div className="bg-dark-violet-background mx-0 overflow-hidden">
       <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-4">
          <div className="relative bg-dark-violet-background h-full w-full max-w-sm max-h-full">
          <img className="h-full w-full xl object-cover" src={IntroductoryPanelImage}/>
          <div className="absolute inset-0 flex flex-col justify-start mt-10 items-center z-10">
           <div className="flex items-center mb-4">
            <img className="md:size-14 size-20" src={IconImage1} alt="Ícone"/>
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
           <img className="size-20" src={IconImage2} alt="Ícone"/>
         </div>
        </div>
        </div>     

        <div className="bg-dark-violet-background flex justify-center items-center w-full px-5 md:px-20">
          <div className="flex flex-col items-center justify-center w-full max-w-xl">
           <form>
            <div className="flex flex-col mb-5 pt-5">
              <h1 className="md:text-3xl xxs:text-xl text-blue-light-text text-4xl">Cadastre-se</h1>
              <p className="md:text-xl xxs:text-xs text-blue-light-text text-2xl flex gap-1">Já possui uma conta?
              <Link to="/login" className="text-blue-dark-text underline">
              Entre aqui
              </Link>
              </p>             
            </div>
             <Input size="medium" label="Nome" placeholder="Digite seu nome"/>
             <Input size="medium" label="E-mail" placeholder="Digite seu e-mail"/>
             <Input size="medium" label="Nome da empresa" placeholder="Nome da empresa"/>
             <Input size="medium" label="CNPJ" placeholder="Digite o CNPJ (Exemplo: XX.XXX.XXX/XXXX-XX"/>
             <div className="flex gap-6">
             <Input size="large" label="Valor da proposta" placeholder="Valor da proposta"/>
             <Input size="large" type="select" options={[ {value: "", label: 'Selecione uma unidade'}, {value: 'unidade 1', label: 'Unidade 1'}, {value: 'unidade 2', label: 'Unidade 2'}]} label="Unidade" placeholder="Digite a unidade"/>
             </div>
             <div className="flex gap-4 justify-end mt-2 pb-5">
             <Button text='text-blue-light-text' color = 'bg-blue-normal-light' rounded='rounded-lg' size='large'>Cancelar</Button>
             <Button text='text-blue-light-text' rounded='rounded-lg' size='large'>Entrar</Button>
             </div>
           </form>
        </div>
        </div> 
        </div>
        </div>
    )
}

export default Home;