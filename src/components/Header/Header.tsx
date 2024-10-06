import { LogOut } from 'lucide-react';
import { Input } from '../Input/Input';
import { Title } from '../Title/Title';
import logo from '../../assets/logo.svg';

interface HeaderProps {
    search: string;
    setSearch: (search: string) => void;
}

export const Header = ({ search, setSearch }: HeaderProps) => {
    const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <section className="flex justify-between items-center lg:hidden">
                <img className="h-8" src={logo} alt="Ericsongs logo" />
                <div className="flex justify-center items-center w-11 h-11 -mr-2">
                    <LogOut className="size-7 text-zinc-300" />
                </div>
            </section>
            <section className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <Title>
                    Hello, <span className="lg:text-blue-500">Joana</span>
                </Title>
                <Input
                    id="search"
                    placeholder="Search"
                    value={search}
                    type="text"
                    startAdornment="Search"
                    endAdornment="X"
                    onChange={onChangeFilter}
                    className="lg:w-2/5 max-w-[600px] xl:w-[600px]"
                />
                <img className="hidden lg:block h-8" src={logo} alt="Ericsongs logo" />
            </section>
        </>
    );
};
