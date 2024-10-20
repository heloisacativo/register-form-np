import { Input } from "../components/Input/Input.jsx"
import IntroductoryPanelImage from "../assets/imgs/img-introductory-panel.jpg"
import IconImage1 from "../assets/imgs/icon-main-1.png"
import IconImage2 from "../assets/imgs/icon-main-2.png"

export const Home = () => {
    return (
        <div className=" bg-dark-violet-background mx-0 flex-wrap grid grid-cols-[1fr_3fr] overflow-hidden">
          <div className="bg-dark-violet-background h-screen overflow-hidden bg-blue-500 max-w-sm max-h-full">
          <div className="absolute flex flex-col w-96 justify-center items-center mt-20">
           <div className="flex items-center">
            <img className="size-20" src={IconImage1} alt="Ícone"/>
            <div className="flex flex-col">
            <span className="">Facilite suas vendas</span>
            <p>Sem filas e com mais praticidade</p>
            </div>
           </div>
          <div className="flex items-center">
           <div className="flex flex-col">
           <span className="">Lorem ipsum dolor</span>
           <p>Sem filas e com mais praticidade</p>
           </div>
           <img className="size-20" src={IconImage2} alt="Ícone"/>
         </div>
        </div>
        <img className="w-full h-full xl object-cover" src={IntroductoryPanelImage}/>
        </div>

        <div className="bg-dark-violet-background h-screen">
          <div className="flex flex-col items-center mt-20">
           <form className="">
            <div className="flex flex-col">
             <h1 className="text-blue-light-text">Cadastre-se</h1>
             <p className="text-blue-light-text">Já possui uma conta?</p>
            </div>
             <Input label="Nome" placeholder="Digite seu nome"/>
             <Input label="E-mail" placeholder="Digite seu e-mail"/>
             <Input label="Nome da empresa" placeholder="Nome da empresa"/>
             <Input label="CNPJ" placeholder="Digite o CNPJ (Exemplo: XX.XXX.XXX/XXXX-XX"/>
             <div className="flex gap-5">
             <Input className="flex bg-dark-violet-background text-blue-normal border-blue-normal text-center border-b-2 border-t-2 border-r-2 border-l-2 px-1 py-3 outline-none placeholder:text-blue-normal-light placeholder:opacity-50 focus:border-stone-600 invalid:focus:border-red-400 valid:focus:border-green-400 rounded-md mb-5" label="Valor da proposta" placeholder="Valor da proposta"/>
             <Input type="select" options={[ {value: 'unidade 1', label: 'Unidade 1'}, {value: 'unidade 2', label: 'Unidade 2'}]}  className="flex bg-dark-violet-background text-blue-normal border-blue-normal text-center border-b-2 border-t-2 border-r-2 border-l-2 px-1 py-3 outline-none placeholder:text-blue-normal-light placeholder:opacity-50 focus:border-stone-600 invalid:focus:border-red-400 valid:focus:border-green-400 rounded-md mb-5" label="Unidade" placeholder="Digite o valor"/>
             </div>
           </form>
        </div>
        </div> 
        </div>
    )
}

export default Home;