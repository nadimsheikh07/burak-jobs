"use client"
import { useState } from 'react';
import axios from 'axios';
import FacebookLoginButton from './FacebookLoginButton';
import FacebookInsightsButton from './FacebookInsightsButton';

const FacebookPages = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [pages, setPages] = useState([]);

    const fetchPages = async (accessToken) => {
        try {
            const response = await axios.get(
                `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
            );
            setPages(response.data.data);
        } catch (error) {
            console.error('Error fetching Facebook Pages:', error);
        }
    };

    const handleFacebookLogin = (response) => {
        if (response.accessToken) {
            setAccessToken(response.accessToken)
            fetchPages(response.accessToken);
        } else {
            console.error('Facebook login failed:', response);
        }
    };

    return (
        <div>
            <h1>Facebook Pages</h1>
            <FacebookLoginButton onLogin={handleFacebookLogin} />
            <ul>
                {pages.map((page) => (
                    <li key={page.id}>
                        <img src={page.picture.data.url} alt={page.name} />
                        <div>
                            <h3>{page.name}</h3>
                            <p>{page.category}</p>
                            <div>

                                <FacebookInsightsButton pageId={page.id} accessToken={accessToken} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FacebookPages;
