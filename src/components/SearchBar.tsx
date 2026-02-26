import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useBoardStore } from '@/store/useBoardStore';

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useBoardStore();

  return (
    <TextField
      variant="outlined"
      placeholder="Search tasks..."
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{maxWidth: '300px', mb: 2, backgroundColor: 'white' }}
    />
  );
};