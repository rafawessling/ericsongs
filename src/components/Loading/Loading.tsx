import { ProgressSpinner } from 'primereact/progressspinner';

export const Loading = () => {
    return (
        <section className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 z-50 bg-loading-modal backdrop-blur-sm">
            <ProgressSpinner
                style={{ width: '4rem', height: '4rem' }}
                strokeWidth="4"
                animationDuration=".6s"
                aria-label="Loading"
            />
        </section>
    );
};
