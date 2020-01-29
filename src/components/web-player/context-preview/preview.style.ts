import styled, { css } from "styled-components";

export const Preview = styled.div`
  ${({ theme }) => css`

    width: 100%;
    background-color: ${theme.colors.darkestBlue};
    color: ${theme.colors.white};
    padding: 10px;
    display:flex;
    
    .album-cover {
        justify-content: flex-end;
    display: flex;
    width: 50%;
    }
    .primary-info {
        display:flex;
        flex-direction:column;
        width: 50%;
    }
    .artist, .song{
        display:flex;
        align-items: baseline;
        
        h5 {
            padding-left: 5px;
        }
    }

    } */
  `}
`;
