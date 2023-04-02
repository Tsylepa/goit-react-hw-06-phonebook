import { FilterInput } from './Filter.styled';
import { handleFilter } from 'redux/filterSlice';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  return <FilterInput onInput={e => dispatch(handleFilter(e.target.value))} />;
};

export default Filter;
