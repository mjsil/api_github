import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../Components/Container';
import { Form, SubmitButton, List } from './styles';

class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        repositoryExists: true
    };

    // Carrega os dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({
                repositories: JSON.parse(repositories)
            });
        }
    }

    // Salva os dados no localStorage na mudaça de estado
    componentDidUpdate(prevProps, prevState) {
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        try {
            e.preventDefault();

            this.setState({ loading: true });

            const { newRepo, repositories } = this.state;

            const hasRepository = repositories.find(
                repository => repository.name === newRepo
            );

            if (newRepo === '') {
                throw 'Você precisa indicar um repositório';
            }

            if (hasRepository) {
                throw 'Esse repositório já existe';
            }

            const response = await api.get(`/repos/${newRepo}`);

            const data = {
                name: response.data.full_name
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false
            });
        } catch (error) {
            console.log(error);

            this.setState({
                repositoryExists: false,
                loading: false
            });
        }
    };

    render() {
        const { newRepo, repositories, loading, repositoryExists } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit} repositoryExists={repositoryExists}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        {loading ?
                            <FaSpinner color="#fff" size={14} />
                            :
                            <FaPlus color="#fff" size={14} />
                        }
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }
}

export default Main;
