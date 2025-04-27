import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SignUp from './index.js';

describe('SignUp Component', () => {
    test('Teste de UI', () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        expect(screen.getByTestId('name-input')).toBeInTheDocument();
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    test('Testar digitar nome, email e senha', () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        const nameInput = screen.getByTestId('name-input');
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');

        fireEvent.change(nameInput, { target: { value: 'Nome legal' } });
        fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
        fireEvent.change(passwordInput, { target: { value: '1234567' } });

        expect(nameInput.value).toBe('Nome legal');
        expect(emailInput.value).toBe('teste@teste.com');
        expect(passwordInput.value).toBe('1234567');
    });

    test('Aparecer erro caso campos estejam vazios', () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.click(submitButton);

        expect(screen.getByText(/Por favor, preencha todos os campos!/i)).toBeInTheDocument();
    });
});
