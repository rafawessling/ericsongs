import { Form } from '../../components/Form/Form';
import logo from '../../assets/logo.svg';
import background from '../../assets/signUpBackground.svg';

export const SignUp = () => {
    return (
        <main className="flex flex-col justify-center xl:justify-start gap-4 lg:gap-6 2xl:gap-10 p-6 items-center w-screen min-h-dvh text-zinc-50 bg-primary">
            <img
                className="absolute h-8 top-4 left-6 lg:top-8 lg:left-8"
                src={logo}
                alt="Ericsongs logo"
            />
            <h3 className="hidden lg:block py-12 2xl:py-16 text-[40px] xl:text-[44px] text-center">
                Start exploring Ericsongs now!
            </h3>
            <Form
                type="signup"
                title="Sign Up"
                subtitle="Enter your credentials to create an account."
                className="gap-6 mt-8 h-sm:mt-0 lg:m-0 lg:max-w-[450px] lg:gap-6 2xl:max-w-[600px]"
            />
            <h3 className="z-20 max-w-389:mt-0 mt-8 text-[28px] text-center lg:hidden">
                Start exploring now!
            </h3>
            <div className="flex justify-center items-start z-10 max-w-389:fixed absolute bottom-24 w-full h-24 md:h-44 lg:h-60 lg:bottom-48 bg-gradient-signup"></div>
            <img
                className="z-0 fixed h-sm:absolute bottom-0 w-full min-h-36 max-h-56 object-cover md:max-h-64 lg:max-h-[340px] 2xl:max-h-[400px]"
                src={background}
                alt="Background"
            />
        </main>
    );
};
