import bcrypt from 'bcryptjs';

const matchPasswords = (password, rePassword) => {
    return bcrypt.compare(password, rePassword)
};

export default matchPasswords;

