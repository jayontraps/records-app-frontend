import styled from 'styled-components';

const PaginationStyles = styled.div`
  min-height: 45px;
  min-width: 376px;
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius};
  & > * {
    margin: 0;
    padding: ${props => props.theme.list.spacing.vertical};
    border-right: 1px solid ${props => props.theme.colors.borderColor};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }

  &.loading {
    display: block;
    text-align: left;
  }
`;

export default PaginationStyles;
