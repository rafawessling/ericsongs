import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAccessToken } from '../../store/auth/fetchAccessToken';
import { AppDispatch, RootState } from '../../store/store';
import { generateCodeChallenge, generateCodeVerifier } from '../../utils/authCodes';
import { Button } from '../Button/Button';
import { Loading } from '../Loading/Loading';
import { Title } from '../Title/Title';

export const SignInContent = () => {
    const hasFetchedToken = useRef(false);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const spotifySignUpUrl = 'https://www.spotify.com/signup';

    const { loading, error, isLoggedIn } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async () => {
        const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        const scope = 'user-read-private user-read-email';

        const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(
            redirect_uri
        )}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${encodeURIComponent(
            scope
        )}`;

        localStorage.setItem('codeVerifier', codeVerifier);

        window.location.href = authorizationUrl;
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const codeVerifier = localStorage.getItem('codeVerifier');

        if (code && !isLoggedIn && !hasFetchedToken.current) {
            hasFetchedToken.current = true;

            dispatch(fetchAccessToken({ code, codeVerifier: codeVerifier! }))
                .unwrap()
                .then(() => {
                    params.delete('code');
                    const newUrl = `${window.location.pathname}`;
                    window.history.replaceState({}, document.title, newUrl);

                    navigate('/home');
                })
                .catch(error => {
                    console.error('Failed fetching access token:', error);
                });
        }
    }, [dispatch, navigate, isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    return (
        <section className="flex flex-col justify-start align-center gap-12 z-20 w-full md:w-4/5 max-w-389:mt-0 mt-10 lg:mt-0">
            {loading && <Loading />}
            <div className="flex flex-col gap-4">
                <Title>Sign In</Title>
                <p className="text-lg">
                    Unlock a world of top songs and artists with your Spotify account.
                </p>
            </div>
            <Button onClick={handleSubmit}>Log in with Spotify</Button>
            {error && <p className="text-lg text-center text-red-600">{error}</p>}

            <div className="flex flex-col items-center justify-center">
                <p className="text-center">Do not have an account?</p>
                <a
                    href={spotifySignUpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-1 cursor-pointer text-blue-500 underline"
                >
                    Create an account on Spotify.
                </a>
            </div>
        </section>
    );
};
