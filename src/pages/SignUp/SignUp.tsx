import { Form } from '../../components/Form/Form';
import logo from '../../assets/logo.svg';
import background from '../../assets/signUpBackground.svg';

export const SignUp = () => {
    return (
        <main className="flex flex-col justify-center min-[390px]:justify-start lg:justify-center gap-4 2xl:gap-6 p-6 items-center w-screen min-h-dvh text-zinc-50 bg-primary">
            <img
                className="absolute h-8 top-4 left-6 lg:top-6 lg:left-8"
                src={logo}
                alt="Ericsongs logo"
            />
            <h3 className="hidden text-[40px] xl:text-[44px] text-center lg:block">
                Start exploring Ericsongs now!
            </h3>
            <Form
                type="signup"
                title="Sign Up"
                subtitle="Enter your credentials to create an account."
                className="gap-6 mt-8 min-[390px]:mt-16 lg:m-0 lg:max-w-[450px] lg:gap-6 2xl:max-w-[600px]"
            />
            <h3 className="z-20 min-[430px]:mt-8 text-[28px] text-center lg:hidden">
                Start exploring now!
            </h3>
            <div className="flex justify-center items-start z-10 fixed min-[390px]:absolute bottom-24 w-full h-24 md:h-44 lg:h-60 lg:bottom-48 bg-gradient-signup"></div>
            <img
                className="z-0 fixed min-[390px]:absolute bottom-0 w-full min-h-36 max-h-56 object-cover md:max-h-64 lg:max-h-[340px] 2xl:max-h-[400px]"
                src={background}
                alt="Background"
            />
        </main>
    );
};
