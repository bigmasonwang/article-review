import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import React from 'react';
import IArticlesQuery from '../../../types/IArticlesQuery';

const ArticlesPagination: React.FC<{ query: IArticlesQuery; setQuery: any }> =
  ({ query, setQuery }) => {
    // const totalPage = useAppSelector(selectTotalPage);
    const totalPage = 2;
    const { page } = query;

    const handlePageChange = (
      event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      const newQuery = {
        ...query,
        page: value,
      };
      setQuery(newQuery);
      console.log(newQuery);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const goTo = data.get('goTo') as string;
      const pageNum = parseInt(goTo, 10);
      if (pageNum > 0 && pageNum <= totalPage) {
        const newQuery = {
          ...query,
          page: pageNum,
        };
        setQuery(newQuery);
        console.log(newQuery);
      }
    };

    return (
      <Box display="flex" justifyContent="center">
        <Pagination
          count={totalPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          page={page}
        />
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="goTo"
            name="goTo"
            variant="outlined"
            InputProps={{ style: { height: 32, width: 64 } }}
          />
          <Button type="submit">Go</Button>
        </Box>
      </Box>
    );
  };

export default ArticlesPagination;
