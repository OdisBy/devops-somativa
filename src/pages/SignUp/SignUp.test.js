import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

describe('SignUp Component', () => {
    test('Teste de UI', () => {
        render(<SignUp />);
        expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument();
    });

    test('Testar digitar nome, email e senha', () => {
        render(<SignUp />);
        const nameInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Senha/i);

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(nameInput.value).toBe('John Doe');
        expect(emailInput.value).toBe('john@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    test('Aparecer erro caso campos estejam vazios', () => {
        render(<SignUp />);
        const submitButton = screen.getByRole('button', { name: /Cadastrar/i });

        fireEvent.click(submitButton);

        expect(screen.getByText(/Por favor, preencha todos os campos!/i)).toBeInTheDocument();
    });
});