const scopes = [
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'playlist-read-private',
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state'
]

const stateKey = 'spotify_auth_state';

const spotifyAuthUrl = (state) => 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    show_dialog: true,
    state,
    scope: scopes.join(' ')
});

export { spotifyAuthUrl, stateKey };