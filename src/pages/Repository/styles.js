import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    ${props => props.loading && css`
        svg {
            animation: ${rotate} 1.5s linear infinite;
        }
    `}
`;

export const Owner = styled.header`
    display: flex;
    align-items: center;
    flex-direction: column;

    a {
        color: #7159c1;
        text-decoration: none;
        font-size: 16px;
    }

    img {
        width: 120px;
        right: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`;

export const IssueFilter = styled.ul`
    display: flex;
    justify-content: center;
    padding: 15px 0;

    button {
        color: #fff;
        background: #7159c1;
        padding: 7px 7px;
        width: 90px;
        outline: 0;
        border: 0;
        font-size: 14px;
        font-weight: bold;
        border-radius: 16px;
        margin-left: 10px;

        &:nth-child(${props => props.active + 1}) {
            background: #fff;
            color: #7159c1;
            border: 1px solid #7159c1;
        }
    }
`;

export const IssueList = styled.ul`
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        border: 1px solid #eee;
        padding: 15px 10px;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    font-size: 12px;
                    margin-left: 10px;
                    padding: 3px 4px;
                    height: 20px;
                    font-weight: 600;
                    border-radius: 2px;
                }
            }

            p {
                margin-top: 5px;
                color: #999;
                font-size: 12px;
            }
        }
    }
`;

export const PageActions = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    align-items: center;


    button {
        background: #fff;
        color: #7159c1;
        border: 1px solid #7159c1;
        padding: 7px 7px;
        width: 90px;
        outline: 0;
        font-size: 14px;
        font-weight: bold;
        border-radius: 16px;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.35;
        }
    }

    span {
        background: #7159c1;
        color: #fff;
        border: 1px solid #7159c1;
        padding: 10px 15px;
        border-radius: 50%;
        outline: 0;
        border: 0;
        font-weight: bold;
        font-size: 14px;
    }
`;
