import Cookies from 'js-cookie';

export default function extractToken(): string | undefined {
    return Cookies.get('token');
}
