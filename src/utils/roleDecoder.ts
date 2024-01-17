import { jwtDecode } from "jwt-decode";

interface decode {
    role: string
}

const getRole = (token: string | null) => {
    if (token){
        var decoded : decode = jwtDecode(token);
        console.log(decoded);
        console.log('Role: ', decoded.role);
        return decoded.role;
    }
    return null;
}

export { getRole }