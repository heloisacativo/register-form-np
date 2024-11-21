import 'react-toastify/dist/ReactToastify.css';
import IntroductoryPanelImage from "../assets/imgs/img-introductory-panel.jpg";
import IconImage1 from "../assets/imgs/icon-main-1.png";
import IconImage2 from "../assets/imgs/icon-main-2.png";
import 'react-loading-skeleton/dist/skeleton.css';
import FormRegister from '../components/FormRegister/FormRegister.jsx';

export const Home = () => {
  return (
      <div className="flex flex-col md:grid md:grid-cols-[2fr_2fr] h-screen font-poppins"> 
          <div className="bg-background max-md:hidden relative h-screen w-full overflow-hidden">
          <img className="w-full h-full opacity-20" src={IntroductoryPanelImage} alt="Introductory Panel"/>
          <div className="absolute inset-0 flex flex-col justify-start mt-40 items-center z-10 gap-10">
            <div className="flex items-center mb-4 gap-5">
              <img className="md:size-14 size-20" src={IconImage1} alt="Ícone" />
              <div className="flex flex-col">
                <span className="text-muted-foreground md:text-sm xl:text-3xl">Cadastre-se</span>
                <p className="text-muted-foreground md:text-sm xl:text-2xl">Sem filas e com mais <span className="underline text-primary-chart">praticidade</span></p>
              </div>
            </div>
            <div className="flex items-center px-12E gap-5">
              <div className="flex flex-col">
                <span className="text-muted-foreground md:text-sm xl:text-3xl">Tenha mais controle</span>
                <p className="text-muted-foreground md:text-sm xl:text-2xl">Gerencie tudo facilmente em um único lugar.</p>
              </div>
              <img className="size-20" src={IconImage2} alt="Ícone" />
            </div>
          </div>
        </div>
        <FormRegister />
      </div>
  );
};

export default Home;
