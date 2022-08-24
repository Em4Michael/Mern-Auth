import bcrypt from 'bcryptjs';

const users = [
    {
        _id: '5d2b2b7d6ffcb7e50c5cb0c0',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: '123456',
        role: 'admin'
    },
    {
        _id: '5d2b2b7d6ffcb7e50c5cb0c1',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: '123456'
    },
    {
        _id: '5d2b2b7d6ffcb7e50c5cb0c2',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '123456'
    }
]

export default users;