import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import logo from '../../assets/logo.svg';
import background from '../../assets/signUpBackground.svg';

export const NotFound = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/home', { replace: true });
        } else {
            navigate('/', { replace: true });
        }
    };

    return (
        <main className="flex flex-col max-w-389:justify-start justify-center items-center w-screen min-h-dvh text-zinc-50 bg-primary">
            <img
                className="absolute h-8 top-4 left-6 lg:top-8 lg:left-8"
                src={logo}
                alt="Ericsongs logo"
            />
            <div className="flex flex-col justify-center items-center p-6 gap-10 z-20">
                <h2 className="max-w-389:mt-20 text-[140px] leading-[150px] md:text-[160px] md:leading-[170px] lg:text-[200px] lg:leading-[210px] text-center">
                    404
                </h2>
                <h3 className="text-2xl leading-[40px] lg:text-4xl text-center">
                    Oops! The page you are looking for does not exist.
                </h3>
                <Button className="lg:max-w-96" onClick={handleRedirect}>
                    Go to Home
                </Button>
            </div>
            <div className="flex justify-center items-start z-10 max-w-389:fixed absolute bottom-24 w-full h-24 md:h-44 lg:h-60 lg:bottom-48 bg-gradient-signup"></div>
            <img
                className="z-0 fixed h-sm:absolute bottom-0 w-full min-h-36 max-h-56 object-cover md:max-h-64 lg:max-h-[340px] 2xl:max-h-[400px]"
                src={background}
                alt="Background"
            />
        </main>
    );
};
