import { SignInContent } from '../../components/SignInContent/SignInContent';
import logo from '../../assets/logo.svg';
import background from '../../assets/signInBackground.svg';

export const SignIn = () => {
    return (
        <main className="flex flex-col lg:flex-row-reverse items-center w-screen min-h-dvh text-zinc-50 bg-primary">
            <section className="flex flex-col items-center gap-16 w-full relative lg:w-3/5 lg:h-screen lg:bg-secondary lg:rounded-l-[80px]">
                <img
                    className="z-0 absolute t-0 w-full max-h-48 object-cover md:max-h-64 lg:max-h-[340px] 2xl:max-h-[400px] lg:rounded-tl-[80px] opacity-80"
                    src={background}
                    alt="Background"
                />
                <div className="flex justify-center items-end z-10 w-full h-32 mt-28 md:h-48 md:mt-40 lg:h-64 lg:mt-64 lg:mb-20 2xl:h-80 2xl:mt-80 bg-gradient-signin-mobile lg:bg-gradient-signin-desktop">
                    <h3 className="hidden lg:block text-4xl leading-normal text-center w-[500px]">
                        Discover and search your favorite songs and artists with
                    </h3>
                </div>
                <img
                    className="z-20 h-10 max-w-389:-mt-28 -mt-16 md:h-12 md:-mt-24 lg:h-14"
                    src={logo}
                    alt="Ericsongs logo"
                />
            </section>
            <section className="flex flex-col justify-center items-center p-6 w-full relative lg:w-2/5 lg:h-screen">
                <img
                    className="hidden lg:block absolute h-8 top-8 left-8"
                    src={logo}
                    alt="Ericsongs logo"
                />
                <SignInContent />
            </section>
        </main>
    );
};
