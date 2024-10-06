import { House, LogOut } from 'lucide-react';

export const SideBar = () => {
    return (
        <section className="hidden lg:flex flex-col justify-between items-center w-20 z-20 py-8 bg-zinc-800">
            <div className="flex justify-center items-center w-full h-14 border-r-2 border-blue-500">
                <House className="size-7 text-blue-500" />
            </div>
            <div className="flex justify-center items-center w-full h-11">
                <LogOut className="size-6 text-zinc-300" />
            </div>
        </section>
    );
};
