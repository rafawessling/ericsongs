export interface HeaderProps {
    handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    setTextSearching: (text: string) => void;
    handleSignOut: () => void;
}
