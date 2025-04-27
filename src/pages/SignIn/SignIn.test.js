import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from './SignIn';

describe('SignIn Component', () => {
    test('Teste de UI', () => {
        render(<SignIn />);
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    });

    test('Testar usuário digitar email e senha e atualizar', () => {
        render(<SignIn />);
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Senha/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    test('Aparecer erro caso campos estejam vazios', () => {
        render(<SignIn />);
        const submitButton = screen.getByRole('button', { name: /Entrar/i });

        fireEvent.click(submitButton);

        expect(screen.getByText(/Por favor, preencha todos os campos!/i)).toBeInTheDocument();
    });
});