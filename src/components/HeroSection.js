import masjidImage from '../img/masjid3.jpg'
const HeroSection = () => {
    return (
       <div className="flex items-center justify-center mt-5 w-full">
      <div className="relative w-[38rem] h-[19rem] bg-cover bg-center" style={{ backgroundImage: `url(${masjidImage})` }}>
        
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      </div>

    );
  };
  
  export default HeroSection;