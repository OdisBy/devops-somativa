import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SignInWrapper from './index.js';

describe('SignIn Component', () => {
    test('Teste de UI', () => {
        render(
            <MemoryRouter>
                <SignInWrapper />
            </MemoryRouter>
        );
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    test('Testar usuário digitar email e senha e atualizar', () => {
        render(
            <MemoryRouter>
                <SignInWrapper />
            </MemoryRouter>
        );
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');

        fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
        fireEvent.change(passwordInput, { target: { value: '1234567' } });

        expect(emailInput.value).toBe('teste@teste.com');
        expect(passwordInput.value).toBe('1234567');
    });

    test('Aparecer erro caso campos estejam vazios', () => {
        render(
            <MemoryRouter>
                <SignInWrapper />
            </MemoryRouter>
        );
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.click(submitButton);

        expect(screen.getByText(/Por favor, preencha todos os campos!/i)).toBeInTheDocument();
    });
});