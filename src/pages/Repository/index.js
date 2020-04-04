import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { FaSpinner } from 'react-icons/fa'

import Container from '../../Components/Container';
import { Loading, Owner, IssueList, IssueFilter, PageActions } from './styles';

class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string
            })
        }).isRequired
    }

    state = {
        repository: {},
        issues: [],
        loading: true,
        filters: [
            { state: 'all', label: 'Todas' },
            { state: 'open', label: 'Abertas' },
            { state: 'closed', label: 'Fechadas' }
        ],
        filterIndex: 0,
        page: 1
    };

    // Salva os dados no localStorage na mudaça de estado
    async componentDidMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`repos/${repoName}`),
            api.get(`repos/${repoName}/issues`, {
                params: {
                    state: 'all',
                    per_page: 5
                }
            })
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false
        });
    }

    handleFilter = async (index) => {
        await this.setState({
            filterIndex: index,
            page: 1
        });

        this.loadIssues();
    };

    handlePage = async (index) => {
        const { page } = this.state;

        await this.setState({
            page: index === 'back' ? page - 1 : page + 1
        });

        this.loadIssues();
    };

    loadIssues = async () => {
        const { match } = this.props;
        const { filters, filterIndex, page } = this.state;

        const repoName = decodeURIComponent(match.params.repository);

        // AQUI VAI SER O LOADING

        const response = await api.get(`repos/${repoName}/issues`, {
            params: {
                state: filters[filterIndex].state,
                per_page: 5,
                page
            }
        });

        this.setState({
            issues: response.data
        });
    }

    render() {
        const { repository, issues, loading, filters, filterIndex, page } = this.state;

        if (loading) {
            return (
                <Loading loading={loading}>
                    <FaSpinner color="#fff" size={30} />
                </Loading>
            )
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssueList>
                    <IssueFilter active={filterIndex}>
                        {filters.map((filter, index) => (
                            <button active={index} key={filter.label} onClick={() => this.handleFilter(index)}>
                                {filter.label}
                            </button>
                        ))}
                    </IssueFilter>

                    {issues.map(issue => (
                        <li key={String(issues.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>

                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>

                <PageActions>
                    <button disabled={page < 2} onClick={() => this.handlePage('back')}>
                        Anterior
                    </button>

                    <span>{page}</span>

                    <button disabled={page >= 6} onClick={() => this.handlePage('next')}>
                        Próximo
                    </button>
                </PageActions>
            </Container>
        );
    }
}

export default Repository;
