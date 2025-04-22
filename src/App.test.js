import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
    test('renderiza título de login', () => {
        render(<App />);
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });

    test('mostra mensagem de erro se os campos estiverem vazios', () => {
        render(<App />);
        fireEvent.click(screen.getByText(/Acessar/i));
        expect(screen.getByText(/Por favor, preencha todos os campos/i)).toBeInTheDocument();
    });

    test('login bem-sucedido com credenciais corretas', () => {
        render(<App />);

        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'eduardo.lino@pucpr.br' },
        });

        fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
            target: { value: '123456' },
        });

        fireEvent.click(screen.getByText(/Acessar/i));
        expect(screen.getByText(/Acessado com sucesso/i)).toBeInTheDocument();
    });

    test('login falha com credenciais erradas', () => {
        render(<App />);

        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'usuario@teste.com' },
        });

        fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
            target: { value: 'senhaerrada' },
        });

        fireEvent.click(screen.getByText(/Acessar/i));
        expect(screen.getByText(/Usuário ou senha incorretos/i)).toBeInTheDocument();
    });
});
