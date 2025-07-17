import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen'>
      <motion.div 
        className="min-h-screen font-[outfit] flex flex-col items-center justify-center sm:px-8 text-center central-glow"
        initial={{opacity:0.2, y:100}}
        transition={{duration: 1}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}}
      >
        <h1 className="lg:max-w-[90%] sm:mx-auto text-4xl sm:text-5xl md:text-7xl font-bold mt-6 text-[#1F2937] tracking-tight"> Find Your Next Dream Job Anywhere🧑🏻‍💻</h1>
        <p className="lg:max-w-[70%] mt-4 sm:mt-6 text-lg lg:text-3xl text-gray-600 text-balance">Discover thousands of job listings tailored to your skills, location, and experience. Start your career journey with smarter job matching.</p>
        <button onClick={() => navigate('/dashboard')} className="cursor-pointer bg-[#171923] text-white font-semibold text-[15px] px-[24px] py-[10px] rounded-[12px] mt-8 active:scale-95 transition-transform duration-150">Get started for free</button>
      </motion.div>
    </div>
  )
}

export default HomePage