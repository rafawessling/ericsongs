import { LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchQuery, setSearchQuery } from '../../store/search/searchSlice';
import { RootState } from '../../store/store';
import { Input } from '../Input/Input';
import { Title } from '../Title/Title';
import { HeaderProps } from './HeaderTypes';
import logo from '../../assets/logo.svg';

export const Header = ({
    handleSearch,
    setTextSearching,
    handleSignOut,
}: HeaderProps) => {
    const dispatch = useDispatch();
    const { query } = useSelector((state: RootState) => state.search);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value));
    };

    const handleClearSearch = () => {
        dispatch(clearSearchQuery());
        setTextSearching('');
    };

    return (
        <>
            <section className="flex justify-between items-center lg:hidden">
                <img className="h-8" src={logo} alt="Ericsongs logo" />
                <div
                    className="flex justify-center items-center w-11 h-11 -mr-2"
                    onClick={handleSignOut}
                >
                    <LogOut className="size-7 text-zinc-300" />
                </div>
            </section>
            <section className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <Title>
                    Hello, <span className="lg:text-blue-500">Music lover</span>
                </Title>
                <Input
                    id="search"
                    placeholder="Search"
                    value={query}
                    type="text"
                    startAdornment="Search"
                    endAdornment={query ? 'X' : undefined}
                    onIconClick={handleClearSearch}
                    onChange={handleInputChange}
                    onKeyDown={handleSearch}
                    className="lg:w-2/5 max-w-[600px] xl:w-[600px]"
                />
                <img className="hidden lg:block h-8" src={logo} alt="Ericsongs logo" />
            </section>
        </>
    );
};
