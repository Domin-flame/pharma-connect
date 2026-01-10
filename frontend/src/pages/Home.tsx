import { useNavigate } from "react-router-dom"
import HeroSection from "../components/HeroSection"
import HowItWorks from "../components/HowItWorks"


const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <section id="acceuil">
                <HeroSection/>
            </section>
            
            <section id="fonctionnement">
                <HowItWorks/>
            </section>

            <section id="pharmacies">
                {/* section future*/}
            </section>
            
        </>
        
    )
}

export default Home