const playersURL = 'http://localhost:5000/api/players/';

export const getPlayers = () => {
    return fetch(playersURL)
        .then(res => res.json());
};

export const postPlayer = (payload) => {
    return fetch(playersURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
}